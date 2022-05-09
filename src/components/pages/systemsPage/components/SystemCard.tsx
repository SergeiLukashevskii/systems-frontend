import { FC } from 'react'
import styles from './SystemCard.module.scss'

type Props = {
  name: string,
  daysCount: number,
  exercisesCount: number
}

export const SystemCard:FC<Props> = ({name, daysCount, exercisesCount}) => {
  return (
    <div className={styles.systemCard}>
      <div className={styles.systemName}>System {name}</div>
      <div className={styles.systemInfo}>
        <p>Days: <span>{daysCount}</span></p>
        <p>Exersices: <span>{exercisesCount}</span></p>
      </div>
    </div>
  )
}