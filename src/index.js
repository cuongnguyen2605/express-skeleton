const cluster = require('cluster');
const mongoose = require('mongoose');
const totalCPUs = require('os').availableParallelism();

const app = require('./app');

const bootstrap = async (app) => {
  if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  } else {
    console.log(`Worker ${process.pid} started`);

    try {
      const mongoUri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
      await mongoose.connect(mongoUri, {});
      console.log('Mongo connected!');
    } catch (e) {
      console.log('Mongo connection failure!');
      console.error(e);
    }

    app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  }
};

bootstrap(app);
