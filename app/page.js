import Image from "./image.png";
import styles from "./page.module.css";

export default function Home() {
  const data = [
    {
      id: 0,
      author: "Chris",
      title: "Title 1",
      category: "Description 1",
      text: "nmm/.m lkjhkj jklhl;k jhl.kjl jkhgljbgk. jhlkh/ikhjjh.kjjn nb,mn",
      image: "https://res.cloudinary.com/dqjhgnivi/image/upload/v1695219583/ejxe6jo4cnbdluspalxd.jpg"
    },
    {id:1,
      author: "Chris",
      title: "Title 2",
      category: "Description 2",
      category: "Description 2",
      text: "mnbbv",
      image: "https://res.cloudinary.com/dqjhgnivi/image/upload/v1695219583/ejxe6jo4cnbdluspalxd.jpg"
    }
  ]
  return (
    <div className="card-container">
    {data.map((item) => (
      <div key={item.id} className={styles.card}>
        <div className={styles.cardImageContainer}>
          <image className={styles.cardImage} src={item.image}  />
          <Image
  src={Image}
      width={500}
      height={500}
      alt={item.title}
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
  )
}
