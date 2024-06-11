<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" oncontextmenu="return false"
   dir="{{ App::isLocale('ar') ? 'rtl' : 'ltr' }}">
   <head>
      @inertiaHead
      @vite(['resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"])
   </head>
   <body style="margin:0;padding:0">
      @inertia
   </body>
   <script type="text/javascript" src="https://code.jquery.com/jquery-3.7.0.slim.min.js"></script>
   <script type="text/javascript" src="{{ asset('assets/js/app.js') }}"></script>
   <script type="text/javascript" src="https://unpkg.com/@popperjs/core@2"></script>
   <script src="{{ asset('assets/js/vendors/bootstrap.min.js') }}"></script>
   <script src="https://apis.google.com/js/platform.js" async defer></script>
</html>
