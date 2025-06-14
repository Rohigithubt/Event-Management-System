import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export const register = async (registerData) =>{
    const response = await axios.post(`${API_URL}/api/register`,registerData,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    return response.data;
};

export const login = async ({email, password}) => {    
  const response = await axios.post(`${API_URL}/api/login`, { email, password }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};
