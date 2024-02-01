int analogMeasurePins = A0;
float measures[3];
const float Vin = 3.3;
float knownResistance = 220;
float tolerance = 40.0;

enum Key {
  Louis = 100,
  Max = 210,
  Cedric = 315

};

bool maxAtHome = false;
bool louisAtHome = false;
bool cedricAtHome = false;

void setup(){
  for(unsigned int i = 0; i < 3; i++) {  
    pinMode(analogMeasurePins, INPUT);
  }
}

float measureResistance(int measurePin) {
  float buffer = 0;
  float Vout = 0;
  int raw = 0;
  float measuredResistance = 0;
  raw = analogRead(measurePin);
  if(raw){
    buffer = raw * Vin;
    Vout = (buffer)/4096.0;
    buffer = (Vin/Vout) - 1;
    measuredResistance = knownResistance * buffer;
  }
  return measuredResistance;
}

void checkIsHome(bool* oldState, bool newState, const char* name) {
  if(newState != *oldState) {
    if(!newState) {
      Particle.publish("Left home", name);
    } else {
      Particle.publish("Came home", name);
    }
  }
  *oldState = newState;
}

bool isKeyInserted(float measure, float resistanceToCheck) {
    return (measure >= resistanceToCheck - tolerance && measure <= resistanceToCheck + tolerance);
}

void loop(){
  bool checkLouisAtHome = false;
  bool checkMaxAtHome = false;
  bool checkCedricAtHome = false;

  int measure = measureResistance(analogMeasurePins); 
  Particle.publish("Resistance measured: ", String(measure));
  if(!checkLouisAtHome) {
      checkLouisAtHome = isKeyInserted(measure, Louis);
  }
  if(!checkMaxAtHome) {
      checkMaxAtHome = isKeyInserted(measure, Max);
  }
  if(!checkCedricAtHome) {
      checkCedricAtHome = isKeyInserted(measure, Cedric);
  }
  delay(500);
  checkIsHome(&louisAtHome, checkLouisAtHome, "Louis");
  checkIsHome(&cedricAtHome, checkCedricAtHome, "Cedric");
  checkIsHome(&maxAtHome, checkMaxAtHome, "Max");
}
