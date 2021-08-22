#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  optput: process.stdout
})

console.clear();
const answerCallback = (answer) => {
  if (answer == 'y') {
    console.log('감사')
    rl.close();
  } else if (answer == 'n') {
    console.log('죄송');
    rl.close();
  } else {
    console.log('y나 n만 입력하시오.')
    rl.question('예제가 재미있습니까? (y/s)', answerCallback)
  }
}

rl.question('예제가 재미있습니까? (y/s)', answerCallback)