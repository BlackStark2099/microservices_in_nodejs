import React from 'react'
import PostForm from './Components/postsForm';
import PostLists from './Components/postList';



const App = () => {
    return <div className='container'>
        <h1>Create Post</h1>
        <PostForm/>
        <PostLists></PostLists>
    </div>
}

export default App;

