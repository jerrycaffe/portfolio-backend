const db = require("../db");

exports.postResume = async (req, res) => {
  try {
    // const result = await db.query(
    //   "INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *",
    //   [req.body.username, hashedPassword]
    // );
    // name, message, email, subject
    const { email, subject, message, name } = req.body;
    if (!email || !subject || !message || !name) {
      return res
        .status(400)
        .json({ message: "All Fields are required to post message" });
    }

    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return res
        .status(400)
        .json({ message: "Email must be of this pattern example@test.com" });
    }

    const checkEmail = await db.query(
      "SELECT email from resume WHERE email = $1",
      [email]
    );
    if (email) {
      return res.status(401).json({
        message:
          "Dear " +
          email +
          " your earlier request has been taken and we shall get back to you soon. If you have any new request please use another email",
      });
    }
    const results = await db.query(
      "INSERT INTO resume (email, name, message, subject) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, name, message, subject]
    );
    return res.status(200).json({ message: "Successful", results: results });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
