var BandJS = require('./band.js');
var conductor = new BandJS();

var tempo = 112;
var volume = 50;
conductor.setTimeSignature(4, 4);
conductor.setTempo(tempo);

// ========================================================================================== //

var soprano = conductor.createInstrument('square'),
    alto = conductor.createInstrument('square'),
    bass = conductor.createInstrument('square');

    // Bar 1
    soprano.repeatStart()
        .note('quarter', 'E5')
        .note('eighth', 'B4')
        .note('eighth', 'C5')
        .note('eighth', 'D5', true)
        .note('sixteenth', 'E5', true)
        .note('sixteenth', 'D5')
        .note('eighth', 'C5')
        .note('eighth', 'B4');
        
    alto.repeatStart()
        .note('quarter', 'B4')
        .note('eighth', 'G#4')
        .note('eighth', 'A4')
        .note('eighth', 'B4')
        .rest('eighth')
        .note('eighth', 'A4')
        .note('eighth', 'G#4');
        
    bass.repeatStart()
        .note('eighth', 'E2')
        .note('eighth', 'E3')
        .note('eighth', 'E2')
        .note('eighth', 'E3')
        .note('eighth', 'E2')
        .note('eighth', 'E3')
        .note('eighth', 'E2')
        .note('eighth', 'E3');
        
    // Bar 2
    soprano.note('quarter', 'A4')
        .note('eighth', 'A4')
        .note('eighth', 'C5')
        .note('quarter', 'E5')
        .note('eighth', 'D5')
        .note('eighth', 'C5');
    
    alto.note('quarter', 'E4')
        .note('eighth', 'E4')
        .note('eighth', 'A4')
        .note('quarter', 'C5')
        .note('eighth', 'B4')
        .note('eighth', 'A4');

    bass.note('eighth', 'A2')
        .note('eighth', 'A3')
        .note('eighth', 'A2')
        .note('eighth', 'A3')
        .note('eighth', 'A2')
        .note('eighth', 'A3')
        .note('eighth', 'A2')
        .note('eighth', 'A3');
        
    // Bar 3
    soprano.note('dottedQuarter', 'B4')
        .note('eighth', 'C5')
        .note('quarter', 'D5')
        .note('quarter', 'E5');
    
    alto.note('eighth', 'G#4')
        .note('eighth', 'E4')
        .note('eighth', 'G#4')
        .note('eighth', 'A4')
        .note('quarter', 'B4')
        .note('quarter', 'C5');
    
    bass.note('eighth', 'G#2')
      .note('eighth', 'G#3')
      .note('eighth', 'G#2')
      .note('eighth', 'G#3')
      .note('eighth', 'E2')
      .note('eighth', 'E3')
      .note('eighth', 'E2')
      .note('eighth', 'E3');
    
    // Bar 4
    soprano.note('quarter', 'C5')
        .note('quarter', 'A4')
        .note('half', 'A4');
    
    alto.note('quarter', 'A4')
        .note('quarter', 'E4')
        .note('half', 'E4');
    
    bass.note('eighth', 'A2')
        .note('eighth', 'A3')
        .note('eighth', 'A2')
        .note('eighth', 'A3')
        .note('eighth', 'A2')
        .note('eighth', 'A3')
        .note('eighth', 'B2')
        .note('eighth', 'C3');
    
    // Bar 5
    soprano.rest('eighth')
        .note('quarter', 'D5')
        .note('eighth', 'F5')
        .note('quarter', 'A5')
        .note('eighth', 'G5')
        .note('eighth', 'F5');
    
    alto.rest('eighth')
        .note('quarter', 'F4')
        .note('eighth', 'A4')
        .note('eighth', 'C5')
        .note('sixteenth', 'C5')
        .note('sixteenth', 'C5')
        .note('eighth', 'B4')
        .note('eighth', 'A4');
    
    bass.note('eighth', 'D3')
        .note('eighth', 'D2')
        .rest('eighth')
        .note('eighth', 'D2')
        .rest('eighth')
        .note('eighth', 'D2')
        .note('eighth', 'A2')
        .note('eighth', 'F2');
    
    // Bar 6
    soprano.note('dottedQuarter', 'E5')
        .note('eighth', 'C5')
        .note('quarter', 'E5')
        .note('eighth', 'D5')
        .note('eighth', 'C5');
    
    alto.note('dottedQuarter', 'G4')
        .note('eighth', 'E4')
        .note('eighth', 'G4', true)
        .note('sixteenth', 'A4', true)
        .note('sixteenth', 'G4')
        .note('eighth', 'F4')
        .note('eighth', 'E4');
    
    bass.note('eighth', 'C2')
        .note('eighth', 'C3')
        .rest('eighth')
        .note('eighth', 'C3')
        .note('eighth', 'C2')
        .note('eighth', 'G2')
        .rest('eighth')
        .note('eighth', 'G2');
    
    // Bar 7
    soprano.note('quarter', 'B4')
        .note('eighth', 'B4')
        .note('eighth', 'C5')
        .note('quarter', 'D5')
        .note('quarter', 'E5');
    
    alto.note('eighth', 'G#4')
        .note('eighth', 'E4')
        .note('eighth', 'G#4')
        .note('eighth', 'A4')
        .note('eighth', 'B4')
        .note('eighth', 'G#4')
        .note('eighth', 'B4')
        .note('eighth', 'G#4');
    
    bass.note('eighth', 'B2')
        .note('eighth', 'B3')
        .rest('eighth')
        .note('eighth', 'B3')
        .rest('eighth')
        .note('eighth', 'E3')
        .rest('eighth')
        .note('eighth', 'G#3');
    
    // Bar 8
    soprano.note('quarter', 'C5')
        .note('quarter', 'A4')
        .note('quarter', 'A4')
        .rest('quarter')
        .repeat();
    
    alto.note('eighth', 'A4')
        .note('eighth', 'E4')
        .note('quarter', 'E4')
        .note('quarter', 'E4')
        .rest('quarter')
        .repeat();
    
    bass.note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('quarter', 'A2')
        .rest('quarter')
        .repeat();
    
    // Bar 9
    alto.note('half', 'C4, E4', true)
        .note('half', 'A3, C4', true);
    
    bass.note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2');
    
    // Bar 10
    alto.note('half', 'B3, D4', true)
        .note('half', 'G#3, B3', true);
        
    bass.note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2');
        
    // Bar 11
    alto.note('half', 'A3, C4', true)
        .note('half', 'E3, A3', true);
    
    bass.note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2');
    
    // Bar 12
    alto.note('half', 'E3, G#3', true)
        .note('quarter', 'G#3, B3')
        .rest('quarter');
        
    bass.note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2');

    // Bar 13
    alto.note('half', 'C4, E4', true)
        .note('half', 'A3, C4', true);
    
    bass.note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2');
    
    // Bar 14
    alto.note('half', 'B3, D4', true)
        .note('half', 'G#3, B3', true);
        
    bass.note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2');
    
    // Bar 15
    alto.note('quarter', 'A3, C4', true)
        .note('quarter', 'C4, E4', true)
        .note('half', 'E4, A4', true);
    
    bass.note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2')
        .note('eighth', 'A2')
        .note('eighth', 'E2');
    
    // Bar 16
    alto.note('whole', 'E4, G#4');
        
    bass.note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2')
        .note('eighth', 'G#2')
        .note('eighth', 'E2');
        
var player = conductor.finish();

// ========================================================================================== //
conductor.setMasterVolume(volume / 100);

module.exports = {
  "currentSeconds": 0,
  "playing" : false,
  "paused" : false,
  "muted"  : false,
  "volume" : volume,
  "tempo" : tempo,
  "totalSeconds" : conductor.getTotalSeconds(),

  "play": function() {
    module.exports.playing = true;
    module.exports.paused = false;
    player.play();
  },

  "pause": function() {
    module.exports.paused = true;
    player.pause();
  },

  "stop" : function() {
    module.exports.playing = false;
    module.exports.paused = false;
    player.stop();
  },

  "setVolume" : function(new_volume) {
    module.exports.volume = new_volume;
    conductor.setMasterVolume(new_volume / 100);
  },

  "updateTempo" : function(new_tempo) {
    module.exports.tempo = new_tempo;
    conductor.setTempo(new_tempo);
  },
  
  "loop" : function(loop) {
    player.loop(loop);
  },
  
  "updateTime": function(currentSeconds) {
    player.setTime(currentSeconds);
  },

  "mute": function() {
    if (module.exports.muted) {
      player.unmute();
      module.exports.muted = false;
    } else {
      player.mute();
      module.exports.muted = true;
    }
  },
};



conductor.setTickerCallback(function(seconds) {
  exports.currentSeconds = seconds;
});

conductor.setOnDurationChangeCallback(function() {
  exports.totalSeconds = conductor.getTotalSeconds();
});


/*
app.filter('musicTime', function() {
  function pad ( num, size ) {
    return ( Math.pow( 10, size ) + ~~num ).toString().substring( 1 );
  }

  return function(seconds, showRemaining) {
    var duration = moment.duration(parseInt(seconds), 'seconds'),
        secs = duration.seconds(),
        mins = duration.minutes(),
        hrs = duration.hours();

    if (hrs > 0) {
      mins += (hrs * 60);
    }

    return mins + ':' + pad(secs, 2);
  }
});
*/



// module.exports = {
//   "play":play,
//   "pause": pause,
//   "stop" : stop,
//   "setVolume" : setVolume,
//   "volume" : volume,
//   "updateTempo" : updateTempo,
//   "tempo" : tempo,
//   "loop" : setLoop,
//   "updateTime" : updateTime,
//   "currentSeconds" : currentSeconds,
//   "playing" : playing,
//   "paused" : paused,
//   "replay" : replay,
// };

/*
    $scope.playing = $scope.paused = $scope.muted = false;
    $scope.volume = 50;
    $scope.currentSeconds = 0;
    $scope.timeSlider = 0;
    $scope.totalSeconds = conductor.getTotalSeconds();

    var pauseTicker = false;

    conductor.setTickerCallback(function(seconds) {
        $scope.$apply(function() {
            if (! pauseTicker) {
                $scope.currentSeconds = seconds;
            }
        });
    });

    conductor.setOnFinishedCallback(function() {
        $scope.$apply(function() {
            $scope.playing = $scope.paused = false;
        });
    });
    
    conductor.setOnDurationChangeCallback(function() {
        $scope.totalSeconds = conductor.getTotalSeconds();
    });

    $scope.play = function() {
        $scope.playing = true;
        $scope.paused = false;
        player.play();
    };

    $scope.stop = function() {
        $scope.playing = $scope.paused = false;
        player.stop();
    };

    $scope.pause = function() {
        $scope.paused = true;
        player.pause();
    };

    $scope.updateTime = function() {
        pauseTicker = false;
        player.setTime($scope.currentSeconds);
    };
    
    $scope.updateTempo = function() {
        pauseTicker = false;
        conductor.setTempo($scope.tempo);
    };

    $scope.movingTime = function() {
        pauseTicker = true;
    };

    $scope.$watch('loop', function() {
        player.loop($scope.loop);
    });

    $scope.$watch('mute', function(newVal, oldVal) {
        if (newVal === oldVal) {
            return;
        }

        if ($scope.mute) {
            player.mute();
        } else {
            player.unmute();
        }
        $scope.muted = $scope.mute;
    });

    $scope.$watch('volume', function() {
        conductor.setMasterVolume($scope.volume / 100);
    });
});

app.filter('musicTime', function() {
    function pad ( num, size ) {
        return ( Math.pow( 10, size ) + ~~num ).toString().substring( 1 );
    }

    return function(seconds, showRemaining) {
        var duration = moment.duration(parseInt(seconds), 'seconds'),
            secs = duration.seconds(),
            mins = duration.minutes(),
            hrs = duration.hours();

        if (hrs > 0) {
            mins += (hrs * 60);
        }

        return mins + ':' + pad(secs, 2);
    }
});
*/