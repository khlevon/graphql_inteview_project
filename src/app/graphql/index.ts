import { gql } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import deepmerge from "deepmerge";
import * as citySchema from "./city";
import * as weatherSchema from "./weather";

const Types = gql`
  scalar DateTime
`;

export const typeDefs = [Types, citySchema.Types, weatherSchema.Types];
export const resolvers = deepmerge.all([
  { DateTime: DateTimeResolver },
  citySchema.Resolvers,
  weatherSchema.Resolvers,
]) as any;
