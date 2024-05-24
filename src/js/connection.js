import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1';

const instance = axios.create({
  baseURL,

});

const api = {

  sendFormData: async (formData) => {
    try {
      const response = await instance.post('/pins/submitPin', formData);
      return response.data;
    } catch (error) {
      console.error('Error sending form data:', error);
      console.log(error.response)
      return error.response
    }
  },

  getAllPins: async () => {
    try {
      const response = await instance.get('/pins/getAllPins');
      return response.data;
    } catch (error) {
      console.error('Error fetching pins:', error);
      throw error;
    }
  },


};

export default instance;