import 'react-toastify/dist/ReactToastify.css' ; 
import Routes from './routes';
import GlobalStyles from './styles/global'
import {ToastContainer} from 'react-toastify'
import { GlobalQuoteContextProvider } from './contexts/GlobalQuoteContext';


function App() {
  return (
    <>
      <GlobalStyles />
      <GlobalQuoteContextProvider>
        <Routes />
      </GlobalQuoteContextProvider>   
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
