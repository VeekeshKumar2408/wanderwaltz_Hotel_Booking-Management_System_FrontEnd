import React from 'react'

const MainHeader = () => {
  return (
    <header className='header-banner'>
        <div className='overlay'></div>
        <div className='animated-texts overlay-content'>
            <h1>
                Welcome To <span className='hotel-color'>WanderWaltz Hotel</span>
            </h1>
            <h4 className='text-center'>
                Experience The Best Hospitality
            </h4>
        </div>
    </header>
  )
}

export default MainHeader