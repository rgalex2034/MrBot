var providers = require("./providers.js");
var options = require("./config.json");

function Search(){
}

Search.providers = providers;

Search.getInstance = function(provider_name){
    var search = new Search();
    var providerjs = Search.providers[provider_name];
    if(providerjs){
        var provider = require("./providers/"+providerjs);
        var op = options[provider_name] || {};
        search.setProvider(provider, op);
    }
    return search;
};

Search.prototype.setProvider = function(provider, options = {}){
    this.provider = provider;
    this.provider.init(options);
};

Search.prototype.search = function(q, qnt = 3){
    return Promise.resolve(this.provider.search(q, qnt)).then(results => {
        return results.map(r => new Search.Result(r.title, r.desc, r.url, r.thumb));
    });

};

Search.Result = function(title, desc, url, thumb = null){
    this.title = title;
    this.desc = desc;
    this.url = url;
    this.thumb = thumb;
};

Search.Result.prototype.toString = function(){
    return `**${this.title}**\n*<${this.url}>*\n${this.desc}`;
};

module.exports = Search;
