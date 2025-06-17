import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export const index = async (userId) => {
  const response = await axios.post(`${API_URL}/api/index`, {userId}, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
};

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

export const editprofile = async ({userId}) =>{

  const response = await axios.post(`${API_URL}/api/editprofile`,{userId},{
   
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials:true
  });
  //  console.log(response,"response");
  return response.data;
}

export const updateprofile = async (profileData) => {
  const token = localStorage.getItem('token'); // Get token from storage
  const response = await axios.post(`${API_URL}/api/updateprofile`, profileData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true
  });
  return response.data;
}

export const destroy = async(userId) =>{
  const response = await axios.post(`${API_URL}/api/destroy`,{userId},{
    
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials:true
  });
  return response.data;
}