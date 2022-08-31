import { UserEntity } from "./entities/user.js";

const user = new UserEntity({
  name: "Petterson",
  email: "hotmail@hotmail.com",
  password: "senhaSegura",
  image: "http://image.com",
  characters: [
    {
      id: "244ee134-72cc-4b2e-9d5e-7140709c5bc7",
      name: "Scobydoo",
      image: "http://imagescoby.com",
      userID: "40b6a0b8-e02f-4d4e-a2a8-7add9bdaa136",
    },
  ],
});

user.addCharacter({
  name: "shagy",
  image: "http://imageshagy.com",
});
console.log(user.getUser());
