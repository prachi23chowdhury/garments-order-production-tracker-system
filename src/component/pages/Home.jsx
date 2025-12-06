import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router';
import HeroSection from '../HeroSection';
import HowItWorks from '../HowItWorks';
import ServicesCenter from '../ServicesCenter';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <HowItWorks></HowItWorks>
           <ServicesCenter></ServicesCenter>
        </div>
    );
};

export default Home;