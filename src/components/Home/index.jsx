import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const Home = () => {
  const [id, setId] = useState(null);
  
  const handleChange = (e) => {
    setId(e.target.value);
    console.log(e.target.value);
  }

  return (
    <main className={styles.home}>
        <div className={styles.information}>
          <h1>
            Erika Chat
          </h1>
          <input type="text" placeholder='Write an id'  onChange={handleChange}/>
          <Link to={`/chat/${id}`} >
            <button>Go to chat</button>
          </Link>
        </div>
    </main>
  )
}


