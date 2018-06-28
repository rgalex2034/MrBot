function Poll(question, options){
    this.question = question;
    this.options = options;
    this.users = {};
}

Poll.prototype.vote = function(user, option){
    if(this.options[option]) this.users[user] = option;
};

Poll.prototype.getVotes = function(){
    var option_votes = this.options.map(o => {return{text: o, votes: 0}});
    for(var user in this.users){
        var opt = this.users[user];
        option_votes[opt].votes++;
    }
    return option_votes;
};

Poll.prototype.getOptions = function(){
    return this.options;
}

Poll.prototype.getVoteMessage = function(show_votes){
    var msg = `#${this.question}\n`;
    var id = 0;
    for(option of this.options){
        var votes = show_votes ? this.getVotes()[id].votes : "";
        msg += `  ${id} - ${option} ${votes}\n`;
        id++;
    }
    return msg;
};

module.exports = {
    Poll: Poll
}
