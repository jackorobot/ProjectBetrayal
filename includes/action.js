var action = function(originId, targetId, actionType, team){
  this.originId = originId;
  this.targetId = targetId;
  this.actionType = actionType;
  this.team = team;
};

module.exports = action;