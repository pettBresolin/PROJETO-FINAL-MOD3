import { characterDb } from "../mongo/schemas/character.schema.js";

export class CharacterRepositoryMongoDb {
  async create(character) {
    return await characterDb.create(character);
  }

  async find(characterId) {
    return await characterDb.findOne({ i: characterId });
  }

  async findAll() {
    return await characterDb.find();
  }

  async findByName(characterName) {
    return await characterDb.find({ name: characterName });
  }

  async update(character) {
    return await characterDb.findOneAndUpdate({ id: character.id }, character, {
      new: true,
    });
  }
}
