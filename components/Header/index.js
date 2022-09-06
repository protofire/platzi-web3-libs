import React from 'react';
import {header, title, navegation} from './index.module.scss' //it's good now!

export default function Header() {
  return (
    <header className={header}>
      <div className={title}>
      <h3>WEB3 <span>VS</span> ETHERS</h3>
      </div>
      <div className={navegation}>
        <p>Tesnet Goerli</p>
      </div>
    </header>
  )
}
