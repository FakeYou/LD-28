Floor = function(game) {
  Tile.call(this, '·')

  this.game = game;
  this.walkable = true;

  this.setFrontColor([100, 100, 100]);
}

Floor.prototype = Object.create(Tile.prototype);

Floor.prototype.update = function(delta) {
}