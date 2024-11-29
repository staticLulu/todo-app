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

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    const filterData = posts.filter((post: PostsProps) => post.id !== id);
    setPosts(filterData);
  }

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
            onClick={() => router.push(`/posts/${row.id}?mode=read`)}
          >
            Read
          </Button>
          <Button 
            color="primary" 
            size="sm"
            onClick={() => router.push(`/posts/${row.id}?mode=edit`)}
          >
            Edit
          </Button>
          <Button 
            color="danger" 
            size="sm" 
            variant="bordered"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <div className="py-5 flex justify-between">
        <div className="flex items-center gap-2.5">
          <h1 className="text-3xl font-semibold">Blog Posts</h1>
          <Button 
            variant="light" 
            size="lg" 
            onClick={() => router.push('/')}
          >
            👈 back
          </Button>
        </div>
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
