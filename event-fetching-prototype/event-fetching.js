const fs = require('fs').promises; // Using promises version for fs
const Particle = require('particle-api-js');
const particle = new Particle();
let token;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var cors = require('cors');
app.use(cors());
const PORT = 3001;

app.use(bodyParser.json());

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

    let cedricAtHome = false;
    let maxAtHome = false;
    let LouisAtHome = false;

    //Get events filtered by name
    particle.getEventStream({ name: 'Came home', auth: token }).then(function (stream) {
      stream.on('event', function (data) {
        if (data.data === 'Cedric') {
          cedricAtHome = true;
        } else if (data.data === 'Max') {
          maxAtHome = true;
        } else if (data.data === 'Louis') {
          LouisAtHome = true;
        }
        console.log('Event: ', data);
        console.log(cedricAtHome);
      });
    });

    // leaving event stream:
    particle.getEventStream({ name: 'Left home', auth: token }).then(function (stream) {
      stream.on('event', function (data) {
        if (data.data === 'Cedric') {
          cedricAtHome = false;
        } else if (data.data === 'Max') {
          maxAtHome = false;
        } else if (data.data === 'Louis') {
          LouisAtHome = false;
        }
        console.log('Event: ', data);
        console.log(cedricAtHome);
      });
    });

    app.get('/api/whoIsAtHome', (req, res) => {
      res.send({ cedricAtHome, maxAtHome, LouisAtHome });
    });


    console.log('Devices: ', devices);
  } catch (err) {
    console.log('Error:', err);
  }
}

// Call the async function
loginAndListDevices();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
