Bat = function(game, x, y) {
  Tile.call(this, 'v', x, y);

  this.game = game;

  this.speed = 5;
  this.damage = 1;
  this.cooldown = 0;

  this.health = 5;

  this.effects = {
    blink: new Tile.Effect(this, 3, this.game.effects.blink)
  }

  this.sounds = {
    attack: new Sound(this.game, 'js/assets/batAttack', ['wav'], 1, false)
  }

  this.setFrontColor([0, 255, 255]);
  this.lit = false;

  this.target = { x: x, y: y };
  this.dir = { x: x, y: y };
}

Bat.prototype = Object.create(Tile.prototype);

Bat.prototype.update = function(delta) {
  var playerX = this.game.player.x;
  var playerY = this.game.player.y;

  this.cooldown -= delta;

  for(var key in this.sounds) {
    this.sounds[key].update(delta);
  }

  for(var key in this.effects) {
    this.effects[key].update(delta);
  }

  if(this.distanceFrom(playerX, playerY) < 8) {
    this.target.x = playerX;
    this.target.y = playerY;
  }
  else {
    //this.target.x = this.x + (chance.bool({ likelihood: 10 }) ? chance.integer({ min: -1, max: 1 }) : 0);
    //this.target.y = this.y + (chance.bool({ likelihood: 10 }) ? chance.integer({ min: -1, max: 1 }) : 0);
  }

  this.dir.x = 0;
  this.dir.y = 0;

  if(this.target.x > this.x) { this.dir.x = 1 }
  if(this.target.x < this.x) { this.dir.x = -1 }
  if(this.target.y > this.y) { this.dir.y = 1 }
  if(this.target.y < this.y) { this.dir.y = -1 }

  if(this.target.x != this.x || this.target.y != this.y) {
    if(this.game.map.getTile(this.x + this.dir.x, this.y).walkable) {
      this._x += this.speed * delta * this.dir.x;
    }

    if(this.game.map.getTile(this.x, this.y + this.dir.y).walkable) {
      this._y += this.speed * delta * this.dir.y;
    }
  }

  this.x = Math.round(this._x);
  this.y = Math.round(this._y);

  if(this.x == playerX && this.y == playerY && this.cooldown < 0) {
    this.game.player.takeDamage(this.damage);
    this.sounds.attack.start();
    this.cooldown = 1;
  }
}

Bat.prototype.takeDamage = function(amount) {

}