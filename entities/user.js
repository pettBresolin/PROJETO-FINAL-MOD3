import { randomUUID } from "node:crypto";
import { BcryptHelper } from "../auth/bcrypt.js";
import { CharacterEntity } from "./character.js";

export class UserEntity {
  constructor(user) {
    this.id = user.id ?? randomUUID();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.image = user.image;
    this.characters = user.characters ?? [];
  }

  validate() {
    if (!this.email || !this.password || !this.name || !this.image) {
      throw new Error("Usuário não reconhecido!");
    }
  }

  // addCharacter(character) {
  //   const newCharacter = new CharacterEntity(character, this.id);
  //   this.characters.push(newCharacter.getcharacter());
  // }

  getUser() {
    const bcrypt = new BcryptHelper();
    const hashPassword = bcrypt.hashGenerator(this.password);

    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
      password: hashPassword,
      image: this.image,
      character: this.characters,
    };
    return user;
  }
}