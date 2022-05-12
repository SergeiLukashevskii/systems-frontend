import { FC } from 'react'
import styles from './SystemCard.module.scss'
import { Link } from 'react-router-dom'

type Props = {
  name: string
  daysCount: number
  exercisesCount: number
  path: string
}

export const SystemCard: FC<Props> = ({ name, daysCount, exercisesCount, path }) => {
  return (
    <Link className={styles.link} to={path}>
      <div className={styles.systemCard}>
        <div className={styles.systemName}>{name}</div>
        <div className={styles.systemInfo}>
          <p>
            Days: <span>{daysCount}</span>
          </p>
          <p>
            Exercises: <span>{exercisesCount}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
