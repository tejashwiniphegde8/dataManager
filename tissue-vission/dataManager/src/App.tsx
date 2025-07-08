import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dataset from './components/dataset';
import LandingPage from './components/landingPage/landingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/datasets/:projectId" element={<Dataset />} />
        
        {/* Add routes without the common layout here if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
