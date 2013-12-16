Shield = function(game) {
  Tile.call(this, '-')

  this.game = game;

  this.setFrontColor([0, 255, 255]);
  this.lit = false;

  this.direction = { x: 0, y: -1 }
}

Shield.prototype = Object.create(Tile.prototype);

Shield.prototype.update = function(delta) {
  this.x = this.game.player.x + this.direction.x;
  this.y = this.game.player.y + this.direction.y;

  if(!this.game.map.getTile(this.x, this.y).walkable) {
    this.x = this.game.player.x;
    this.y = this.game.player.y;
  }

  if(this.direction.x == -1 && this.direction.y == -1) {
    this.character = '╭';
  }
  if(this.direction.x == 1 && this.direction.y == 1) {
    this.character = '╯';
  }
  if(this.direction.x == 1 && this.direction.y == -1) {
    this.character = '╮';
  }
  if(this.direction.x == -1 && this.direction.y == 1) {
    this.character = '╰';
  }
  if(this.direction.x == 0 && this.direction.y == -1) {
    this.character = '◠';
  }
  if(this.direction.x == 0 && this.direction.y == 1) {
    this.character = '◡';
  }
  if(this.direction.x == -1 && this.direction.y == 0) {
    this.character = '(';
  }
  if(this.direction.x == 1 && this.direction.y == 0) {
    this.character = ')';
  }
}