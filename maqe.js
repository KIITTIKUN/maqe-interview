const direction = {
  0: 'NORTH',
  1: 'EAST',
  2: 'SOUTH',
  3: 'WEST',
};

const assignMaqeBotByValue = (value, index) => {
  if (maqeBot[index] === '') {
    maqeBot.splice(index, 1);
  } else {
    maqeBot.splice(index, 0);
  }
};

function maqe(control) {
  let deg = 0,
    x = 0,
    y = 0,
    direction = '';

  const matchQuadraL = /LLLL/g;

  let prepareControl = control
    .replace(matchQuadraL, '')
    .replace(/RRRR/g, '')
    .replace(/RL/g, '')
    .replace(/LR/g, '');

  const maqeBot = prepareControl.split(/(\D)/);

  for (let index in maqeBot) {
    maqeBot[index] === '' ? maqeBot.splice(index, 1) : maqeBot.splice(index, 0);
  }

  for (let index = 0; index < maqeBot.length; index++) {
    let currentDirection = maqeBot[index];
    if (currentDirection === 'R') {
      deg += 90;
    } else if (currentDirection === 'L') {
      deg -= 90;
    } else if (currentDirection === 'W') {
      index++;
      currentDirection = maqeBot[index];
      if (deg % 360 === 90 || deg % 360 === -270) {
        x += Number(currentDirection);
        direction = 'East';
      } else if (deg % 360 === 180 || deg % 360 === -180) {
        y -= Number(currentDirection);
        direction = 'South';
      } else if (deg % 360 === 270 || deg % 360 === -90) {
        x -= Number(currentDirection);
        direction = 'West';
      } else {
        y += Number(currentDirection);
        direction = 'North';
      }
    }
  }

  return {
    x: x,
    y: y,
    direction: direction,
  };
}

console.log(maqe('RW15RW1R'));
