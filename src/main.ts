import { ApolloServer } from "apollo-server";
import logger from "./common/logger";
import { typeDefs, resolvers } from "./app/graphql";
import { runWorkers } from "./workers";
import dbConnector from "./app/db/connector";
import * as services from "./app/services";
import * as repositories from "./app/repositories";
import * as db from "./app/db/models";

dbConnector
  .then(async () => {
    await runWorkers();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async () => {
        return {
          services,
          repositories,
          db,
        };
      },
    });

    server.listen(4000).then((serverInfo) => {
      logger.debug(`🚀 Server ready at ${serverInfo.url}`);
    });
  })
  .catch((err) => {
    logger.error({
      message: "Error connecting to database",
      data: err,
    });
  });
