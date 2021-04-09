const db = require("../../api/data/db-config");

//Get All users information
const getAll = () => {
  return db("user_posts");
};
//Get A users information by ID
const getByID = (id) => {
  return db("user_posts as up").where("user_id", id);
};
//Post a new users information
const post = async (data) => {
  return db("user_posts").insert(data)
 .returning('user_post_id')
};
//Edit a users information by ID
const edit = (id, changes) => {
  return db("user_posts").where("user_post_id", id).update(changes);
};
//Delete a users information by ID
const remove = (id) => {
  return db("user_posts").where("user_post_id", id).del();
};
const findBy = (filter) => {
  return db("user_posts").where(filter);
};
module.exports = {
  getAll,
  getByID,
  post,
  edit,
  remove,
  findBy,
};
