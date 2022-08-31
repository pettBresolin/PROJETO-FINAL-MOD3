export class AuthController {
  constructor(FindUserByEmailUseCase, bcryptHelper, jwtHelper) {
    this.findUserByEmail = FindUserByEmailUseCase;
    this.jwtHelper = jwtHelper;
    this.bcryptHelper = bcryptHelper;
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.findUserByEmail.execute(email);

      const passwordValid = this.bcryptHelper.comparePassword(
        password,
        user.password
      );

      if (!passwordValid) {
        throw new Error("Senha inválida!");
      }

      const tokenData = {
        id: user.id,
        email: user.email,
        image: user.image,
      };

      const token = this.jwtHelper.generateToken(tokenData);

      res.status(200).send({ acessToken: token });
    } catch (e) {
      console.log(e);
      res.status(401).send(e.message);
    }
  }
}
