<?php

namespace Coyote\Http\Controllers\Forum;

use Coyote\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $this->breadcrumb->push('Forum', route('forum.home'));
        $this->breadcrumb->push('Python', '/Forum/Python');
        $this->breadcrumb->push('Python - wybór "najlepszego" GUI cross-platform', '/Forum/Python/Test');

        $viewers = new \Coyote\Session\Viewers(new \Coyote\Session(), $request);

        return parent::view('forum.topic')->with('viewers', $viewers->render($request->getRequestUri()));
    }
}
