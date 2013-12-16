Entity = function(character, x, y) {
  Tile.call(this, character, x, y);

  this.direction = { x: 0, y: 0 }
  this.speed = 0;
}

Entity.prototype = Object.create(Tile.prototype);

Entity.prototype.update = function(delta) {
}