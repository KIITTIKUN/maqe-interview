const matchUnnecessary = {
  quadraL: /LLLL/g,
  quadraR: /RRRR/g,
  controlRL: /RL/g,
  controlLR: /LR/g,
};

const reduceControl = (control) => {
  return control
    .replace(matchUnnecessary.controlLR, '')
    .replace(matchUnnecessary.controlRL, '')
    .replace(matchUnnecessary.quadraL, '')
    .replace(matchUnnecessary.quadraR, '');
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

const checkFinalDirectionByDegrees = (degrees) => {
  return isEast(degrees)
    ? 'East'
    : isSouth(degrees)
    ? 'South'
    : isWest(degrees)
    ? 'West'
    : 'North';
};
function maqeBot(control) {
  let degrees = 0,
    x = 0,
    y = 0,
    direction = '';

  let prepareControl = reduceControl(control);
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
  direction = checkFinalDirectionByDegrees(degrees);
  return {
    x: x,
    y: y,
    direction: direction,
  };
}

console.log(maqeBot('RW15RW1R'));
console.log(maqeBot('LLLRLRRRLRLLRLLL'));
