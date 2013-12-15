Game = function(domElement) {
  this.domElement = domElement;
  this.canvas = domElement;

  this.renderer = new Renderer(this, this.canvas, 21, 21);

  this.keyboard = new Keyboard();
  this.handlers = {};
  this.registerEvents();

  this.map = new Map(this);
  this.player = new Player(this);
  this.map.addEntity(this.player);
  this.player.setPosition(10, 10);

  this.frame = 0;
  this.delta = 0;

  this._oldTime = new Date();
  this._newTime = new Date();

  this.update();
}

Game.prototype.update = function() {
  var scope = this;

  requestAnimFrame(function() {
    scope.update()
  });

  this._oldTime = this._newTime;
  this._newTime = new Date();

  this.frame += 1;
  this.delta = (this._newTime.getTime() - this._oldTime.getTime()) / 1000;

  this.keyboard.update(this.delta);

  this.player.update(this.delta);
  this.map.update(this.delta);

  this.renderer.fillBuffer();
  this.renderer.render();
}

Game.prototype.registerEvents = function() {
  var scope = this;

  this.handlers.keyboardKeyChange = function(event) {
    scope.keyboard.setKeyState(event);
  }

  document.addEventListener('keydown', scope.handlers.keyboardKeyChange);
  document.addEventListener('keyup', scope.handlers.keyboardKeyChange);
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();