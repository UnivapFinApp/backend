import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './domain/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{
        "id": "01K4WMVQ9SP0VPYZW3ZZM5QM7H",
        "name": "ricardo",
        "email": "ricardo@gmail.br",
        "isActive": true,
        "createdAt": "2025-09-11T15:03:48.282Z",
        "updatedAt": "2025-09-11T15:03:48.282Z"
      },
      {
        "id": "01K4WMW2P4F9TTVWQYAV17FVYA",
        "name": "ricardo",
        "email": "ricardo@univap.br",
        "isActive": true,
        "createdAt": "2025-09-11T15:03:59.941Z",
        "updatedAt": "2025-09-11T15:03:59.941Z"
      }];

      jest.spyOn(service, 'users').mockImplementation();

    });
  });


});
