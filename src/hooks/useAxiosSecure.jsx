import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    
    return axiosSecure;
};

export default useAxiosSecure;