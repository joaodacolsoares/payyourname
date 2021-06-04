import Person from "../interfaces/Person";

interface RankingListItemProps {
  person: Person
}

export default function RankingListItem({ person } : RankingListItemProps) {
  return (
    <li className='p-2 mb-2 rounded border-b border-blue-300'>{person.name}</li>
  );
}