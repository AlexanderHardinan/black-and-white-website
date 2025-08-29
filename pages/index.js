import Head from 'next/head'
import Link from 'next/link'
export default function Home(){
  return (
    <div>
      <Head>
        <title>Black and White — Chef Alex</title>
      </Head>
      <header className="border-b py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Black and White Logo" className="h-20 w-auto" />
            <div>
              <div className="font-semibold">Black and White</div>
              <div className="text-xs text-muted">by Chef Alex</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-4 text-sm text-muted">
            <Link href="/menu">Menu</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/reserve">Reserve</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-black text-white">Black and White by Chef Alex</span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold">Black <span style={{color:'#CBA135'}}>and</span> White</h1>
          <p className="mt-4 text-muted max-w-xl">Pure, Bold, and Timeless.</p>
          <div className="mt-6 flex gap-3">
            <a href="/menu" className="btn-primary">Explore Menu</a>
            <a href="/reserve" className="btn-ghost">Reserve</a>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img src="/images/BW logo.png" alt="BW logo" className="w-full h-96 object-cover"/>
        </div>
      </main>
      <footer className="border-t py-8 text-sm text-muted">
        <div className="max-w-6xl mx-auto px-6">© {new Date().getFullYear()} Black and White</div>
      </footer>
    </div>
  )
}
