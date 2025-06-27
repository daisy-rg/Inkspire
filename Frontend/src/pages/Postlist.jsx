import React from "react";
import Postcard from "../components/Postcard";
import mockPosts from "../components/Mockpost";
import '../components/Postlist.css';

function Postlist(){
   return(
    <section className="post-list">
      <h1 className="post-list-title">📝 All Blog Posts</h1>
      {mockPosts.length > 0 ? (
        mockPosts.map((post) => <Postcard key={post.id} post={post} />)
      ) : (
        <p className="no-posts">No posts yet.</p>
      )}
    </section>

   )

}
export default Postlist;