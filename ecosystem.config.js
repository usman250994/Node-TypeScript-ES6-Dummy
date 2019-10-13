const deploymentCommons = {
    // Path the the .pem file that allows you ssh into the machine
    key: 'BlaBlaBla',
    // username that is used when doing ssh
    user: 'ubuntu',
    // hostname of the server, could be an IP
    host: ['BlaBlaBla'],
    // git repository url.
    repo: 'BlaBlaBla'
  };
  
  const appCommons = {
    script: 'dist/index.js',
    instances: 1, // TODO: We need to have this equal to the number of cores.
    autorestart: true,
    max_memory_restart: '7677M',
    // For logging we will use winston, and manage logs
    // manually.
    //output: '/dev/null',
    //error: '/dev/null',
    //log: '/dev/null'
  };
  
  module.exports = {
    apps: [
      {
        ...appCommons,
        name: 'BlaBlaBla',
        env: {
          NODE_ENV: 'production',
          PORT: 3000
        }
      }, {
        ...appCommons,
        name: 'BlaBlaBla',
        env: {
          NODE_ENV: 'production',
          PORT: 5000
        }
      }],
  
    deploy: {
      // Our production deployment will be using the master branch.
      // This is supposed to be the most stable branch.
      production: {
        ...deploymentCommons,
        // For the production version of the app we will use
        // the master branch.
        ref: 'origin/master',
        // The path for the folder that has the production branch checked out.
        path: 'BlaBlaBla',
        // Command to run after the pull is complete.
        // NOTE: After npm install we do a git reset so that the changes made to
        // package.json and package-lock.json are removed. This is a work around
        // because if these changes stay there then the next deployment does not work fine.
        'post-deploy': 'npm install && npm run compile && git reset --hard HEAD && pm2 reload ecosystem.config.js --only blablabla-api-server-production',
        //'pre-deploy-local' : "scp -i ~/BlablablaKeyPair.pem .env ubuntu@ec2-13-235-137-61.ap-south-1.compute.amazonaws.com:/home/ubuntu/blablabla-backend-prod/current/.env"
      },
      // Our edge deployment will be using the dev branch, and it
      // will have the latest features.
      development: {
        // Command to run after the pull is complete.
        ...deploymentCommons,
        // For edge we will use the dev branch.
        ref: 'origin/dev',
        // The path for the folder that has the dev branch checked out.
        path: 'BlaBlaBla',
        // Command to run after the pull is complete.
        // NOTE: After npm install we do a git reset so that the changes made to
        // package.json and package-lock.json are removed. This is a work around
        // because if these changes stay there then the next deployment does not work fine.
        'post-deploy': 'npm install && npm run compile && git reset --hard HEAD && pm2 reload ecosystem.config.js --only blablabla-api-server-development',
        //'pre-deploy-local' : "scp -i ~/BlablablaKeyPair.pem .env ubuntu@ec2-13-235-137-61.ap-south-1.compute.amazonaws.com:/home/ubuntu/blablabla-backend-dev/current/.env"
      }
    }
  };
  