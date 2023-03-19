require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path')
// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const hpp = require('hpp');

// Swagger && YAML
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

// connentDB
const connentDB = require('./db/connect');
const authenticationUser = require('./middleware/authentications');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');


// Error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Enable other domains to access your application
app.use(cors());

// Compress all responses
app.use(compression());

// MiddleWare to parser request to json
app.use(express.json());



// To remove data using these defaults, To apply data sanitization
// nosql mongo injection
app.use(mongoSanitize());



app.use(helmet());
// To sanitize user input coming from POST body, GET queries, and url params  ex: '<script></script>' to convert string ''&lt;script>&lt;/script>''
app.use(xssClean());

app.use(expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes,
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message:
  'Too many accounts created from this IP, please try again after an 15 minutes'
}))



// Express middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

app.get('/', (req, res, next) => {
  res.redirect('/api-docs');
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));




// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationUser, jobsRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 1812;
const start = async () => {
  try {
    await connentDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server Listen In http://localhost:${port}`));
  } catch (error) {
    console.log(error)
  }
};

start()