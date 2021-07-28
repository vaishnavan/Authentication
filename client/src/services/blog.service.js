import axios from 'axios';

const API_URL = "http://localhost:5000/blog/";

let tokenparse = JSON.parse(localStorage.getItem("auth"));
// let token = tokenparse.mytoken;

const postBlogData = (myData) => {
    return axios.post(API_URL+"createpost", myData, {
        method:"POST",
        headers:{
            authorization: tokenparse.mytoken
        }
    });
}

const getBlogData = () => {
    return axios.get(API_URL+"getpost",
    {
        method:"GET",
        headers:{
            authorization: tokenparse.mytoken
        }
    });
}

const deleteBlogPost = (id) => {
    return axios.delete(API_URL+`deletepost/${id}`,
        {
            method:"DELETE",
            headers:{
                authorization: tokenparse.mytoken
            }
        }
    )
}

export {
    postBlogData,
    getBlogData,
    deleteBlogPost
}