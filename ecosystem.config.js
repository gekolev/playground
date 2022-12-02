module.exports = {
    apps: [{
        name: 'starter9692',
        script: 'pm2 startOrReload ecosystem.config.js --env development',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'development'
        }
    }],

    deploy: {
        staging: {
            user: 'markorajevic',
            host: '157.230.26.43',
            ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
            ref: 'origin/master',
            repo: 'git@bitbucket.org:rbln7/contentful-starter-template.git',
            path: '/home/markorajevic/sites/contentful-starter-template/',
            'post-deploy': 'npm install && npm run build && pm2 restart starter9692'
        },
    }
};
