export class FindUserByIdUseCase {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async execute(email) {
    const user = await this.repository.findUserByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }
    return user;
  }
}
