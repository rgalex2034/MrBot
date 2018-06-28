var Search = require("./search.js");
var options = require("./config.json");

module.exports = {
    init: function(bot){
        bot.on("message", msg => {

            let matches;

            if(matches = msg.content.match(/\?(\w+) (.+)/)){
                var provider = matches[1];
                var query = matches[2];
                var op = options[provider] || {};

                var search = Search.getInstance(provider, op);
                if(!search.provider) return;

                var results = search.search(query);
                response = results.then(r => {
                    return r.reduce((msg, el) => msg+el.toString()+"\n---\n", "");
                });

                if(response){
                    Promise.resolve(response).then(response => {
                        if(!response) return;
                        msg.channel.send(response)
                            .then(() => console.log)
                            .catch(() => console.error);
                    });
                }

            }
        });
    }
};
