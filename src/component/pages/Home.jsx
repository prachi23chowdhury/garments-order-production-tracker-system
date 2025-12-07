import React from 'react';
import HeroSection from '../HeroSection';
import HowItWorks from '../HowItWorks';
import ServicesCenter from '../ServicesCenter';
import Customer from '../Customer';

const reviewPromise = fetch("/reviews.json")
.then(res=> res.json())
const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <HowItWorks></HowItWorks>
           <ServicesCenter></ServicesCenter>
           <Customer reviewPromise={reviewPromise}></Customer>
        </div>
    );
};

export default Home;