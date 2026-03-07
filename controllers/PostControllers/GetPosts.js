import Post from "../../models/PostModel.js";

const GetPosts = async (req, res) => {
  // Fetch All Posts From Database
  const posts = await Post.find({}).sort({ date_Uploaded: -1 });

  Post.updateMany({ like: 0 }, { $set: { like: [] } });

  // Send Posts Data To Frontend
  res.status(200).json({
    message: "Posts fetched successfully.",
    data: posts,
  });
};

export default GetPosts;
