import express from 'express';
const router = express.Router();

import { createMovie, getAllMovies } from '../controllers/movieController.js';

router.post('/', createMovie);
router.get('/', getAllMovies);

export default router;
