import { Router } from 'express';
import { AdvancedController } from '../controllers/advanced.controller';

const router = Router();
const advancedController = new AdvancedController();

router.post('/ai-interact', advancedController.aiInteract.bind(advancedController));
router.post('/transaction', advancedController.handleTransaction.bind(advancedController));
router.get('/balance', advancedController.getWalletBalance.bind(advancedController));

export default router;

