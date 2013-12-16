Player = function(game) {
  Tile.call(this, '@');

  this.game = game;

  this.speed = 10;

  this.light = new Light(this.game, 0, 0, [155, 155, 155], 0.7, 3, 5);
  this.game.map.addLight(this.light);

  this.setFrontColor([255, 0, 255]);
  this.lit = false;

  this.duration = 0;
  this.cooldown = 0;

  this.fades = [];

  this.sounds = {
    takeDamage: new Sound(this.game, 'js/assets/playerTakeDamage', ['wav'], 1, false),
    speedBoost: new Sound(this.game, 'js/assets/playerSpeedBoost', ['wav'], 1, false),
    death: new Sound(this.game, 'js/assets/playerDeath', ['wav'], 1, false),
  }

  this.dir = { x: 0, y: 0 };

  this.health = 10;

  this.item = Player.BOOTS;

  this.effects = {
    blink: new Tile.Effect(this, 3, this.game.effects.blink)
  }
}

Player.prototype = Object.create(Tile.prototype);

Player.SWORD = 1;
Player.SHIELD = 2;
Player.BOOTS = 3;
Player.LUTE = 4;

Player.prototype.update = function(delta) {
  var moveUpKey = this.game.keyboard.getKey(Keyboard.UP);
  var moveDownKey = this.game.keyboard.getKey(Keyboard.DOWN);
  var moveLeftKey = this.game.keyboard.getKey(Keyboard.LEFT);
  var moveRightKey = this.game.keyboard.getKey(Keyboard.RIGHT);
  var menuKey = this.game.keyboard.getKey(Keyboard.ESC)

  this.cooldown -= delta;
  this.duration -= delta;

  for(var key in this.sounds) {
    this.sounds[key].update(delta);
  }

  for(var key in this.effects) {
    this.effects[key].update(delta);
  }

  for(var i = 0; i < this.fades.length; i++) {
    if(!this.fades[i].done) {
      this.fades[i].update(delta);
    }
    else {
      this.game.map.removeEntity(this.fades[i]);
      this.fades.splice(i, 1)
    }
  }

  if(moveUpKey.pressed) {
    if(this.game.map.getTile(this.x, this.y - 1).walkable) {
      this._y -= this.speed * delta;
      this.dir.y = -1;
    }
  }
  if(moveDownKey.pressed) {
    if(this.game.map.getTile(this.x, this.y + 1).walkable) {
      this._y += this.speed * delta;
      this.dir.y = 1;
    }
  }
  if(moveLeftKey.pressed) {
    if(this.game.map.getTile(this.x - 1, this.y).walkable) {
      this._x -= this.speed * delta;
      this.dir.x = -1;
    }
  }
  if(moveRightKey.pressed) {
    if(this.game.map.getTile(this.x + 1, this.y).walkable) {
      this._x += this.speed * delta;
      this.dir.x = 1;
    }
  }

  if(this.item == Player.SWORD) {
    this.swordUpdate(delta);
  }
  else if(this.item == Player.SHIELD) {
    this.shieldUpdate(delta);
  }
  else if(this.item == Player.BOOTS) {
    this.bootsUpdate(delta);
  }
  else if(this.item == Player.LUTE) {
    this.luteUpdate(delta);
  }

  if(menuKey.hit) {
    this.game.changeState(Game.MENU);
    this.game.menu.update(delta);
    this.game.menu.setSelected(this.game.menu.resumeButton);
  }

  this.x = Math.round(this._x);
  this.y = Math.round(this._y);

  var currentTile = this.game.map.getMapTile(this.x, this.y);
  if(currentTile instanceof Floor) {
    if(this.item == Player.BOOTS && this.duration > 0) {
      currentTile.highlight([245, 55, 58], 2);
    }
    else {
      currentTile.highlight([200, 200, 200], 1);
    }
  }

  this.light.setPosition(this.x, this.y);
}

Player.prototype.takeDamage = function(amount) {
  this.health -= amount;
  this.effects.blink.restart();
  this.sounds.takeDamage.start();

  if(this.health <= 0) {
    this.sounds.death.start();
  }
}

Player.prototype.swordUpdate = function(delta) {
  var actionKey = this.game.keyboard.getKey(Keyboard.SPACE);

  if(actionKey.hit && this.cooldown < 0) {
    this.cooldown = 0.5;

    var swordColor = [39, 187, 232]

    fade = new Fade(this.game, this.x, this.y - 1, 0.005, swordColor);
    fade.dissipate = 0;
    fade.relativeTo = this;
    fade.offset = { x: 0, y: -1 }
    this.fades.push(fade);
    this.game.map.addEntity(fade);

    fade = new Fade(this.game, this.x + 1, this.y, 0.005, swordColor);
    fade.dissipate = -0.1;
    fade.visible = false;
    fade.relativeTo = this;
    fade.offset = { x: 1, y: 0 }
    this.fades.push(fade);
    this.game.map.addEntity(fade);

    fade = new Fade(this.game, this.x, this.y + 1, 0.005, swordColor);
    fade.dissipate = -0.2;
    fade.visible = false;
    fade.relativeTo = this;
    fade.offset = { x: 0, y: 1 }
    this.fades.push(fade);
    this.game.map.addEntity(fade);
  }
}

Player.prototype.shieldUpdate = function(delta) {
  var actionKey = this.game.keyboard.getKey(Keyboard.SPACE);

  if(actionKey.hit && this.cooldown < 0) {
    console.log('clank');
  }
}

Player.prototype.bootsUpdate = function(delta) {
  var actionKey = this.game.keyboard.getKey(Keyboard.SPACE);

  if(actionKey.hit && this.cooldown < 0) {
    this.sounds.speedBoost.start();
    this.speed = 25;
    this.duration = 0.75;
    this.cooldown = 2;
  }

  if(this.duration <= 0) {
    this.speed = 10;
  }
}

Player.prototype.luteUpdate = function(delta) {
  var actionKey = this.game.keyboard.getKey(Keyboard.SPACE);

  if(actionKey.hit && this.cooldown < 0) {
    console.log('thwang');
  }

}