Smoke = function(game) {
  Entity.call(this, '█')

  this.characters = [' ', '░','▒','▓','█'];
  this.color = chance.integer({ min: 200, max: 230 });

  this.game = game;
  this.setFrontColor([this.color, this.color, this.color]);
  this.dissipate = 0;
}

Smoke.prototype = Object.create(Entity.prototype);

Smoke.prototype.update = function(delta) {
  this.dissipate += delta;

  if(chance.floating({ min: 0.25, max: 0.5}) < this.dissipate) {
    this.dissipate = 0;
    if(this.characters.length) {
      this.character = this.characters.pop();
    }
    else {
      this.game.map.removeEntity(this);
    }
  }

  this.currentFrontColor.darken(0.02);
}