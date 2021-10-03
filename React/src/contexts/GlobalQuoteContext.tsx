import { createContext, ReactNode, useCallback, useState } from "react";
import { globalQuote, globalQuoteProps } from "../interfaces/GlobalQuote";
import api from "../services/api";


type GlobalQuoteContextProviderProps = {
  children: ReactNode;
}

type GlobalQuoteContextType = {
  globalQuote: globalQuote
  searchGlobalQuote: () => void
}

const GLOBAL_QUOTE = {
  "Global Quote": {} as globalQuoteProps
} as globalQuote

export const GlobalQuoteContext = createContext({} as GlobalQuoteContextType)

export function GlobalQuoteContextProvider(props: GlobalQuoteContextProviderProps) {
  const [globalQuote, setGlobalQuote] = useState<globalQuote>(GLOBAL_QUOTE)
  
  const searchGlobalQuote = useCallback( async () => {
    const {data}: {data: globalQuote} = await api.get(
      `GLOBAL_QUOTEIBM${process.env.REACT_APP_API_KEY}`
    )

    setGlobalQuote(data)
  }, [])

  return (
    <GlobalQuoteContext.Provider value={{globalQuote, searchGlobalQuote}}>
      {props.children}
    </GlobalQuoteContext.Provider>
  )
}