import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (

    <>
    <Header/>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white-500 to-White-700 text-black">
    <h1>Welcome to Home page</h1>
      </div>
      <Footer/>
      </>
  );
};

export default Home;
