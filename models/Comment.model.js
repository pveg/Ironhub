const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
      project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
      },
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        comment: {
          type: String,
          required: true
        },
      },
  {
    timestamps: true,
  },
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;