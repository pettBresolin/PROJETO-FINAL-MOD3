import { CharacterRepositoryMongoDb } from "../database/repositories/characterRepository.js";
import { CreateCharacterUseCase } from "../services/usecases/character/createCharacter.js";
import { UpdateCharacterUseCase } from "../services/usecases/character/updateCharacter.js";
import { FindAllCharacterUseCase } from "../services/usecases/character/findAllCharacters.js";
import { FindCharacterByIdUseCase } from "../services/usecases/character/findCharacterById.js";
import { DeleteCharacterUseCase } from "../services/usecases/character/deleteCharacter.js";
import { FindCharacterByNameUseCase } from "../services/usecases/character/findCharacterByName.js";
import { Services } from "../services/service.js";
import { characterController } from "../controllers/characterController.js";
import { CharacterRoutes } from "../routers/characterRoutes.js";

export function makeCharacterFactory(router) {
  const characterRepository = new CharacterRepositoryMongoDb();

  const createCharacterUseCase = new CreateCharacterUseCase(
    characterRepository
  );
  const findCharacterByIdUseCase = new FindCharacterByIdUseCase(
    characterRepository
  );
  const updateCharacterUseCase = new UpdateCharacterUseCase(
    characterRepository,
    findCharacterByIdUseCase
  );
  const deleteCharacterUseCase = new DeleteCharacterUseCase(
    characterRepository
  );
  const findCharacterByName = new FindCharacterByNameUseCase(
    characterRepository
  );
  const findAllCharacterUseCase = new FindAllCharacterUseCase(
    characterRepository
  );

  const characterService = new Services(
    createCharacterUseCase,
    updateCharacterUseCase,
    findAllCharacterUseCase,
    findCharacterByIdUseCase,
    deleteCharacterUseCase
  );

  const CharacterController = new characterController(
    characterService,
    findCharacterByName
  );

  const characterRoutes = new CharacterRoutes(characterController, router);

  return characterRoutes;
}
