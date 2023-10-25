/** @type {import('next').NextConfig} */
const path = require('path');
require('dotenv').config({ path: 'config/.env' });
require('dotenv').config({ path: 'config/.env' + '.' + process.env.APP_ENV });

const env = {};
for (const key in process.env) {
    // nextJs error 방지

    if (key.startsWith('NEXT_RUNTIME')) continue;
    if (key.startsWith('__')) continue;
    if (key.startsWith('NODE_')) continue;

    env[key] = process.env[key];
}

module.exports = {
    env,
    reactStrictMode: true,
    swcMinify: false,
    productionBrowserSourceMaps: true,
    compiler: {
        // ssr, displayName true가 기본값으로 켜진다.
        styledComponents: true
    },
    images: {
        domains: [process.env.IMAGE_DOMAIN]
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
    },
    sassOptions: {
        prependData: '$maxWidth: ' + process.env.MAX_WIDTH + ';'
    },
    experimental: {
        scrollRestoration: true
    }
};
