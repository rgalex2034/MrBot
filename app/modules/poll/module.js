var Poll = require("./poll.js");

var polls = [];

module.exports = {
    init: function(bot){
        bot.on("message", msg => {

            let matches;
            let response;

            if(matches = msg.content.match(/^poll:(.*)\n((?:.|\n)*)/i)){
                //Create new Poll
                var title = matches[1].trim();
                var options = matches[2].trim().split("\n");
                polls.push(new Poll.Poll(title, options));
                var id = polls.length - 1;

                response = `Ecuesta #${id}:\n`;
                response += polls[id].getVoteMessage();
            }else if(matches = msg.content.match(/^vote: *(\d*) *(\d*)$/i)){
                //Vote for a poll
                var poll = matches[1];
                var option = matches[2];
                if(!polls[poll] || !polls[poll].options[option]) return;
                polls[poll].vote(msg.author.username, option);
                response = `${msg.author.username} ha votado ${polls[poll].options[option]} para ${polls[poll].question}`;
                console.log(response);
            }else if(matches = msg.content.match(/^show: *(\d*)$/i)){
                //Show a poll with results
                var poll = matches[1];
                if(!polls[poll]) return;
                response = `Ecuesta #${poll}:\n`;
                response += polls[poll].getVoteMessage(true);
            }else if(matches = msg.content.match(/^end: *(\d*)$/i)){
                //End poll and show results
                var poll = matches[1];
                if(!polls[poll]) return;
                response = "Encuesta finalizada!\n";
                response += `Ecuesta #${poll}:\n`;
                response += polls[poll].getVoteMessage(true);
                polls[poll] = undefined;
            }

            if(response){
                msg.channel.send(response)
                    .then(() => console.log)
                    .catch(() => console.error);
            }
        });
    }
};
