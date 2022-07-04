import { INestApplication } from '@nestjs/common';
import request from 'supertest';

const GRAPHQL_ENDPOINT = '/graphql';
let app: INestApplication;

//* https://www.reddit.com/r/graphql/comments/ekzn86/why_does_graphql_only_take_http_post_for_requests/
const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);

export const publicTest = async (query: string) => baseTest().send({ query });

export const privateTest = async (query: string) =>
  baseTest()
    // .set('Authorization', await getAuthorization())
    .send({ query });

/**
 * https://www.apollographql.com/docs/react/data/error-handling/#graphql-error-policies
 * Syntax and Validation errors => data: null
 * Resolver errors => data: { something: null }
 */
export const getResponse = async (res) => res.body;
