import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomerReview from './CustomerReview';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


const Customer = ({reviewPromise}) => {
    const reviews = use(reviewPromise)
    console.log(reviews)
    return (
        <div className='my-5'>
            <div className='text-center mb-24 mt-5'>
            <h3 className="text-4xl  font-bold my-8">What our customers are sayings</h3>
            <p className='text-sm'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
            </div>
            <div>
         
      <Swiper
      loop = {true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
         autoplay ={{
            delay: 2000,
            disableOnInteraction : false
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="mySwiper"
      >
        {
            reviews.map(review => <SwiperSlide key={review.id}>
          <CustomerReview review = {review}></CustomerReview>
        </SwiperSlide> )
          }
        
          
      </Swiper>
  
            </div>
        </div>
    );
};

export default Customer;