export class DeleteUserUseCase {
  constructor(userRepository) {
    this.repository = userRepository;
  }
  async execute(userId) {
    const deleteUser = await this.repository.deleteUser(userId);
    if (!deleteUser) {
      throw new Error("Usuário não encontrado!");
    }
    return deleteUser;
  }
}
