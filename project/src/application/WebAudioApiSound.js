try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  window.audioContext = new window.AudioContext()
} catch (e) {
  throw new Error('No Web Audio API support')
}

const webAudioAPISoundManager = function(context) {
  this.context = context
  this.bufferList = {}
  this.playingSounds = {}
  this.merger = this.context.createChannelMerger(1)
  this.merger.connect(this.context.destination)
}

webAudioAPISoundManager.prototype = {
  addSound: function(url, loadCallback) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    var self = this

    request.onload = function() {
      // Asynchronously decode the
      // audio file data in request.response
      self.context.decodeAudioData(
        request.response,

        function(buffer) {
          if (!buffer) {
            throw new Error('Error decoding file data: ' + url)
          }
          self.bufferList[url] = buffer
        }
      )

      if (loadCallback) {
        loadCallback()
      }
    }

    request.onerror = function() {
      throw new Error('BufferLoader: XHR error')
    }

    request.send()
  },

  stopSoundWithUrl: function(url, time) {
    if (this.playingSounds.hasOwnProperty(url)) {
      for (var i in this.playingSounds[url]) {
        if (this.playingSounds[url].hasOwnProperty(i)) {
          this.playingSounds[url][i].stop(time)
        }
      }
    }
  }
}



const WebAudioAPISoundManager = new webAudioAPISoundManager(window.audioContext)
window.webAudioAPISoundManager = WebAudioAPISoundManager

const WebAudioAPISound = function(url, loadCallback) {
  this.url = url
  window.webAudioAPISoundManager =
    window.webAudioAPISoundManager ||
    new webAudioAPISoundManager(window.audioContext)
  this.manager = window.webAudioAPISoundManager
  this.manager.addSound(this.url, loadCallback)
}

WebAudioAPISound.prototype = {
  play: function(options) {
    var buffer = this.manager.bufferList[this.url]

    this.settings = {
      time: 0,
      loop: false,
      volume: 0.5
    }

    for (var i in options) {
      if (options.hasOwnProperty(i)) {
        this.settings[i] = options[i]
      }
    }

    // Only play if it's loaded yet
    if (typeof buffer !== 'undefined') {
      var source = this.makeSource(buffer)
      source.loop = this.settings.loop
      source.start(this.settings.time)

      if (!this.manager.playingSounds.hasOwnProperty(this.url)) {
        this.manager.playingSounds[this.url] = []
      }
      this.manager.playingSounds[this.url].push(source)
    }
  },

  stop: function({ time = 0 }) {
    this.manager.stopSoundWithUrl(this.url, time)
  },

  makeSource: function(buffer) {
    var source = this.manager.context.createBufferSource()
    var gainNode = this.manager.context.createGain()
    gainNode.gain.value = this.settings.volume
    source.buffer = buffer
    source.connect(gainNode)
    this.source = source
    gainNode.connect(this.manager.merger)
    return source
  }
}

export { WebAudioAPISound, WebAudioAPISoundManager }
