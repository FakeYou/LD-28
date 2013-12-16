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

  this.dir = { x: 0, y: 0 };

  // this.corruption = new Tile.Effect(this, 2, {
  //   before: function() { },
  //   during: function() {
  //     if(Math.random() > this.playtime / this.duration) {
  //       this.tile.character = Math.random().toString(36).substr(7, 1);

  //       if(chance.bool({ likelihood: 50 })) {
  //         this.tile.currentFrontColor.negate();
  //       }
  //     }
  //   },
  //   after: function() {
  //     this.tile.character = '@'
  //     this.tile.currentFrontColor = this.tile.frontColor;
  //   }
  // });
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
    this.game.menu.setSelected(this.game.menu.restartButton);

    console.log(this.game.menu.buttons[0])
  }

  this.x = Math.round(this._x);
  this.y = Math.round(this._y);

  // this.sword.update(delta);
  // this.corruption.update(delta);
  this.light.setPosition(this.x, this.y);
}

Player.prototype.swordUpdate = function(delta) {
  var actionKey = this.game.keyboard.getKey(Keyboard.SPACE);

  this.setBackColor([0, 0, 0]);

  if(actionKey.hit && this.cooldown < 0) {
    this.cooldown = 0.5;
    this.setBackColor([255, 255, 255]);

    var right = this.game.map.getTile(this.x + 1, this.y);

    if(right instanceof Bat) {
      this.game.map.removeEntity(right);
    }
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
    console.log('woosh');
    this.speed = 25;
    this.duration = 1.5;
    this.cooldown = 4;
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