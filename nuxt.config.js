const pkg = require('./package.json');

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'anti-bds-states',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                href: `/${pkg.name}/favicon.png`
            },
            {
                rel: 'stylesheet',
                href: 'https://propublica.github.io/stateface/reference/stateface.css',
                type: 'text/css'
            }
        ]
    },
    modules: [
        '@nuxtjs/axios',
        [
            '@nuxtjs/google-analytics',
            {
                id: 'UA-3383794-4',
                debug: {
                    sendHitTask: !(
                        typeof document !== 'undefined' &&
                        document &&
                        document.referrer &&
                        document.referrer.indexOf('publicintegrity.org') !== -1
                    )
                }
            }
        ]
    ],
    plugins: [
        { src: '~/plugins/pym.js', ssr: false },
        { src: '~/plugins/chartbeat.js', ssr: false }
    ],
    axios: {
        baseURL: process.server
            ? `http://${process.env.HOST || 'localhost'}:${process.env.PORT ||
                  3000}`
            : `/${pkg.name}/`
    },
    router: {
        base: `/${pkg.name}/`
    },
    /*
     ** Global CSS
     */
    css: ['~/assets/css/site.css', '~/assets/css/main.css'],
    /*
     ** Add axios globally
     */
    build: {
        html: {
            minify: {
                collapseWhitespace: false,
                removeEmptyAttributes: false
            }
        },
        /*
         ** Run ESLINT on save
         */
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.(csv)$/,
                loader: 'dsv-loader',
                exclude: /(node_modules)/
            });

            if (ctx.isClient && process.env.NODE_ENV !== 'production') {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
