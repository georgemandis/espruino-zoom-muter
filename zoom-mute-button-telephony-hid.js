/**
 * A Zoom Mute Button Toggle
 * ==
 * For those a little too far away from their computers to press the
 * keyboard shortcut themselves.
 *
 * This will toggle your mute button on and off on Zoom by sending a
 * microphone mute/unmute signal to your computer after the device
 * registers itself as a Telephony HID device
 */

// Define HID report for Telephony Control (mute)
var telephonyHID = [
    0x05, 0x0B,       // Usage Page (Telephony Devices)
    0x09, 0x05,       // Usage (Headset)
    0xA1, 0x01,       // Collection (Application)
    0x09, 0x02,       // Usage (Mute)
    0x15, 0x00,       // Logical Minimum (0)
    0x25, 0x01,       // Logical Maximum (1)
    0x75, 0x01,       // Report Size (1)
    0x95, 0x01,       // Report Count (1)
    0x81, 0x02,       // Input (Data, Variable, Absolute)
    0xC0              // End Collection
];

// Set services for Telephony HID
NRF.setAdvertising({}, { name: "Zoom Mute Toggle" });
NRF.setServices(undefined, { hid: telephonyHID });


function toggleMicrophoneMute() {
    // Send the mute toggle command
    NRF.sendHIDReport([1], function () {
        // Release the button (send 0)
        NRF.sendHIDReport([0]);
    });
}

let ledOn = false;

setWatch(
    function () {
        ledOn = !ledOn
        toggleMicrophoneMute();
    },
    BTN,
    { edge: "both", debounce: 50, repeat: true }
);
