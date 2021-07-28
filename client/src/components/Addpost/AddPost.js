import React, { useState } from 'react';
import {postBlogData} from '../../services/blog.service';
import './addpost.scss';

const initialstate={
    title:'',
    body:'',
}

function AddPost({handleClose}) {
    const [postData, setPostData] = useState(initialstate);

    // let history = useHistory();
    const handleChange = (e) => {
        const {name, value} = e.target;

        setPostData({
            ...postData,
            [name]:value
        })
    }

    const handlePost = (e) => {
        e.preventDefault();
        postBlogData(postData)
        .then((res) => {
            console.log(res.data);
        })
    }


    return (
        <div className="model">
            <div className="postmodel-main">
                <span onClick={handleClose} class="close">&times;</span>
                <div className="postmodel-form">
                    <form>
                        <div className="post-input">
                            <input type="text" name="title" placeholder="Enter post title" onChange={handleChange} />
                        </div>
                        <div className="post-input">
                            <input type="text" name="body" placeholder="Description" onChange={handleChange} />
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
