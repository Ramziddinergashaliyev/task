import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Auth from './pages/auth/Auth';
import Contract from './pages/contract/Contract';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="contract" element={<Contract />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
