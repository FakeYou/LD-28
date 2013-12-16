Clear = function(game) {
  Tile.call(this, ' ')

  this.game = game;
  this.walkable = false;

  this.setFrontColor([0, 0, 0]);
}

Clear.prototype = Object.create(Tile.prototype);

Clear.prototype.update = function(delta) {
}