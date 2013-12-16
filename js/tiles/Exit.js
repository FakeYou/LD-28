Exit = function(game) {
  Tile.call(this, '∩')

  this.game = game;
  this.walkable = true;

  this.setFrontColor([146, 238, 67]);
}

Exit.prototype = Object.create(Tile.prototype);

Exit.prototype.update = function(delta) {
  if(this.x == this.game.player.x && this.y == this.game.player.y) {
    this.game.nextLevel();
  }
}