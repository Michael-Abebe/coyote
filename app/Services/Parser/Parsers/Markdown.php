<?php

namespace Coyote\Services\Parser\Parsers;

use Coyote\Repositories\Contracts\UserRepositoryInterface as User;

/**
 * Class Markdown
 */
class Markdown extends \ParsedownExtra implements ParserInterface
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var bool
     */
    private $enableHashParser = false;

    /**
     * @var bool
     */
    private $enableUserTagParser = true;

    /**
     * @var string
     */
    private $hashRoute = 'microblog.tag';

    /**
     * @param User $user
     * @throws \Exception
     */
    public function __construct(User $user)
    {
        parent::__construct();

        $this->InlineTypes['@'][] = 'UserTag';
        $this->inlineMarkerList .= '@';

        $this->InlineTypes['#'][] = 'Hash';
        $this->inlineMarkerList .= '#';

        $this->user = $user;
    }

    /**
     * @param bool $flag
     * @return Markdown
     */
    public function setEnableHashParser(bool $flag)
    {
        $this->enableHashParser = $flag;

        return $this;
    }

    /**
     * @param boolean $flag
     * @return Markdown
     */
    public function setEnableUserTagParser(bool $flag)
    {
        $this->enableUserTagParser = $flag;

        return $this;
    }

    /**
     * @param array $excerpt
     * @return array|void
     */
    protected function inlineHash($excerpt)
    {
        if (!$this->enableHashParser) {
            return null;
        }

        if (preg_match('~#([\p{L}\p{Mn}0-9\._+-]+)~u', $excerpt['text'], $matches)) {
            $tag = mb_strtolower($matches[1]);

            return [
                'extent' => strlen($matches[0]),
                'element' => [
                    'name' => 'a',
                    'text' => $matches[0],
                    'attributes' => [
                        'href' => route($this->hashRoute, [$tag])
                    ]
                ]
            ];
        }
    }

    /**
     * We don't want <h1> in our text
     *
     * @param $line
     * @return array|void
     */
    protected function blockHeader($line)
    {
        $block = parent::blockHeader($line);

        if (isset($block['element'])) {
            if ($block['element']['name'] == 'h1') {
                return null;
            }
        }

        return $block;
    }

    /**
     * Find the position of the first occurrence of a character in a string
     *
     * @param $haystack
     * @param string $needle
     * @param int $offset
     * @return bool|mixed
     */
    private function strpos($haystack, $needle, $offset = 0)
    {
        $result = [];

        foreach (str_split($needle) as $char) {
            if (($pos = strpos($haystack, $char, $offset)) !== false) {
                $result[] = $pos;
            }
        }

        return $result ? min($result) : false;
    }

    /**
     * Parse users login
     *
     * @param array $excerpt
     * @return array|void
     */
    protected function inlineUserTag($excerpt)
    {
        if (!$this->enableUserTagParser) {
            return null;
        }

        $text = &$excerpt['text'];
        $start = strpos($text, '@');

        if (isset($text[$start + 1])) {
            $exitChar = $text[$start + 1] === '{' ? '}' : ':, '; // <-- space at the end
            $end = $this->strpos($text, $exitChar, $start);

            if ($end === false) {
                $end = mb_strlen($text) - $start;
            }

            $length = $end - $start;
            $start += 1;
            $end -= 1;

            if ($exitChar == '}') {
                $start += 1;
                $end -= 1;

                $length += 1;
            }

            $name = substr($text, $start, $end);
            $user = $this->user->findByName($name);

            if ($user) {
                return [
                    'extent' => $length,
                    'element' => [
                        'name' => 'a',
                        'text' => '@' . $name,
                        'attributes' => [
                            'href' => route('profile', [$user->id]),
                            'data-user-id' => $user->id,
                            'class' => 'mention'
                        ]
                    ]
                ];
            }
        }
    }

    /**
     * @param string $text
     * @return string
     */
    public function parse($text)
    {
        return $this->text($text);
    }
}
