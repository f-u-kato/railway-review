import React, { useState} from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Header } from '../components/Header'
import { url } from '../const'
import './home.scss'

export const Home = () => {
  const [cookie] = useCookies(['token'])
  alert(cookie.token)
  return (
    <div>
      <Header />
      <main>
        <h1>書籍レビュー</h1>
      </main>
    </div>
  )
}