import { createContext, ReactNode, useState } from 'react';
import Nickname from '../interfaces/Nickname';

interface NicknameContextProps {
  getTopNickname: () => Nickname | null;
  getNicknameList: () => Nickname[];
}

export const NicknameContext = createContext({} as NicknameContextProps);

interface NicknameProviderProps {
  children: ReactNode;
  nicknames: Nickname[];
}

export function NicknameProvider({ children, nicknames }: NicknameProviderProps) {
  const [nicknameList, setNicknames] = useState(nicknames || []);

  function getTopNickname() {
    return nicknameList[0] || null;
  }

  function getNicknameList() {
    return nicknameList;
  }

  return (
    <NicknameContext.Provider
      value={{
        getTopNickname,
        getNicknameList,
      }}
    >
      {children}
    </NicknameContext.Provider>
  );
}
