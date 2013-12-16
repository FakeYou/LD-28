Effects = {
  blink: {
    before: function() {
      if(typeof this.saveCharacter == 'undefined') {
        this.saveCharacter = this.tile.character;
        this.saveColor = Color(this.tile.getFrontColor());
      }

      this.blink = 0.25;
      this.visible = true;
    },
    during: function(delta) {
      this.blink -= delta;

      if(this.blink < 0) {
        this.visible = !this.visible;
        this.blink = 0.25;

        if(this.visible) {
          this.tile.frontColor = this.saveColor.clone();
        }
        else {
          this.tile.frontColor.greyscale();
        }
      }
    },
    after: function() {
      this.tile.character = this.saveCharacter
      this.tile.setFrontColor(this.saveColor.rgbArray());
    }
  }
}