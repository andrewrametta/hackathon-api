const express = require("express");
const uploadRouter = express.Router();
const { cloudinary } = require("../../utilities/cloudinary");

uploadRouter.route("/").post((req, res, next) => {
  const fileString = req.body.data;
  cloudinary.uploader
    .upload(fileString, {
      upload_preset: "blackjack",
      timeout: 100000,
    })
    .then((img) => {
      res.status(201).send(img);
    })
    .catch(next);
});

module.exports = uploadRouter;
