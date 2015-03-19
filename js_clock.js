(function() {
  var JsClock;

  JsClock = function() {
    function JsClock(clockId, options) {
      if (options === undefined) options = {};
      this.wday = ['日', '月', '火', '水', '木', '金', '土'];
      this.elem = {wrapper: document.getElementById(clockId), date: null, time: null};
      this.intervalId = null;
      this.now  = new Date();
      
      if (options.autodo === undefined || !options.autodo) return;
      
      var self = this;
      window.onload = function() {
        self.start();
      };
    }
    
    JsClock.prototype.start = function() {
      var self = this;
      
      self.intervalId = setInterval(function() {
        self.now = new Date();
        
        if (self.elem.wrapper !== undefined) self._render();

        self._blink();
      }, 1000);
    };
    JsClock.prototype.stop = function() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    };

    JsClock.prototype._paddingZero = function(s, l) {
      if (s.length < l) for (var i = 0; i < l - s.length; i++) s = '0' + s;
      return s;
    };
    JsClock.prototype._getNowJson = function() {
      var ampm = 'am';
      var ampmHours = this.now.getHours();
      if (this.now.getHours() > 12) {
        ampm = 'pm';
        ampmHours -= 12;
      }
      return { year: this.now.getFullYear().toString(),
               month: this._paddingZero((this.now.getMonth() + 1).toString(), 2),
               date: this._paddingZero(this.now.getDate().toString(), 2),
               wday: this.wday[this.now.getDay()],
               times: this.now.toLocaleString().split(' ')[1],
               hours: this._paddingZero(this.now.getHours().toString(), 2),
               minutes: this._paddingZero(this.now.getMinutes().toString(), 2),
               seconds: this._paddingZero(this.now.getSeconds().toString(), 2),
               ampm: ampm,
               ampmHours: this._paddingZero(ampmHours.toString(), 2)
             };
    };
    JsClock.prototype._render = function() {
      this._prepareElements();
      
      var i = this._getNowJson();
      var d = i.year + ' / ' + i.month + ' / ' + i.date + ' (' + i.wday + ')';
      var c = '<span id="colon" style="display: inline-block; width: 1em; text-align: center;">:</span>';
      var t = i.ampmHours + c + i.minutes + '  ' + i.ampm;
      
      this.elem.date.textContent = d;
      this.elem.time.innerHTML = t;
      
      return;
    };
    JsClock.prototype._blink = function() {
      setTimeout(function() {
        var c = document.getElementById('colon');
        c.textContent = ' ';
      }, 500);
    };
    JsClock.prototype._prepareElements = function() {
      if (this.elem.date === null && this.elem.time === null) {
        this.elem.date = document.createElement('p');
        this.elem.time = document.createElement('p');
        this.elem.date.className = 'date';
        this.elem.time.className = 'time';
        this.elem.wrapper.appendChild(this.elem.date);
        this.elem.wrapper.appendChild(this.elem.time);
      }
    };

    return JsClock;
  }();

  this.JsClock = JsClock;
}).call(this);
