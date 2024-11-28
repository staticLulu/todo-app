'use client';
import DynamicTable, { Column } from "@/components/DynamicTable";
import { PostsProps } from "@/models/posts.model";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostsProps[]>([]);

  const fetchRecords = async () => {
    const response = await axios.get<PostsProps[]>('http://localhost:5000/posts');
    setPosts(response.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const columns: Column<PostsProps>[] = [
    { key: "id", header: "ID" },
    { key: "title", header: "Title" },
    { key: "content", header: "Content" },
    {
      key: "actions",
      header: "",
      render: (row: PostsProps) => (
        <div className="flex gap-2">
          <Button 
            color="primary" 
            variant="light" 
            size="sm"
            onClick={() => router.push(`/posts/${row.id}`)}
          >
            Read
          </Button>
          <Button 
            color="primary" 
            size="sm"
          >
            Edit
          </Button>
          <Button 
            color="danger" 
            size="sm" 
            variant="bordered"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto bg-rose-200 p-5">
      <div className="py-5 flex justify-between">
        <h1 className="text-3xl font-semibold">Blog Posts</h1>
        <Button
          onClick={() => router.push("/posts/create")}
          variant="shadow"
          color="success"
          className="text-white"
          size="sm"
        >
          Create New Post
        </Button>
      </div>

      <DynamicTable columns={columns} data={posts} />
    </div>
  );
};

export default PostPage;
