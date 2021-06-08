import Nickname from "../interfaces/Nickname";
import RankingListItem from "./RankingListItem";

interface RankingListProps {
  persons: Nickname[]
}


export default function RankingList({ persons } : RankingListProps) {
  return (
    <>
      <h2 className='mb-4 text-4xl text-white font-bold'>Ranking</h2>
      <ol>
        {
          persons.map((person, index) => (<RankingListItem key={person.name} person={person} index={index + 1} />))
        }
      </ol>
    </>
  );
}