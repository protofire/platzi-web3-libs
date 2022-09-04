import Image from 'next/image'

import styles from './Logo.module.scss'

function Logo({ className }: any) {
  return (
    <div className={`${styles.logo} ${className}`}>
      <Image src='/platzi.webp' width={30} height={30} />
      <Image src='/favicon.ico' width={50} height={50} />
    </div>
  )
}

export default Logo
