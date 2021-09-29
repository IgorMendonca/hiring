import Routes from './routes';
import GlobalStyles from './styles/global'
import {ToastContainer} from 'react-toastify'


function App() {
  return (
    <>
      <GlobalStyles />
      <Routes />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
