import axios from 'axios';
const instance =axios.create({
    baseURL: '/OrderPowerWeb'
});

export default instance;


