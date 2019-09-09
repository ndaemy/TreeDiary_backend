import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';

import schema from './schema';
import { sendSecretKey } from './utils';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger('dev'));

server.start({ port: PORT }, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});
