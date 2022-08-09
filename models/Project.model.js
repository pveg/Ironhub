const { Schema, model } = require("mongoose");

function removeHttp (link) {
  if(link.indexOf('https://') === 0){
    return link.substring(8)
  } else if (link.indexOf('http://') === 0){
    return link.substring(7);
} else{
    return link;
  }
}

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
      set: removeHttp
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



const Project = model("Project", projectSchema);

module.exports = Project;