const passport = require('passport');
const GoogleAuth = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../Model/User');

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id)
  done(null, user)
})

passport.use(
  new GoogleAuth({
    callbackURL: 'http://localhost:5000/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { _json: data } = profile;
        const [user] = await User.findOrCreate({
          where: { googleId: data.sub },
          defaults: {
            googleId: data.sub,
            name: data.name,
            email: data.email,
            img: data.picture
          }
        });
        done(null, user.dataValues);
      } catch (err) {
        done(err)
      }
    })
)