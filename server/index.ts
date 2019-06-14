import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as cors from 'cors';
import { FeedData } from '../src/app/pages/home/home.component';

class App {

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public app: express.Application;
  private port = 9090;

  public static bootstrap(): App {
    return new App();
  }
  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/api/feed', (req: Request, res: Response) => {
      const data: FeedData[] = [{
        id: 1,
        title: 'Example feed',
        url: '',
        author: 'Yerko',
        date: new Date(),
        visible: true
      }];

      res.status(200).send(data);
    });

    router.post('/api/feed', (req: Request, res: Response) => {
      const data = req.body;
      // query a database and save data
      res.status(200).send(data);
    });

    this.app.use('/', router);
    this.app.listen(this.port, () => {
      console.log('Express server listening on port ' + this.port);
    });
  }

}

const app = App.bootstrap();
export default app;
