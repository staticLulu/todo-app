import { ReactNode } from "react";

export interface PostsProps {
  id: number;
  title: string;
  content: ReactNode;
  actions: ReactNode;
}