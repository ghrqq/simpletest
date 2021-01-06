import React, { useEffect, useState } from "react";

import Posts from "../components/Posts";
import Hashtag from "./Hashtag";
import hashTagConverter from "../tools/hashTagConverter";

const SinglePost = ({ id }) => {
  const [isLoading, setisLoading] = useState(false);
  const [post, setpost] = useState([]);
  const [hashtags, sethashtags] = useState([]);

  useEffect(() => {
    setisLoading(true);
    async function getSinglePost() {
      const result = await (
        await fetch(`/api/singlepost/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (result.message) {
        setmessage(result.message);
        setstatus(result.status);
        setisAlert(true);
      }

      setpost([...post, result.post]);
      sethashtags(result.post.hashtags);
      setisLoading(false);
    }
    getSinglePost();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {post === [] || !post || post === undefined
        ? null
        : post.map((item) => <Posts post={item} />)}

      {hashtags === [] || !hashtags || hashtags === undefined
        ? null
        : hashtags.map((item) => (
            <Hashtag tagpercent={hashTagConverter(item, "percent")} />
          ))}
    </div>
  );
};

export default SinglePost;
