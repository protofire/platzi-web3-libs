// Types
import { IInputButton } from '../../interfaces/button.interface'

import styles from './Button.module.scss'

function Button({ className, children, onClick, color = 'default', disabled }: IInputButton) {
  return (
    <button
      className={`
        ${styles.button}
        ${color === 'primary' && styles.button__primary}
        ${color === 'secondary' && styles.button__secondary}
        ${color === 'contrast1' && styles.button__contrast1}
        ${disabled && 'opacity-50'}
        ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
