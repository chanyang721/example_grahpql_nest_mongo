import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export const configModuleOptions: ConfigModuleOptions = {
  /**
   * .env 파일 설정을 서버 전체의 글로벌로 적용
   */
  isGlobal: true,

  /**
   * 서버 실행 환경을 dev, test, prod인지에 따라 어떤 .env 파일을 적용할지 선택
   */
  envFilePath:
    process.env.NODE_ENV === 'development'
      ? '.env'
      : `.env.${process.env.NODE_ENV}`,

  /**
   *  .env 파일을 읽지 않는 환경 설정 boolean 값
   */
  ignoreEnvFile: process.env.NODE_ENV === 'production',

  /**
   * .env 파일을 읽는다면 해당 환경 변수들의 값 유효설 검사를 위한 설정
   */
  validationSchema: Joi.object({
    //? Environment Option //
    NODE_ENV: Joi.string()
      .valid('local', 'development', 'staging', 'production')
      .default('development'),
    PORT: Joi.number().required().default(4000),
    HOST: Joi.string().required().default('localhost'),
    GRAPHQL_PATH: Joi.string().default('/graphql'),

    COOKIE_SECRET: Joi.string().required(),
    PRE_FIX: Joi.string().default('/api/v1'),

    //? JWT Options //
    SALT: Joi.string().required(),
    SALT_ROUND: Joi.number().required(),

    JWT_ALGORITHM: Joi.string().default('HS256'),
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),

    //? Database Options //
    MONGO_URL: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_DATABASE: Joi.string().required(),

    //? Clayful Option //
    CLAYFUL_API_ACCESS_TOKEN: Joi.string().required(),
    CLAYFUL_API_SECRET: Joi.string().required(),
  }),

  /**
   * 유효성 검사 진행 시 검사 옵션
   */
  validationOptions: {
    // allowUnknown: false, //? 환경 변수에 알 수 없는 키를 허용할지 여부를 제어합니다.
    abortEarly: true, //? true이면 첫 번째 오류에서 유효성 검사를 중지합니다.
  },
};
