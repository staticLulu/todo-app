'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Spinner } from "@nextui-org/react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/posts");
    }, 3200);
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {loading ? 
        <Spinner size="lg" color="success" />
        : <Button 
            onPress={handleLogin} 
            disabled={loading} 
            size="lg"
            className="bg-green-600 shadow-sm text-white"
          >
            Login 
          </Button>
      }
    </div>
  );
}
