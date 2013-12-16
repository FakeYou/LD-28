Wall = function(game) {
  Tile.call(this, '│')

  var characters = '▒▓';

  color = chance.integer({ min: 50, max: 100 });

  this.game = game;
  this.walkable = false;
  this.character = chance.character({ pool: characters });

  this.setFrontColor([
    color + chance.integer({ min: 0, max: 10 }),
    color + chance.integer({ min: 50, max: 75 }),
    color + chance.integer({ min: 0, max: 10 }),
  ]);
}

Wall.prototype = Object.create(Tile.prototype);

Wall.prototype.update = function(delta) {
}