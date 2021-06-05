import Nickname from "../interfaces/Nickname";
import RankingListItem from "./RankingListItem";

interface RankingListProps {
  persons: Nickname[]
}


export default function RankingList({ persons } : RankingListProps) {
  return (
    <>
      <h2 className='mb-4 text-3xl'>Ranking</h2>
      <ol>
        {
          persons.map(person => (<RankingListItem person={person} />))
        }
      </ol>
    </>
  );
}