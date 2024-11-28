'use client';

import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Input, Textarea } from "@nextui-org/react";

interface Post {
  title: string;
  content: string;
}

export default function PostAUser() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const fetchPost = useCallback(async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div className="h-screen w-screen">
      {post ? (
        <div className="max-w-screen-md mx-auto flex flex-col justify-center items-center bg-rose-200 p-5 shadow-sm rounded-lg">
          {editing ? (
            <form>
              <Input type="text" placeholder="Title" value={title} />
              <Textarea
                label="Content"
                variant="bordered"
                value={content}
                placeholder="Enter your content"
                disableAnimation
                disableAutosize
              />
            </form>
          ) : (
            <div className="max-w-screen-md bg-rose-200 p-5 shadow-sm rounded-lg">
              <h3 className="text-3xl font-semibold py-2">{post.title}</h3>
              <p className="text-lg">{post.content}</p>
            </div>
          )}
            <div className="flex gap-2">
              <Button className="text-white" color="primary">Home</Button>
              <Button 
                className="text-white" 
                onClick={() => setEditing(!editing)}
                color="secondary"
              >
                Edit
              </Button>
              <Button className="text-white" color="danger">Delete</Button>
            </div>
        </div>
      ) : (
        <p className="h-screen w-screen flex items-center justify-center">Loading...</p>
      )}
    </div>
  );
}
