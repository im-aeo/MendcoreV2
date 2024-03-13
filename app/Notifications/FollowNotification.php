<?php
namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class FollowNotification extends Notification
{
   
   use Queueable;
   
   public function __construct(private Follower $follower)
   {
       //
   }
   public function via(object $notifiable): array
   {
      return ['database'];
   }
  
   public function toArray(object $notifiable): array
   {
    return [
        'user' => $this->follower->username,
    ];
   }
  
}
