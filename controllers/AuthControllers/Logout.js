const Logout = (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error:", error);

    res.status(500).json({
      message: "Logout failed",
    });
  }
};

export default Logout;
