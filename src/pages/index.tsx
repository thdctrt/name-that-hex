import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.sass'
import ColorText from '@/components/Core/Core'
import About from '@/components/About/About'

export default function Home() {
  return (
    <>
      <Head>
        <title>NameThatHex</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <ColorText />
      <About />
      </main>
    </>
  )
}
