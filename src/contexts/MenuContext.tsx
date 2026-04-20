"use client"
import { createContext, useContext, useState } from "react"

export const MenuContextInstance = createContext()
export const MenuContext = ({children}) => {
    const [Menu, setMenu] = useState(false)
  return (
      <MenuContextInstance.Provider value={{Menu, setMenu}}>
          {children}
    </MenuContextInstance.Provider>
  )
}
export const useMenu = () => useContext(MenuContextInstance)