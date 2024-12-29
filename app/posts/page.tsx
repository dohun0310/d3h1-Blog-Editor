"use client"

import Image from "next/image";
import styles from "./page.module.css";

import Button from "@/components/Button";

const post = [
  { id: 1, title: "첫 번째 포스트", description: "나는 문어", teaser: "/opengraph.png", category: "잡담", date: "2024-12-31" },
  { id: 2, title: "두 번째 포스트", description: "꿈을 꾸는 문어", teaser: "/opengraph.png", category: "잡담", date: "2025-01-01" },
];

export default function Posts() {
  return (
    <div className={styles.main}>
      <div className={styles.buttons}>
        <Button
          icon="add"
          label="추가하기"
          onClick={() => window.location.href = "/posts/posting"}
        />
      </div>
      <div className={styles.posts}>
        {post.map(post => (
          <article className={styles.post} key={post.id}>
            <Image src={post.teaser} alt={post.title} width={100} height={100} />
            <div className={styles.content}>
              <p className={styles.category}>{post.category}</p>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.description}>{post.description}</p>
            </div>
            <div className={styles.date}>{post.date}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
