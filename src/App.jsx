import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Planos from './pages/Planos';
import Contato from './pages/Contato';
import Suporte from './pages/Suporte';
import Login from './pages/Login';
import InvestmentHub from './components/InvestmentHub';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/login" element={<Login />} />
        <Route path="/investimentos" element={<InvestmentHub />} />
      </Routes>
    </Router>
  );
}