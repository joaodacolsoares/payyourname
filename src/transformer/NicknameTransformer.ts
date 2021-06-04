import { NicknameEntity } from ".prisma/client";
import Nickname from "../interfaces/Nickname";

interface Mapper<T, V> {
  mapTo(to: T): V;
}

export const NicknameTransformer = {
  mapTo(nickname: NicknameEntity): Nickname {
    return { name: nickname.name, amount: nickname.amount };
  }
} as Mapper<NicknameEntity, Nickname>;
  

