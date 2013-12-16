Player = function(game, x, y) {
  Tile.call(this, '@', x, y);

  this.game = game;

  this.speed = 10;
  this.health = 10;
  this.damage = 2;
  this.alive = true;

  this.setFrontColor([255, 0, 255]);
  this.lit = false;

  this.duration = 0;
  this.cooldown = 0;

  this.fades = [];

  this.sounds = {
    takeDamage: new Sound(this.game, 'js/assets/playerTakeDamage', ['wav'], 1, false),
    speedBoost: new Sound(this.game, 'js/assets/playerSpeedBoost', ['wav'], 1, false),
    death: new Sound(this.game, 'js/assets/playerDeath', ['wav'], 1, false),
    swordSwing: new Sound(this.game, 'js/assets/playerSwordSwing', ['wav'], 1, false),
  }

  this.dir = { x: 1, y: 0 };
  this.spawn = { x: this.x, y: this.y };

  this.item = null;

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
    if(this.fades[i].done) {
      this.game.map.removeEntity(this.fades[i]);
      this.fades.splice(i, 1)
    }
  }

  var dir = { x: 0, y: 0 }
  var moved = false;

  if(moveUpKey.pressed) {
    if(this.game.map.getTile(this.x, this.y - 1).walkable) {
      this._y -= this.speed * delta;
      dir.y = -1;
      moved = true;
    }
  }
  if(moveDownKey.pressed) {
    if(this.game.map.getTile(this.x, this.y + 1).walkable) {
      this._y += this.speed * delta;
      dir.y = 1;
      moved = true;
    }
  }
  if(moveLeftKey.pressed) {
    if(this.game.map.getTile(this.x - 1, this.y).walkable) {
      this._x -= this.speed * delta;
      dir.x = -1;
      moved = true;
    }
  }
  if(moveRightKey.pressed) {
    if(this.game.map.getTile(this.x + 1, this.y).walkable) {
      this._x += this.speed * delta;
      dir.x = 1;
      moved = true;
    }
  }

  if(moved) {
    this.dir = dir;
  }
  else {
    //this.dir = { x: 0, y: 0 }
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
      currentTile.highlight([49, 194, 88], 2);
    }
    else {
      currentTile.highlight([200, 200, 200], 1);
    }
  }
}

Player.prototype.respawn = function() {
  this.setPosition(this.spawn.x, this.spawn.y);
  this.health = 10;
  this.duration = 0;
  this.cooldown = 0;
  this.speed = 10;
  this.health = 10;
  this.damage = 2;
  this.alive = true;
  this.setFrontColor([255, 0, 255]);
}

Player.prototype.takeDamage = function(amount) {
  this.health -= amount;
  this.effects.blink.restart();
  this.sounds.takeDamage.start();

  if(this.health <= 0) {
    this.sounds.death.start();
    //this.game.map.loadMap(this.game.map.map);
    this.respawn();
  }
}

Player.prototype.swordUpdate = function(delta) {
  var actionKey = this.game.keyboard.getKey(Keyboard.SPACE);

  if(actionKey.hit && this.cooldown < 0) {
    var swordColor = [39, 187, 232]
    var fades = [];
    var hits = [];

    this.sounds.swordSwing.start();
    this.cooldown = 0.5;

    if(this.dir.x == 0 && this.dir.y == -1) { // top-middle
      fades = [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }]
    }

    if(this.dir.x == 1 && this.dir.y == -1) { // top-right
      fades = [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }]
    }

    if(this.dir.x == 1 && this.dir.y == 0) { // center-right
      fades = [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
    }

    if(this.dir.x == 1 && this.dir.y == 1) { // bottom-right
      fades = [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
    }

    if(this.dir.x == 0 && this.dir.y == 1) { // bottom-middle
      fades = [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }]
    }

    if(this.dir.x == -1 && this.dir.y == 1) { // bottom-left
      fades = [{ x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }]
    }

    if(this.dir.x == -1 && this.dir.y == 0) { // center-left
      fades = [{ x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }]
    }

    if(this.dir.x == -1 && this.dir.y == -1) { // top-left
      fades = [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }]
    }

    for(var i = 0; i < fades.length; i++) {
      var x = fades[i].x;
      var y = fades[i].y;

      var fade = new Fade(this.game, this.x + x, this.y + y, 0.005, swordColor);
      fade.dissipate = -0.1 * i;
      fade.visible = false;
      fade.relativeTo = this;
      fade.offset = { x: x, y: y };
      this.fades.push(fade);
      this.game.map.addEntity(fade);

      var mob = this.game.map.getMob(this.x + x, this.y + y);
      if(mob) {
        mob.takeDamage(this.damage)
      }
    }
  }
}

Player.prototype.shieldUpdate = function(delta) {
  var actionKey = this.game.keyboard.getKey(Keyboard.SPACE);

  if(actionKey.hit && this.cooldown < 0) {
    var shieldColor = [193, 63, 244]
    var fades = [];
    var hits = [];

    //this.sounds.swordSwing.start();
    this.cooldown = 2;

    if(this.dir.x == 0 && this.dir.y == -1) { // top-middle
      fades = [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }]
    }

    if(this.dir.x == 1 && this.dir.y == -1) { // top-right
      fades = [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }]
    }

    if(this.dir.x == 1 && this.dir.y == 0) { // center-right
      fades = [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
    }

    if(this.dir.x == 1 && this.dir.y == 1) { // bottom-right
      fades = [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
    }

    if(this.dir.x == 0 && this.dir.y == 1) { // bottom-middle
      fades = [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }]
    }

    if(this.dir.x == -1 && this.dir.y == 1) { // bottom-left
      fades = [{ x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }]
    }

    if(this.dir.x == -1 && this.dir.y == 0) { // center-left
      fades = [{ x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }]
    }

    if(this.dir.x == -1 && this.dir.y == -1) { // top-left
      fades = [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }]
    }

    for(var i = 0; i < fades.length; i++) {
      var x = fades[i].x;
      var y = fades[i].y;

      var fade = new Fade(this.game, this.x + x, this.y + y, 0.5, shieldColor);
      fade.walkable = false;
      this.fades.push(fade);
      this.game.map.addEntity(fade);
    }
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