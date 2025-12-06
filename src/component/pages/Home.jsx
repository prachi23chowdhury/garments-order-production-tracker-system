import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router';
import HeroSection from '../HeroSection';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
        </div>
    );
};

export default Home;