import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Todo from '../features/todo/Todo'
import Github from '../features/github/Github'
import { ApiProvider } from '@reduxjs/toolkit/query/react'


const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Github />
      </header>
    </div>
  )
}

export default IndexPage
