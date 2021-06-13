import { useContext } from "react";
import { NicknameContext } from "../contexts/NicknameContext";

export default function Presentation() {
  const { getTopNickname } = useContext(NicknameContext)
  const topNickname = getTopNickname()

  return (
    <>
      <h1 className='leading-snug text-4xl font-bold text-white lg:leading-snug lg:text-6xl'>
        Leave Your Mark 
        {
          topNickname && <><br/>like <span className='text-main'>{topNickname.name}</span></>
        } 
      </h1>
      <p className='text-1x1 lg:text-2xl text-white mt-3'>
      We are trying to prove to ourselves that we can make a production-enabled website. 
        Support us by donating as little as <strong>0,01 US$</strong> to leave your mark forever in our hearts.
      </p>
    </>
  );
}