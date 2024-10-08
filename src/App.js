import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Exercise from './pages/Exercise1.1';
import Exercise1_2 from './pages/Exercise1.2';
import Exercise1_3 from './pages/Exercise1.3';
import Exercise2_1 from './pages/Exercise2.1';
import Exercise2_2 from './pages/Exercise2.2';
import Exercise2_3 from './pages/Exercise2.3';
import Exercise3_1 from './pages/Exercise3.1';
import Exercise3_2 from './pages/Exercise3.2';
import Exercise3_3 from './pages/Exercise3.3';
import Exercise3_4 from './pages/Exercise3.4';
import Exercise3_5 from './pages/Exercise3.5';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/exercise1.1" element={<Exercise />} />
          <Route path="/exercise1.2" element={<Exercise1_2 />} />
          <Route path="/exercise1.3" element={<Exercise1_3 />} />
          <Route path="/exercise2.1" element={<Exercise2_1 />} />
          <Route path="/exercise2.2" element={<Exercise2_2 />} />
          <Route path="/exercise2.3" element={<Exercise2_3 />} />
          <Route path="/exercise3.1" element={<Exercise3_1 />} />
          <Route path="/exercise3.2" element={<Exercise3_2 />} />
          <Route path="/exercise3.3" element={<Exercise3_3 />} />
          <Route path="/exercise3.4" element={<Exercise3_4 />} />
          <Route path="/exercise3.5" element={<Exercise3_5 />} />
          <Route path="/result" element={<ResultPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
