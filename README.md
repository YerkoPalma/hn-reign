# HnReign

Simple Hacker News reader.

## Install

First you need to have [MongoDB][MongoDB] and [Node.js][Node] installed.
Then do the following

```bash
# clone the repo

git clone https://github.com/YerkoPalma/hn-reign.git
cd hn-reign

# install dependencies
npm install
```

## Usage

For a development run, you need to first run your local mongo server

```bash
mongod
```

Once this is running, you can just hit `npm run dev`

```bash
npm run dev
```

This will run locally the api server and the client app. Now open
`http://localhost:4200/` to see your app, it should look like this

<img width="960" alt="vista inicial" src="https://user-images.githubusercontent.com/5105812/59557595-9c8a4e00-8fab-11e9-996e-6d2e83ee85b7.png">

This is because the database updates every one hour through a cron job.
If you want to load data inmediatly, make a POST request to 
`http:localhost:9090/api/feed` (no body is required for this request).
Now reload the client, it should look like this.

<img width="960" alt="con datos cargados" src="https://user-images.githubusercontent.com/5105812/59557593-9c8a4e00-8fab-11e9-8d2d-ae08abb4c1a5.png">

## Deploy

The app is already deployed to heroku in this link. If you want to 
deploy to your own heroku instance (assuming you already have the 
[heroku cli][heroku-cli] client installed).

```bash
# create your app
heroku create

# install mLab addon
heroku addons:create mongolab
```

Now we need two changes in our env vars, first, set `NPM_CONFIG_PRODUCTION`
to false so dev dependencies get installed, and then, create a env var with 
the name of the assigned database by mongolab

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set MONGODB_DB=<your_db>
```

Then commit your changes to heroku and you are done

```bash
git add .
git commit -m "heroku deploy"
git push heroku master
```

[MongoDB]: https://www.mongodb.com/
[Node]: https://nodejs.org/en/
[link]: https://glacial-atoll-21302.herokuapp.com/
[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli