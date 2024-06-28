//https://api.themoviedb.org/3/movie/now_playing?api_key=d342dd73c096d2e418067782618c6db1&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;