import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolversArrays = loadFilesSync(path.join(__dirname, "./"));
const resolvers = mergeResolvers(resolversArrays);

export default resolvers;
