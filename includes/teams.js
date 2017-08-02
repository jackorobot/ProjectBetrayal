var Team = require('./team');

var teams = function(){
  this.teams = [];
};

teams.prototype.addTeam = function(id, naam, color){
  for(var i = 0; i < this.teams.length; i++){
    if(this.teams[i].id === id){
      return false;
    }
  }

  this.actions.push(new Team(id, name, color));
  return true;
};

teams.prototype.changeTeam = function(id, name, color){
  for(var i = 0; i < this.actions.length; i++){
    if(this.teams[i].id === id){
      this.teams[i].id = id;
      this.teams[i].name = name;
      this.teams[i].color = color;
      return true;
    }
  }
  return false;
};

teams.prototype.removeTeam = function(teamId){
  for(var i = 0; i < this.teams.length; i++){
    if(this.teams[i].id === teamId){
      this.teams = this.teams.splice(i, 1);
      return true;
    }
  }
  return false;
};

module.exports = teams;