UI.Menu = function(game) {
  UI.call(this, game);

  this.buttonSelectColor = [191, 16, 136];
  this.buttonDeselectColor = [242, 212, 44];

  this.title = new UI.Element(this, null, assets.title, 21, 4, [242, 212, 44], false);
  this.addElement(this.title);

  this.playButton = new UI.Element(this, 'play', assets.playButton, 21, 16, [255, 255, 255], false);
  this.playButton.enabled = true;
  this.addElement(this.playButton);

  this.restartButton = new UI.Element(this, 'restart', assets.restartButton, 21, 18, [255, 255, 255], false);
  this.restartButton.enabled = false;
  this.addElement(this.restartButton);

  this.ludumButton = new UI.Element(this, 'ludum', assets.ludumButton, 21, 20, [255, 255, 255], false);
  this.ludumButton.enabled = true;
  this.addElement(this.ludumButton);

  this.websiteButton = new UI.Element(this, 'ludum', assets.websiteButton, 21, 22, [255, 255, 255], false);
  this.websiteButton.enabled = true;
  this.addElement(this.websiteButton);

  this.buttons = [
    this.playButton,
    this.restartButton,
    this.ludumButton,
    this.websiteButton
  ];

  this.border = new UI.Element(this, null, assets.menu, 19, 2, [208, 183, 38], false);
  this.addElement(this.border);

  this.setSelected(this.playButton);
}

UI.Menu.prototype = Object.create(UI.prototype);

UI.Menu.prototype.update = function(delta) {
  var moveUpKey = this.game.keyboard.getKey(Keyboard.UP);
  var moveDownKey = this.game.keyboard.getKey(Keyboard.DOWN);
  var selectItemKey = this.game.keyboard.getKey(Keyboard.SPACE);

  var index = this.buttons.indexOf(this.selected);

  if(this.game.started) {
    this.playButton.enabled = false;
    this.restartButton.enabled = true;
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

  if(selectItemKey.hit) {
    if(this.selected == this.playButton) {
      this.game.changeState(Game.ITEMSELECTION);
    }
  }
}

UI.Menu.prototype.setSelected = function(element) {
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