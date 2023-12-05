
import styles from './page.module.css'

export default function Page() {
  return (
    <main className="w-screen h-screen flex flex-col items-center ">
      <div className={styles.background} />
      <div className="flex flex-col items-center gap-10 mt-64">
        <img className="w-48 h-auto" src='/symbol.svg' alt='symbol' />
        <p className="text-center text-2xl font-Pixeled leading-[60px]">In search of<br />the Missing Stimulus</p>
        <p className="text-center text-3xl mb-8">Find what you want</p>
      </div>
    </main>
  )
}