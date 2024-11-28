'use client'
import { Button, Input, Textarea } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreatePage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/posts', {title, content});
    router.push("/posts");
  }

  return (
    <div className='max-w-screen-sm mx-auto pt-10'>
      <h1 className='text-3xl text-center font-semibold text-green-600'>Create New Post</h1>
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col space-y-4 mt-6 border p-6'
      >
        <Input 
          type='text' 
          label="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <Textarea
          value={content}
          label="Content"
          variant="bordered"
          placeholder="Enter your content"
          disableAnimation
          disableAutosize
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" className='bg-green-500 text-white py-1.5'>
          Create Post
        </Button>
      </form>
    </div>
  )
}

export default CreatePage