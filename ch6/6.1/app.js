const { ESRCH } = require('constants');
const { resolveSoa } = require('dns');
const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log('모든 요청!');
  next();
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
  next('route')
  // res.json({ hello: 'daegyu lee'});
}, (req, res) => {
  console.log('실행되나요?');
})

app.get('/', (req, res, next) => {
  console.log('실행되나요?');
})

app.post('/', (req, res) => {
  res.send('hello express!');
})

app.get('/category/:name', (req, res) => {
  res.send(`hello ${req.params.name}`)
})

app.get('/about', (req, res) => {
  res.send('hello about');
})

app.get((req, res, next) => {
 res.status(200).send('404 지롱');
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send('에러다 에러!')
})

app.listen(app.get('port'), ()=> {
  console.log('익스프레스 서버 실행');
});