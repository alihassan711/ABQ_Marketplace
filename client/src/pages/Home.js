import React from 'react'
import Hero from '../components/home/Hero'
import Cards from '../components/home/Cards'
import Info from '../components/home/Info'
import Auctions from '../components/home/Auctions'
import Collections from '../components/home/Collections'

export default function Home() {
  return (
    <>
    <Hero/>
    <Cards />
    <Info/>
    <Auctions/>
    <Collections/>
    </>
  )
}
