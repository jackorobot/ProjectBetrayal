var map = function(){
  this.cells = [];
};

map.prototype.generateMap = function(teams){

};

map.prototype.changeOwner = function(cellId, newOwnerId){
  //Find the cell ID, and save the newOwnerId in that one
  for (var i = 0; i < this.cells.length; ++i){
    if(this.cells[i].id === cellId){
      this.cells[i].ownderId = newOwnerId;
      return true;
    };
  };
  return false;
};

module.exports = map;