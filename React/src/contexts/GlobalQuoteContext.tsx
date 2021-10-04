import { createContext, ReactNode, useCallback, useState } from "react";
import { globalQuote, globalQuoteProps } from "../interfaces/GlobalQuote";


type GlobalQuoteContextProviderProps = {
  children: ReactNode;
}

type GlobalQuoteContextType = {
  globalQuote: globalQuote
  setGlobalQuoteFunc: (item: globalQuote) => void
}

const GLOBAL_QUOTE = {
  "Global Quote": {} as globalQuoteProps
} as globalQuote

export const GlobalQuoteContext = createContext({} as GlobalQuoteContextType)

export function GlobalQuoteContextProvider(props: GlobalQuoteContextProviderProps) {
  const [globalQuote, setGlobalQuote] = useState<globalQuote>(GLOBAL_QUOTE)
  
  const setGlobalQuoteFunc = useCallback((item: globalQuote) => {
    setGlobalQuote(item)   
  }, [])

  return (
    <GlobalQuoteContext.Provider value={{globalQuote, setGlobalQuoteFunc}}>
      {props.children}
    </GlobalQuoteContext.Provider>
  )
}