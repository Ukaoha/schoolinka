import React from 'react'

export interface ButtonProps {
    title?: string,
    border?: string,
    borderColor?: string,
    color?: string,
    text?: string,
    width?: string | number,
    height?: string | number,
    action?(): void,
}

const Button = ({ title, color, width, height, text, action, border, borderColor, } : ButtonProps) => {
  return (
    <div onClick={() => {action != undefined && action()}} className={`${color || "bg-blue-600"}  ${text || "text-white"} ${height || "h-10"} ${width || "flex-1"} flex justify-center items-center rounded-lg cursor-pointer ${border} ${borderColor}`}>
        {title || "Submit"}
    </div>
  )
}

export default Button