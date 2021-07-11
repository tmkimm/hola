import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    rating : Number,
    content: String
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export { Feedback };
