import styles from './ContentHeader.module.scss'

type Props = {
  children: React.ReactNode
}

export const ContentHeader:React.FC<Props> = ({children}) => {
  return (
    <div className={styles.contentHeader}>
      <p className={styles.title}>{children}</p>
      <div className={styles.divider}></div>
    </div>
  )
}
