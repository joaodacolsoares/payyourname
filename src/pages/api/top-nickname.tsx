import { DonationEntity } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethods } from "../../constants/HttpMethods";
import { StatusCodes } from 'http-status-codes'
import Nickname from "../../interfaces/Nickname";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === HttpMethods.GET) {
    //@ts-ignore: Prisma typescript error with orderBy
    const result: DonationEntity & {_sum: { amount: number }}[]  = await prisma.donationEntity.groupBy({ by: ["nickname"], _sum: { amount: true }});
    
    if (result.length === 0) {
      res.json({});
      return;
    }

    const topNickname = result.reduce((accumulator, currentValue) => {
        console.log(accumulator, currentValue)
        if (currentValue._sum.amount > accumulator._sum.amount)
          return currentValue;
        return accumulator;
    }) as DonationEntity & {_sum: { amount: number }};

    res.json(transformToNicknameFromDatabase(topNickname));
    return;
  }

  res.status(StatusCodes.METHOD_NOT_ALLOWED)
}

const transformToNicknameFromDatabase = ({ nickname, _sum }: DonationEntity & {_sum: { amount: number }}): Nickname => {
  return { name: nickname, amount: _sum.amount };
}