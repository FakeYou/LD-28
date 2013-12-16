UI.Hud = function(game) {
  UI.call(this, game);

  this.maxPlayerHealth = 0
  this.maxPlayerCooldown = 0
  this.maxMapTime = 0

  this.getValues();

  this.healthBar = new UI.Element(this, 'HEALTH', assets.healthBar, 13, 29, [217, 17, 32], false);
  this.addElement(this.healthBar);

  this.cooldownBar = new UI.Element(this, 'COOLDOWN', assets.cooldownBar, 39, 29, [98, 173, 235], false);
  this.addElement(this.cooldownBar);

  this.hud = new UI.Element(this, '', assets.hud, 0, 28, [255, 255, 255], false);
  this.addElement(this.hud);

  //this.maptimeBar = new UI.Element(this, 'TIME', assets.maptimeBar, 48, 28, [255, 255, 255], false);
  //this.maptimeBar.enabled = true;
  //this.addElement(this.maptimeBar);
}

UI.Hud.prototype = Object.create(UI.prototype);

UI.Hud.prototype.update = function(delta) {
  this.getValues();

  var healthPercentage = this.playerHealth / this.maxPlayerHealth;
  var healthBarLength = Math.round(this.healthBar.tiles[0].length * healthPercentage);

  for(var i = 0; i < this.healthBar.tiles[0].length; i++) {
    var tile = this.healthBar.tiles[0][i];

    if(i < healthBarLength ) {
      tile.character = '█';
      tile.setFrontColor([96, 232, 54])
    }
    else {
      tile.character = '▒';
      tile.setFrontColor([90, 189, 93])
    }
  }

  var cooldownPercentage = this.playerCooldown / this.maxPlayerCooldown;
  var cooldownBarLength = Math.round(this.cooldownBar.tiles[0].length * cooldownPercentage);

  for(var i = 0; i < this.cooldownBar.tiles[0].length; i++) {
    var tile = this.cooldownBar.tiles[0][i];

    if(i < cooldownBarLength ) {
      tile.character = '█';
      tile.setFrontColor([70, 186, 255])
    }
    else {
      tile.character = '▒';
      tile.setFrontColor([120, 200, 245])
    }
  }
}

UI.Hud.prototype.getValues = function() {
  this.playerHealth = this.game.player.health;
  this.playerCooldown = this.game.player.cooldown;
  this.mapTime = this.game.mapTime;

  if(this.playerHealth > this.maxPlayerHealth) {
    this.maxPlayerHealth = this.playerHealth;
  }
  if(this.playerCooldown > this.maxPlayerCooldown) {
    this.maxPlayerCooldown = this.playerCooldown;
  }
  if(this.mapTime > this.maxMapTime) {
    this.maxMapTime = this.mapTime;
  }
}