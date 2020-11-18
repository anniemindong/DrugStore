const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Store = mongoose.model("stores");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Store.findById(jwt_payload.id)
        .then(store => {
          if (store) {
            return done(null, store);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
