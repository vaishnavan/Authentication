import React, { useEffect, useState } from 'react';
import {postBlogData, updateBlogPost} from '../../services/blog.service';
import './addpost.scss';

const initialstate={
    _id:'',
    title:'',
    body:'',
}

function AddPost({handleClose, handleget, handleEditData, handleEdit, handlepopup}) {
    const [postData, setPostData] = useState(initialstate);
    console.log(handleEditData);


    handlepopup = () => {
        setPostData({
            title:'',
            body:'',
        })
    }
    

    handleEdit = () => {
        if(handleEditData._id != null){
            setPostData({
                title: handleEditData.title,
                body: handleEditData.body
            })
        }
    }


    // let history = useHistory();
    const handleChange = (e) => {
        const {name, value} = e.target;

        setPostData({
            ...postData,
            [name]:value
        })
    }

    // handlepop = () => {
    //     setPostData({
    //         title:'',
    //         body:''
    //     })
    // }

    const handlePost = (e) => {
        e.preventDefault();
        if(handleEditData._id){
            updateBlogPost(handleEditData._id, postData)
            .then((res) => {
                setPostData({
                    _id:'',
                    title:'',
                    body:''
                })
                handleget();    
            })
        }else{
            postBlogData(postData)
            .then((res) => {
                setPostData({
                    title:'',
                    body:''
                })
                handleget();    
            })
        }
    }

    


    return (
        <div className="model">
            <div className="postmodel-main">
                <span onClick={handleClose} class="close">&times;</span>
                <div className="postmodel-form">
                    <form>
                        <div className="post-input">
                            <input type="text" value={postData.title} name="title" placeholder="Enter post title" onChange={handleChange} />
                        </div>
                        <div className="post-input">
                            <input type="text" value={postData.body} name="body" placeholder="Description" onChange={handleChange} />
                        </div>
                        <div className="post-btn">
                            <button onClick={handlePost}>Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPost
