const db = require("../../api/data/db-config");

//Get All users friends
const getAll = () => {
  return db("user_post_disliked");
};
//Get A users friends by userID
const getByID = (id) => {
  return db("user_post_disliked").where("user_post_id", id);
};
//Post a new users information
const post = (data) => {
  return db("user_post_disliked").insert(data)
  .returning("user_post_disliked_id")
};
//Edit a users information by ID
const edit = (id, changes) => {
  return db("user_post_disliked").where("user_post_disliked_id", id).update(changes)
};
//Delete a users information by ID
const remove = (id) => {
  return db("user_post_disliked").where("user_post_disliked_id", id).del();
};
const findBy = (filter) => {
  return db("user_post_disliked").where(filter);
};
module.exports = {
  getAll,
  getByID,
  post,
  edit,
  remove,
  findBy,
};
