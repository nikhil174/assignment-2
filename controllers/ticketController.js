import Movie from '../models/Movie.js';
import Ticket from '../models/Ticket.js';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createTicket = async (req, res) => {
  const { name, phone, movieId, seat } = req.body;
  if (!name || !phone || !movieId || !seat) {
    throw new BadRequestError('Please provide all values');
  }

  // checking if the movie is present
  const movieExist = await Movie.findOne({ _id: movieId });
  if (!movieExist) {
    throw new NotFoundError('Movie not found');
  }

  //checking if the seat exists
  let seatExist = false;
  movieExist.seats.forEach((item) => {
    if (item === seat) seatExist = true;
  });

  if (!seatExist) {
    throw new BadRequestError('Seat does not exist');
  }

  //checking if the seat is already booked
  let seatBooked = false;

  movieExist.reservedSeats.forEach((item) => {
    if (item === seat) seatBooked = true;
  });

  if (seatBooked) {
    throw new BadRequestError('Seat already booked');
  }

  //creating session for updating Movie Seat and Ticket.
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const movie = await Movie.findOne({ _id: movieId }).session(session);
    movie.reservedSeats.push(seat);

    const ticket = await Ticket.create([{ name, phone, movieId, seat }], {
      session,
    });

    await movie.save();
    await ticket.save();

    session.commitTransaction();
    session.endSession();
    res.status(StatusCodes.CREATED).json(ticket);
  } catch (error) {
    session.endSession();
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error });
  }
};
const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find({});
  res.status(StatusCodes.OK).json(tickets);
};

export { createTicket, getAllTickets };
