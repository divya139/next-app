import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-between">
        {/* <Link href="/users">Go to Users Page</Link> */}
        <div className="pt-4">
          <ProductCard />
        </div>
      </div>
    </main>
  );
}
