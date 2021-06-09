import { DonationEntity, NicknameEntity } from ".prisma/client";
import Nickname from "../interfaces/Nickname";

interface Mapper<T, V> {
  mapTo(to: T): V;
}

export const NicknameTransformer = {
  mapTo(nickname: NicknameEntity & { donations: DonationEntity[] }): Nickname {
    const getTotalValue = nickname.donations
      .map(donation => donation.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    return { name: nickname.name, amount: getTotalValue };
  }
} as Mapper<NicknameEntity, Nickname>;


