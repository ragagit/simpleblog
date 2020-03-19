import axios from 'axios';

//axios is used for get and post requests. The functions are passed to the components.
//This service can be replaced by any other library.
const AxBlogService = {
    axget: (url) => axios.get(url, { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }),
    axpost: (url, blog) => axios.post(url, JSON.stringify(blog), { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }),
    API_URL: 'https://jsonplaceholder.typicode.com/posts'
}

export default AxBlogService;
