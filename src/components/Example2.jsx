import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { getPostPage } from "../api/asiox";
import { Post } from "./Post";

export const Example2 = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    "/posts",
    ({ pageParam = 1 }) => getPostPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("we are near the last post");
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (status === "error") return <p>Error: {error.message}</p>;

  const content = data?.pages.map((pg) => {
    return pg.map((post, index) => {
      if (pg.length === index + 1) {
        return <Post key={post.id} post={post} ref={lastPostRef} />;
      }
      return <Post key={post.id} post={post} />;
    });
  });

  return (
    <div>
      <h3>Infinite Scroll</h3>
      <ul className="postList"> {content}</ul>
      {isFetchingNextPage && <p>Loading ...</p>}
      {!hasNextPage && (
        <p onClick={() => window.scrollTo(0, 0)} className="toTop">
          Back to top
        </p>
      )}
    </div>
  );
};
