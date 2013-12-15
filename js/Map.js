Map = function(game) {
  this.game = game;

  this.map = [
    '                       ',
    '                       ',
    '   #################   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #···············#   ',
    '   #################   ',
    '                       ',
    '                       ',
  ];

  this.width = this.map[0].length;
  this.height = this.map.length;

  this.tiles = [];
  this.entities = [];
  this._entitiesLookup = {};
  this.buildTiles();

}

Map.WALL = new Tile('#');
Map.WALL.frontColor = [100, 100, 100];
Map.WALL.walkable = false;

Map.FLOOR = new Tile('·');
Map.FLOOR.frontColor = [50, 50, 50];

Map.CLEAR = new Tile(' ');
Map.CLEAR.frontColor = [0, 0, 0];

Map.prototype.getTile = function(x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
    return null
  }

  var entity = this.getEntity(x, y);

  if(entity != null) {
    return entity;
  }
  else {
    return this.tiles[y][x];
  }
}

Map.prototype.getEntity = function(x, y) {
  var key = x + ',' + y;

  if(this._entitiesLookup[key]) {
    return this._entitiesLookup[key];
  }

  return null;
}

Map.prototype.buildTiles = function() {
  for(var y = 0; y < this.height; y++) {
    this.tiles[y] = [];

    for(var x = 0; x < this.width; x++) {
      this.tiles[y][x] = this.buildTile(x, y);
    }
  }
}

Map.prototype.buildTile = function(x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
    return null
  }

  var character = this.map[y][x];
  var tile;

  switch(character) {
    case '#':
      tile = Map.WALL.clone();
      break;
    case '·':
      tile = Map.FLOOR.clone();
      break;
    default:
      tile = Map.CLEAR.clone();
  }

  tile.setPosition(x, y);

  return tile;
}

Map.prototype.update = function(delta) {
  this._entitiesLookup = {};

  for(var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];

    var key = entity.x + ',' + entity.y;

    this._entitiesLookup[key] = entity;
  }
}


Map.prototype.addEntity = function(entity) {
  var key = entity.x + ',' + entity.y;

  this.entities.push(entity);
  this._entitiesLookup[key] = entity;
}