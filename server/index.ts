import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as mongodb from 'mongodb';
import * as cors from 'cors';
import { FeedData } from '../src/app/pages/home/home.component';
const { MongoClient } = mongodb;
import axios from 'axios';

const HN_API = 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs';

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
      const data = await this.db.collection('feeds').find().toArray();
      res.status(200).send(data);
    });

    router.post('/api/feed', async (req: Request, res: Response) => {
      const feeds: FeedData[] = [];
      // query API
      const { data } = await axios.get(HN_API);
      for (const hit of data.hits) {
        feeds.push({
          id: hit.story_id,
          title: hit.story_title || hit.title,
          url: hit.story_url || hit.url,
          author: hit.author,
          date: new Date(hit.created_at),
          visible: true
        });
      }
      // and save data
      await this.db.collection('feeds').insertMany(feeds);
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
