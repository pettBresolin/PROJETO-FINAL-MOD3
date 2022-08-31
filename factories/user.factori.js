import { UserRepositoryMongoDb } from "../database/repositories/userRepository.js";
import { FindUserByIdUserCase } from "../services/usecases/user/findUserById.js";
import { CreateUserUseCase } from "../services/usecases/user/createUser.js";
import { UpdateUserUseCase } from "../services/usecases/user/updateUser.js";
import { FindAllUserUseCase } from "../services/usecases/user/findAllUsers.js";
import { DeleteUserUseCase } from "../services/usecases/user/deleteUser.js";
import { Services } from "../services/service.js";
import { UserRoutes } from "../routers/userRoutes.js";
import { Controller } from "../controllers/controller.js";

export function makeUserFactory(router) {
  const userRepository = new UserRepositoryMongoDb();

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const findUserByIdUseCase = new FindUserByIdUserCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(
    userRepository,
    findUserByIdUseCase
  );
  const findAllUserUseCase = new FindAllUserUseCase(userRepository);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const userService = new Services(
    createUserUseCase,
    updateUserUseCase,
    findAllUserUseCase,
    findUserByIdUseCase,
    deleteUserUseCase
  );

  const userController = new Controller(userService);

  const userRoutes = new UserRoutes(userController, router);

  return userRoutes;

}