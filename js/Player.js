Player = function(game) {
  Tile.call(this, '@');

  this.game = game;

  this.sword = new Sword(this.game);
  this.game.map.addEntity(this.sword);

  this.speed = 10;

  this.setFrontColor([255, 0, 255]);

  this.corruption = new Tile.Effect(this, 2, {
    before: function() { },
    during: function() {
      if(Math.random() > this.playtime / this.duration) {
        this.tile.character = Math.random().toString(36).substr(7, 1);
      }
    },
    after: function() {
      this.tile.character = '@'
    }
  });
}

Player.prototype = Object.create(Tile.prototype);

Player.prototype.update = function(delta) {
  var moveUpKey = this.game.keyboard.getKey(Keyboard.UP);
  var moveDownKey = this.game.keyboard.getKey(Keyboard.DOWN);
  var moveLeftKey = this.game.keyboard.getKey(Keyboard.LEFT);
  var moveRightKey = this.game.keyboard.getKey(Keyboard.RIGHT);
  var actionKey = this.game.keyboard.getKey(Keyboard.SPACE);

  if(moveUpKey.pressed) {
    if(this.game.map.getTile(this.x, this.y - 1).walkable) {
      this._y -= this.speed * delta;
      this.sword.direction = { x: 0, y: -1 };
    }
  }
  if(moveDownKey.pressed) {
    if(this.game.map.getTile(this.x, this.y + 1).walkable) {
      this._y += this.speed * delta;
      this.sword.direction = { x: 0, y: 1 };
    }
  }
  if(moveLeftKey.pressed) {
    if(this.game.map.getTile(this.x - 1, this.y).walkable) {
      this._x -= this.speed * delta;
      this.sword.direction = { x: -1, y: 0 };
    }
  }
  if(moveRightKey.pressed) {
    if(this.game.map.getTile(this.x + 1, this.y).walkable) {
      this._x += this.speed * delta;
      this.sword.direction = { x: 1, y: 0 };
    }
  }

  if(actionKey.hit) {
    console.log(this.corruption);
    this.corruption.restart();
  }

  this.x = Math.round(this._x);
  this.y = Math.round(this._y);

  this.sword.update(delta);
  this.corruption.update(delta);
}