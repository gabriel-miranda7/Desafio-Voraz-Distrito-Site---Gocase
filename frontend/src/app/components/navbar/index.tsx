"use client"
import React from 'react';
import Image from 'next/image';
import styles from './NavBar.module.css';  // Importar estilos do CSS module
import logo from '../../assets/logo_sem_fundo.png';
import user from '../../assets/user.png';

const NavBar = () => {


  return (
    <>
      <div className={styles.navHead}>
        <p>SAINT JOHN FESTIVAL</p>
        <p>SEE THE OFFERS</p>
      </div>
      <div className={styles.nav}>
        <div className={styles.logoImage}>
          <Image src={logo} alt="Logo da empresa" width={60} height={60} />
        </div>
        <ul className={styles.navItems}>
          <li className={styles.navItem}><a className={styles.navLink} href="/">Eletronics</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="/about">Jewelry</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="/services">Men´s Clothing</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="/contact">Woman´s Clothing</a></li>
        </ul>
        <input className={styles.searchBar} type='search' name='searchbar' placeholder='Search...' />
        <div className={styles.logoImage} onClick={() => window.location.href = '/pages/login'}>
          <Image src={user} alt="Usuário" width={60} height={60} />
        </div>
      </div>
    </>
  );
}

export default NavBar;
