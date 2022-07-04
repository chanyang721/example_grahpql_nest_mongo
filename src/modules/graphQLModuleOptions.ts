import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Request } from 'express';
import {
  GqlModuleAsyncOptions,
  GqlOptionsFactory,
  SubscriptionConfig,
} from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphQLService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      path: this.config.get<string>('GRAPHQL_PATH'),
      sortSchema: true,
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ request }) => {
        const user = request.headers.authorization;
        const user_refresh = request.headers.refresh;
        return { ...request, user, user_refresh };
      },
      // subscriptions: subscriptionConfig,
    };
  }
}

export const GqlModuleAsyncOption: GqlModuleAsyncOptions = {
  driver: ApolloDriver,
  useClass: GraphQLService,
};

//! 중단됨 다른 웹소켓 사용 //
// export const subscriptionConfig: SubscriptionConfig = {
//   'graphql-ws': true,
// };
