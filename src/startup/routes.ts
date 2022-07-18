import { Application }  from 'express'
import user from "../routes/user";

module.exports = function(app: Application){
  app.use('/api/user', user)
}
