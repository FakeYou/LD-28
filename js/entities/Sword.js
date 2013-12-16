Sword = function(game) {
  Tile.call(this, '│')

  this.game = game;

  this.setFrontColor([0, 255, 255]);
  this.lit = false;

  this.swingTopAnimation = [
    { character: '▁', x: 0, y: 0, duration: 0 },
    { character: '▁', x: 0, y: 0, duration: 0.5 },
    { character: '▂', x: 0, y: 0, duration: 0.5 },
    { character: '▃', x: 0, y: 0, duration: 0.5 },
    { character: '▄', x: 0, y: 0, duration: 0.5 },
    { character: '▅', x: 0, y: 0, duration: 0.5 },
    { character: '▆', x: 0, y: 0, duration: 0.5 },
    { character: '▇', x: 0, y: 0, duration: 0.5 },
    { character: '█', x: 0, y: 0, duration: 0.5 },
    { character: '▇', x: 0, y: 0, duration: 0.5 },
    { character: '▆', x: 0, y: 0, duration: 0.5 },
    { character: '▅', x: 0, y: 0, duration: 0.5 },
    { character: '▄', x: 0, y: 0, duration: 0.5 },
    { character: '▃', x: 0, y: 0, duration: 0.5 },
    { character: '▂', x: 0, y: 0, duration: 0.5 },
    { character: '▁', x: 0, y: 0, duration: 0.5 },
  ];
  this.lastFrame = 0;
  this.frame = 0;
  this.animation = this.swingTopAnimation;

  this.direction = { x: 0, y: -1 }
}

Sword.prototype = Object.create(Tile.prototype);

Sword.prototype.update = function(delta) {
  this.x = this.game.player.x + this.direction.x;
  this.y = this.game.player.y + this.direction.y;

  this.lastFrame += delta;

  if(this.animation) {
    var frame = this.animation[this.frame];

    if(this.lastFrame > frame.duration) {
      this.lastFrame = 0;
      this.frame += 1;

      if(this.frame >= this.animation.length) {
        this.animation = null;
      }
      else {
        var nextFrame = this.animation[this.frame];

        this.character = nextFrame.character;
        this.x += nextFrame.x;
        this.y += nextFrame.y;
      }
    }
  }
  else {
    if(!this.game.map.getTile(this.x, this.y).walkable) {
      this.x = this.game.player.x;
      this.y = this.game.player.y;
    }

    if(this.direction.x == -1 && this.direction.y == -1) {
      this.character = '╲';
    }
    else if(this.direction.x == 1 && this.direction.y == 1) {
      this.character = '╲';
    }
    else if(this.direction.x == 1 && this.direction.y == -1) {
      this.character = '╱';
    }
    else if(this.direction.x == -1 && this.direction.y == 1) {
      this.character = '╱';
    }
    else if(this.direction.y == -1) {
      this.character = '│';
    }
    else if(this.direction.y == 1) {
      this.character = '│';
    }
    else if(this.direction.x == -1) {
      this.character = '─';
    }
    else if(this.direction.x == 1) {
      this.character = '─';
    }
  }
}