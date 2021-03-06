Game = function(domElement) {
  this.domElement = domElement;
  this.canvas = domElement;

  this.renderer = new Renderer(this, this.canvas, 71, 31);

  this.keyboard = new Keyboard();
  this.handlers = {};
  this.registerEvents();

  this.effects = Effects;
  this.volume = 1;

  this.map = new Map(this);
  this.player = new Player(this);

  this.levels = [
    assets.level1,
    assets.level2,
    assets.level3,
    assets.level4,
    assets.levelFinal
  ];
  this.level = 0;

  this.map.loadMap(this.levels[this.level]);

  this.sounds = {
    menuSelect: new Sound(this, 'js/assets/menuSelect', ['wav'], 1, false)
  }

  this.itemSelection = new UI.ItemSelection(this);
  this.menu = new UI.Menu(this);
  this.hud = new UI.Hud(this);

  this.uis = [
    this.menu,
    this.hud,
    this.itemSelection,
  ]

  /*this.rocket = new Rocket(this);
  this.map.addEntity(this.rocket);
  this.rocket.setPosition(3, 3);*/

  for(var i = 0; i < 1; i++) {
    var x = chance.integer({ min: 0, max: this.map.width });
    var y = chance.integer({ min: 0, max: this.map.height });

    var r = chance.integer({ min: 0, max: 255 });
    var g = chance.integer({ min: 0, max: 255 });
    var b = chance.integer({ min: 0, max: 255 });

    var light = new Light(this, x, y, [r, g, b], 0.8, 1, 5);
    this.map.addLight(light);
  }

  this.frame = 0;
  this.delta = 0;

  this._oldTime = new Date();
  this._newTime = new Date();

  this.started = false;
  this.changeState(Game.MENU);

  this.update();
}

Game.MENU = 1;
Game.PLAYING = 2;
Game.ITEMSELECTION = 3;

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

  for(var key in this.sounds) {
    this.sounds[key].update(this.delta);
  }

  if(this.state == Game.PLAYING) {
    this.player.update(this.delta);
    this.map.update(this.delta);
    this.hud.update(this.delta);
  }
  else if(this.state == Game.ITEMSELECTION) {
    this.itemSelection.update(this.delta);
  }
  else if(this.state == Game.MENU) {
    this.menu.update(this.delta);
  }

  this.renderer.fillBuffer();
  this.renderer.render();
}

Game.prototype.resetGame = function() {
  this.level = 0;

  this.hud.maxPlayerHealth = 0
  this.hud.maxPlayerCooldown = 0
  this.hud.maxMapTime = 0

  this.map.loadMap(this.levels[this.level]);
  this.player.respawn();
}

Game.prototype.restartLevel = function() {
  this.hud.maxPlayerHealth = 0
  this.hud.maxPlayerCooldown = 0
  this.hud.maxMapTime = 0

  this.map.loadMap(this.levels[this.level]);
  this.player.respawn();
}

Game.prototype.nextLevel = function() {
  if(this.level < this.levels.length - 1) {
    this.hud.maxPlayerHealth = 0
    this.hud.maxPlayerCooldown = 0
    this.hud.maxMapTime = 0

    this.level += 1;
    this.map.loadMap(this.levels[this.level]);
    this.player.respawn();
    this.changeState(Game.ITEMSELECTION);
  }
}

Game.prototype.changeState = function(state) {
  this.state = state;
  this.itemSelection.visible = false;
  this.menu.visible = false;
  this.hud.visible = false;

  if(state == Game.ITEMSELECTION) {
    this.itemSelection.visible = true;
  }
  else if(state == Game.PLAYING) {
    this.started = true;
    this.hud.visible = true;
  }
  else if(state == Game.MENU) {
    this.menu.visible = true;
    this.menu.setSelected(this.menu.selected);
  }
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