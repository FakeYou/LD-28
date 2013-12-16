UI = function(game) {
  this.game = game;

  this.visible = false;

  this.elements = [];
  this._elementsLookup = {};
}

UI.prototype.addElement = function(element) {
  this.elements.push(element);
}

UI.prototype.getElement = function(x, y) {
  for(var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];

    if(!element.visible) {
      continue;
    }

    if(x >= element.x
      && x < element.x + element.width
      && y >= element.y
      && y < element.y + element.height) {
      return element;
    }
  }

  return null;
}

UI.prototype.removeElement = function(element) {
  var index = this.elements.indexOf(element);
  if(index != -1) {
    this.elements.splice(index, 1);
  }
}

UI.Element = function(ui, title, content, x, y, color, border) {
  this.ui = ui;

  this.title = title
  this._title = ' ' + title + ' ';

  this.content = content;
  this.border = true;

  if(typeof border == 'boolean') {
    this.border = border;
  }

  if(this.border) {
    this.width = this.content[0].length + 2;
    this.height = this.content.length + 2;
  }
  else {
    this.width = this.content[0].length;
    this.height = this.content.length;
  }

  this.x = x;
  this.y = y;
  this._x = x;
  this._y = y;

  this.color = color || [255, 0, 255];

  this.speed = 1;
  this.target = { x: x, y: y };

  this.tiles = [];

  this.visible = true;

  this.buildTiles();
}

UI.Element.prototype.update = function(delta) {
  if(this.target.x != this.x || this.target.y != this.y) {
    this._x += (this.target.x - this.x) * this.speed * delta;
    this._y += (this.target.y - this.y) * this.speed * delta;
  }

  this.x = Math.round(this._x);
  this.y = Math.round(this._y);
}

UI.Element.prototype.getTile = function(x, y, local) {
  var local = local || false;

  if(!local) {
    var x = x - this.x;
    var y = y - this.y;
  }

  return this.tiles[y][x];
}

UI.Element.prototype.buildTiles = function() {
  for(var y = 0; y < this.height; y++) {
    this.tiles[y] = [];

    for(var x = 0; x < this.width; x++) {
      this.tiles[y][x] = this.buildTile(x, y);
    }
  }
}

UI.Element.prototype.buildTile = function(x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
    return null
  }

  var tile;
  var borderColor = [242, 212, 44];
  var titleStart = Math.floor(this.width / 2 - this._title.length / 2);
  var titleEnd = titleStart + this._title.length;

  if(this.border) {
    if(x == 0 && y == 0) {
      tile = new Char(this.ui.game, '┏');
      tile.setFrontColor(borderColor);
    }
    else if(x == this.width - 1 && y == 0) {
      tile = new Char(this.ui.game, '┓');
      tile.setFrontColor(borderColor);
    }
    else if(x == this.width - 1 && y == this.height - 1) {
      tile = new Char(this.ui.game, '┛');
      tile.setFrontColor(borderColor);
    }
    else if(x == 0 && y == this.height - 1) {
      tile = new Char(this.ui.game, '┗');
      tile.setFrontColor(borderColor);
    }
    else if(x == 0 || x == this.width - 1) {
      tile = new Char(this.ui.game, '┃');
      tile.setFrontColor(borderColor);
    }
    else if(y == this.height - 1) {
      tile = new Char(this.ui.game, '━');
      tile.setFrontColor(borderColor);
    }
    else if(y == 0) {
      if(titleStart <= x && titleEnd > x) {
        var character = this._title[x - titleStart]
        tile = new Char(this.ui.game, character);
        tile.setFrontColor(borderColor);
      }
      else {
        tile = new Char(this.ui.game, '━');
        tile.setFrontColor(borderColor);
      }
    }
  }

  if(typeof tile == 'undefined') {
    var offset = 0;

    if(this.border) {
      offset = -1;
    }

    tile = new Char(this.ui.game, this.content[y + offset][x + offset]);
    tile.setFrontColor(this.color);
    tile.setPosition(x, y);
  }

  this.lit = false;
  tile.setPosition(x, y);

  return tile;
}

UI.Element.prototype._buildTile = UI.Element.prototype.buildTile;