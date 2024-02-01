import axios from 'axios';

const baseURL = 'http://localhost/api';

const instance = axios.create({
  baseURL,
  
});

const api = {
  
  sendFormData: async (formData) => {
    try {
      const response = await instance.post('/submitPin', formData);
      return response.data;
    } catch (error) {
      console.error('Error sending form data:', error);
      console.log(error.response)
      return error.response
    }
  },

  getAllPins: async () => {
    try {
      const response = await instance.get('/getAllPins');
      return response.data; 
    } catch (error) {
      console.error('Error fetching pins:', error);
      throw error;
    }
  },


};

export default instance;