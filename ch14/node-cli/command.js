#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('./package.json')
const chalk = require('chalk')

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');



const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Template</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>CLI</p>
  </body>
</html>
`;

const routerTemplate = `
const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;
`;

const exist = (dir) => { // 폴더 존제 확인 함수
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => { // 경로 생성 함수
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = (type, name, directory) => { // 템플릿 생성 함수
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else {
    console.error(chalk.bold.red('html 또는 express-router 둘 중 하나를 입력하세요.'));
  }
};



program
  .version(version, '-v, --version')
  .name('cli');

  program.action((cmd, args) => {
    if (args.args.length) {
      console.log(chalk.bold.red('해당 명령어를 찾을 수 없습니다.'));
      program.help();
    } else {
      console.log('hi')
      inquirer.prompt([
        {
          name: 'type',
          message: '템플릿 종류를 선택하세요',
          type: 'list',
          choices: ['html', 'express-router']
        },
        {
          name: 'name',
          message: '파일의 일름을 입력하세요.',
          type: 'input',
          default: 'index'
        },
        {
          name: 'directory',
          message: '파일이 위치할 폴더의 경로를 입력하세요.',
          type: 'input',
          default: '.'
        },
        {
          type: 'confirm',
          name: 'confirm',
          message: '생성하시겠습니까?'
        }
      ])
        .then((answer) => {
          if (answer.confirm) {
            makeTemplate(answer.type, answer.name, answer.directory);
            console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'))
          }
        })
    }
  })
program
  .command('template <type>')
  .usage('<type> --filename [filename] --path [path]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-f, --filename [filename]', '파일명을 입력하세요', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요', '.')
  .action((type, options) => {
    console.log(type, options.filename, options.directory)
    makeTemplate(type, options.filename, options.directory)
  })



program.parse(process.argv);