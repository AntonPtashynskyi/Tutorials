import React, { forwardRef } from "react";

export const Post = forwardRef(({ post }, ref) => {
  const content = ref ? (
    <li ref={ref} className="post">
      {post.body}
      <p>{post.id}</p>
    </li>
  ) : (
    <li className="post">
      {post.body} <p>{post.id}</p>
    </li>
  );
  return content;
});
