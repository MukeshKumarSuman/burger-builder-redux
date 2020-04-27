import axios from 'axios';

const instance = axios.create({
   //baseURL: 'https://react-burger-builder-my-app.firebaseio.com/'
   baseURL: 'http://localhost:8088/burger/'
});

export default instance;