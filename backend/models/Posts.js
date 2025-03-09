const mongoose = require("mongoose");
const HttpError = require("./HttpError");

const Schema = mongoose.Schema;

const Post = new Schema({
  datePosted: { type: Date, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true, maxlength: 200 },
  postImg: { type: String, required: false },
  likes: { type: Number, default: 0 },
  categories: [{ type: String, default: [] }],
  isEdited: { type: Boolean, default: false },
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: { type: String, required: true, maxlength: 500 },
      datePosted: { type: String, required: true },
      likes: { type: Number, default: 0 },
    },
  ],
});

Post.pre("findOneAndDelete", async function (next) {
  const pid = this.getQuery()._id;
  if (!pid) {
    return next();
  }

  try {
    await mongoose.model("User").updateMany(
      { $or: [{ "votes.liked": pid }, { "votes.disliked": pid }] },
      {
        $pull: {
          "votes.liked": pid,
          "votes.disliked": pid,
        },
      }
    );

    next();
  } catch (error) {
    return next(error);
  }
});
module.exports = mongoose.model("Post", Post);
