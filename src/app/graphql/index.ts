import { gql } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import deepmerge from "deepmerge";
import * as citySchema from "./city";

const Types = gql`
  scalar DateTime
`;

export const typeDefs = [Types, citySchema.Types];
export const resolvers = deepmerge.all([
  { DateTime: DateTimeResolver },
  citySchema.Resolvers,
]) as any;
