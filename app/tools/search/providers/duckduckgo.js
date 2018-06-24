var fetch = require("node-fetch");
var jsdom = require("jsdom");

var provider = {
    init: function(){
        console.log("Initializing duckduckgo");
    },
    search: function(q, qnt){
        console.log("Doing search");
        /*var headers = new FormData();
        headers.append("User-Agent", "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17");*/
        var headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"
        };
        return fetch("https://www.duckduckgo.com/html/?q="+q, {headers: headers})
            .then(r => r.text())
            .then(text => {
                console.log("Search done!");
                results = getResults(text, qnt);
                return results;
            });
    }
};

function getResults(doc_text, qnt){
    console.log("Parsing HTML");
    var dom = new jsdom.JSDOM(doc_text);
    var web_results = dom.window.document.querySelectorAll(".result.results_links:not(.result--ad)");
    var results = [];
    if(web_results){
        for(var i = 0; i < web_results.length; i++){
            if(i == qnt) break;
            console.log("Processing result...");
            var web_res = web_results[i];
            var title = web_res.querySelector(".result__title .result__a").innerHTML;
            var url = web_res.querySelector(".result__title .result__a").getAttribute("href");
            var desc = web_res.querySelector(".result__snippet").innerHTML;
            results.push({title: title, url: url, desc: desc});
        }
    }
    console.log("Done!!");
    //return [{title: "Prueba", url: "https://www.google.com", desc: "Description test"}];
    return results;
}

module.exports = provider;
