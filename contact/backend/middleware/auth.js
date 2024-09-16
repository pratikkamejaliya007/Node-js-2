import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    // Get the token from the cookie
    const token = req.cookies.jwt;
    
    // If no token is found, redirect to login
    if (!token) {
      return res.redirect('/login');
    }

    // Verify the token and decode it
    const decode = jwt.verify(token, 'pratik007');
    
    // Attach decoded user data to the request object
    req.user = decode;

    next();

  } catch (err) {
    // Handle invalid token or token expiration
    res.status(401).send('Unauthorized: Invalid or expired token');
  }
};
