import '../../styles/header.css'
import Cart from '../../assets/cart-outline-filled.svg?react'

export function Header () {
    return (
       <header>
            <h1 className="logo">PAPPO</h1>
            <Cart width={25} height={25}/>
       </header> 
    )
}