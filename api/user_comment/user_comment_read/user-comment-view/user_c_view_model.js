const db = require("../../../data/db-config");

//Get All users information
const getAll = () => {
  return db("user_comment_view");
};
// Get A users information by ID
const getByID = (id) => {
  return db("user_comment_view as ucv")
  .join("user_information as ui", "ui.user_id", "ucv.user_id")
  .join("user_posts as upi", "upi.user_post_id", "ucv.user_post_id")
  .join("user_comment as uc", "uc.user_comment_id", "ucv.user_comment_id")
  .where("upi.user_post_id", id)
};
//Post a new users information
const post = async (data) => {
  return db("user_comment_view").insert(data)
 .returning('user_comment_view_id')
};
//Edit a users information by ID
const edit = (id, changes) => {
  return db("user_comment_view").where("user_comment_view_id", id).update(changes);
};
//Delete a users information by ID
const remove = (id) => {
  return db("user_comment_view").where("user_comment_view_id", id).del();
};
const findBy = (filter) => {
  return db("user_comment_view").where(filter);
};
module.exports = {
  getAll,
  getByID,
  post,
  edit,
  remove,
  findBy,
};
