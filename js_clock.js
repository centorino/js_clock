(function() {
  var JsClock;

  JsClock = function() {
    function JsClock(options) {
      this.wday = ['日', '月', '火', '水', '木', '金', '土'];
      this.now  = options.startDate || new Date();

      this.debug = options.debug || false;

      var self = this;

      window.onload = function() {
        var elem = document.getElementById('debugClock');

        setInterval(function() {
          self.now.setSeconds(self.now.getSeconds() + 1);

          if (self.debug && elem !== undefined) elem.innerHTML = self._debugFormatDate();
          if (options.callback !== undefined) options.callback(self._getNowJson());
        }, 1000);
      };
    }

    JsClock.prototype._paddingZero = function(s, l) {
      if (s.length < l) for (var i = 0; i < l - s.length; i++) s = '0' + s;
      return s;
    };
    JsClock.prototype._getNowJson = function() {
      return { year: this.now.getFullYear().toString(),
               month: this._paddingZero((this.now.getMonth() + 1).toString(), 2),
               date: this._paddingZero(this.now.getDate().toString(), 2),
               wday: this.wday[this.now.getDay()],
               times: this.now.toLocaleString().split(' ')[1],
               hours: this._paddingZero(this.now.getHours().toString(), 2),
               minutes: this._paddingZero(this.now.getMinutes().toString(), 2),
               seconds: this._paddingZero(this.now.getSeconds().toString(), 2) };
    };
    JsClock.prototype._debugFormatDate = function() {
      var i = this._getNowJson();
      return i.year + '/' + i.month + '/' + i.date + '(' + i.wday + ') ' +
             i.hours + ':' + i.minutes + ':' + i.seconds;
    };

    return JsClock;
  }();

  this.JsClock = JsClock;
}).call(this);
