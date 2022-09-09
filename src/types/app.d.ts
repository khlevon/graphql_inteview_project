import { GraphQLResolveInfo } from "graphql";
import * as services from "../app/services";
import * as repositories from "../app/repositories";
import * as db from "../app/db/models";

interface AppContext {
  db: typeof db;
  services: typeof services;
  repositories: typeof repositories;
}

export type TResolver<TParent = any, TArgs = any> = (
  parent: any,
  args: TArgs,
  context: AppContext,
  info: GraphQLResolveInfo
) => any;
