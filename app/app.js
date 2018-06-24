var fs = require("fs");
var Discord = require("discord.js");
var Poll = require("./tools/poll.js");

function wait(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

var polls = [];

var bot = new Discord.Client();

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}`);
});

bot.on("message", msg => {
    var check_bot = true;

    var response = false;
    var options = {};
    var type_speed = 70;

    if(msg.content == "Ardilla!" && msg.author.bot){
        check_bot = false;
        response = "¿¡QUIEN ERES!?";
    }

    //Ignore messages if come from a bot
    if(msg.author.bot && check_bot) return;

    var matches;

    if(matches = msg.content.match(/^poll:(.*)\n((?:.|\n)*)/i)){
        //Create new Poll
        type_speed = 0;
        var title = matches[1].trim();
        var options = matches[2].trim().split("\n");
        polls.push(new Poll.Poll(title, options));
        var id = polls.length - 1;

        response = `Ecuesta #${id}:\n`;
        response += polls[id].getVoteMessage();
    }else if(matches = msg.content.match(/^vote: *(\d*) *(\d*)$/i)){
        //Vote for a poll
        type_speed = 0;
        var poll = matches[1];
        var option = matches[2];
        if(!polls[poll] || !polls[poll].options[option]) return;
        polls[poll].vote(msg.author.username, option);
        response = `${msg.author.username} ha votado ${polls[poll].options[option]} para ${polls[poll].question}`;
        console.log(response);
    }else if(matches = msg.content.match(/^show: *(\d*)$/i)){
        //Show a poll with results
        type_speed = 0;
        var poll = matches[1];
        if(!polls[poll]) return;
        response = `Ecuesta #${poll}:\n`;
        response += polls[poll].getVoteMessage(true);
    }else if(matches = msg.content.match(/^end: *(\d*)$/i)){
        //End poll and show results
        type_speed = 0;
        var poll = matches[1];
        if(!polls[poll]) return;
        response = "Encuesta finalizada!\n";
        response += `Ecuesta #${poll}:\n`;
        response += polls[poll].getVoteMessage(true);
        polls[poll] = undefined;
    }else if(msg.content.match(/h?alfonso,? la cerveza/i)){
        response = msg.author.username === "Francisco" ? "Aquí tienes mi señor :beer:" : "Tu callate, blanquito de mierda";
    }
    else if(msg.content.match(/honor/i)){
        response = "honir*";
    }
    else if(msg.content.match(/negr[o0]+!*/i)){
        response = "Como el chocolate";
    }else if(msg.content.match(/^tts$|^titt?ies$/i)){
        response = "Titties";
        options.tts = true;
    }

    if(response){
        msg.channel.startTyping();
        wait(response.length*type_speed).then(() => msg.channel.send(response, options))
            .then(() => console.log)
            .then(() => msg.channel.stopTyping(true))
            .catch(() => console.error);
    }
});

fs.readFile("token", "utf8", (error, token) => bot.login(token.trim()));

console.log("done");
