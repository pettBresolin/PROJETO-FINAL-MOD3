import { CharacterEntity } from "../../../entities/character.js";

export class UpdateCharacterUseCase {
  constructor(characterRepository, findCharacterById) {
    this.repository = characterRepository;
    this.findCharacterById = findCharacterById;
  }
  async execute(characterUpdate, characterId) {
    const findedCharacter = await this.findCharacterById.execute(characterId);

    const updatedCharacter = Object.assign(findedCharacter, characterUpdate);

    const validatedCharacter = new CharacterEntity(updatedCharacter);

    validatedCharacter.validate();

    return await this.repository.update(validatedCharacter.getcharacter());
  }
}
