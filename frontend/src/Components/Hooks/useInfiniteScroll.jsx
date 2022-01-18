import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";

const useInfiniteScroll = (loading) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef();
    
    const lastPostRef = useCallback(
        (node) => {
          if (loading) return;
          if (observer.current) observer.current.disconnect();
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
              setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
          });
          if (node) observer.current.observe(node);
        },
        [loading, hasMore]
      );


  
    return {pageNumber,setHasMore,setPageNumber,lastPostRef};
}
 
export default useInfiniteScroll;