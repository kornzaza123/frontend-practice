
const devSite = require('../config/dev');
const devSite38 = require('../config/dev2');

console.log("env file",process.env.REACT_APP_START_PROJECT);
const _config = {
    development:devSite,
    development38:devSite38,
    
} 

// edit .env to development devSite on develop mode
// edit .env to production52 prod52Site on  productionmode
// edit .env to development78 prod78Site on test modes

export default Object.freeze(Object.assign({}, _config[process.env.REACT_APP_START_PROJECT].default));

 