int analogMeasurePins[] = {A0, A1, A2};
float measures[3];
const float Vin = 3.3;
float knownResistance = 220;

enum Key {
  Louis = 100,
  Max = 220,
  Cedric = 325
};

bool maxAtHome = false;
bool louisAtHome = false;
bool cedricAtHome = false;

void setup(){
  for(unsigned int i = 0; i < 3; i++) {  
    pinMode(analogMeasurePins[i], INPUT);
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

void loop(){
  bool checkLouisAtHome = false;
  bool checkMaxAtHome = false;
  bool checkCedricAtHome = false;
  
  for(unsigned int i = 0; i < 3; i++) {  
    int measure = measureResistance(analogMeasurePins[i]); 
    if(measure >= Louis - 5 && measure <= Louis + 5) {
      checkLouisAtHome = true;
    } else if (measure >= Max - 5 && measure <= Max + 5) {
      checkMaxAtHome = true;
    } else if (measure >= Cedric - 5 && measure <= Cedric + 5) {
      checkCedricAtHome = true;
    }
    delay(500);
  }
  checkIsHome(&louisAtHome, checkLouisAtHome, "Louis");
  checkIsHome(&cedricAtHome, checkCedricAtHome, "Cedric");
  checkIsHome(&maxAtHome, checkMaxAtHome, "Max");
}