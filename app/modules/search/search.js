var providers = require("./providers.js");

function Search(provider = null){
    if(provider) this.setProvider(provider);
}

Search.providers = providers;

Search.getInstance = function(provider_name, options = {}){
    var search = new Search();
    var providerjs = Search.providers[provider_name];
    if(providerjs){
        var provider = require("./providers/"+providerjs);
        provider.init(options);
        search.setProvider(provider);
    }
    return search;
};

Search.prototype.setProvider = function(provider){
    this.provider = provider;
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
