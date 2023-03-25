// Dependncies
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Configuration
import { $server } from "../config";

// Models
import models from "./models";

// Typedefs and resolvers
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

const alter = true;
const force = false;

models.sequelize.sync({ alter, force }).then(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async () => ({ models }),
    listen: {
      port: $server.port,
    },
  });
  console.log(`🚀 server ready at ${url}`);
});
