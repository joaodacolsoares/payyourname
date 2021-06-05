import Nickname from "../interfaces/Nickname";

interface RankingListItemProps {
  person: Nickname
}

export default function RankingListItem({ person } : RankingListItemProps) {
  return (
    <li className='p-2 mb-2 rounded border-b border-blue-300 flex justify-between'><span>{person.name}</span> <span>USD {person.amount}</span></li>
  );
}