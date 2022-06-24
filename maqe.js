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
const buildArrayForBot = (string) => {
  return string.split(/(\D)/);
};

const cutNullString = (controlString, index, arrayBot) => {
  return controlString === ''
    ? arrayBot[index].splice(index, 1)
    : arrayBot[index].splice(index, 0);
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

  const process = buildArrayForBot(prepareControl);

  process.forEach(cutNullString());

  //   for (let index = 0; index < process.length; index++) {
  //     let currentDirection = process[index];
  //     if (currentDirection === 'R') {
  //       degrees += 90;
  //     } else if (currentDirection === 'L') {
  //       degrees -= 90;
  //     } else if (currentDirection === 'W') {
  //       index++;
  //       currentDirection = process[index];
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
    process,
  };
}

console.log(maqeBot('RW15RW1R'));
