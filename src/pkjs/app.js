// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
//  Includes
// ------------------------------
var MessageQueue = require('message-queue-pebble');  // For switching to Common-JS-Style
var mario = require('./mario.js');    //mario.play();
var zelda = require('./zelda.js');    //zelda.play();
var tetris = require('./tetris.js');  //tetris.play();

var current_note = 0;
var current_chord = 0;

const An = 0,
      Bb = 100,
      Bn = 200,
      Cn = 300,
      Db = 400,
      Dn = 500,
      Eb = 600,
      En = 700,
      Fn = 800,
      Gb = 900,
      Gn = 1000,
      Ab = 1100,
      O  = 1200;

var chords = [
  [Cn+O, Gn+O, En+O, Gn+O, Cn+O+O, Gn+O, En+O, Gn+O],
  [An+O, En+O, Cn+O, En+O, An+O+O, En+O, Cn+O, En+O],
  [Fn  , Cn+O, An+O, Cn+O, Fn+O  , Cn+O, An+O, Cn+O],
  [Gn  , Dn+O, Bn+O, Dn+O, Gn+O  , Dn+O, Bn+O, Dn+O]
];
var notes = chords[current_chord];

//var notes = [Cn, Gn, En, Gn, Cn + octave, Gn, En, Gn];


const NOTE_DURATION = 200;

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
//  Global Variables
// ------------------------------

var audio_ctx = null;
var noteTimeout = null;
var change_chord = false;


function play_note(octave, note, volume, length) {
  //effectiveFrequency = frequency * pow(2, detune / 1200).
  var osc, gain;
  osc = audio_ctx.createOscillator();
  gain = audio_ctx.createGain();
  osc.connect(gain);
  gain.connect(audio_ctx.destination);
  osc.type = 'square';
  osc.frequency.value = 27.5 * Math.pow(2, octave);
  gain.gain.value = volume;
  osc.detune.value = note;
  osc.start(0);
  osc.stop(audio_ctx.currentTime + length); // stop [length] seconds after the current time
}

function play_next_note() {
  play_note(3, notes[current_note], 0.03, 0.1);
  
  current_note++;
  if(current_note >= notes.length) {
    current_note = 0;
    if (change_chord) {
      change_chord = false;
      current_chord++;
        if(current_chord >= chords.length)
          current_chord = 0;
      notes = chords[current_chord];
    }
  }

  noteTimeout = setTimeout(play_next_note, NOTE_DURATION);
}


function stop_beeps() {
  //console.log("Mario: " + mario.playing + ", Zelda: " + zelda.playing + ", Tetris: " + tetris.playing);
  if (mario.playing) mario.stop();
  if (zelda.playing) zelda.stop();
  if (tetris.playing) tetris.stop();

  if(noteTimeout) {
    clearTimeout(noteTimeout); // jshint ignore:line
    noteTimeout = null;
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //
//  Pebble Functions
// ------------------------------
Pebble.addEventListener("ready", function(e) {
  console.log("PebbleKit JS Has Started!");
  //MessageQueue.sendAppMessage({"MESSAGE":"PebbleKit JS Ready!"}, null, null);  // let watch know JS is ready
  audio_ctx = new (window.AudioContext || window.webkitAudioContext)(); // jshint ignore:line
  if (audio_ctx == null) // jshint ignore:line
    audio_ctx = null;  // if "undefined", now null
  if (audio_ctx) {
    MessageQueue.sendAppMessage({"MESSAGE":"Select An Option!"}, null, null);
  } else {
    MessageQueue.sendAppMessage({"MESSAGE":"Audio Failure :("}, null, null);
  }
});


const COMMAND_PLAY_NOTES   = 10; // jshint ignore:line
const COMMAND_CHANGE_CHORD = 11; // jshint ignore:line
const COMMAND_STOP         = 12; // jshint ignore:line
const COMMAND_PLAY_MARIO   = 13; // jshint ignore:line
const COMMAND_PLAY_ZELDA   = 14; // jshint ignore:line
const COMMAND_PLAY_TETRIS  = 15; // jshint ignore:line

Pebble.addEventListener("appmessage", function(e) {
  console.log("App Message Received");
  
  // Received Command from Pebble
  if (typeof e.payload.COMMAND !== 'undefined') {
    var message_text = "unknown error";
    if (!audio_ctx) {
      message_text = "Audio Failure :(";
      
    } else if (e.payload.COMMAND === COMMAND_PLAY_NOTES) {
      message_text = "Beeps!!!";
      play_next_note();
      
    } else if (e.payload.COMMAND === COMMAND_STOP) {
      stop_beeps();
      message_text = "Stopped Music";
      
    } else if (e.payload.COMMAND === COMMAND_CHANGE_CHORD) {
      if (noteTimeout) {    // If playing notes
        change_chord = true;  // Change chord at next loop
        message_text = "Changed Chord";
      } else {               // If not playing notes
        play_next_note();    // start playing notes
        message_text = "Playing Beeps";
      }
      
    } else if (e.payload.COMMAND === COMMAND_PLAY_MARIO) {
      if (mario.playing) {
        mario.stop();
        message_text = "Stopping Mario";
      } else {
        mario.play();
        message_text = "Playing Mario";
      }
      
    } else if (e.payload.COMMAND === COMMAND_PLAY_ZELDA) {
      if (zelda.playing) {
        zelda.stop();
        message_text = "Stopping Zelda";
      } else {
        zelda.play();
        message_text = "Playing Zelda";
      }
      
    } else if (e.payload.COMMAND === COMMAND_PLAY_TETRIS) {
      if (tetris.playing){
        tetris.stop();
        message_text = "Playing Tetris";
      } else {
        tetris.play();
        message_text = "Stopping Tetris";
      }
      
    } else {
      console.log("Received Unknown command from Pebble C: " + e.payload.command);
      message_text = "Unknown Command";
    }
    
    console.log("Command = " + message_text);
    MessageQueue.sendAppMessage({"MESSAGE" : message_text}, null, null); // jshint ignore:line
  }
});


// function send_GPS_position_to_pebble(lat, lon) {
//   var lat_int = Math.round((lat / 360) * GPS_MAX_ANGLE);
//   var lon_int = Math.round((lon / 360) * GPS_MAX_ANGLE);
//   console.log("Sending GPS to pebble: (" + lat + ", " + lon + ") = (" + lat_int + ", " + lon_int + ")");
//   MessageQueue.sendAppMessage({"gps_lat" : lat_int, "gps_lon" : lon_int},
//                               null, //function(){console.log("Successfully sent position to pebble:");},
//                               function(){console.log("Failed sending position to pebble");}
//                              );
// }


/*

var audioContext = new AudioContext();

console.log("audio is starting up ...");

var BUFF_SIZE_RENDERER = 16384;

var microphone_stream = null,
    gain_node = null,
    script_processor_node = null,
    script_processor_analysis_node = null,
    analyser_node = null;

if (!navigator.getUserMedia) {
  console.log("not ok");
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

if (navigator.getUserMedia) {
  console.log("ok...");

  navigator.getUserMedia(
    {audio:true},
    function(stream) {
      console.log("start mic ...");
      start_microphone(stream);
    },
    function(e) {
      console.log('Error capturing audio.');
      console.log("err = " + e.name);
      console.log("err = " + JSON.stringify(e));
    }
  );
  console.log("setup done");
} else {
  console.log('getUserMedia not supported in this browser.'); 
}

// ---

function show_some_data(given_typed_array, num_row_to_display, label) {
  var size_buffer = given_typed_array.length;
  var index = 0;

  console.log("__________ " + label);

  if (label === "time") {
    for (; index < num_row_to_display && index < size_buffer; index += 1) {
      var curr_value_time = (given_typed_array[index] / 128) - 1.0;
      console.log(curr_value_time);
    }
  } else if (label === "frequency") {
    for (; index < num_row_to_display && index < size_buffer; index += 1) {
      console.log(given_typed_array[index]);
    }
  } else {
    throw new Error("ERROR - must pass time or frequency");
  }
}


function process_microphone_buffer(event) {
  var microphone_output_buffer;
  microphone_output_buffer = event.inputBuffer.getChannelData(0);
  // just mono - 1 channel for now
}


function start_microphone(stream){
  gain_node = audioContext.createGain();
  gain_node.connect( audioContext.destination );

  microphone_stream = audioContext.createMediaStreamSource(stream);
  microphone_stream.connect(gain_node); 

  script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE_RENDERER, 1, 1);
  script_processor_node.onaudioprocess = process_microphone_buffer;

  microphone_stream.connect(script_processor_node);

  // --- enable volume control for output speakers

//   document.getElementById('volume').addEventListener('change', function() {

//     var curr_volume = this.value;
//     gain_node.gain.value = curr_volume;

//     console.log("curr_volume ", curr_volume);
//   });

  // --- setup FFT

  script_processor_analysis_node = audioContext.createScriptProcessor(2048, 1, 1);
  script_processor_analysis_node.connect(gain_node);

  analyser_node = audioContext.createAnalyser();
  analyser_node.smoothingTimeConstant = 0;
  analyser_node.fftSize = 2048;

  microphone_stream.connect(analyser_node);

  analyser_node.connect(script_processor_analysis_node);

  var buffer_length = analyser_node.frequencyBinCount;

  var array_freq_domain = new Uint8Array(buffer_length);
  var array_time_domain = new Uint8Array(buffer_length);

  console.log("buffer_length " + buffer_length);

  script_processor_analysis_node.onaudioprocess = function() {

    // get the average for the first channel
    analyser_node.getByteFrequencyData(array_freq_domain);
    analyser_node.getByteTimeDomainData(array_time_domain);

    // draw the spectrogram
    if (microphone_stream.playbackState == microphone_stream.PLAYING_STATE) {

      show_some_data(array_freq_domain, 5, "frequency");
      show_some_data(array_time_domain, 5, "time"); // store this to record to aggregate buffer/file
    }
  };
}
*/

/*
// Test
var myband = require('./band.js');
var conductor = new myband();

conductor.setTimeSignature(4,4);
conductor.setTempo(120);
var piano = conductor.createInstrument();
piano.note('quarter', 'C4');
piano.note('quarter', 'D4');
piano.note('quarter', 'E4');
piano.note('quarter', 'F4');
var player = conductor.finish();
player.play();

*/

