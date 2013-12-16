Light = function(game, x, y, color, intensity, radius, dropoff) {
  this.x = x;
  this.y = y;

  this.intensity = intensity;
  this.radius = radius;
  this.dropoff = dropoff;

  this.color = this.setColor(color);
}

Light.prototype.getLight = function(x, y) {
  var distance = this.distanceFrom(x, y);

  // if(distance > this.radius + this.dropoff + 1) {
  //   return false
  // }

  var light = this.currentColor.clone();
  var multiplier = (distance - this.radius) / this.dropoff;

  if(multiplier > 1) {
    multiplier = 1;
  }
  if(multiplier < 0) {
    multiplier = 0;
  }

  //light.lighten(multiplier);
  light.clearer(multiplier);
  light.clearer(1 - this.intensity)

  return light
}

Light.prototype.distanceFrom = function(x, y) {
  var dx = Math.abs(this.x - x);
  var dy = Math.abs(this.y - y);

  return Math.sqrt(dx * dx + dy * dy);
}

Light.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;

  this._x = x;
  this._y = y;
}

Light.prototype.setColor = function(color) {
  this.color = Color().rgb(color);
  this.currentColor = Color().rgb(color);
}

/*
Light.prototype.getColor = function() {
  return this.currentColor.rgbString();
}
*/