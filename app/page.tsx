import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'

export default function Home() {
  return (
    <main data-theme="cupcake" className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to My Next.js App</h1>
     <Link href="/users">Go to Users Page</Link>
     <div>
      <ProductCard/>
     </div>
     
    </main>
  )
}
