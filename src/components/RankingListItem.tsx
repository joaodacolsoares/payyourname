import Person from "../interfaces/Person";

interface RankingListItemProps {
  person: Person
}

export default function RankingListItem({ person } : RankingListItemProps) {
  return (
    <li className='p-2 mb-3 bg-gray-600'>{person.name}</li>
  );
}