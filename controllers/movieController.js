import Movie from '../models/Movie.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

const createMovie = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    //error
    throw new BadRequestError('Please provide movie title');
  }

  const movie = await Movie.create({ title });
  movie.save();
  res.status(201).json(movie);
};

const getAllMovies = async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json(movies);
};

export { createMovie, getAllMovies };
