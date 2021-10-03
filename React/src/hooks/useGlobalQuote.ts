import { useContext } from 'react';
import { GlobalQuoteContext } from '../contexts/GlobalQuoteContext';

export function useGlobalQuote() {
  const value =  useContext(GlobalQuoteContext)

  return value
}