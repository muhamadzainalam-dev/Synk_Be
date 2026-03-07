import Post from "../../models/PostModel.js";

const SetLike = async (req, res) => {
  const { id, username } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { like: username } },
      { returnDocument: "after" },
    );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);

    res.json({ message: "An Error Occured" });
  }
};

export default SetLike;
