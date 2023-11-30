import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postSlice";

export default function Posts() {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    content = JSON.stringify(posts);
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <p>{content}</p>;
}
