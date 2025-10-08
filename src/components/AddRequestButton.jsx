import React from 'react'
import { IoMdAdd } from "react-icons/io";
export const AddRequestButton = ({handleRequestForm}) => {
  return (
    <div 
    onClick={handleRequestForm}
    className='flex flex-row items-center justify-center m-2 p-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer'>
        <IoMdAdd/>Add Request
    </div>
  )
}
