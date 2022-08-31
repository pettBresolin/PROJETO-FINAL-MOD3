import * as bcrypt from "bcrypt";

export class BcryptHelper {
  hashGenerator(password) {
    const hash = bcrypt.hashSync(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        throw new Error("Erro na hash");
      }
      return hash;
    });

    return hash;
  }

  comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
