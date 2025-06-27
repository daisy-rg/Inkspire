import React from "react";
import './Postcard.css';

function Postcard({post}){
   return(
    <div className="post-card">


       <h2 className="post-title">{post.title}</h2>
       <p className="posy-owner">By <span className="font-medium">{post.author}</span> on {post.date}</p>


       <p className="post-content">{post.content}</p>
    
    </div>

   );



}
export default Postcard;
