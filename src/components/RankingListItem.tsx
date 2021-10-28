import Nickname from "../interfaces/Nickname";

interface RankingListItemProps {
  index: number,
  person: Nickname
}

export default function RankingListItem({ index, person } : RankingListItemProps) {
  return (
    <li className='z-10 relative from-black-to-transparent px-5 p-2 mb-2 flex justify-between items-center list-item-container text-white box-border border-secondary-black border rounded-md'>
      <div className='flex items-center'>
        <div className={` ${index == 1 ? 'bg-main' : 'bg-gray-700'} w-8 h-8 flex items-center justify-center rounded-full mr-6`}>{index}</div>
        <span className='font-bold'>{person.name}</span> 
      </div>
      <span>US$ {person.amount / 100}</span>
    </li>
  );
}