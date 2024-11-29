import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="bg-primary/[.10] p-5 rounded-xl shadow-sm w-auto sm:w-[600px] h-auto sm:py-10">
        <p className="text-3xl font-semibold text-center">404</p>
        <Link
          href="/"
          className="font-medium mt-5 flex items-center justify-center gap-2 text-xl transition-all group"
        >
          <DoubleArrowLeftIcon 
            width={22}
            height={22}
            className="animate-pulse text-primary group-hover:-translate-x-3 transition-transform"
          />
          Back to Home 🙉
        </Link>
      </div>
    </div>
  )
}

export default NotFound;