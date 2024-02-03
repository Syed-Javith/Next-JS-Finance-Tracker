"use client"
import React, { Dispatch, FC, SetStateAction } from 'react'

interface ModalProps{
    isOpen : boolean,
    setIsOpen : Dispatch<SetStateAction<boolean>>,
    children : React.ReactNode
}

const Modal : FC<ModalProps> = ({ isOpen , setIsOpen , children }) => {
  return (
    <div className="absolute h-full w-full top-0 left-0 z-10 text-black">
      <div className="w-[50%] h-[80vh] p-4 bg-slate-400 mx-auto rounded-lg m-4 transition-all duration-300">
          <button onClick={()=> setIsOpen(false) } className="right-4 top-4 text-black font-bold">X</button>
          {children}
      </div>
    </div>
  )
}

export default Modal
