import { AuthenticationService } from './authentication.service';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { mockedConfigService } from '../utils/mocks/config.service';
import { mockedJwtService } from '../utils/mocks/jwt.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import * as supertest from 'supertest';

const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'countryName',
  },
};

describe('The AuthenticationController', () => {
  let app: INestApplication;
  let userData: User;
  beforeEach(async () => {
    userData = { ...mockedUser };
    const usersRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('when registering', () => {
    describe('and using valid data', () => {
      it('should respond with the data of the user without the password', () => {
        const expectedData = {
          ...userData,
        };
        delete expectedData.password;
        return supertest(app.getHttpServer())
          .post('/authentication/register')
          .send({
            email: mockedUser.email,
            name: mockedUser.name,
            password: 'strongPassword',
          })
          .expect(201)
          .expect(expectedData);
      });
    });
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return supertest(app.getHttpServer())
          .post('/authentication/register')
          .send({
            name: mockedUser.name,
          })
          .expect(400);
      });
    });
  });
});
