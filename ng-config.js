const fs = require('fs');
const path = require('path');

let file = 'environment.ts'; 
let prodFile = 'environment.prod.ts'; 
let directory = './client/src/environments';
let env = {
  production: false,
  key: process.env.key
};
if(!fs.existsSync(directory)){
  console.log('Environments directory doesn\'t exist. Creating directory.');
  fs.mkdirSync(directory);
}
console.log('Creating environments.ts');
let setVar = () => {
  return `export const environment = ${JSON.stringify(env,null, 2)};`;
}
fs.writeFileSync(`${directory}/${file}`, setVar());
env.production= true;
fs.writeFileSync(`${directory}/${prodFile}`, setVar());