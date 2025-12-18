import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import portfolioRoutes from './routes/portfolio.route';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/portfolio', portfolioRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

export default app;
