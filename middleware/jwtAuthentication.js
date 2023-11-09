    const jwt = require("jsonwebtoken");
    const db = require("../config/db");
    require("dotenv").config() 

    exports.jwtAuthentication = async (req, res, next) => {
      const userToken = req.header("Authorization");
      if (!userToken) {
        return res.status(401).json({ error: "Unauthorized: Token is Missing" });
      }
      try {
        if (!userToken) {
          return res.status(401).send("Access denied. No token provided");
        }
        const token = userToken.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { username } = decoded;

        const userFromDatabase = await db.query(
          "SELECT * FROM users WHERE username = $1",
          [username]
        );

        if (!userFromDatabase) {
          return res
            .status(401)
            .json({ message: "Unauthorized: User does not exist" });
        }

        req.user = userFromDatabase;
        next();
      } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid Tokenn" });
      }
    };
