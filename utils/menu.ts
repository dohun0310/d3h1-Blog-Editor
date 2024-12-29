import { useState } from "react";

let menuState = false;
let listeners: Function[] = [];

export const useMenuState = () => {
  const [isMenuVisible, setMenuVisible] = useState(menuState);

  const toggleMenu = () => {
    menuState = !menuState;
    setMenuVisible(menuState);
    listeners.forEach(listener => listener(menuState));
  };

  const hideMenu = () => {
    menuState = false;
    setMenuVisible(menuState);
    listeners.forEach(listener => listener(menuState));
  };

  const subscribe = (listener: Function) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return { isMenuVisible, toggleMenu, subscribe, hideMenu };
};
