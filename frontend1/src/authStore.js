import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

/*-----------------------------------------------User authstore----------------------------------------------------------------- */

export const index = async (userId) => {
  const response = await axios.post(`${API_URL}/api/index`, { userId }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
};

export const register = async (registerData) => {
  const response = await axios.post(`${API_URL}/api/register`, registerData, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/api/login`, { email, password }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};

export const editprofile = async ({ userId }) => {

  const response = await axios.post(`${API_URL}/api/editprofile`, { userId }, {

    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
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

export const destroy = async (userId) => {
  const response = await axios.post(`${API_URL}/api/destroy`, { userId }, {

    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
}


/*----------------------------------------------------Location authstore---------------------------------------------------------------------- */



export const createlocation = async (LocationName) => {
  const response = await axios.post(`${API_URL}/api/create-location`, LocationName, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};

export const indexlocation = async (locationId) => {
  const response = await axios.post(`${API_URL}/api/index-location`, locationId, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  console.log(response.data, "responseresponse")
  return response.data;
};

export const deletelocation = async (locationId) => {
  const response = await axios.post(`${API_URL}/api/delete-location`, { locationId }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};

export const editlocation = async (locationId) => {
  const response = await axios.post(`${API_URL}/api/edit-location`, { locationId }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
}

export const updatelocation = async (locationId) => {
  const response = await axios.post(`${API_URL}/api/update-location`, locationId, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  return response.data;
}


/*------------------------------------------------News authstore-------------------------------------------------------------------------- */

export const createnews = async(createData) =>{
  const response = await axios.post(`${API_URL}/api/create-news`,createData,{
     headers: {
     'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  })
  console.log(response.data,"response.data")
  return response.data;
}

export const indexnews = async(newsId) =>{
  const response = await axios.post(`${API_URL}/api/index-news`,newsId,{
     headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  console.log(response.data,"ddd")
  return response.data;
}

export const editnews = async(newsId) =>{
  const response = await axios.post(`${API_URL}/api/edit-news`,newsId,{
    headers: {
     'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  })
  return response.data;
}

export const updatenews = async(newsId) =>{
  const response = await axios.post(`${API_URL}/api/update-news`,newsId, {
     headers: {
     'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  })
  return response.data;
}

export const deletenews = async(newsId) =>{
  const response = await axios.post(`${API_URL}/api/delete-news`,newsId, {
     headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  return response.data;
}