function wait(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
    init: function(bot){

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

            if(msg.content.match(/h?alfonso,? la cerveza/i)){
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
    }
};
