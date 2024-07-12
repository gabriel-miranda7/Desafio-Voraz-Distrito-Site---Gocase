"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './NavBar.module.css';  // Importar estilos do CSS module
import logo from '../../assets/logo_sem_fundo.png';
import user from '../../assets/user.png';
import { Avatar } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";



const NavBar = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);

  interface JwtToken {
    username: string;
    // Adicione outras propriedades do token JWT, se houver
  }

  useEffect(() => {
    const decodeName = () => {
      const token = localStorage.getItem("token");
      if (token){
        const decoded = jwtDecode<JwtToken>(token); // Decodifica como JwtToken
        if (decoded && typeof decoded.username === 'string') {
          setUsername(decoded.username);
        }
      }
    }
    
    decodeName();  // Chama decodeName quando o componente for montado
  }, []);  // Array vazio para garantir que seja executado apenas uma vez, equivalente a componentDidMount
  
  return (
    <>
      <div className={styles.navHead}>
        <p>SAINT JOHN FESTIVAL</p>
        <p>SEE THE OFFERS</p>
      </div>
      <div className={styles.nav}>
        <div className={styles.logoImage}>
          <Image src={logo} alt="Logo da empresa" onClick={() => window.location.href = '/'} width={60} height={60} />
        </div>
        <ul className={styles.navItems}>
          <li className={styles.navItem}><a className={styles.navLink} href="/">Eletronics</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="/about">Jewelry</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="/services">Men´s Clothing</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="/contact">Woman´s Clothing</a></li>
        </ul>
        <input className={styles.searchBar} type='search' name='searchbar' placeholder='Search...' />
        {!username ? <div className={styles.logoImage} onClick={() => window.location.href = '/pages/login'}>
          <Image src={user} alt="Usuário" width={60} height={60} />
        </div> :
        <Avatar isDisabled name={username} className={styles.customAvatar}/>} 
      </div>
    </>
  );
}

export default NavBar;
