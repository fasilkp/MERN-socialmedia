import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import { unlink } from 'node:fs';



export const postDetails = (req, res) => {
  res.send("post controller created");
};

export const uploadFileResponse = (req, res) => {
  if (!req.file) {
    return res.status(500).json({
      success: false,
    });
  }
  return res.status(201).json({
    success: true,
    fileName: req.file.filename,
  });
};
export const uploadPost = async (req, res) => {
  const { postSrc, description, userId, userName, name } = req.body;
  const newPost = new PostModel({
    name,
    postSrc,
    description,
    userId,
    userName,
  });
  newPost.save((err) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "post upload failed", error: err });
  });
  return res
    .status(201)
    .json({ success: true, message: "post upload successfull", post: newPost });
};
export const editPost = async (req, res) => {
  const { id, description } = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(id, {
      $set: { description: description },
    });
    return res
      .status(201)
      .json({ success: true, message: "post update successfull" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
export const deletePost = async (req, res) => {
  const { id, postSrc } = req.query;
  PostModel.deleteOne({ _id: id }, function (err, result) {
    if (err)
      return res.json({ err: true, error: err, message: "mongoose err" });
    else{
        unlink('images/postImages/'+postSrc, (err) => {
            // if (err) throw err;
            console.log('successfully deleted /tmp/hello');
          });
        return res.json({ message: result });
      }
  });
};

export const viewPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find({}).sort({ uploadedAt: "desc" });
    return res.status(200).json({ success: true, allPosts });
  } catch (error) {
    res.status(500).json({ success: false, error, message: "server error" });
  }
};
export const editProfilePicture = async (req, res) => {
  const { src, id } = req.body;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { image: src } },
      { upsert: true }
    );
    return res
      .status(201)
      .json({ success: true, message: "profile picture updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
export const profilePosts = async (req, res) => {
  const { userName } = req.query;
  try {
    const allPosts = await PostModel.find({ userName: userName });
    res.status(200).json(allPosts);
  } catch (error) {
    res
      .status(500)
      .json({ err: true, body: error, message: "catch block error" });
  }
};
export const viewPost = async (req, res) => {
  const { postId } = req.query;
  try {
    const post = await PostModel.findOne({ _id: postId });
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ err: true, body: error, message: "catch block error" });
  }
};
export const likePost = async (req, res) => {
  const { postId, likedId } = req.body;
  await PostModel.findByIdAndUpdate(
    { _id: postId },
    {
      $addToSet: {
        likes: likedId,
      },
    },
    {
      function(err) {
        if (err)
          return res
            .status(500)
            .json({ err: true, error: err, message: "liking failed" });
      },
    }
  );
  return res.status(201).json({ success: true });
};
export const unLikePost = async (req, res) => {
  const { postId, likedId } = req.body;
  await PostModel.findByIdAndUpdate(
    { _id: postId },
    {
      $pull: {
        likes: likedId,
      },
    },
    {
      function(err) {
        if (err)
          return res
            .status(500)
            .json({ err: true, error: err, message: "unliking failed" });
      },
    }
  );
  return res.status(201).json({ success: true });
};
export const addComment = async (req, res) => {
  const { postId, comment, userId } = req.body;
  await PostModel.findByIdAndUpdate(
    { _id: postId },
    {
      $push: {
        comments: {
          comment,
          userId,
          likes: [],
          date: new Date()
        },
      },
    },
    {
      function(err) {
        if (err)
          return res
            .status(500)
            .json({ err: true, error: err, message: "commenting failed" });
      },
    }
  )
  return res.status(201).json({ success: true });
};
