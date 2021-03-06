<?php

namespace Coyote\Notifications;

use Coyote\Job;
use Coyote\Services\Invoice\CalculatorFactory;
use Coyote\Services\UrlBuilder\UrlBuilder;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Coyote\Services\Notification\DatabaseChannel;

class JobCreatedNotification extends Notification
{
    use Queueable;

    const ID = \Coyote\Notification::JOB_CREATE;

    /**
     * @var Job
     */
    private $job;

    /**
     * @param Job $job
     */
    public function __construct(Job $job)
    {
        $this->job = $job;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function via()
    {
        return ['mail', DatabaseChannel::class];
    }

    /**
     * @param \Coyote\User $user
     * @return array
     */
    public function toDatabase($user)
    {
        return [
            'object_id'     => $this->objectId(),
            'user_id'       => $user->id,
            'type_id'       => static::ID,
            'subject'       => $this->job->title,
            'excerpt'       => 'Ogłoszenie zostało dodane i oczekuje na płatność',
            'url'           => UrlBuilder::job($this->job),
            'guid'          => $this->id
        ];
    }

    /**
     * Generowanie unikalnego ciagu znakow dla wpisu na mikro
     *
     * @return string
     */
    public function objectId()
    {
        return substr(md5(static::ID . $this->job->id), 16);
    }

    /**
     * @return array
     */
    public function sender()
    {
        return [
            'user_id'       => $this->job->user_id,
            'name'          => $this->job->user->name
        ];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail()
    {
        // calculate price based on payment details
        $calculator = CalculatorFactory::payment($this->job->getUnpaidPayment());

        return (new MailMessage)
            ->subject(sprintf('Ogłoszenie "%s" zostało dodane i oczekuje na płatność', $this->job->title))
            ->line(sprintf('Dziękujemy za dodanie ogłoszenia w serwisie <strong>%s</strong>.', config('app.name')))
            ->line(
                sprintf(
                    'Ogłoszenie %s zostało dodane i czeka dokonanie opłaty w kwocie %s zł netto.',
                    link_to(UrlBuilder::job($this->job), $this->job->title),
                    $calculator->netPrice()
                )
            )
            ->action('Opłać ogłoszenie', route('job.payment', [$this->job->getUnpaidPayment()]))
            ->line('Dziękujemy za skorzystanie z naszych usług!');
    }
}
