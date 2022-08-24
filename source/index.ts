
import cors from 'cors';
import express from 'express';
import morgan from "morgan";
import gameRoutes from './routes/game';

export const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.get('/health', (req, res) => {
  res.json({ status: 'up' });
});

app.use('/v1/game', gameRoutes);


