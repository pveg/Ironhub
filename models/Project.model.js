const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    image: {
      type: String,
    },
    title: {
      type: String,
/*       required: true, */
    },
    description: {
      type: String,
/*       required: true, */
    },
    link: {
      type: String,
    },
    comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
    },
  },
  {
    timestamps: true,
  }
);

/* projectSchema.path('link').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.'); */

const Project = model("Project", projectSchema);

module.exports = Project;