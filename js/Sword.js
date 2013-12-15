Sword = function(game) {
  Tile.call(this, '│')

  this.game = game;

  this.setFrontColor([0, 255, 255]);

  this.direction = { x: 0, y: -1 }
}

Sword.prototype = Object.create(Tile.prototype);

Sword.prototype.update = function(delta) {
  this.x = this.game.player.x + this.direction.x;
  this.y = this.game.player.y + this.direction.y;

  if(this.direction.x == 0) {
    this.character = '│';
  }

  if(this.direction.y == 0) {
    this.character = '─';
  }
}