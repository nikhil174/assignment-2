import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    movieId: {
      type: mongoose.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'please provide movie'],
    },
    seat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Ticket', TicketSchema);
