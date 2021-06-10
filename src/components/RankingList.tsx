import { useContext } from "react";
import { NicknameContext } from "../contexts/NicknameContext";
import Nickname from "../interfaces/Nickname";
import RankingListItem from "./RankingListItem";

export default function RankingList() {
  const { getNicknameList } = useContext(NicknameContext)

  return (
    <>
      <h2 className='mb-4 text-4xl text-white font-bold'>Ranking</h2>
      <ol>
        {
          getNicknameList()
            .map((person, index) => (<RankingListItem key={person.name} person={person} index={index + 1} />))
        }
      </ol>
    </>
  );
}