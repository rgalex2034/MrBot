var providers = require("./providers.js");

function Search(){
}

Search.providers = providers;

Search.getInstance = function(provider_name){
    console.log(Search.providers);
    var search = new Search();
    var providerjs = Search.providers[provider_name];
    if(providerjs){
        var provider = require("./providers/"+providerjs);
        search.setProvider(provider);
    }
    return search;
};

Search.prototype.setProvider = function(provider){
    this.provider = provider;
    this.provider.init();
};

Search.prototype.search = function(q, qnt = 3){
    return this.provider.search(q, qnt).then(results => {
        return results.map(r => new Search.Result(deleteTags(r.title), deleteTags(r.desc), r.url, r.thumb));
    });

};

Search.Result = function(title, desc, url, thumb = null){
    this.title = title;
    this.desc = desc;
    this.url = url;
    this.thumb = thumb;
};

Search.Result.prototype.toString = function(){
    return `**${this.title}**\n_<${this.url}>_\n${this.desc}`;
};

function deleteTags(text){
    return text.replace(/<[^>]+>/g, "");
};

module.exports = Search;
