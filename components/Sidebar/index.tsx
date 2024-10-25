"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

const menuItems = [
  { path: "/", label: "홈" },
  { path: "/posts", label: "게시물 관리" },
  { path: "/categories", label: "카테고리 관리" }
];

export default function Sidebar() {
  const pathname = usePathname();

  const getTitle = () => {
    const currentItem = menuItems.find(item => item.path === pathname);
    return currentItem ? currentItem.label : "홈";
  };

  return (
    <aside className={styles.aside}>
      <h1 className={styles.title}>
        {getTitle()}
      </h1>
      <ul className={styles.menu}>
        {menuItems.map(item => (
          <li className={styles.item} key={item.path}>
            <Link className={pathname === item.path ? styles.active : styles.label} href={item.path}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
