import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as mongodb from 'mongodb';
import * as cron from 'node-cron';
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

  private async updateFeeds(): Promise<FeedData[]> {
    const feeds: FeedData[] = [];
    // query API
    const { data } = await axios.get(HN_API);
    for (const hit of data.hits) {
      feeds.push({
        _id: hit.story_id,
        title: hit.story_title || hit.title,
        url: hit.story_url || hit.url,
        author: hit.author,
        date: new Date(hit.created_at),
        visible: true
      });
    }
    // and save data
    try {
      await this.db.collection('feeds').insertMany(feeds, { ordered: false });
    } catch (e) {}
    return feeds;
  }

  private routes(): void {
    const router = express.Router();

    router.get('/api/feed', async (req: Request, res: Response) => {
      const data = await this.db.collection('feeds').find().sort({ date: 1 }, -1).toArray();
      res.status(200).send(data);
    });

    // update every hour
    cron.schedule('0 * * * *', async () => {
      await this.updateFeeds();
      console.log('Added new feeds!');
    });

    router.post('/api/feed', async (req: Request, res: Response) => {
      const feeds: FeedData[] = await this.updateFeeds();
      res.status(200).send(feeds);
    });

    this.app.use('/', router);
    this.app.listen(this.port, () => {
      console.log('Express server listening on port ' + this.port);
    });
  }
}

const app = App.bootstrap();
export default app;
