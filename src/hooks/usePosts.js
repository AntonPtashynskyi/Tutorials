import { useState, useEffect } from "react";
import { getPostPage } from "../api/asiox";

export const usePosts = (pageNum = 1) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPostPage(pageNum, { signal })
      .then((data) => {
        setResult((prev) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setError({});
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: error.message });
      });

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, result, hasNextPage };
};
