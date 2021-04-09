const db = require("../../api/data/db-config");

//Get All users profiles
const getAll = () => {
  return db("user_profile");
};
//Get A users information by ID
const getByID = (id) => {
  return db("user_profile").where("user_id", id);
};
//Post a new users information
const post = (data) => {
  return db("user_profile").insert(data);
};
//Edit a users information by ID
const edit = (id, changes) => {
  return db("user_profile").where("user_profile_id", id).update(changes);
};
//Delete a users information by ID
const remove = (id) => {
  return db("user_profile").where("user_profile_id", id).del();
};
const findBy = (filter) => {
  return db("user_profile").where(filter);
};
module.exports = {
  getAll,
  getByID,
  post,
  edit,
  remove,
  findBy,
};
