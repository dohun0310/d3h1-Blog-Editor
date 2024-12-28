"use client"

import styles from "./page.module.css";

import Button from "@/components/Button";

const categories = [
  { id: 1, name: "개발" },
  { id: 2, name: "잡담" },
  { id: 3, name: "후기" }
];

export default function Categories() {
  return (
    <div className={styles.main}>
      <div className={styles.buttons}>
        <Button
          className={styles.delete}
          icon="delete"
          label="삭제하기"
          variant="linear"
          onClick={() => null}
        />
        <Button
          icon="edit"
          label="수정하기"
          variant="linear"
          onClick={() => null}
        />
        <Button
          icon="add"
          label="추가하기"
          onClick={() => null}
        />
      </div>
      <div className={styles.categories}>
        {categories.map(category => (
          <div className={styles.category} key={category.id}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}