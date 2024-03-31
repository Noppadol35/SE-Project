import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

export const metadata = {
  title: "Home 🏠",
};

async function getCookieData() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookies().getAll());
    }, 1000)
  );
}

export default async function Page() {
  const cookieData = await getCookieData();
  console.log(cookieData);
  return (
    <div>
      <Navbar />
      <h1>Hello World!</h1>
    </div>
  );
}
