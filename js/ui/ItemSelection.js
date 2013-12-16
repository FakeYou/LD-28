UI.ItemSelection = function(game) {
  UI.call(this, game);

  this.sword = new UI.Element(this, 'SWORD', assets.sword, 10, 5, [39, 187, 232]);
  this.sword.speed = 2.5;
  this.addElement(this.sword);

  this.shield = new UI.Element(this, 'SHIELD', assets.shield, 27, 5, [193, 63, 244]);
  this.shield.speed = 2.5;
  this.addElement(this.shield);

  this.boots = new UI.Element(this, 'BOOTS', assets.boots, 44, 5, [49, 194, 88]);
  this.boots.speed = 2.5;
  this.addElement(this.boots);

  // this.lute = new UI.Element(this, 'LUTE', assets.lute, 53, 5, [247, 106, 20]);
  // this.lute.speed = 2.5;
  // this.addElement(this.lute);

  this.swordSelect = new UI.Element(
    this,
    assets.swordName,
    assets.swordSelectMessage,
    6, 20, [255, 255, 255]);
  this.swordSelect.speed = 10;
  this.swordSelect.visible = false;
  this.addElement(this.swordSelect);

  this.shieldSelect = new UI.Element(
    this,
    assets.shieldName,
    assets.shieldSelectMessage,
    6, 20, [255, 255, 255]);
  this.shieldSelect.speed = 10;
  this.shieldSelect.visible = false;
  this.addElement(this.shieldSelect);

  this.bootsSelect = new UI.Element(
    this,
    assets.bootsName,
    assets.bootsSelectMessage,
    6, 20, [255, 255, 255]);
  this.bootsSelect.speed = 10;
  this.bootsSelect.visible = false;
  this.addElement(this.bootsSelect);

  // this.luteSelect = new UI.Element(
  //   this,
  //   assets.luteName,
  //   assets.luteSelectMessage,
  //   6, 20, [255, 255, 255]);
  // this.luteSelect.speed = 10;
  // this.luteSelect.visible = false;
  // this.addElement(this.luteSelect);

  this.items = [
    this.sword,
    this.shield,
    this.boots,
    // this.lute
  ]

  this.messages = [
    this.swordSelect,
    this.shieldSelect,
    this.bootsSelect,
    // this.luteSelect
  ]

  this.setSelected(this.sword);
}

UI.ItemSelection.prototype = Object.create(UI.prototype);

UI.ItemSelection.prototype.update = function(delta) {
  var moveRightKey = this.game.keyboard.getKey(Keyboard.RIGHT);
  var moveLeftKey = this.game.keyboard.getKey(Keyboard.LEFT);
  var selectItemKey = this.game.keyboard.getKey(Keyboard.SPACE);

  var index = this.items.indexOf(this.selected);

  if(moveLeftKey.hit) {
    if(index > 0 && index != -1) {
      this.setSelected(this.items[index - 1]);
    }
  }

  if(moveRightKey.hit) {
    if(index < this.items.length - 1 && index != -1) {
      this.setSelected(this.items[index + 1]);
    }
  }

  if(selectItemKey.hit) {
    this.game.sounds.menuSelect.start();
    this.game.changeState(Game.PLAYING);

    if(this.selected == this.sword) { this.game.player.item = Player.SWORD }
    if(this.selected == this.shield) { this.game.player.item = Player.SHIELD }
    if(this.selected == this.boots) { this.game.player.item = Player.BOOTS }
    if(this.selected == this.lute) { this.game.player.item = Player.LUTE }
  }

  for(var i = 0; i < this.elements.length; i++) {
    this.elements[i].update(delta);
  }
}

UI.ItemSelection.prototype.setSelected = function(element) {
  this.game.sounds.menuSelect.start();
  for(var i = 0; i < this.items.length; i++) {
    var item = this.items[i];

    if(item == element) {
      this.selected = element;
      item.target.y = 4
      this.messages[i].visible = true;
    }
    else {
      item.target.y = 5;
      this.messages[i].visible = false;
    }
  }
}