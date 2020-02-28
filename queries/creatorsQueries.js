const db = require('../helpers/db');


const getAllCreators = async () => {
    const getQuery = `
      SELECT creators.id,
          firstname,
          lastname,
          avatar_url,
          array_agg(distinct concat(reclaims.composition)) AS materials,
          COUNT (reclaims.id)
      FROM creators
      LEFT JOIN reclaims ON creators.id = reclaims.creator_id
      GROUP BY creators.id;
    `;
    return await db.any(getQuery);
}


const getCreatorById = async (id) => {
    try {
      const getQueryById = `
        SELECT id,
            username,
            firstname,
            lastname,
            about,
            avatar_url,
            phone_number,
            email,
            website_url,
            address
        FROM creators
        WHERE id = $/id/;

      `;
      return await db.one(getQueryById, { id });
    } catch (err) {
        if (err.message === "No data returned from the query.") {
            throw new Error(`404__error: creator ${id} does not exist`);
        }
        throw (err);
    }
}

const getCreatorByLogin = async (username) => {
  try {
    const creatorByLogin = `
      SELECT id,
          username,
          password,
          avatar_url
      FROM creators
      WHERE username = $/username/;
    `;
    return await db.one(creatorByLogin, {username});
  } catch (err) {
    throw (err);
  }
}

// POSSIBLY NOW UNUSED?
// const getActiveCreator = async (username, password) =>{
//   try {
//     const getQueryByActive = '  SELECT * FROM creators WHERE username = $/username/ AND password = $/password/ '
//    return await db.one(getQueryByActive, {username, password})
//   } catch (err){
//     if (err.message === "No data returned from the query.") {
//       throw new Error(`404__error: creator ${username} does not exist`);
//     }
//     throw (err);
//   }
// }


const addCreator = async (bodyObj) => {
    try {
      const postQuery = `
        INSERT INTO creators (
            username,
            firstname,
            lastname,
            password,
            about,
            avatar_url,
            phone_number,
            email,
            website_url,
            address
        )
        VALUES (
            $/username/,
            $/firstname/,
            $/lastname/,
            $/password/,
            $/about/,
            $/avatar_url/,
            $/phone_number/,
            $/email/,
            $/website_url/,
            $/address/
        )
        RETURNING id,
            username,
            firstname,
            lastname,
            about,
            avatar_url,
            phone_number,
            email,
            website_url,
            address
        ;
      `;
      return await db.one(postQuery, bodyObj);
    } catch (err) {
      if (err.message.includes("violates unique constraint")) {
        throw new Error(
          `403__error: username or email already exists`
        );
      }
      throw (err);
    }
  }


const updateCreator = async (bodyObj) => {
  try {
    let postQuery = `
      UPDATE creators
      SET username = $/username/,
          firstname = $/firstname/,
          lastname = $/lastname/,
          password = $/password/,
          email = $/email/,
    `;
    if (bodyObj.about) {
      postQuery += `about = $/about/,`;
    }
    if (bodyObj.phone_number) {
      postQuery += `phone_number = $/phone_number/,`;
    }
    if (bodyObj.website_url) {
      postQuery += `website_url = $/website_url/,`;
    }
    if (bodyObj.address) {
      postQuery += `address = $/address/,`;
    }
    if (bodyObj.avatar_url) {
      postQuery += `avatar_url = $/avatar_url/`;
    }
    postQuery += `
      WHERE id = $/id/
      RETURNING id,
          username,
          firstname,
          lastname,
          about,
          avatar_url,
          phone_number,
          email,
          website_url,
          address
      ;
    `;
    return await db.one(postQuery, bodyObj);
  } catch (err) {
    if (err.message.includes("violates unique constraint")) {
      throw new Error(
        `403__error: username or email already exists`
      );
    }
    throw (err);
  }
}

module.exports = {
    getAllCreators,
    getCreatorById,
    addCreator,
    updateCreator,
    // getActiveCreator,
    getCreatorByLogin
};
