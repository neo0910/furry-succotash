import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../../users/user.entity';
import { UsersService } from '../../users/users.service';

describe('The UsersService', () => {
  let usersService: UsersService;
  let findOneBy: jest.Mock;
  beforeEach(async () => {
    findOneBy = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy,
          },
        },
      ],
    }).compile();
    usersService = await module.get(UsersService);
  });
  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOneBy.mockReturnValue(Promise.resolve(user));
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          usersService.getByEmail('test@test.com'),
        ).rejects.toThrow();
      });
    });
  });
});
