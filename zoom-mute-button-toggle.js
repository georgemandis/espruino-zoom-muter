/**
 * A Zoom Mute Button Toggle
 * ==
 * For those a little too far away from their computers to press the
 * keyboard shortcut themselves.
 *
 * This will toggle your mute button on and off on Zoom by sending 2
 * key presses of GUI+Shift+A:
 *  - 1 when you press the button down ("rising")
 *  - 1 when you release the button ("falling")
 */

const kb = require("ble_hid_keyboard");

// Set the name for our Zoom Mute Button
NRF.setAdvertising({}, { name: "Zoom Mute Toggle" });

// Advertising the HID service so it's recognized as a BLE keyboard
NRF.setServices(undefined, { hid: kb.report });

function sendKB(ledOn) {
  kb.tap(kb.KEY.A, kb.MODIFY.SHIFT + kb.MODIFY.GUI, function () {
    ledOn ? LED3.set() : LED3.reset();
    console.log("Pressing GUI+Shift+A");
  });  
}

setWatch(
  function () {
    sendKB(true);
  },
  BTN,
  { edge: "rising", debounce: 150, repeat: true }
);
setWatch(
  function () {
    sendKB(false);
  },
  BTN,
  { edge: "falling", debounce: 150, repeat: true }
);
