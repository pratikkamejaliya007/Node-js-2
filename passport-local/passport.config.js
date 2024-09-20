
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./model/register.model.js";

// Local strategy setup
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" }, // Correct the typo here
    async (email, password, done) => {
      try {
        let admindata = await User.findOne({ email: email });
        if (admindata) {
          // Direct password comparison (not secure)
          if (password === admindata.password) {
            return done(null, admindata);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        } else {
          return done(null, false, { message: "Incorrect email" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user by ID
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user by ID
passport.deserializeUser(async (id, done) => {
  try {
    let admindata = await User.findById(id);
    admindata ? done(null, admindata) : done(null, false);
  } catch (error) {
    done(error, false);
  }
});

// Middleware to check authentication
passport.checkAuth = function(req, res, next){
  if (req.isAuthenticated()) {
     next();
  }else{
    res.redirect("/login");
  }  
};

// Middleware to set authentication status
passport.setAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;  // Set the user in res.locals, not req.locals
  }
  next();
};

export default passport;
