Tile = function(character, x, y) {
  this.character = character;
  this.x = x;
  this.y = y;

  this._x = this.x;
  this._y = this.y;

  this.visible = true;
  this.walkable = true;

  this.frontColor = Tile.GREY;
  this.backColor = [0, 0, 0];

  this.currentFrontColor = this.frontColor;
  this.currentBackColor = this.backColor;
}

Tile.BLACK = [0, 0, 0];
Tile.GREY = [100, 100, 100];

Tile.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;

  this._x = x;
  this._y = y;
}

Tile.prototype.setFrontColor = function(color) {
  this.frontColor = color;
  this.currentFrontColor = this.frontColor;
}

Tile.prototype.getFrontColor = function() {
  var colors = [];

  for(var i = 0; i < this.currentFrontColor.length; i++) {
    colors.push(Math.round(this.currentFrontColor[i]));
  }

  return 'rgb(' + colors.join(',') + ')';
}

Tile.prototype.setBackColor = function(color) {
  this.backColor = color;
  this.currentBackColor = this.backColor;
}

Tile.prototype.getBackColor = function() {
  var colors = [];

  for(var i = 0; i < this.currentBackColor.length; i++) {
    colors.push(Math.round(this.currentBackColor[i]));
  }

  return 'rgb(' + colors.join(',') + ')';
}

Tile.prototype.clone = function() {
  var clone = new Tile(this.character, 0, 0);
  clone.visible = this.visible;
  clone.walkable = this.walkable;
  clone.frontColor = this.frontColor;
  clone.backColor = this.backColor;

  return clone;
}

Tile.Effect = function(tile, duration, effect) {
  this.tile = tile;
  this.duration = duration;
  this.playtime = 0;
  this.playing = false;

  this.effect = effect;

  this.before = effect.before || function() { };
  this.during = effect.during || function() { };
  this.after = effect.after || function() { };
}

Tile.Effect.prototype.start = function() {
  this.before();
  this.playing = true;
}

Tile.Effect.prototype.restart = function() {
  this.playtime = 0;
  this.start();
}

Tile.Effect.prototype.update = function(delta) {
  if(!this.playing) {
    return;
  }

  this.playtime += delta;

  if(this.playtime >= this.duration) {
    this.playing = false
    this.after();
    return;
  }

  this.during(delta);
}

Tile.Effect.prototype.clone = function() {
  var clone = new Tile.Effect(this.tile, this.duraction, this.effect);

  return clone;
}