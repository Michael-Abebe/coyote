<?php

namespace Coyote\Http\Forms;

use Coyote\Services\FormBuilder\FormEvents;
use Coyote\Services\FormBuilder\Form;

trait UsernameTransformerTrait
{
    /**
     * @param string $from
     * @param string $to
     */
    protected function transformUsernameToId($from, $to = 'user_id')
    {
        $this->addEventListener(FormEvents::POST_SUBMIT, function (Form $form) use ($from, $to) {
            $username = $form->get($from)->getValue();
            $form->add($to, 'hidden', ['template' => 'hidden']);

            if ($username) {
                /** @var \Coyote\User $user */
                $user = $this->repository->findByName($username);

                if ($user) {
                    $form->get($to)->setValue($user->id);
                }
            }
        });
    }
}
