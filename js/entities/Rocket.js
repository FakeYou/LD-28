Rocket = function(game) {
  Entity.call(this, '⊸')

  this.game = game;
  this.setFrontColor([255, 255, 255]);
  this.speed = 25;

  this.exploded = false;

  this.trail = new Rocket.Trail(game, this);
  this.game.map.addEntity(this.trail);

  this.light = new Light(this.game, 0, 0, [237, 130, 15], 1, 3, 5);
  this.game.map.addLight(this.light);

  this.smokes = [];
}

Rocket.prototype = Object.create(Entity.prototype);

Rocket.prototype.update = function(delta) {
  this._x += this.speed * delta;

  for(var i = 0; i < this.smokes.length; i++) {
    this.smokes[i].update(delta);
  }

  if(this.exploded) {
    return;
  }

  if(chance.bool({ likelihood: 35 }) && true) {
    var smoke = new Smoke(this.game);
    smoke.setPosition(this.x, this.y);
    this.game.map.addEntity(smoke);
    this.smokes.push(smoke);

    smoke.x += Math.round(chance.floating({ min: -0.6, max: 0.6 }));
    smoke.y += Math.round(chance.floating({ min: -0.6, max: 0.6 }));
  }

  if(this.game.map.getTile(Math.round(this._x), Math.round(this._y)).walkable) {
    this.x = Math.round(this._x);
    this.y = Math.round(this._y);
  }
  else {
    this._x = this.x;
    this.exploded = true;
    this.game.map.removeEntity(this);
    this.game.map.removeEntity(this.trail);
    this.game.map.removeLight(this.light);
  }

  this.trail.update(delta);
  this.light.setPosition(this.x, this.y);
}

Rocket.Trail = function(game, rocket) {
  Entity.call(this, '>');

  this.game = game;
  this.rocket = rocket;
  this.setFrontColor([247, 69, 9]);

  this.colors = [
    [247, 69, 9],
    [236, 81, 20],
    [238, 172, 18],
    [245, 205, 111],
  ]
}

Rocket.Trail.prototype = Object.create(Entity.prototype);

Rocket.Trail.prototype.update = function(delta) {
  this.setFrontColor(chance.pick(this.colors));

  this.x = this.rocket.x - 1;
  this.y = this.rocket.y;
}