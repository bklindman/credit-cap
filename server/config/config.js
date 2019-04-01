var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  try{
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
      if(!process.env[key]){
        process.env[key] = envConfig[key];
      }
    });
  }catch(e){}
}