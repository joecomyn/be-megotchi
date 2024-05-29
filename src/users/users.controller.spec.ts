import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UpdateUserTasksDto } from './dto/UpdateUserTasks.dto';
import { HttpException, ValidationPipe } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    createUser: jest.fn(),
    getUsers: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUserTasks: jest.fn(),
    updateUserMegotchi: jest.fn(),
  };

  const validationPipe = new ValidationPipe();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        displayName: 'Test User',
        email: 'test@example.com',
        password: 'Password1!',
        megotchi: {
          name: 'Megotchi',
          color: '#FF5733',
        },
      };
  
      // The result object should not include email and password for security reasons, This is typical behavour of API responses, It's sensetive information and should not return this!!!!
      const result = { 
        _id: '1', 
        displayName: 'Test User', 
        megotchi: {
          name: 'Megotchi',
          color: '#FF5733',
        },
      };
      
      mockUsersService.createUser.mockResolvedValue(result);
  
      await expect(validationPipe.transform(createUserDto, { type: 'body', metatype: CreateUserDto })).resolves.toBe(createUserDto);
      expect(await usersController.createUser(createUserDto)).toEqual(result);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      // This is the mock data returned by the service
      const resultFromService = [{
        _id: '1',
        email: 'test@example.com',
        displayName: 'Test User'
      }];
      
      // This is the expected result from the controller
      const result = [{
        _id: '1',
        displayName: 'Test User'
      }];
      
      mockUsersService.getUsers.mockResolvedValue(resultFromService);
  
      expect(await usersController.getUsers()).toEqual(result);
      expect(mockUsersService.getUsers).toHaveBeenCalled();
    });
  });
  

  describe('signInUser', () => {
    it('should return a user without email and password on successful sign-in', async () => {
      const userCredentials = { email: 'test@example.com', password: 'Password1!' };
      const users = [{ _id: '1', email: 'test@example.com', password: 'Password1!' }];
      mockUsersService.getUsers.mockResolvedValue(users);

      expect(await usersController.signInUser(userCredentials)).toEqual({ _id: '1' });
    });

    it('should throw an exception if user not found', async () => {
      const userCredentials = { email: 'test@example.com', password: 'wrongpassword' };
      const users = [{ _id: '1', email: 'test@example.com', password: 'Password1!' }];
      mockUsersService.getUsers.mockResolvedValue(users);

      await expect(usersController.signInUser(userCredentials)).rejects.toThrow(HttpException);
    });
  });

  describe('updateUserTasks', () => {
    it('should update user tasks', async () => {
      const updateUserTasksDto: UpdateUserTasksDto = {
        isDelete: false,
        taskList: [
          {
            title: 'Task 1',
            body: 'Task body',
            iconUrl: 'http://example.com/icon.png',
            message: 'Task message',
          },
        ],
      };
      const id = '60f7c43918adf913d4f7a8a1';
      const updatedUser = { _id: id, taskList: [] };
      mockUsersService.updateUserTasks.mockResolvedValue(updatedUser);

      await expect(validationPipe.transform(updateUserTasksDto, { type: 'body', metatype: UpdateUserTasksDto })).resolves.toBe(updateUserTasksDto);
      expect(await usersController.updateUserTasks(id, updateUserTasksDto)).toEqual(updatedUser);
      expect(mockUsersService.updateUserTasks).toHaveBeenCalledWith(id, updateUserTasksDto);
    });

    it('should throw an exception if user ID is invalid', async () => {
      const updateUserTasksDto: UpdateUserTasksDto = { isDelete: false, taskList: [] };
      const id = 'invalid_id';

      await expect(usersController.updateUserTasks(id, updateUserTasksDto)).rejects.toThrow(HttpException);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const foundUserFromService = {
        _id: '60f7c43918adf913d4f7a8a1',
        email: 'test@example.com',
        displayName: 'Test User'
      };
      
      const foundUser = {
        _id: '60f7c43918adf913d4f7a8a1',
        displayName: 'Test User'
      };
  
      mockUsersService.getUserById.mockResolvedValue(foundUserFromService);
  
      expect(await usersController.getUserById('60f7c43918adf913d4f7a8a1')).toEqual(foundUser);
      expect(mockUsersService.getUserById).toHaveBeenCalledWith('60f7c43918adf913d4f7a8a1');
    });
  
    it('should throw an exception if user not found', async () => {
      const id = '60f7c43918adf913d4f7a8a1';
      mockUsersService.getUserById.mockResolvedValue(null);
  
      await expect(usersController.getUserById(id)).rejects.toThrow(HttpException);
    });
  });
  

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { balance: 100 };
      const id = '60f7c43918adf913d4f7a8a1';
      const updatedUser = { _id: id, balance: 100 };
      mockUsersService.updateUser.mockResolvedValue(updatedUser);

      await expect(validationPipe.transform(updateUserDto, { type: 'body', metatype: UpdateUserDto })).resolves.toBe(updateUserDto);
      expect(await usersController.updateUser(id, updateUserDto)).toEqual(updatedUser);
      expect(mockUsersService.updateUser).toHaveBeenCalledWith(id, updateUserDto);
    });

    it('should throw an exception if user ID is invalid', async () => {
      const updateUserDto: UpdateUserDto = { balance: 100 };
      const id = 'invalid_id';

      await expect(usersController.updateUser(id, updateUserDto)).rejects.toThrow(HttpException);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const id = '60f7c43918adf913d4f7a8a1';
      mockUsersService.deleteUser.mockResolvedValue(true);

      await expect(usersController.deleteUser(id)).resolves.not.toThrow();
      expect(mockUsersService.deleteUser).toHaveBeenCalledWith(id);
    });

    it('should throw an exception if user ID is invalid', async () => {
      const id = 'invalid_id';

      await expect(usersController.deleteUser(id)).rejects.toThrow(HttpException);
    });
  });
});
