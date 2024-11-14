import React from 'react';
import './App.css';
import { MainPage } from './pages/main/MainPage';
import { CurrencyPage } from './pages/currency/CurrencyPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/header/ui/Header';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/currency" element={<CurrencyPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
