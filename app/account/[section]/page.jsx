"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import Profile from "@/components/account/Profile";
import Travels from "@/components/account/Travels";
import Tickets from "@/components/account/Tickets";
import Wallet from "@/components/account/Wallet";

const page = () => {
  const pathname = usePathname();
  const section = pathname.split("/")[2];
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return router.push("/");

  const renderSection = () => {
    switch (section) {
      case "profile":
        return {
          component: <Profile user={user} />,
        };
      case "travels":
        return { component: <Travels user={user} /> };
      case "tickets":
        return { component: <Tickets user={user} /> };
      case "wallet":
        return { component: <Wallet user={user} /> };
      default:
        return {
          component: <div>اعادة التوجيه...</div>,
          extars: router.push("/account/profile"),
        };
    }
  };
  const { component } = renderSection();
  return <div>{component}</div>;
};

export default page;
