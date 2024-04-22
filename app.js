require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const regionRouter = require('./routes/region');
const whatsappBotRouter = require('./routes/whatsappbot');
const complaintRouter = require('./routes/complaint');
const pmbonlineRouter = require('./routes/pmbonline');
const historyRouter = require('./routes/history');
const psikologiRouter = require('./routes/psikologi');

const helpdeskRouter = require('./routes/helpdesk');

const misilRouter = require('./routes/misil');
const applicantsRouter = require('./routes/applicants');

const whatsappRouter = require('./routes/whatsapp/whatsapp');

const eventsMemberRouter = require('./routes/events/member');

const scholarshipCategoriesRouter = require('./routes/scholarship/categories');
const scholarshipQuestionsRouter = require('./routes/scholarship/questions');
const scholarshipRecordsRouter = require('./routes/scholarship/records');
const scholarshipAnswersRouter = require('./routes/scholarship/answers');
const scholarshipHistoriesRouter = require('./routes/scholarship/histories');
const whatsappBlastClientOneRouter = require('./routes/whatsapp-blast/clientone');

const dashboardProgram = require('./routes/dashboard/program');

const paudRouter = require('./routes/paud');

const app = express();

app.use(logger('dev'));

app.use((req, res, next) => {
  const allowedOrigins = [
    'https://paud-client.vercel.app',
    'https://database.politekniklp3i-tasikmalaya.ac.id',
    'https://pmb.politekniklp3i-tasikmalaya.ac.id',
    'https://helpdesk.politekniklp3i-tasikmalaya.ac.id',
    'https://presence.politekniklp3i-tasikmalaya.ac.id',
    'https://sbpmb.politekniklp3i-tasikmalaya.ac.id',
    'https://politekniklp3i-tasikmalaya.ac.id',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5500'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowedOrigins = [
      'https://paud-client.vercel.app',
      'https://database.politekniklp3i-tasikmalaya.ac.id',
      'https://presence.politekniklp3i-tasikmalaya.ac.id',
      'https://helpdesk.politekniklp3i-tasikmalaya.ac.id',
      'https://pmb.politekniklp3i-tasikmalaya.ac.id',
      'https://sbpmb.politekniklp3i-tasikmalaya.ac.id',
      'https://politekniklp3i-tasikmalaya.ac.id',
      'https://siruang.politekniklp3i-tasikmalaya.ac.id',
      'http://127.0.0.1:8000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5500',
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'gateway',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/region', regionRouter);
app.use('/whatsappbot', whatsappBotRouter);
app.use('/complaint', complaintRouter);
app.use('/pmbonline', pmbonlineRouter);
app.use('/history', historyRouter);
app.use('/psikologi', psikologiRouter);
app.use('/misil', misilRouter);

app.use('/helpdesk', helpdeskRouter);

app.use('/applicants', applicantsRouter);

app.use('/whatsapp', whatsappRouter);

app.use('/events/members', eventsMemberRouter);

app.use('/scholarship/categories', scholarshipCategoriesRouter);
app.use('/scholarship/questions', scholarshipQuestionsRouter);
app.use('/scholarship/records', scholarshipRecordsRouter);
app.use('/scholarship/answers', scholarshipAnswersRouter);
app.use('/scholarship/histories', scholarshipHistoriesRouter);

app.use('/whatsapp-blast/clientone', whatsappBlastClientOneRouter);

app.use('/dashboard/program', dashboardProgram);

app.use('/paud', paudRouter);

module.exports = app;
