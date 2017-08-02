var Action = require('./action');

var actions = function(){
  this.actions = [];
};

actions.prototype.addAction = function(originId, targetId, actionType, teamId){
  for(var i = 0; i < this.actions.length; i++){
    if(this.actions[i].originId === originId){
      return false;
    };
  };

  this.actions.push(new Action(originId, targetId, actionType, teamId));
  return true;
};

actions.prototype.changeAction = function(originId, targetId, actionType, teamId){
  for(var i = 0; i < this.actions.length; i++){
    if(this.actions[i].originId === originId){
      this.actions[i].originId = originId;
      this.actions[i].targetId = targetId;
      this.actions[i].actionType = actionType;
      this.actions[i].teamId = teamId;
      return true;
    };
  };
  return false;
};

actions.prototype.removeAction = function(originId){
  for(var i = 0; i < this.actions.length; i++){
    if(this.actions[i].originId === originId){
      this.actions = this.actions.splice(i,1);
      return true;
    }
  };
  return false;
};

actions.prototype.clearActions = function(){
  this.actions = [];
};

module.exports = actions;