var cell = function (id, name, ownerId, neighbourdIds) {
  this.id = id;
  this.name = name;
  this.ownerId = ownerId;
  this.neighbourdIds = neighbourdIds;
};

module.exports = cell;