/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { watch } from "vite-plugin-watch";
import { splitVendorChunkPlugin } from 'vite';
import { obfuscator } from 'rollup-obfuscator';
//import basicSsl from '@vitejs/plugin-basic-ssl'
import {viteObfuscateFile} from 'vite-plugin-obfuscator'
import vueJsx from '@vitejs/plugin-vue-jsx'
import resolve from '@rollup/plugin-node-resolve'

export default defineConfig({
    root: "", // Specify the root directory for development
    base: '/',
    css: {
    transformer: 'postcss',
    modules: {
      generateScopedName: '[hash:base64:5]',
    },
    },
    plugins: [
        splitVendorChunkPlugin(),
        /*obfuscator({
            compact: true,
            controlFlowFlattening: false,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: false,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: 0,
            disableConsoleOutput: false,
            domainLock: [],
            domainLockRedirectUrl: 'about:blank',
            forceTransformStrings: [],
            identifierNamesCache: null,
            identifierNamesGenerator: 'hexadecimal',
            identifiersDictionary: [],
            identifiersPrefix: '',
            ignoreImports: false,
            inputFileName: '',
            log: false,
            numbersToExpressions: false,
            optionsPreset: 'default',
            renameGlobals: false,
            renameProperties: false,
            renamePropertiesMode: 'safe',
            reservedNames: [],
            reservedStrings: [],
            seed: 0,
            selfDefending: false,
            simplify: true,
            sourceMap: false,
            sourceMapBaseUrl: '',
            sourceMapFileName: '',
            sourceMapMode: 'separate',
            sourceMapSourcesMode: 'sources-content',
            splitStrings: false,
            splitStringsChunkLength: 10,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 0.5,
            stringArrayEncoding: [],
            stringArrayIndexesType: [
                'hexadecimal-number'
            ],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 1,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 2,
            stringArrayWrappersType: 'variable',
            stringArrayThreshold: 0.75,
            target: 'browser',
            transformObjectKeys: false,
            unicodeEscapeSequence: false
        }),*/
        watch({
            pattern: "routes/*.php",
            command: "php artisan trail:generate",
        }),
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts', 
            refresh: [
                'resources/routes/**',
                'app/Http/**',
                'public/assets/js/**',
                'public/assets/img/**',
                'routes/**',
                'resources/js/**',
                'resources/views/**',
            ],
        }),
	vueJsx({}),
        vue({
            template: {
                transformAssetUrls: {
                    // The Vue plugin will re-write asset URLs, when referenced
                    // in Single File Components, to point to the Laravel web
                    // server. Setting this to `null` allows the Laravel plugin
                    // to instead re-write asset URLs to point to the Vite
                    // server instead.
                    base: null,

                    // The Vue plugin will parse absolute URLs and treat them
                    // as absolute paths to files on disk. Setting this to
                    // `false` will leave absolute URLs un-touched so they can
                    // reference assets in the public directory as expected.
                    includeAbsolute: false,
                },
            },
        }),
	viteObfuscateFile({})
	//basicSsl(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@' : path.resolve(__dirname, './resources/js'),
            'ziggy': path.resolve('vendor/tightenco/ziggy/dist/vue.m.js'),
            'zrouting': path.resolve('vendor/tightenco/ziggy/dist/vue.es.js'),
        },
    },
});
