const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    ironpass: {
      type: String,
      required: true,
      match: [best_bootcamp],
    },
    cohort: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
      default: "url",
    },
    links: [String],
    favorites: [favoriteId],
    projects: [ProjectsId],
    comments: [CommentsId],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
