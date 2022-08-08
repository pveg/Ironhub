const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: [String],
    comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
    },
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;