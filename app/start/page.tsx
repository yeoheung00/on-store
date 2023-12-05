
import Link from 'next/link'
import styles from './page.module.css'

export default function Page() {
  return (
    <main className="w-screen h-screen relative ">
      <div className={styles.background} />
      <div className="top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute flex flex-col items-center gap-6">
        <img className="w-48 h-auto" src='/symbol.svg' alt='symbol' />
        <p className="text-center text-2xl font-Pixeled leading-[40px]">In search of<br />the Missing Stimulus</p>
      </div>
      <Link className="top-[80%] left-1/2 translate-x-[-50%] translate-y-[-50%] absolute font-Pixeled" href="/search">
        <img src="/button.svg" className='w-[250px] h-auto block' />
        <h2 className='top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute font-Pixeled pb-2 text-white'>Play</h2>
      </Link>
    </main>
  )
}