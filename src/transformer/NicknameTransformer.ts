import { DonationEntity } from ".prisma/client";
import Nickname from "../interfaces/Nickname";

interface Mapper<T, V> {
  mapTo(to: T): V;
}

export const NicknameTransformer = {
  mapTo({ nickname, _sum }): Nickname {
    return { name: nickname, amount: _sum.amount };
  }
} as Mapper<DonationEntity & { _sum: { amount: number } }, Nickname>;


