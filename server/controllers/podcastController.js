const Podcast = require("../models/podcastSchema");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

const createPodcast = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const frontImage = req.files["frontImage"][0].path;
    const audioFile = req.files["audioFile"][0].path;
    if (!title || !description || !category || !frontImage || !audioFile) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const { user } = req;
    const cat = await Category.findOne({ categoryName: category });
    if (!cat) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    const newPodcast = new Podcast({
      title,
      description,
      frontImage,
      audioFile,
      category: cat._id,
      user: user._id,
    });
    await newPodcast.save();
    await Category.findByIdAndUpdate(cat._id, {
      $push: { podcasts: newPodcast._id },
    });
    await User.findByIdAndUpdate(user._id, {
      $push: { podcasts: newPodcast._id },
    });
    return res.status(201).json({
      success: true,
      message: "Podcast created successfully",
      newPodcast,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({
        success: true,
        message: "Podcasts fetched successfully",
        podcasts,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getUserPodcast = async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;
    const data = await User.findById(userId)
      .populate({ path: "podcasts", populate: { path: "category" } })
      .select("-password");
    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "User Podcasts fetched successfully",
        data: data.podcasts,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getPodcast = async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await Podcast.findById(id).populate("category");
    return res
      .status(200)
      .json({
        success: true,
        message: "Podcast fetched successfully",
        podcast,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getPodcastByCategory = async (req, res) => {
  try {
    const { cat } = req.params;
    const categories = await Category.find({ categoryName: cat }).populate({
      path: "podcasts",
      populate: { path: "category" },
    });
    let podcasts = [];
    categories.forEach((category) => {
      if (category.podcasts) {
        podcasts = [...podcasts, ...category.podcasts];
      }
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Podcasts fetched successfully",
        podcasts,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createPodcast,
  getPodcasts,
  getUserPodcast,
  getPodcast,
  getPodcastByCategory,
};
