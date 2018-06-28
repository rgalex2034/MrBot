var fetch = require("node-fetch");

var provider = {
    init: function(options){
        this.key = options.key;
        this.cx  = options.cx;
    },
    search: function(q, qnt){
        if(!this.key || !this.cx) return [{title: "No API key or Custom Search provided"}];
        return fetch(`https://www.googleapis.com/customsearch/v1?key=${this.key}&cx=${this.cx}&q=${q}`)
            .then(r => r.json())
            .then(data => {
                var results = [];
                for(var idx in data.items){
                    var result = data.items[idx];
                    if(!(qnt--)) break;
                    results.push({
                        title: result.title,
                        url: result.link,
                        desc: result.snippet
                    });
                }
                return results;
            });
    }
};

module.exports = provider;
