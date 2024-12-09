// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard/Dashboard';
// import Products from './components/Products/Products';
// import Orders from './components/Orders/Orders';
// import Vouchers from './components/Vouchers/Vouchers';
// import Navbar from './components/Navbar/Navbar';
// import Accounts from './components/Accounts/Accounts';
// import Categories from './components/Categories/Categories';
// import LoginSignup from './components/Login/LoginSignup';
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <header className="header">
//           <h1 className="logo">Souvenir Shop</h1>
//           <Navbar /> {/* Include Navbar here */}
//         </header>
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/vouchers" element={<Vouchers />} />
//             <Route path="/accounts" element={<Accounts />} /> 
//             <Route path="/categories" element={<Categories />} /> 
//             <Route path="/login" element={<LoginSignUp />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Orders from './components/Orders/Orders';
import Vouchers from './components/Vouchers/Vouchers';
import Accounts from './components/Accounts/Accounts';
import Navbar from './components/Navbar/Navbar';
import LoginSignup from './components/Login/LoginSignup';
import './App.css';

const App = () => {
  // Simulate login state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        {isAuthenticated ? (
          <>
            <header className="header">
              <h1>Souvenir Shop</h1>
              <Navbar />
            </header>
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/vouchers" element={<Vouchers />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<LoginSignup onLogin={handleLogin} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
