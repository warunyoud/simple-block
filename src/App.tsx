import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import './App.css';
import ChainConsistencyPage from './pages/ChainConsistency';

function App() {
  return (
    <ChakraProvider>
      <div className='App'>
        <Routes>
          <Route path='/simple-block' element={<ChainConsistencyPage />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
