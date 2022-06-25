const matchUnnecessary = {
  quadraL: /LLLL/g,
  quadraR: /RRRR/g,
  controlRL: /RL/g,
  controlLR: /LR/g,
};

const cutNullString = (control, index, process) => {
  return control === '' ? process.splice(index, 1) : process.splice(index, 0);
};

const buildArrayForBot = (string) => {
  let arrayControlBot = string.split(/(\D)/);
  arrayControlBot.forEach(cutNullString);
  return arrayControlBot;
};

const currentControl = {
  turnRight: 'R',
  turnLeft: 'L',
  goStraight: 'W',
};

const isEast = (degrees) => {
  return degrees % 360 === 90 || degrees % 360 === -270;
};

const isSouth = (degrees) => {
  return degrees % 360 === 180 || degrees % 360 === -180;
};

const isWest = (degrees) => {
  return degrees % 360 === 270 || degrees % 360 === -90;
};

const isTurnRight = (control) => {
  return control === currentControl.turnRight;
};
const isTurnLeft = (control) => {
  return control === currentControl.turnLeft;
};
const isGoStraight = (control) => {
  return control === currentControl.goStraight;
};

function maqeBot(control) {
  let degrees = 0,
    x = 0,
    y = 0,
    direction = '';

  let prepareControl = control
    .replace(matchUnnecessary.quadraL, '')
    .replace(matchUnnecessary.quadraR, '')
    .replace(matchUnnecessary.controlRL, '')
    .replace(matchUnnecessary.controlLR, '');

  const processBot = buildArrayForBot(prepareControl);

  processBot.forEach(function (control) {
    if (isTurnRight(control)) {
      degrees += 90;
    } else if (isTurnLeft(control)) {
      degrees -= 90;
    } else if (isGoStraight(control)) {
    } else {
      if (isEast(degrees)) {
        x += Number(control);
      } else if (isSouth(degrees)) {
        y -= Number(control);
      } else if (isWest(degrees)) {
        x -= Number(control);
      } else {
        y += Number(control);
      }
    }
  });
  isEast(degrees)
    ? (direction = 'East')
    : isSouth(degrees)
    ? (direction = 'South')
    : isWest(degrees)
    ? (direction = 'West')
    : (direction = 'North');

  return {
    x: x,
    y: y,
    direction: direction,
  };
}

console.log(maqeBot('RW15RW1R'));
console.log(maqeBot('RW10RW10'));
console.log(maqeBot('RW15RW1'));
