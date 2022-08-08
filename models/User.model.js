const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
    /*   required: true, */
      trim: true,
    },
    surname: {
      type: String,
     /*  required: true, */
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    ironpass: {
      type: String,
      /* required: true, */
    },
    course: {
      type: String,
      /* required: true, */
      enum: ['Web Dev', 'UX/UI', 'Data', 'Cybersecurity']
    },
    campus: {
      type: String,
      /* required: true, */
    },
    profilepicture: {
      type: String,
      default: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    },
    links: [String],
    favorites: [
      {
      type: Schema.Types.ObjectId,
      ref: "Project"
      }
    ],
    projects: [Schema.Types.ObjectId],
    comments: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
