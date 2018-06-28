var fs = require("fs");
var path = require("path");
var Discord = require("discord.js");
var modules = require("./modules.json");

function wait(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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

fs.readFile("token", "utf8", (error, token) => bot.login(token.trim()));

console.log("done");
