import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  user_Name: { type: String, required: true },
  content: { type: String, required: true },
  mediaKey: { type: String },
  like: [{ type: String }],
  date_Uploaded: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema, "Synk_Post_COL");
export default Post;
