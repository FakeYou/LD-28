Potion = function(game, x, y) {
  Entity.call(this, 'ტ', x, y)

  this.game = game;

  this.colors = [
    [140, 48, 91],
    [166, 60, 109],
    [191, 115, 157],
    [217, 137, 181],
    [242, 240, 240]
  ];

  this.color = chance.pick(this.colors);
  this.setFrontColor(this.color);

  this.sounds = {
    pickup: new Sound(this.game, 'js/assets/potionPickup', ['wav'], 1, false),
  }

  this.strength = 3;
  this.cooldown = 1;
}

Potion.prototype = Object.create(Entity.prototype);

Potion.prototype.update = function(delta) {
  this.cooldown -= delta;

  if(this.x == this.game.player.x && this.y == this.game.player.y) {
    this.game.player.health += 5;
    this.sounds.pickup.start();
    this.alive = false;
  }

  if(this.cooldown <= 0) {
    this.setFrontColor(chance.pick(this.colors))
    this.cooldown = 1;
  }
}