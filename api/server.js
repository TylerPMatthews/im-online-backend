const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const UserInformation = require("./user_information/user_information_routes");
const UserAuth = require("./user_information/user-auth");
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

//UserInformation Auth
server.use("/user_information/auth", UserAuth);

//UserInformation routes
server.use("/api/userinformation", UserInformation);

server.get("/", (req, res) => {
  res.json({ API: "Online" });
});

module.exports = server;
