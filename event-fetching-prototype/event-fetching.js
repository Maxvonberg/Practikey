const fs = require('fs').promises;  // Using promises version for fs
const Particle = require('particle-api-js');
const particle = new Particle();
let token;

// Wrap your code in an async function
async function loginAndListDevices() {
  try {
    // Read username and password from files
    const username = await fs.readFile('uname', 'utf8');
    const password = await fs.readFile('pw', 'utf8');

    // Use await to wait for the login to complete
    const loginResponse = await particle.login({ username, password });
    token = loginResponse.body.access_token;

    // Use the obtained token to list devices
    const devices = await particle.listDevices({ auth: token });

    //Get events filtered by name
    particle.getEventStream({ deviceId: 'mine', auth: token }).then(function(stream) {
        stream.on('event', function(data) {
          console.log("Event: ", data);
        });
      });

    console.log('Devices: ', devices);
  } catch (err) {
    console.log('Error:', err);
  }
}

// Call the async function
loginAndListDevices();
