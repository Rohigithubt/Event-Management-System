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
  const token = localStorage.getItem('token'); 
  const response = await axios.post(`${API_URL}/api/updateprofile`, profileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
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
  // console.log(response.data,"ddd")
  return response.data;
}

export const editnews = async(newsId) =>{
  const response = await axios.post(`${API_URL}/api/edit-news`,{newsId},{
    headers: {
     'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  console.log(response.data,"eeee")
  return response.data;
}

export const updatenews = async(newsId,updateData) =>{
  const response = await axios.post(`${API_URL}/api/update-news`, {newsId,updateData} , {
     headers: {
     'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  })
  console.log(response,"response")
  return response.data;
}

export const deletenews = async(newsId) =>{
  const response = await axios.post(`${API_URL}/api/delete-news`,{newsId}, {
     headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  return response.data;
}

//---------------------------------------------Seminar authstore-------------------------------------------------------------------l


export const createseminar = async(createData) =>{
  const response = await axios.post(`${API_URL}/api/create-seminar`,createData,{
     headers: {
     'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  })
  console.log(response.data,"response.data")
  return response.data;
}

export const indexseminar = async(seminarId) =>{
  const response = await axios.post(`${API_URL}/api/index-seminar`,seminarId,{
     headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  // console.log(response.data,"ddd")
  return response.data;
}

export const editseminar = async(seminarId) =>{
  const response = await axios.post(`${API_URL}/api/edit-seminar`,{seminarId},{
    headers: {
     'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  console.log(response.data,"eeee")
  return response.data;
}

export const updateseminar = async(formData) =>{
  const response = await axios.post(`${API_URL}/api/update-seminar`, formData , {
     headers: {
     'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  })
  console.log(response,"response")
  return response.data;
}

export const deleteseminar = async(seminarId) =>{
  const response = await axios.post(`${API_URL}/api/delete-seminar`,{seminarId}, {
     headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  return response.data;
}

//----------------------------------------------Webinar authstore-------------------------------------------------------------------

export const createwebinar = async (createData) => {
  const response = await axios.post(`${API_URL}/api/create-webinar`, createData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });
  return response.data;
};

export const indexwebinar = async () => {
  const response = await axios.post(`${API_URL}/api/index-webinar`, {}, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};

export const editwebinar = async (webinarId) => {
  const response = await axios.post(`${API_URL}/api/edit-webinar`, { webinarId }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};

export const updatewebinar = async (_id,formData) => {
  const response = await axios.post(`${API_URL}/api/update-webinar`, _id,formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });
  return response.data;
};

export const deletewebinar = async (webinarId) => {
  const response = await axios.post(`${API_URL}/api/delete-webinar`, { webinarId }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
};


//------------------------------------------------------Event authstore---------------------------------------------------------------------

export const createEvent = async(formData) =>{
  const response = await axios.post(`${API_URL}/api/create-event`,formData,{
    headers: {
      'Content-Type':'multipart/form-data'
    },
    withCredentials: true
  });
  return response.data;
};

export const indexEvent = async(eventId) =>{
  const response = await axios.post(`${API_URL}/api/index-event`,eventId,{
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials:true
  });
  console.log(response.data,"authstore response")
  return response.data;
};

export const deleteEvent = async(eventId) =>{
  const response = await axios.post(`${API_URL}/api/delete-event`,{eventId},{
    headers: {
      "Content-Type": 'application/json'
    },
    withCredentials: true
  });
  return  response.data;
};

//-------------------------------------------------------------contactusform authstore---------------------------------------------------

export const createcontactusform = async(formData) =>{
  const response = await axios.post(`${API_URL}/api/create-contactusform`,formData,{
    headers: {
      'Content-Type':'application/json'
    },
    withCredentials: true
  });
  return response.data;
};

export const indexcontactusform = async() =>{
  const response = await axios.post(`${API_URL}/api/index-contactusform`,{},{
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials:true
  });
  return response.data;
};

export const deletecontactusform = async(contactusformId) =>{
  const response = axios.post(`${API_URL}/api/delete-contactusform`,{contactusformId},{
    headers: {
      "Content-Type": 'application/json'
    },
    withCredentials: true
  });
  return  response.data;
};


//------------------------------------------------usernotification Authstore---------------------------------------------------

export const indexNotification = async() =>{
  const response = await axios.post(`${API_URL}/api/index-usernotification`,{},{
     headers: {
      'Content-Type': 'application/json'
    },
    withCredentials:true
  });
  return response.data;
};

export const deleteNotification = async(usernotificationId) =>{
  const response = axios.post(`${API_URL}/api/delete-usernotification`,{usernotificationId},{
     headers: {
      'Content-Type': 'application/json'
    },
    withCredentials:true
  });
  return response.data;
};

export const logout = async() =>{
  console.log(response,"reff")
  const response = await axios.post(`${API_URL}/api/logout`,{},{
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials:true
  });
  return response.data;
}