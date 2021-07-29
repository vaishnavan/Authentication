import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import {getBlogData, deleteBlogPost } from '../../services/blog.service';
import AddPost from '../Addpost/AddPost';
import './home.scss';


function Home() {
    const [blogPost, setBlogPost] = useState([]);
    const [editedData, setEditedData] = useState([]);
    const [show, setShow] = useState(false);

    const myLoginUserData = JSON.parse(localStorage.getItem("auth"));
    console.log(myLoginUserData.user.username);

    useEffect(() => {
        getPostData();
    }, [])

    const getPostData = () => {
        getBlogData().then((res) => {
            // console.log(res.data);
            setBlogPost(res.data.getBlogData);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handlepopup = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleDelete = (id) => {
        deleteBlogPost(id)
        var deleteBlog = blogPost.filter((data) => data._id !== id)
        setBlogPost(deleteBlog);
    }

    const handleEdit = (data) => {
        setEditedData(data);
        setShow(true)
    }

    

    return (
        <div>
            <Navbar />
            <div className="addtask">
                <button onClick={handlepopup} >Add myPost</button>
            </div>
            {show ? <AddPost handleClose={handleClose} handleget={getPostData} handlepopup={handlepopup} handleEdit={handleEdit} handleEditData={editedData}  />: ''}
            <div style={{padding:"0.8rem"}} className="home-welcomeGreet">
                <h3>welcome, {myLoginUserData.user.username}</h3>
                {blogPost.sort((a,b) => a._id < b._id ? 1:-1).map((data) => {
                    return(
                        <div key={data._id}>
                            <h2 style={{textTransform:"capitalize"}}>{data.postedBy.username}</h2>
                            <h3>{data.title}</h3>
                            <p>{data.body}</p>
                            <button onClick={() => handleEdit(data)}>edit</button>
                            <button onClick={() => handleDelete(data._id)}>delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
