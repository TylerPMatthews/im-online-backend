const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const UserInformation = require("./user_information/user_information_routes");
const UserAuth = require("./user_information/user-auth");
const Userprofile = require("./user_profile/user_profile_routes");
const UserPost = require("./user_post/user_post_router");
const UserViewPost = require("./user_post/user_post_read/post_read_routes");
const UserComment = require("./user_comment/user_comment_routes");
const ViewComment = require("./user_comment/user_comment_read/user-comment-view/user_c_view_routes");
const PostDisliked = require("./user_disliked/user_disliked_routes");
const PostLiked = require("./user_liked/user_liked_routes");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

//View comment
server.use("/user/comment/view", ViewComment);

//User comment
server.use("/user/comment", UserComment);

//View user post
server.use("/user/view/post", UserViewPost);

//User disliked post
server.use("/user/post/disliked", PostDisliked);

//User liked post
server.use("/user/post/liked", PostLiked);

//User Post
server.use("/user/post", UserPost);

//User profile routes
server.use("/user/profile", Userprofile);

//UserInformation Auth
server.use("/user/information/auth", UserAuth);

//UserInformation routes
server.use("/user/information/data", UserInformation);

server.get("/", (req, res) => {
  res.json({ API: "Online" });
});

module.exports = server;
