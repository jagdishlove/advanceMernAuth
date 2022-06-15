exports.getPrivateData = (req, res) => {
  res.status(200).json({
    success: true,
    data: "You got access to the private route",
  });
};
