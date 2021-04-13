exports.up = async (knex) => {
  await knex.schema
    .createTable("user_information", (users) => {
      users.increments("user_id");
      users.string("user_username", 200).notNullable().unique();
      users.string("user_password", 200).notNullable();
      users.string("user_email", 320).notNullable().unique();
      users.string("user_phone", 300).unique();
      users.timestamps(false, true);
    })
    .createTable("user_profile", (users) => {
      users.increments("user_profile_id");
      users.string("user_profile_firstName", 200).notNullable();
      users.string("user_profile_lastName", 200).notNullable();
      users.string("user_profile_main_img", 500);
      users.string("user_profile_header_img", 500);
      users.text("user_profile_bio");
      users.string("user_profile_location", 300);
      users
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user_information")
        .onDelete("RESTRICT");
    })

    .createTable("user_posts", (users) => {
      users.increments("user_post_id");
      users.text("user_post_text").notNullable();
      users.string("user_post_img");
      users.string("user_post_city", 200);
      users.string("user_post_State", 200);
      users.timestamps(false, true);
      users
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user_information")
        .onDelete("CASCADE");
    })
    .createTable("user_post_liked", (users) => {
      users.increments("user_post_liked_id");
      users.integer("user_post_liked_thumbUp").notNullable().defaultTo(0);
      users.integer("user_post_liked_thumbDown").notNullable().defaultTo(0);
      users
        .integer("user_post_id")
        .unsigned()
        .notNullable()
        .references("user_post_id")
        .inTable("user_posts")
        .onDelete("CASCADE");
    })
    .createTable("view_user_post", (users) => {
      users.increments("view_user_post_id");
      users
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user_information")
        .onDelete("CASCADE");
      users
        .integer("user_post_id")
        .unsigned()
        .notNullable()
        .references("user_post_id")
        .inTable("user_posts")
        .onDelete("CASCADE");

      users
        .integer("user_post_liked_id")
        .unsigned()
        .notNullable()
        .references("user_post_liked_id")
        .inTable("user_post_liked")
        .onDelete("CASCADE");
    })
    .createTable("user_comment", (users) => {
      users.increments("user_comment_id");
      users.string("user_comment_text").notNullable();
      users.timestamps(false, true);
      users
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user_information")
        .onDelete("CASCADE");
      users
        .integer("user_post_id")
        .unsigned()
        .notNullable()
        .references("user_post_id")
        .inTable("user_posts")
        .onDelete("CASCADE");
    })
    .createTable("user_comment_view", (users) => {
      users.increments("user_comment_view_id");
      users
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user_information")
        .onDelete("CASCADE");
      users
        .integer("user_post_id")
        .unsigned()
        .notNullable()
        .references("user_post_id")
        .inTable("user_posts")
        .onDelete("CASCADE");
      users
        .integer("user_comment_id")
        .unsigned()
        .notNullable()
        .references("user_comment_id")
        .inTable("user_comment")
        .onDelete("CASCADE");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("user_information")
    .dropTableIfExists("user_profile")
    .dropTableIfExists("user_posts")
    .dropTableIfExists("view_user_post")
    .dropTableIfExists("user_comment")
    .dropTableIfExists("user_comment_view");
};
