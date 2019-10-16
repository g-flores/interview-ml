import React from "react";

function Post({ post }) {
  return (
    <div className="bb b--gray helvetica w-50">
      <h2>{post.title}</h2>
      <h3>by {post.author}</h3>
      <p>{post.body}</p>
    </div>
  );
}

export default Post;
