require('dotenv').config();
const app = require('./app');
const connectDb = require('./config/db');
const { ensureCatalog } = require('./services/catalogService');

const port = process.env.PORT || 5000;
connectDb()
    .then(ensureCatalog)
    .then(() => app.listen(port, () => console.log(`PESUFOODS API listening on http://localhost:${port}`)))
    .catch((error) => {
        console.error('Unable to start server', error);
        process.exit(1);
    });
