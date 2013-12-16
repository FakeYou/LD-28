UI.Menu = function(game) {
  UI.call(this, game);

  this.buttonSelectColor = [191, 16, 136];
  this.buttonDeselectColor = [242, 212, 44];

  this.title = new UI.Element(this, null, assets.title, 21, 4, [242, 212, 44], false);
  this.addElement(this.title);

  this.playButton = new UI.Element(this, 'play', assets.playButton, 21, 16, [255, 255, 255], false);
  this.playButton.enabled = true;
  this.addElement(this.playButton);

  this.resumeButton = new UI.Element(this, 'resume', assets.resumeButton, 21, 18, [0, 0, 0], false);
  this.resumeButton.enabled = false;
  this.addElement(this.resumeButton);

  this.restartButton = new UI.Element(this, 'restart', assets.restartButton, 21, 20, [255, 255, 255], false);
  this.restartButton.enabled = false;
  this.addElement(this.restartButton);

  this.volumeLabel = new UI.Element(this, 'volume', assets.volumeLabel, 21, 22, [255, 255, 255], false);
  this.volumeLabel.enabled = true;
  this.addElement(this.volumeLabel);

  this.volumeBar = new UI.Element(this, 'volumeBar', assets.volumeBar, 26, 23, [255, 255, 255], false);
  this.addElement(this.volumeBar);

  this.buttons = [
    this.playButton,
    this.resumeButton,
    this.restartButton,
    this.volumeLabel,
  ];

  this.border = new UI.Element(this, null, assets.menu, 19, 2, [208, 183, 38], false);
  this.addElement(this.border);

  this.setSelected(this.playButton);
}

UI.Menu.prototype = Object.create(UI.prototype);

UI.Menu.prototype.update = function(delta) {
  var moveUpKey = this.game.keyboard.getKey(Keyboard.UP);
  var moveDownKey = this.game.keyboard.getKey(Keyboard.DOWN);
  var moveRightKey = this.game.keyboard.getKey(Keyboard.RIGHT);
  var moveLeftKey = this.game.keyboard.getKey(Keyboard.LEFT);
  var selectItemKey = this.game.keyboard.getKey(Keyboard.SPACE);

  var index = this.buttons.indexOf(this.selected);

  var volumeBarLength = Math.round(this.volumeBar.tiles[0].length * this.game.volume);

  for(var i = 0; i < this.volumeBar.tiles[0].length; i++) {
    var tile = this.volumeBar.tiles[0][i];

    if(i < volumeBarLength) {
      tile.character = '█';
      tile.setFrontColor([208, 183, 38])
    }
    else {
      tile.character = '▒';
      tile.setFrontColor([208, 183, 38])
    }
  }

  if(this.game.started) {
    this.restartButton.enabled = true;
    this.resumeButton.enabled = true;
    this.playButton.enabled = false;
  }
  else {
    this.restartButton.enabled = false;
    this.resumeButton.enabled = false;
    this.playButton.enabled = true;
  }

  if(moveUpKey.hit) {
    if(index > 0 && index != -1) {
      this.setSelected(this.buttons[index - 1]);
    }
  }

  if(moveDownKey.hit) {
    if(index < this.buttons.length - 1 && index != -1) {
      this.setSelected(this.buttons[index + 1]);
    }
  }

  if(moveRightKey.hit && this.selected == this.volumeLabel && this.game.volume < 1) {
    this.game.sounds.menuSelect.start();
    this.game.volume += 1 * delta;
  }

  if(moveLeftKey.hit && this.selected == this.volumeLabel && this.game.volume > 0) {
    this.game.sounds.menuSelect.start();
    this.game.volume -= 1 * delta
  }

  if(selectItemKey.hit) {
    this.game.sounds.menuSelect.start();
    if(this.selected == this.playButton) {
      this.game.changeState(Game.ITEMSELECTION);
    }
    if(this.selected == this.resumeButton) {
      this.game.changeState(Game.PLAYING);
    }
  }
}

UI.Menu.prototype.setSelected = function(element) {
  this.game.sounds.menuSelect.start();
  for(var i = 0; i < this.buttons.length; i++) {
    var button = this.buttons[i];

    if(button == element) {
      this.selected = element;
      this.selectButton(button);
    }
    else {
      this.deselectButton(button);
    }
  }
}

UI.Menu.prototype.selectButton = function(button) {
  for(var i = 0; i < button.tiles[0].length; i++) {
    var tile = button.tiles[0][i];

    tile.setFrontColor([0, 0, 0]);
    if(button.enabled) {
      tile.setBackColor(this.buttonDeselectColor);
    }
    else {
      tile.setBackColor([100, 100, 100]);
    }
  }
}

UI.Menu.prototype.deselectButton = function(button) {
  for(var i = 0; i < button.tiles[0].length; i++) {
    var tile = button.tiles[0][i];

    tile.setBackColor([0, 0, 0]);
    if(button.enabled) {
      tile.setFrontColor(this.buttonDeselectColor);
    }
    else {
      tile.setFrontColor([100, 100, 100]);
    }
  }
}