import { gql } from "apollo-server";
import { loadSchemas } from "../../../common/utils";

export const Types = gql`
  ${Object.values(loadSchemas(__dirname)).join("\n")}
`;

export { default as Resolvers } from "./resolvers";

