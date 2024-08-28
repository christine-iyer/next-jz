import Image from 'next/image';
import React from 'react';
import styles from './page.module.css';

const data = [
  {
    id: 0,
    author: 'Chris',
    title: 'Title 1',
    category: 'Description 1',
    image: 'https://res.cloudinary.com/dqjhgnivi/image/upload/v1721434023/c532xccdkr5om017yysf.jpg',
    text: 'nmm/.m lkjhkj jklhl;k jhl.kjl jkhgljbgk. jhlkh/ikhjjh.kjjn nb,mn',
  },
  {
    id: 1,
    author: 'Chris',
    title: 'Title 2',
    category: 'Description 2',
    image: 'https://res.cloudinary.com/dqjhgnivi/image/upload/v1720649658/lyd8huczkol0lpwtc1yk.jpg',
    text: 'mnbbv',
  },
];

export default function CardList() {
  return (
    <div className={styles.cardContainer}>
      {data.map((item, index) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardImageContainer}>
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={200}
              className={styles.cardImage}
              priority={index === 0} // Add priority to the first image
            />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>{item.title}</h2>
            <p className={styles.cardCategory}>{item.category}</p>
            <p className={styles.cardText}>{item.text}</p>
            <p className={styles.cardAuthor}>By: {item.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
