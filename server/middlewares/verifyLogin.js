
import jwt from 'jsonwebtoken'

function verifyLogin(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

export default verifyLogin;