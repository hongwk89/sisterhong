require('dotenv').config({ path: 'config/.env' });
require('dotenv').config({ path: 'config/.env' + '.' + process.env.APP_ENV });

module.exports = {
    apps: [
        {
            name: process.env.APP_ENV + '-front',
            cwd: './',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p ' + process.env.PORT,
            exec_mode: 'cluster',
            instances: process.env.INSTANCES,
            autorestart: true,
            listen_timeout: 50000, // 앱 실행 신호까지 기다릴 최대 시간. ms 단위.
            kill_timeout: 5000, // 새로운 프로세스 실행이 완료된 후 예전 프로세스를 교체하기까지 기다릴 시간
            time: true,
            error_file: 'deployment/logs/error.log'
        }
    ]
};
