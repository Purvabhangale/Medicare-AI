import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Medicines from './components/Medicines';
import AssessmentForm from './components/AssessmentForm';
import PrescriptionReport from './components/PrescriptionReport';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/assessment" element={<AssessmentForm />} />
          <Route path="/report" element={<PrescriptionReport />} />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
