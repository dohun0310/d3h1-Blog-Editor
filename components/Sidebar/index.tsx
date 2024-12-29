"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import { useMenuState } from "@/utils/menu";

const menuItems = [
  { path: "/", label: "홈" },
  { path: "/posts", label: "게시물 관리" },
  { path: "/categories", label: "카테고리 관리" }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isMenuVisible, subscribe, hideMenu } = useMenuState();
  const [visible, setVisible] = useState(isMenuVisible);

  useEffect(() => {
    const unsubscribe = subscribe(setVisible);
    return () => unsubscribe();
  }, [subscribe]);

  useEffect(() => {
    if (!visible) return;

    const handleClickOutside = () => hideMenu();

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [visible, hideMenu]);

  const getTitle = () => {
    if (pathname.startsWith("/posts")) {
      return "게시물 관리";
    }
    if (pathname.startsWith("/categories")) {
      return "카테고리 관리";
    }
    const currentItem = menuItems.find(item => item.path === pathname);
    return currentItem ? currentItem.label : "홈";
  };

  return (
    <aside className={styles.aside}>
      <h1 className={styles.title}>
        {getTitle()}
      </h1>
      <ul className={`${styles.menu} ${visible ? styles.open : styles.hidden}`}>
        {menuItems.map(item => (
          <li className={styles.item} key={item.path}>
            <Link className={pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path)) ? styles.active : styles.label} href={item.path}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}