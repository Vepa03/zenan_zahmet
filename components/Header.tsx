import Container from './Container'
import React from 'react'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import FavoriteButton from './FavoriteButton'
import SignIn from './SignIn'
import MobileMenu from './MobileMenu'
import { Language } from './Language'

const Header = () => {
  return (
    <header className='bg-white py-5 border-b border-b-black/50'>
      <Container className='flex items-center justify-between'>
        <div className='w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0'>
          <MobileMenu/>
          <Logo/>
          
        </div>
        <HeaderMenu/>
        <div className='w-auto md:w-1/3 flex items-center justify-end gap-3'>
            <SearchBar/>
            <FavoriteButton/>
            <div className="hidden md:block">
              <Language />
            </div>
            <SignIn/>
        </div>
      </Container>
    </header>
  )
}

export default Header
