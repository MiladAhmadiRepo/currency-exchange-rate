export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3001,
  // jwt: {
  //   secret: process.env.APP_SECRET,
  //   expiresIn: process.env.APP_EXPIRES_IN
  // },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    db: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  },

})
