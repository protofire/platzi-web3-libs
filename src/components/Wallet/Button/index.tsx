import './style.css'

export const Button = ({text, onClick, useStyle}: any) => {
  return (
    <button
      className={useStyle}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
