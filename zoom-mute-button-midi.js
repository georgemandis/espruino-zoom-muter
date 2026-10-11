// The Zoom mute button as MIDI instead of a keyboard. Same Puck.js, same button, different protocol.
// Press: CC 80 value 127. Release: CC 80 value 0. Whatever is listening decides what "mute" means.
//
// CHANNEL is zero-based, as the ble_midi module wants it: 0 is channel 1 on a one-based display.
// Advertises as "PuckCC". Pair it in Audio MIDI Setup (macOS) or Settings, Bluetooth (Windows).
const CHANNEL = 0;        // change this: 0..15
const CONTROLLER = 80;    // change this

const midi = require("ble_midi");
midi.init();

setWatch(function () {
  LED3.set();
  midi.send(CHANNEL, CONTROLLER, 127);
}, BTN, { edge: "rising", debounce: 50, repeat: true });

setWatch(function () {
  LED3.reset();
  midi.send(CHANNEL, CONTROLLER, 0);
}, BTN, { edge: "falling", debounce: 50, repeat: true });
