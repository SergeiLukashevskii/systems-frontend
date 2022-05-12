import { FC } from 'react'
import styles from '../../systemCardInfo/SystemCard.module.scss'

type Props = {
  name: string
  reps: string
  weight: string
}

export const ExersiceCard: FC<Props> = ({ name, weight, reps }) => {
  return (
    <div className={styles.systemCard}>
      <div className={styles.systemName}>{name}</div>
      <div className={styles.systemInfo}>
        <p>
          reps: <span>{reps}</span>
        </p>
        <p>
          weight: <span>{weight}</span>
        </p>
      </div>
    </div>
  )
}
