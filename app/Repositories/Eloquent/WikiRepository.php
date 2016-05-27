<?php

namespace Coyote\Repositories\Eloquent;

use Coyote\Repositories\Contracts\WikiRepositoryInterface;
use Coyote\Wiki;
use Illuminate\Http\Request;

class WikiRepository extends Repository implements WikiRepositoryInterface
{
    /**
     * @return \Coyote\Wiki
     */
    public function model()
    {
        return 'Coyote\Wiki';
    }

    /**
     * @param string $path
     * @return mixed
     */
    public function findByPath($path)
    {
        $this->applyCriteria();
        return $this
            ->model
            ->where('path', $path)
            ->first();
    }

    /**
     * Get children articles of given parent_id.
     *
     * @param int|null $parentId
     * @return mixed
     */
    public function children($parentId = null)
    {
        $this->applyCriteria();
        return $this
            ->model
            ->from($this->rawFunction('wiki_children', $parentId))
            ->get();
    }

    /**
     * @param int $pathId
     * @return mixed
     */
    public function parents($pathId)
    {
        $this->applyCriteria();
        return $this->model->from($this->rawFunction('wiki_parents', $pathId))->get();
    }

    /**
     * @return array
     */
    public function treeList()
    {
        $this->applyCriteria();

        $result = [];
        $data = $this->model->from($this->rawFunction('wiki_children'))->get(['path_id', 'title', 'depth']);

        foreach ($data as $row) {
            $result[$row['path_id']] = str_repeat('&nbsp;', $row['depth'] * 4) . $row['title'];
        }

        return $result;
    }

    /**
     * @param int $userId
     * @return mixed
     */
    public function getSubscribed($userId)
    {
        return $this
            ->app
            ->make(Wiki\Subscriber::class)
            ->select()
            ->join('wiki', 'wiki.id', '=', 'wiki_id')
            ->where('wiki_subscribers.user_id', $userId)
            ->orderBy('wiki_subscribers.id', 'DESC')
            ->paginate();
    }

    /**
     * @param \Coyote\Wiki $wiki
     * @param Request $request
     */
    public function save($wiki, Request $request)
    {
        /** @var \Coyote\Wiki\Page $page */
        $page = $this->app->make(Wiki\Page::class)->findOrNew($wiki->id);

        $page->fill($request->all());
        $page->fillGuarded($request->only(['is_locked', 'template']), $request->user()->can('wiki-admin'));

        // we need to know if those attributes were changed. if so, we need to add new record to the history.
        $isDirty = $page->isDirty(['title', 'excerpt', 'text']);
        $page->save();

        if ($isDirty) {
            // add new version to the history
            $page->logs()->create($page->toArray() + [
                'user_id'   => $request->user()->id,
                'ip'        => $request->ip(),
                'host'      => gethostbyaddr($request->ip()),
                'browser'   => $request->browser(),
                'length'    => mb_strlen($page->text)
            ]);
        }

        if ($page->wasRecentlyCreated) {
            $parent = $this->app->make(Wiki\Path::class)->findOrNew((int) $request->input('path_id'));
            $wiki->forceFill($page->createPath($parent, $page->slug)->toArray());
        }

        $wiki->forceFill($page->toArray());
        $wiki->wasRecentlyCreated = $page->wasRecentlyCreated;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function delete($id)
    {
        return $this->app->make(Wiki\Page::class)->destroy($id);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function restore($id)
    {
        return $this->app->make(Wiki\Page::class)->withTrashed()->findOrFail($id)->restore();
    }

    /**
     * @param $name
     * @param array ...$args
     * @return \Illuminate\Database\Query\Expression
     */
    private function rawFunction($name, ...$args)
    {
        foreach ($args as &$arg) {
            if ($arg === null) {
                $arg = 'NULL';
            }
        }

        return $this->raw(sprintf('%s(%s) AS "wiki"', $name, implode(',', $args)));
    }
}
