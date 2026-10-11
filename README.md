# espruino-zoom-muter

Repo: <https://github.com/georgemandis/espruino-zoom-muter> (this folder is the 2026 refresh of it)

A mute button for Zoom, for people sitting too far from the laptop to reach the shortcut. A Puck.js
running Espruino, three scripts, one button. Two of them are not MIDI at all, which is the point of
keeping them next to the MIDI clicker: the board and the button are the same, only the protocol the
computer sees changes.

| Script | The computer sees | On press | On release |
|---|---|---|---|
| `zoom-mute-button-toggle.js` | a Bluetooth keyboard named `Zoom Mute Toggle` | taps Cmd+Shift+A (Win+Shift+A on Windows) | taps it again |
| `zoom-mute-button-telephony-hid.js` | a Bluetooth headset (HID telephony page, usage Mute) | sends mute report 1 then 0 | the same |
| `zoom-mute-button-midi.js` | a Bluetooth MIDI device named `PuckCC` | CC 80 value 127, `B0 50 7F` | CC 80 value 0, `B0 50 00` |

The keyboard one works with Zoom's default global shortcut; turn on "Enable global shortcut" for
Cmd+Shift+A in Zoom's keyboard settings or it only works while Zoom is in front. It sends the tap on
both edges, so a press mutes and the release unmutes, which is why it is called a toggle and behaves
like push-to-talk. Comment out the falling-edge half for a true toggle.

The telephony one is a proof of concept from 2024, committed as an idea. Whether Zoom honours a mute
report from a Bluetooth headset is untested. It stays here as a record of the attempt.

The MIDI one is new in 2026 and has not been on a Puck yet. It is eleven lines on top of the `ble_midi`
module the clicker has used in talks since 2019, so the risk is low, but it is untested. It needs
something on the computer that turns a CC into a mute: a sketch, a MIDI-to-shortcut utility, or Zoom
itself if it ever grows a MIDI mapping.

## Flash

1. Open the [Espruino Web IDE](https://www.espruino.com/ide/) in Chrome. Connect to the Puck.
2. Paste one of the three scripts and click Send to Espruino. Only one at a time: each sets the
   board's Bluetooth services, and a Puck is one device.
3. Type `save()` in the console.

A Puck that was a keyboard and is now MIDI, or the other way round, needs forgetting and re-pairing on
the computer. Bluetooth caches the old services under the old name.

## Licence

MIT. See `LICENSE`.
