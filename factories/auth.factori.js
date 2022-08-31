import { BcryptHelper } from "../auth/bcrypt.js";
import { JwtHelper } from "../auth/jwt.js";
import { AuthController } from "../controllers/authController.js";
import { UserRepositoryMongoDb } from "../database/repositories/userRepository.js";
import { AuthRoutes } from "../routers/authRoutes.js";
import { FindUserByIdUseCase } from "../services/usecases/user/findUserByEmail.js";

export function makeAuthFactory(router) {
  const userRepository = new UserRepositoryMongoDb();
  const bcryptHelper = new BcryptHelper();
  const jwtHelper = new JwtHelper();

  const findUserByEmail = new FindUserByIdUseCase(userRepository);
  const authController = new AuthController(
    findUserByEmail,
    bcryptHelper,
    jwtHelper
  );

  const authRoutes = new AuthRoutes(authController, router);

  return authRoutes;
}
