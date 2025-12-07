import React from 'react';

const CustomerReview = ({review}) => {
    const {userName, review :testimonial, user_photoURL} = review;
    return (
           <div className="max-w-sm mx-auto bg-gray-900 rounded-2xl shadow-md p-6 relative">
      <div className="text-teal-300 text-4xl mb-2">“</div>

      <p className="text-white text-sm leading-relaxed">
       {testimonial}
      </p>

      <div className="border-t-2 border-dashed border-gray-300 my-4"></div>

      <div className="flex items-center gap-4">
        {/* Replace initials with an <img /> if you have an avatar */}
        <div className="w-11 h-11 rounded-full bg-teal-800 flex items-center justify-center text-white text-sm font-semibold">
        <img src={user_photoURL} alt="" />
        </div>
        <div>
          <div className="text-white font-medium">{userName}</div>
          <div className="text-white text-xs">{testimonial}</div>
        </div>
      </div>
    </div>
    );
};

export default CustomerReview;