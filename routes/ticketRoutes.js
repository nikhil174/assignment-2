import express from 'express';
const router = express.Router();

import {
  createTicket,
  getAllTickets,
} from '../controllers/ticketController.js';

router.post('/', createTicket);
router.get('/', getAllTickets);

export default router;
