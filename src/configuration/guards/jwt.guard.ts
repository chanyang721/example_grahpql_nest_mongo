import { ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/skip-auth.decorator';

@Injectable()
export class RequestTargetGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    if (context.getType<GqlContextType>() === 'graphql')
      return GqlExecutionContext.create(context).getContext().req;
    else if (context.getType<ContextType>() === 'http')
      return context.switchToHttp().getRequest();
  }

  // handleRequest(err: any, user: any, info: Error) {
  //   console.log('4. ======= handleRequest =======');
  //   console.log('err', err);
  //   console.log('user', user);
  //   // console.log('info', info);
  //   // console.log('context', context);
  //   //? 리턴값 => request 객체로 들어간다
  //   return user;
  // }

  // const passportFn = createPassportContext(request, response);
  // const user = yield passportFn(type || this.options.defaultStrategy, options, (err, user, info, status) => this.handleRequest(err, user, info, context, status));
  canActivate(context: ExecutionContext) {
    console.log('======= RequestTargetGuard canActivate =======');
    // 0. 앱 실행 로드 (미들웨어, 모듈 실행)
    // 글로벌 가드 실행
    // canActivate 오버라이딩 => 퍼블릭 or http/grahpql 시 return true;
    // 1-1. super.canActivate(context)
    // 1-1. getRequest and getResponse 핸들링
    // 2. createPassportContext(request, response) 실행하여 passport.authenticate 함수 리턴
    // 3. passportFn(type, options, callback) 실행 시,
    // 3-2. 내부적으로 passport.authenticate 함수 실행 -> 연결된 Strategy의 validate함수 실행하여 유저 인증
    // 3-3. 콜백함수 handleRequest(err, user, info, context, status) 리턴값(user)은 passportModule의 property 옵션으로 설정한 문자열(default = 'user')을 키로 request 객체의 프로퍼티로 등록된다.
    // 4. return true; //! 중간에 false 리턴 시 에러 발생
    //?? Global interceptor실행 => Request Interceptor 실행 -> context(request) 객체를 받아 사용
    //?? Global Validation Pipe 실행
    //?? Routing Handlers를 통해 REST의 controller와 GraphQL(/graphql)의 resolver로 라우팅 후 각 Layers의 로직 실행
    //!! 에러 발생시, Exception Filter로 에러 전달
    //?? 에러 없는 경우, Response 객체가 Response Interceptor 로직 수행
    //?? Response 완료

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), //? REST API or /graphql
      context.getClass(), //? Controller or Resolver
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
