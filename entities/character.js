import { randomUUID } from "node:crypto";

export class CharacterEntity {
  constructor(character, userId) {
    this.id = character.id ?? randomUUID();
    this.name = character.name;
    this.image = character.image;
    this.userId = userId;
  }

  validate() {
    if(!this.name || !this.image) {
      throw new Error("Personagem invalido!")
    }
  }

  getcharacter() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      userID: this.userId,
    };
  }
}