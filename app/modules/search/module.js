var Search = require("./search.js");
var options = require("./config.json");

var cache = {};

module.exports = {
    init: function(bot){
        bot.on("message", msg => {

            let matches;

            if(matches = msg.content.match(/\?(\w+) (.+)/)){
                let provider = matches[1];
                let query = matches[2];
                let search;

                //Cache search with concrete provider instance
                if(cache[provider]){
                    //Get cached search
                    search = cache[provider];
                    console.log("Search is cached");
                }else{
                    let op = options[provider] || {};
                    search = Search.getInstance(provider, op);
                    if(!search.provider) return;
                    //Set search to cache
                    cache[provider] = search;
                    console.log("New search");
                }

                //Get results from searching query
                let results = search.search(query);
                response = results.then(r => {
                    return r.reduce((msg, el) => msg+el.toString()+"\n---\n", "");
                });

                //Send response if exists
                if(response){
                    Promise.resolve(response).then(response => {
                        if(!response) return;
                        msg.channel.send(response)
                            .then(() => console.log.bind(console))
                            .catch(err  => console.error(err));
                    });
                }

            }
        });
    }
};
