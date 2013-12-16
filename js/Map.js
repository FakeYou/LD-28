Map = function(game) {
  this.game = game;

  this.map = [
    '                                ',
    ' ############################## ',
    ' #····························# ',
    ' #····························# ',
    ' #····························# ',
    ' #····························# ',
    ' #····························# ',
    ' #····························# ',
    ' #····························# ',
    ' #····························# ',
    ' ##···######################### ',
    '  #···#                         ',
    '  #···#                         ',
    '  #···#             #####       ',
    '  #···########      #···####    ',
    '  #··········#      #······#    ',
    '  #···######·#      #··###·#    ',
    '  #####    #·#      ######·#### ',
    '           #·#          #·····# ',
    '           #·#          #·····# ',
    '           #·############·····# ',
    '           #··················# ',
    '           ###···############## ',
    ' ##########  ##·##    #····#    ',
    ' #········##  #·#     #·#··#    ',
    ' #··####···#  #·#     #·#··#    ',
    ' #·········#  #·#     #·######  ',
    ' #·········#  #·#     #······#  ',
    ' ##·########  #·#     #······#  ',
    '  #·#         #·#     #####·##  ',
    '  #·#         #·#         #·#   ',
    '  #·#   #######·#         #·#   ',
    '  #·#   #·······#         #·#   ',
    '  #·#   #·····#·#         #·#   ',
    '  #·#   #·····#·#         #·#   ',
    '  #·#   #·····#·#         #·#   ',
    '  #·#   #·····#·#         #·#   ',
    '  #·#   #######·#         #·#   ',
    '  #·#         #·###########·#   ',
    '  #·#         #·············#   ',
    '  #·#############·###########   ',
    '  #···············#             ',
    '  #################             ',
    '                                ',
  ];

  this.width = this.map[0].length;
  this.height = this.map.length;

  this.tiles = [];
  this.entities = [];
  this._entitiesLookup = {};

  this.lights = [];
  this._lightsLookup = {};

  this.buildTiles();
}

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

Map.prototype.getMapTile = function(x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
    return null
  }

  return this.tiles[y][x];
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
      tile = new Wall(this.game);
      break;
    case '·':
      tile = new Floor(this.game);
      break;
    case ' ':
      tile = new Clear(this.game);
      break;
    default:
      tile = new Char(this.game, character);
      tile.setFrontColor([255, 0, 0])
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

  for(var y = 0; y < this.height; y++) {
    for(var x = 0; x < this.width; x++) {
      this.tiles[y][x].update(delta);
    }
  }
}


Map.prototype.addEntity = function(entity) {
  var key = entity.x + ',' + entity.y;

  this.entities.push(entity);
  this._entitiesLookup[key] = entity;
}

Map.prototype.getEntity = function(x, y) {
  var key = x + ',' + y;

  if(this._entitiesLookup[key]) {
    return this._entitiesLookup[key];
  }

  return null;
}

Map.prototype.removeEntity = function(entity) {
  var key = entity.x + ',' + entity.y;

  if(this._entitiesLookup[key] === entity) {
    delete this._entitiesLookup[key];
  }

  var index = this.entities.indexOf(entity);
  if(index != -1) {
    this.entities.splice(index, 1);
  }
}

Map.prototype.addLight = function(light) {
  var key = light.x + ',' + light.y;

  this.lights.push(light);
  this._lightsLookup[key] = light
}

Map.prototype.getLight = function(x, y) {
  var key = x + ',' + y;

  if(this._lightsLookup[key]) {
    return this._lightsLookup[key];
  }

  return null;
}

Map.prototype.getLights = function() {
  return this.lights;
}

Map.prototype.removeLight = function(light) {
  var key = light.x + ',' + light.y;

  if(this._lightsLookup[key] === light) {
    delete this._lightsLookup[key];
  }

  var index = this.lights.indexOf(light);
  if(index != -1) {
    this.lights.splice(index, 1);
  }
}