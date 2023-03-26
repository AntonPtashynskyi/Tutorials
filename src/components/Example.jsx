import React, { useState, useRef, useCallback } from "react";
import { usePosts } from "../hooks/usePosts";
import { Post } from "./Post";

export const Example = () => {
  const [page, setPage] = useState(1);
  const { error, hasNextPage, isError, isLoading, result } = usePosts(page);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("we are near the last post");
          setPage((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p>Error: {error.message}</p>;

  const content = result.map((post, index) => {
    if (result.length === index + 1) {
      return <Post key={post.id} post={post} ref={lastPostRef} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <div>
      <h3>Infinite Scroll</h3>
      <ul className="postList"> {content}</ul>
      {isLoading && <p>Loading ...</p>}
      {!hasNextPage && (
        <p onClick={() => window.scrollTo(0, 0)} className="toTop">
          Back to top
        </p>
      )}
    </div>
  );
};
