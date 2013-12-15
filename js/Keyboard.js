Keyboard = function() {
  this.keys = {};
}

Keyboard.SPACE = 32;
Keyboard.ENTER = 13;
Keyboard.TAB = 9;
Keyboard.ESC = 27;
Keyboard.BACKSPACE = 8;

Keyboard.SHIFT = 16;
Keyboard.CTRL = 17;
Keyboard.ALT = 18;

Keyboard.LEFT = 37;
Keyboard.UP = 38;
Keyboard.RIGHT = 39;
Keyboard.DOWN = 40;

Keyboard.A = 65;
Keyboard.W = 87;
Keyboard.D = 68;
Keyboard.S = 83;

Keyboard.prototype.update = function(delta) {
  for(var index in this.keys) {
    var key = this.keys[index];

    if(key.state === 'keydown') {
      key.pressed = true;
      key.hold += delta;
      key.hit = key.state !== key.previousState;
    }
    else {
      key.lift = key.state !== key.previousState;
      key.pressed = false;
      key.hit = false;
      key.hold = 0;
    }

    key.previousState = key.state;
  }
}

Keyboard.prototype.setKeyState = function(event) {
  var key = this.keys[event.keyCode]

  if(key) {
    key.state = event.type;
    key.alt = event.altKey;
    key.shift = event.shitKey;
    key.ctrl = event.ctrlKey;
  }
}

Keyboard.prototype.getKey = function(key) {
  if(typeof this.keys[key] === 'undefined') {
    this.keys[key] = {
      state: 'keyup',
      hold: 0,
      hit: false,
      lift: false,
      pressed: false,
      alt: false,
      shift: false,
      ctrl: false
    }
  }

  return this.keys[key];
}