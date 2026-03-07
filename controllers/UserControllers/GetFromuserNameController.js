import User from "../../models/UserModel.js";

const GetFromuserName = async (req, res) => {
  const { user_Name } = req.body;

  console.log(user_Name);

  const user = await User.findOne({ user_Name });

  res.json(user);
};

export default GetFromuserName;
