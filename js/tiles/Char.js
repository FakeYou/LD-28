Char = function(game, character) {
  Tile.call(this, character)

  this.game = game;

  this.setFrontColor([0, 0, 0]);
}

Char.prototype = Object.create(Tile.prototype);

Char.prototype.update = function(delta) {
}