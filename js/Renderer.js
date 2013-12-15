Renderer = function(game, canvas, width, height) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.width = width;
  this.height = height;

  this.defaultBackColor = [0, 0, 0];

  this.updateStyle();
  this.canvas.width = this.width * this.textWidth;
  this.canvas.height = this.height * this.textHeight;
  this.updateStyle();

  this.buffer = [];

  for(var y = 0; y < this.width; y++) {
    var row = [];
    for(var x = 0; x < this.height; x++) {
      row.push(null);
    }
    this.buffer.push(row);
  }
}

Renderer.prototype.updateStyle = function() {
  style = window.getComputedStyle(this.canvas, null);

  this.ctx.font = style.fontSize + '/' + style.lineHeight + ' ' + style.fontFamily;
  this.ctx.textBaseline = 'middle';
  this.textWidth = this.ctx.measureText('M').width;
  this.textHeight = parseInt(style.fontSize, 10);
}

Renderer.prototype.fillBuffer = function() {
  var centerX = this.game.player.x;
  var centerY = this.game.player.y;

  var startX = centerX - Math.floor(this.width / 2);
  var startY = centerY - Math.floor(this.height / 2);

  for(var j = 0; j < this.height; j++) {
    for(var i = 0; i < this.width; i++) {
      var x = i + startX;
      var y = j + startY;

      this.buffer[j][i] = this.game.map.getTile(x, y);

      if(this.buffer[j][i] instanceof Player) {
        if(j != 10 || i != 10) {

          console.log(j, i)
        }
      }
    }
  }
}

// [todo] - render tiles in groups of equal colors
Renderer.prototype.render = function() {
  this.ctx.fillStyle = this.getDefaultBackColor();
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  for(var y = 0; y < this.buffer.length; y++) {
    var row = this.buffer[y];
    for(var x = 0; x < row.length; x++) {
      this.renderTile(x, y);
    }
  }
}

Renderer.prototype.renderTile = function(x, y) {
  var tile = this.buffer[y][x];

  if(tile == null) {
    return;
  }

  var x = x * this.textWidth;
  var y = y * this.textHeight;
  var yBaseLine = (this.textHeight * 0.5)

  // background
  if(this.getDefaultBackColor() != tile.getBackColor()) {
    this.ctx.fillStyle = tile.getBackColor();
    this.ctx.fillRect(x, y, this.textWidth, this.textHeight)
  }

  // character
  this.ctx.fillStyle = tile.getFrontColor();
  this.ctx.fillText(tile.character, x, y + yBaseLine);
}

Renderer.prototype.getDefaultBackColor = function() {
  var color = this.defaultBackColor.join(',');
  return 'rgb(' + color + ')';
}