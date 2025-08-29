import Head from 'next/head'
import { MENU } from '../data/menu'
export default function Menu(){
  const all = Object.values(MENU).flat()
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Head><title>Menu — Black and White</title></Head>
      <h1 className="text-3xl font-semibold mb-6">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {all.map(i=>(<div key={i.id} className="card"><div className="font-semibold">{i.name}</div><div className="text-sm text-muted">{i.desc}</div><div className="mt-2 font-semibold">{i.price} THB</div></div>))}
      </div>
    </div>
  )
}
