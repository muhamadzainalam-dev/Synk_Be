import Post from "../../models/PostModel.js";

const NewPost = async (req, res) => {
  try {
    // Get Data From Frontend
    const { user_Name, content, mediaKey } = req.body;

    // Create New Post Object
    const newPost = new Post({
      user_Name,
      content,
      mediaKey,
    });

    // Save Post To Database
    await newPost.save();

    // Send Success Response To Frontend
    res.status(201).json({
      message: "Post created successfully.",
    });
  } catch (error) {
    // Handle Server Errors
    res.status(500).json({
      message: "Failed to create post.",
      error: error.message,
    });
  }
};

export default NewPost;
