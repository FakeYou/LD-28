Sound = function(game, source, extensions, volume, loop) {
  this.game = game;

  this.source = source;
  this.extensions = extensions || [];
  this.volume = volume || 1;
  this.loop = loop || false

  this.audio = document.createElement('audio');
  this.audio.volume = this.volume;
  this.audio.loop = this.loop;

  for(var i = 0; i < this.extensions.length; i++) {
    var extension = this.extensions[i];
    var source = document.createElement('source');

    source.src = this.source + '.' + extension;
    source.type = 'audio/' + extension;

    this.audio.appendChild(source);
  }
}

Sound.prototype.update = function(delta) {
  this.setVolume(this.volume * this.game.volume);
}

Sound.prototype.isReady = function() {
  return this.audio.readyState == 4;
}

Sound.prototype.play = function() {
  if(this.isReady()) {
    this.audio.play();
  }
}

Sound.prototype.pause = function() {
  if(this.isReady()) {
    this.audio.pause();
  }
}

Sound.prototype.start = function() {
  if(this.isReady()) {
    this.audio.currentTime = 0;
    this.play();
  }
}

Sound.prototype.stop = function() {
  if(this.isReady()) {
    this.pause();
    this.audio.currentTime = 0;
  }
}

Sound.prototype.getVolume = function() {
  return this.audio.volume;
}

Sound.prototype.setVolume = function(volume) {
  if(volume < 0) {
    volume = 0;
  }
  else if(volume > 1) {
    volume = 1;
  }

  this.audio.volume = volume;
}

Sound.prototype.getLoop = function() {
  return this.audio.loop;
}

Sound.prototype.setLoop = function(loop) {
  this.audio.loop = loop;
}