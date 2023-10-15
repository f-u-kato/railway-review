import React, { useState} from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { url } from '../const'
import './home.scss'

export const Home = () => {
  const [cookie] = useCookies()
  alert(cookie)
  return (
    <div>
      <Header />
      <main>
        <h1>書籍レビュー</h1>
      </main>
    </div>
  )
}