export class DeleteCharacterUseCase {
  constructor(characterRepository) {
    this.repository = characterRepository;
  }
  async execute(characterId) {
    const deleteCharacter = await this.repository.deleteCharacter(characterId);
    if (!deleteCharacter) {
      throw new Error(`Não foi possível deletar o Personagem: ${characterId}`);
    }
    return deleteCharacter;
  }
}
