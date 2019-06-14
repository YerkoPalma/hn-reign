import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as mongodb from 'mongodb';
import * as cors from 'cors';
import { FeedData } from '../src/app/pages/home/home.component';
const { MongoClient } = mongodb;

class App {

  constructor() {
    this.app = express();
    this.config()
      .then(() => this.routes());
  }

  public app: express.Application;
  public db: mongodb.Db;
  private port = 9090;

  public static bootstrap(): App {
    return new App();
  }
  private async config(): Promise<void> {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // connect to database
    const client: mongodb.MongoClient = await MongoClient.connect('mongodb://localhost');
    this.db = client.db('local');
  }

  private routes(): void {
    const router = express.Router();

    router.get('/api/feed', async (req: Request, res: Response) => {
      // const data: FeedData[] = [{
      //   id: 1,
      //   title: 'Example feed',
      //   url: '',
      //   author: 'Yerko',
      //   date: new Date(),
      //   visible: true
      // }];

      const data = await this.db.collection('feeds').find().toArray();
      res.status(200).send(data);
    });

    router.post('/api/feed', async (req: Request, res: Response) => {
      const data: FeedData[] = [{
        id: 1,
        title: 'Example feed',
        url: '',
        author: 'Yerko',
        date: new Date(),
        visible: true
      }];
      // query a database and save data
      await this.db.collection('feeds').insertMany(data);
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
