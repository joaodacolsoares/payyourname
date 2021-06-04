import Person from "../interfaces/Person";
import RankingListItem from "./RankingListItem";

interface RankingListProps {
  persons: Person[]
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