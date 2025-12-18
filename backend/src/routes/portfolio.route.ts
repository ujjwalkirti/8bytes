import { Router } from 'express';
import { getPortfolioHoldings } from '../controllers/portfolio.controller';

const router = Router();

router.get('/', getPortfolioHoldings);

export default router;
