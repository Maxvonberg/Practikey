# Practikey

Smart Key Holder
## Setup

#### Hardware requirements
- Particle Photon
- Webserver ( Hosten auf Laptop für Prototyp )
- Brett ( 3D Drucker )
- Resistors
- Breadboard

#### Tech
- Node server (express.js)
- Web app (react ts)
- Controller C++ 

#### Installation
Run the backend code, with `npm install` and `npm start` 
Run the frontend.
Plug in the particle photon, setup wiring as described.
Use the board. (make sure that the cable has contact to inserted jack plugs)

#### Design - Inspiration
https://www.thingiverse.com/thing:4775253
https://www.thingiverse.com/thing:1776106
https://www.amazon.de/PLABBDPL-Schl%C3%BCsselanh%C3%A4nger-Gitarrenverst%C3%A4rker-Gitarrenstecker-Schl%C3%BCsselanh%C3%A4nger%EF%BC%89/dp/B0BGK8B6VJ/ref=asc_df_B0BGK8B6VJ/?tag=googshopde-21&linkCode=df0&hvadid=650892272566&hvpos=&hvnetw=g&hvrand=5606003219863344556&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1004054&hvtargid=pla-1992588278158&psc=1&th=1&psc=# 
https://www.schoenesding-hh.de/shop/

#### Setup VS Code for particle development
- Install VS Code extension **Particle Workbench**
- Open directory **Code**
- Execute command (ctrl + shift + p) `Particle: Add particle command to path`
- Run command `particle login` in terminal
- Sign in with your information
- device should already be configured (`Code/.vscode/settings.json`)
    `"particle.targetDevice": "IoT"`
    `"particle.firmwareVersion": "2.3.1"`
    `"particle.targetPlatform": "photon"`
- if not you can use the workbench command `install toolchain` and select the firmware version `deviceOS@2.3.1` compatible with photon devices
- when opening an `.ino` file you should be able to run the compile command (check mark), which is required before flashing to your device (needs to be done once at least because the target folder is in gitignore)
- to flash onto the device, use the workbench command `cloud flash`, that should automatically work when everything is correctly set up

#### Current prototype setup
The prototype setup is simple to create, everything is breadboard based and uses simple resistors.
Use analog outputs `A0,A1,A2` as input measures.
Connect ``GND`` and ``3,3V`` source to the corresponding lanes.
Use 220 Ohm Resistors as known resistors (or adapt the code correspondingly in `float knownResistance = 220;`)
The current resistances that are mapped to different people (e.g. Max, Louis, Cedric) are `330, 220, 100`.
When the program is running on particle, you can add and remove these resistors at the corresponding slots. (Insert between ``3.3V`` lane and above known resistor).
This should publish events that can be seen in the Particle console.
Currently the events are `Came home` and `Left home`, followed with name of the person the resistance is mapped to.
Unexpected events can occur due to measurement problems.
Debugging can be done via publishing events `Particle.publish(String(arg))` or with a Serial Monitor.
##### Examplary setup
![[C:\Users\Cedri\OneDrive\Desktop\Studium\Semester 7\IoT\Projekt\images\prototype-setup.jpg]]
