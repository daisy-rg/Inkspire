import React from "react";
import './Write.css'
function Write(){
   return(
    <form className="write-form">
        <input 
        type="text"
        className="story-title"
        placeholder="Title" required/>

         <textarea
        className="story-content"
        placeholder="Tell your story..."
        required></textarea>
         <button type="submit" className="story-submit">Post Story</button>
    </form>

   );

}
export default Write;