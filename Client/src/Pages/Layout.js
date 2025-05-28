import React from 'react';
import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="container mt-4">
        {children}
      </main>
      <footer className="footer mt-5 text-center">
        &copy; 2023 Your App Name
      </footer>
    </div>
  );
};

export default Layout; 