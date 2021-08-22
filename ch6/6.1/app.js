const { ESRCH } = require('constants');
const { resolveSoa } = require('dns');

const dotenv = require('dotenv');
dotenv.config();
const indexRouter = require('./routes/index')

const fs = require('fs')
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
  },
}));
app.use('/', (req, res, next) => {
  if (req.session, id) {
    express.static(paht.join(__dirname, 'public-3030'))(req, res, next)
  } else {
    next()
  }
}); // 미들웨어 확장법 

app.use(multer().array());

app.use((req, res, next) => {
  req.session.data = '비번'; // 계속 남아있는 데이터
  req.data = '비번'; // 일회성 데이터
})


// app.use('/', indexRouter); // router 분리

app.get('/', (req, res, next) => {
  // req.cookies // { mycookie: 'test }
  // req.signedCookies;

  // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
  // res.cookie('name', encodeURIComponent(name),{
  //   expires: new Date(),
  //   httpOnly: true,
  //   path: '/'
  // })
  // res.clearCookie('name', encodeURIComponent(name),{
  //   httpOnly: true,
  //   path: '/'
  // })
  // res.json({ hello: 'daegyu lee'});

  req.session.data; // 비번
  req.data; // 비번
  res.sendFile(path.join(__dirname, 'index.html'))
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

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.log('no upload folder');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = file.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
})

app.get('/uploads', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'))
})
app.get('/uploads', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok')
})

app.get((req, res, next) => {
  res.status(404).send('404 지롱');
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send('에러다 에러!')
})

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});