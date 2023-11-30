<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>" oncontextmenu="return false" dir="<?php echo e(App::isLocale('ar') ? 'rtl' : 'ltr'); ?>">
<head>
    <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->head; } ?>
    <!-- Scripts -->
    <meta charset="utf-8" />
    <meta name="msapplication-TileColor" content="#03a9f4">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0">
    <meta http-equiv="Content-Type" content="application/x-html+html; charset=UTF-8">
    <meta name="robots" content="index,follow">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta name="msapplication-config" content="<?php echo e(asset('browserconfig.ae3u4gn3.xml')); ?>">
    <link rel="manifest" href="<?php echo e(asset('Aeow2mf3.webmanifest')); ?>" crossorigin="use-credentials" />
    <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css">    <!-- Fonts -->
     <?php echo app('Illuminate\Foundation\Vite')(['resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"]); ?>
</head>

<body>
    <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->body; } else { ?><div id="app" data-page="<?php echo e(json_encode($page)); ?>"></div><?php } ?>
</body>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.7.0.slim.min.js"></script>
<script type="text/javascript" src="<?php echo e(asset('/assets/js/app.js')); ?>"></script>
<script type="text/javascript" src="https://unpkg.com/@popperjs/core@2"></script>
<!--script src="https://cdnjs.cloudflare.com/ajax/libs/tippy.js/2.5.4/tippy.min.js" integrity="sha512-ZB5t++3TnrK57A+4t/QGMufaq4pJ/Kux2pGJTa5moPJlNehduadMY8W4qdCpcICvdnTwj1cb1hWsmJTYjy/4gA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://unpkg.com/@popperjs/core@2"></script>
        <script src="https://unpkg.com/tippy.js@6"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/superfish/1.7.10/css/superfish.min.css"
    media="screen">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/superfish/1.7.10/js/superfish.min.js"></script>
<script src="<?php echo e(asset('assets/js/vendors/bootstrap.min.js')); ?>"></script>

</html>
<?php /**PATH /var/www/html/resources/views/app.blade.php ENDPATH**/ ?>