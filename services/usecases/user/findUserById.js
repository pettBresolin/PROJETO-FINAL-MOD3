export class FindUserByIdUserCase {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error("ID de usuário invalido!");
    }
    const userFinded = await this.repository.findById(userId);
    if(!userFinded) {
        throw new Error("Não localizado usuário com o id:" + userId);
    }
    return userFinded;
  }
}
