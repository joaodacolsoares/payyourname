import Person from "../interfaces/Person";
import RankingListItem from "./RankingListItem";

interface RankingListProps {
  persons: Person[]
}

export default function RankingList({ persons } : RankingListProps) {
  return (
    <ol>
      {
        persons.map(person => (<RankingListItem person={person} />))
      }
    </ol>
  );
}