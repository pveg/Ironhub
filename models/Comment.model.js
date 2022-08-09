const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
      project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
      },
        author: {
          type: String,
        },
        comment: {
        },
      },
  {
    timestamps: true,
  },
  { typeKey: '$type' }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;