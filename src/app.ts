import 'dotenv/config';
import express from 'express';
import apiRouter from './routes/index.ts';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});