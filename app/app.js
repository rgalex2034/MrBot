var fs = require("fs");
var path = require("path");
var Discord = require("discord.js");
var config = require("./bot-config.json");
var modules = config.modules;

var bot = new Discord.Client();

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}`);

    if(!modules) modules = [];
    //Load modules
    for(let i = 0; i < modules.length; i++){
        let module_name = modules[i];
        let file;
        if(fs.existsSync(file = "./modules"+path.sep+module_name+path.sep+"module.js")){
            try{
                let module_obj = require(file);
                module_obj.init(bot);
                console.log(`Module loaded: ${module_name}`);
            }catch(error){
                console.log(`Unable to load module ${module_name}: ${error}\n`);
            }
        }else console.log(`Module not found: ${module_name}`);
    }

});

bot.login(config.token.trim());

console.log("done");
