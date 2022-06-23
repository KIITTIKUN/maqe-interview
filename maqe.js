
[0,1,2,3]
const direction = {
    NORTH : 0,
    EAST : 1,
    SOUTH : 2,
    WEST : 3,
} 
// DRY = Don't repeat yourself 
const directionStr = {
    NORTH : 0,
    EAST : 1,
    SOUTH : "South",
    WEST : 3,
} 

/* 
1. Verbose
    Ex: degree
2. Don't repeat yourself => Fn, variable instead of hard coding
3. We should prefer Array.method instead of normal loop
4. Using unit testing instead of normal switch cases 
    Ex: Jest
*/

const assignMaqeBotByValue = (value, index) => {
    if(maqeBot[index] === ''){
        maqeBot.splice(index, 1)
    } else {
        maqeBot.splice(index,0);
    }
}

function maqe(control){
    //assign valiables degree, x , y
    let deg = 0, x = 0, y = 0, direction = '';

    const matchQuadraL = /LLLL/g
    const matchEmail = /\S+@\w+.com/g
    
    //preparewastecontrol By Regular Expression
    let prepareControl  = control.replace(matchQuadraL,'').replace(/RRRR/g,'').replace(/RL/g,'').replace(/LR/g,''); 

    //create array for maqeBot
    const maqeBot = prepareControl.split(/(\D)/);
// console.log(maqeBot)
    //filter 
    for (let index in maqeBot){
        maqeBot[index] === '' ? maqeBot.splice(index,1): maqeBot.splice(index,0);
        // maqeBot[undefined]
    }
// console.log(maqeBot)
    

    //process maqeBot
    // maqeBot[index] = currentDirection
    for(let index = 0; index < maqeBot.length; index++){
        let currentDirection = maqeBot[index]
        if(currentDirection === 'R'){ 
        //Turn Right
            deg += 90;
        } else if(currentDirection === 'L'){ 
        //Turn Left
            deg -= 90;
        } else if(currentDirection === 'W'){ 
        //Go straigth
            index++;
            currentDirection = maqeBot[index]
            if(deg % 360 === 90 || deg % 360 === -270){  
                x += Number(currentDirection);
                direction = 'East';
            } else if(deg % 360 === 180 || deg % 360 === -180){
                y -= Number(currentDirection);
                direction = 'South';
            } else if(deg % 360 === 270 || deg % 360 === -90){
                x -= Number(currentDirection);
                direction = 'West';
            } else {
                y += Number(currentDirection);
                direction = 'North';
            }
        }
    }  


    return {
        x : x,
        y : y,
        direction: direction
    };
}


function choiceTest(arr,choice){
    let isValid = false, testLocate = arr[choice];
    switch(choice){
        case 0: 
            isValid = testLocate.x === 15 && testLocate.y === -1 && testLocate.direction === 'South' ;
            break;
        case 1: 
            isValid = testLocate.x === 4 && testLocate.y === 3 && testLocate.direction === 'West' ;
            break; 
        case 2: 
            isValid = testLocate.x === 7 && testLocate.y === -12 && testLocate.direction === 'South' ;
            break;
        case 3: 
            isValid = testLocate.x === -210 && testLocate.y === -150 && testLocate.direction === 'West' ;
            break;
        case 4: 
            isValid = testLocate.x === -99 && testLocate.y === 88 && testLocate.direction === 'North' ;
            break; 
        case 5: 
            isValid = testLocate.x === 1000000 && testLocate.y === 55555 && testLocate.direction === 'East' ;
            break;
    }
    return isValid;     
}

// const location = [maqe('RW15RW1'), maqe('W5RW5RW2RW1R'), maqe('RRW11RLLW19RRW12LW1'), maqe('LLW100W50RW200W10'), maqe('LLLLLW99RRRRRW88LLLRL'), maqe('W55555RW555555W444444W1')];
// console.log(`1: at location X:${location[0].x}, Y:${location[0].y}, direction: ${location[0].direction},\t\t validate: ${choiceTest(location,0)? 'valid':'invalid'}`) // actual {x: 4 ,y: 3} expected {x: 4 ,y: 3} (valid)
// console.log(`2: at location X:${location[1].x}, Y:${location[1].y}, direction: ${location[1].direction},\t\t validate: ${choiceTest(location,1)? 'valid':'invalid'}`) // actual {x: 15 ,y: -1} expected {x: 15 ,y:-1} (valid)
// console.log(`3: at location X:${location[2].x}, Y:${location[2].y}, direction: ${location[2].direction},\t\t validate: ${choiceTest(location,2)? 'valid':'invalid'}`) // actual {x: 7 ,y: -12} expected {x: 7 ,y:-12} (valid)
// console.log(`4: at location X:${location[3].x}, Y:${location[3].y}, direction: ${location[3].direction},\t\t validate: ${choiceTest(location,3)? 'valid':'invalid'}`) // actual {x: -210 ,y:-150} expected {x: -210 ,y:-150} (valid)
// console.log(`5: at location X:${location[4].x}, Y:${location[4].y}, direction: ${location[4].direction},\t\t validate: ${choiceTest(location,4)? 'valid':'invalid'}`) // actual {x: -99 ,y:88} expected {x:-99 ,y:y:88} (valid)
// console.log(`6: at location X:${location[5].x}, Y:${location[5].y},\ direction: ${location[5].direction},\t\t validate: ${choiceTest(location,5)? 'valid':'invalid'}`) // actual {x: 1000000 ,y:55555} expected {x: 1000000 ,y:-55555} (valid)

console.log(maqe('RW15RW1R'))



