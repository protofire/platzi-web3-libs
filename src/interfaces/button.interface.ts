export interface IInputButton {
  className?: string;
  children: string;
  color?: 'default' | 'primary' | 'secondary' | 'contrast1'
  onClick?: () => void;
  disabled?: boolean;
}