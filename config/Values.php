<?php

return [
    'name' => 'Netisu',
    'logo' => '/assets/img/logo.png',
    'icon' => '/assets/img/logo.svg',
    'in_event' => true,
    'system_account_id' => 1,
    'render' => [
        'url' => '206.189.195.33:8001',
        'default_avatar' => 'assets/img/dummy_headshot'
    ],
    'price' => [
        'username' => '250',
    ],
    'storage' => [
        'root' => '/var/www/cdn',
        'url' => 'https://cdn.netisu.com', // If your developing locally put localhost or your current server ip
    ],
    'production' => [
        'domains' => [
            'main' => 'https://netisu.test',
            'api' => 'https://netisu.test/api',
            'careers' => 'https://careers.netisu.test',
        ],
    ],
    'shop' => [
        'previews_enabled' => true
    ],
    'maintenance_passwords' => [
        'randopass',
        'password2',
        'alexplaysminecraft123'
    ],
    'socials' => [
        'discord' => 'https://discord.gg/netisu',
        'twitter' => '#'
    ],
];
