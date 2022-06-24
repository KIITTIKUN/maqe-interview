const currentDirection = {
  0: 'NORTH',
  1: 'EAST',
  2: 'SOUTH',
  3: 'WEST',
};

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
    if (control === currentControl.turnRight) {
      degrees += 90;
    } else if (control === currentControl.turnLeft) {
      degrees -= 90;
    } else if (control === currentControl.goStraight) {
    } else {
      if (degrees % 360 === 90 || degrees % 360 === -270) {
        x += Number(control);
        direction = 'East';
      } else if (degrees % 360 === 180 || degrees % 360 === -180) {
        y -= Number(control);
        direction = 'South';
      } else if (degrees % 360 === 270 || degrees % 360 === -90) {
        x -= Number(control);
        direction = 'West';
      } else {
        y += Number(control);
        direction = 'North';
      }
    }
  });
  //   for (let index = 0; index < processBot.length; index++) {
  //     let currentDirection = processBot[index];
  //     if (currentDirection === 'R') {
  //       degrees += 90;
  //     } else if (currentDirection === 'L') {
  //       degrees -= 90;
  //     } else if (currentDirection === 'W') {
  //       continue;
  //     } else {
  //       if (degrees % 360 === 90 || degrees % 360 === -270) {
  //         x += Number(currentDirection);
  //         direction = 'East';
  //       } else if (degrees % 360 === 180 || degrees % 360 === -180) {
  //         y -= Number(currentDirection);
  //         direction = 'South';
  //       } else if (degrees % 360 === 270 || degrees % 360 === -90) {
  //         x -= Number(currentDirection);
  //         direction = 'West';
  //       } else {
  //         y += Number(currentDirection);
  //         direction = 'North';
  //       }
  //     }
  //   }

  return {
    x: x,
    y: y,
    direction: direction,
  };
}

console.log(maqeBot('RW15RW1R'));
