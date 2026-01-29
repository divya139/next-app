import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main
      data-theme="cupcake"
    >
      <div className="flex min-h-screen flex-col items-center justify-between" >
        <NavBar /> 

        {/* <Link href="/users">Go to Users Page</Link> */}
        <div className="pt-4">
          <ProductCard />
        </div>
      </div>
    </main>
  );
}
