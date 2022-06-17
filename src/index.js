import express from 'express';
import Routes from './catalogue/routes';
import './db';
const app = express();

app.use(express.json());
app.use('/api/v1/', Routes);

app.listen(process.env.PORT || 3000);

export default app;
