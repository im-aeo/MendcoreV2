<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" oncontextmenu="return false"
   dir="{{ App::isLocale('ar') ? 'rtl' : 'ltr' }}">
   <head>
      @inertiaHead
      <!-- Scripts -->
      <meta charset="utf-8" />
      <meta name="msapplication-TileColor" content="#03a9f4">
      <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0">
      <meta http-equiv="Content-Type" content="application/x-html+html; charset=UTF-8">
      <meta name="robots" content="index,follow">
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
      <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
      <meta name="msapplication-config" content="{{ asset('browserconfig.ae3u4gn3.xml') }}">
      <link rel="manifest" href="{{ asset('Aeow2mf3.webmanifest') }}" crossorigin="use-credentials" />
      <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v6.1.2/css/pro.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css">
      <!-- Fonts -->
      @vite(['resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"])
   </head>
   <body>
      @inertia
   </body>
   <script type="text/javascript" src="https://code.jquery.com/jquery-3.7.0.slim.min.js"></script>
   <script type="text/javascript" src="{{ asset('assets/js/app.js') }}"></script>
   <script type="text/javascript" src="https://unpkg.com/@popperjs/core@2"></script>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/superfish/1.7.10/css/superfish.min.css"  media="screen">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/superfish/1.7.10/js/superfish.min.js"></script>
   <script src="{{ asset('assets/js/vendors/bootstrap.min.js') }}"></script>
   <script src="https://apis.google.com/js/platform.js" async defer></script>
</html>
