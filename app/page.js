import Image from 'next/image'
import styles from "./page.module.css";

import React from 'react';


const data = [
  {
    id: 0,
    author: "Chris",
    title: "Title 1",
    category: "Description 1",
   image: "https://res.cloudinary.com/dqjhgnivi/image/upload/v1695219583/ejxe6jo4cnbdluspalxd.jpg",
    text: "nmm/.m lkjhkj jklhl;k jhl.kjl jkhgljbgk. jhlkh/ikhjjh.kjjn nb,mn"
  },
  {
    id: 1,
    author: "Chris",
    title: "Title 2",
    category: "Description 2",
    image: "https://res.cloudinary.com/dqjhgnivi/image/upload/v1695219583/ejxe6jo4cnbdluspalxd.jpg",
    text: "mnbbv"
  }
];

export default function CardList() {
  return (
    <div className={styles.cardContainer}>
      {data.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardImageContainer}>
            <Image
              className={styles.cardImage}
              src={item.image}
              alt="nj.nmjkbv"
              width={80}
              height={200}
              // Use fill layout to cover the container
              objectFit="cover" // Cover the entire container without stretching
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
