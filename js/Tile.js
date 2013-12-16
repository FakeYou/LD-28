Tile = function(character, x, y) {
  this.character = character;
  this.x = x;
  this.y = y;

  this._x = this.x;
  this._y = this.y;

  this.visible = true;
  this.walkable = true;

  this.lit = true;

  this.setFrontColor(Tile.PINK);
  this.setBackColor(Tile.BLACK);

  this.currentFrontColor = this.frontColor;
  this.currentBackColor = this.backColor;
}

Tile.BLACK = [0, 0, 0];
Tile.PINK = [255, 0, 255];
Tile.GREY = [100, 100, 100];

Tile.prototype.update = function(delta) {

}

Tile.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;

  this._x = x;
  this._y = y;
}

Tile.prototype.setFrontColor = function(color) {
  this.frontColor = Color().rgb(color);
  this.currentFrontColor = Color().rgb(color);
}

Tile.prototype.getFrontColor = function() {
  if(!this.lit || true) {
    return this.frontColor.rgbString();
  }

  var color = this.currentFrontColor.clone();
  color.alpha(0.2);

  var lights = this.game.map.getLights();
  var isLit = false;
  for(var i = 0; i < lights.length; i++) {
    var light = lights[i].getLight(this.x, this.y);
    var intensity = light.alpha() / 2;

    if(light) {
      color.mix(light, intensity);
      isLit = true;
    }
  }

  if(!isLit) {
    color.mix(Color({ r: 0, g: 0, b: 0}));
  }
  else {
    color.mix(this.currentFrontColor, 0.5)
  }

  return color.rgbString();
}

Tile.prototype.setBackColor = function(color) {
  this.backColor = Color().rgb(color);
  this.currentBackColor = Color().rgb(color);
}

Tile.prototype.getBackColor = function() {
  return this.currentBackColor.rgbString();

  var colors = [];

  for(var i = 0; i < this.currentBackColor.length; i++) {
    colors.push(Math.round(this.currentBackColor[i]));
  }

  return 'rgb(' + colors.join(',') + ')';
}

Tile.prototype.distanceFrom = function(x, y) {
  var dx = Math.abs(this.x - x);
  var dy = Math.abs(this.y - y);

  return Math.sqrt(dx * dx + dy * dy);
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