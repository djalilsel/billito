"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  router.push("/account/profile");
  return <div>redirecting...</div>;
};
export default page;
