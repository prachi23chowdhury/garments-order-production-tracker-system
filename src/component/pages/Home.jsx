import React from 'react';
import HeroSection from '../HeroSection';
import HowItWorks from '../HowItWorks';
import ServicesCenter from '../ServicesCenter';
import Customer from '../Customer';
import OurProduct from '../OurProduct';
import WhyChooseUs from '../WhyChooseUs';

const reviewPromise = fetch("/reviews.json")
.then(res=> res.json())
const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <OurProduct></OurProduct>
           <HowItWorks></HowItWorks>
           <ServicesCenter></ServicesCenter>
           <Customer reviewPromise={reviewPromise}></Customer>
           <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;