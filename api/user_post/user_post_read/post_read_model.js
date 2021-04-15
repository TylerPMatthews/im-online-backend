const db = require("../../data/db-config");

const getAll = () => {
  return db("view_user_post as vup")
    .join("user_information as ui", "ui.user_id", "vup.user_id")
    .join("user_posts as up", "up.user_post_id", "vup.user_post_id")
    .join("user_post_disliked as upd", "upd.user_post_disliked_id", "vup.user_post_disliked_id")
    .join("user_post_liked as upl", "upl.user_post_liked_id", "vup.user_post_liked_id")
    .select(
      "ui.user_username",
      "up.user_post_text",
      "up.user_post_city",
      "up.user_post_State",
      "up.user_post_id",
      "upl.user_post_liked",
      "upd.user_post_disliked"
    );
};

const getByID = (id) => {
  return db("view_user_post as vup")
    .where("view_user_post_id", id)
    .join("user_information as ui", "ui.user_id", "vup.user_id")
    .join("user_posts as up", "up.user_post_id", "vup.user_post_id")
    .select(
      "ui.user_username",
      "up.user_post_text",
      "up.user_post_img",
      "up.user_post_city",
      "up.user_post_State",
      "up.user_post_thumbUp",
      "up.user_post_thumbDown",
      "up.user_post_id"
    );
};

const post = (data) => {
  return db("view_user_post").insert(data);
};

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
  remove,
  findBy,
};
