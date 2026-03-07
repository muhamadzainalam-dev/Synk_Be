import User from "../../models/UserModel.js";

const UpdatePfMedia = async (req, res) => {
  const { user_Name, mediaKey } = req.body;

  const user = await User.findOne({ user_Name });

  user.media_Key = mediaKey;

  await user.save();

  res.json({ message: "Updated" });
};

export default UpdatePfMedia;
