Floor = function(game) {
  Tile.call(this, '·')

  this.game = game;
  this.walkable = true;

  this.setFrontColor([100, 100, 100]);

  this.baseColor = Color().rgb([100, 100, 100]);
  this.highlightColor = Color().rgb([100, 100, 100]);
  this.duration = 0;
  this.playtime = 0;
}

Floor.prototype = Object.create(Tile.prototype);

Floor.prototype.update = function(delta) {
  this.playtime -= delta;
  if(this.playtime > 0) {
    var intensity = this.playtime / this.duration;

    var color = this.baseColor.clone().mix(this.highlightColor, intensity);
    this.setFrontColor(color.rgbArray())
  }
  else {
    this.setFrontColor(this.baseColor.rgbArray());
  }
}

Floor.prototype.highlight = function(color, duration) {
  this.highlightColor = Color().rgb(color);
  this.duration = duration;
  this.playtime = duration;
}