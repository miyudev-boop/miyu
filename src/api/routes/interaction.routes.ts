import { Router } from 'express';
import { InteractionController } from '../controllers/interaction.controller';

const router = Router();
const interactionController = new InteractionController();

router.post('/query', interactionController.handleQuery.bind(interactionController));
router.post('/telegram', interactionController.sendTelegramMessage.bind(interactionController));
router.post('/twitter', interactionController.postTweet.bind(interactionController));

export default router;

