import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide movie title'],
      maxlength: 50,
    },
    seats: {
      type: [String],
      default: ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'],
    },
    reservedSeats: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Movie', MovieSchema);
