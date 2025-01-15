const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("Token recibido:", token);
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Invalid Authentification, no hay token",
      });
    }

    // Si el token tiene 'Bearer' como prefijo, lo eliminamos
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length); // Eliminar 'Bearer ' del token
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).send({
          success: false,
          message: "Invalid Authentification, verify Token",
        });

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = auth;
