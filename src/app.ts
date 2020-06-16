import * as mongoose from 'mongoose';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import {Routes} from './routes/crmRoutes';

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = 'mongodb://localhost/myapp';

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose
    .connect(this.mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
      console.log(`${err.message}`);
    })
  }

  private config(): void{
    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({extended: false}));
  }
}

export default new App().app;