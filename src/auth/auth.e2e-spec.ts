import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto';
import { Sex } from 'src/user/enums/Sex';
import { UserRole } from 'src/user/enums/UserRole';
import {
  publicTest,
  privateTest,
  getResponse,
  getApplication,
} from '../../test/utils';
import { LoginUserDto } from './dto/login-user.dto';

describe('AuthResolver (e2e)', () => {
  let app: INestApplication;
  let config: ConfigService;

  beforeAll(async () => {
    app = await getApplication(); //* Application 시작
    config = await app.get(ConfigService);
  });

  afterAll(async () => {
    await app.close(); //* Application 종료
  });

  //TODO: Mutation register(createUserDto): UserType
  describe('register user', async () => {
    const mutationRegister = (user: CreateUserDto) => `
        mutation register($user: CreateUserDto!) {
          register(createUserDto: ${user}) {
            id
            email
          }
        }
    `;

    const user: CreateUserDto = {
      email: "'testUser@gmail.com'",
      password: "'A1234a!@#'",
      name: "'이찬양'",
      birth: "'1992-02-17'",
      sex: Sex.MALE,
      role: UserRole.USER,
    };

    it('should create user', async () => {
      const res = await publicTest(mutationRegister(user));
      const {
        data: { newUser },
        errors,
      } = await getResponse(res);

      expect(newUser).toBeTruthy();
      expect(newUser).toHaveProperty('id', expect.any(String));
      expect(newUser.email).toEqual('testUser@gmail.com');

      expect(errors.length).toEqual(0);
    });

    it('should not create user if email and phone number already exist', async () => {
      const res = await publicTest(mutationRegister(user));
      const {
        data: { newUser },
        errors,
      } = await getResponse(res);

      expect(newUser).toBeNull();

      expect(errors.length).toEqual(1);
      expect(errors[0].message).toEqual('');
    });
  });

  //TODO: Mutation login(loginData): TokenType
  describe('user login', async () => {
    const mutationLogin = (loginData: LoginUserDto) => `
      mutation Login($loginData: LoginUserDto!): TokenType {
        login(loginData: ${loginData}) {
          accessToken
          accessOption
          refreshToken
          refreshOption
        }
      }
    `;

    const loginData: LoginUserDto = {
      email: "'testUser@gmail.com'",
      password: "'A1234a!@#'",
    };

    const wrongLoginData: LoginUserDto = {
      email: "'testUser@gmail.com'",
      password: "'A1234a!@'",
    };

    it('should login with correct credentials', async () => {
      const res = await publicTest(mutationLogin(loginData));
      const {
        data: { login },
        errors,
      } = await getResponse(res);

      expect(login).toBeTruthy();
      expect(login).toHaveProperty(
        'accessToken',
        expect.any(String).toBeTruthy(),
      );
      expect(login.accessOption.maxage).toBeGreaterThanOrEqual(
        config.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      );
      expect(login.refreshToken).toBeTruthy();

      expect(errors.length).toEqual(0);
    });

    it('should not be able to login if wrong credentials', async () => {
      const res = await publicTest(mutationLogin(wrongLoginData));
      const {
        data: { login },
        errors,
      } = await getResponse(res);

      expect(login).toBeNull();

      expect(errors.length).toEqual(1);
    });
  });

  //TODO: Query logOut(): TokenType

  //TODO: Query refresh(): TokenType
});
