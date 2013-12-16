Fade = function(game, x, y, duration, color) {
  Entity.call(this, '█', x, y)

  this.characters = [' ','░','▒','▓','█'];
  this.duration = duration || 1;
  this.color = color || [255, 255, 255];

  this.game = game;
  this.setFrontColor(this.color);
  this.dissipate = 0;
  this.done = false;

  this.relativeTo = null;
  this.offset = { x: 0, y: 0 };
}

Fade.prototype = Object.create(Entity.prototype);

Fade.prototype.update = function(delta) {
  this.dissipate += delta;

  if(this.relativeTo) {
    this.x = this.relativeTo.x + this.offset.x;
    this.y = this.relativeTo.y + this.offset.y;
  }

  if(!this.game.map.getMapTile(this.x, this.y).walkable){
    this.visible = false;
  }
  else {
   if(this.dissipate < 0) {
      this.visible = false;
    }
    else {
      this.visible = true;
    }
  }

  if(this.duration < this.dissipate) {
    this.dissipate = 0;
    if(this.characters.length) {
      this.character = this.characters.pop();
    }
    else {
      this.done = true;
    }
  }

  this.currentFrontColor.darken(0.02);
}