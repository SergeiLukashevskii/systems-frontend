import { FC } from 'react'
import styles from './SystemCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  name: string
  daysCount: number
  exercisesCount: number
  path: string
}

export const SystemCard: FC<Props> = ({ name, daysCount, exercisesCount, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path)
  }

  return (
    <div className={styles.systemCard} onClick={handleClick}>
      <div className={styles.systemName}>{name}</div>
      <div className={styles.systemInfo}>
        <p>
          <span className={styles.label}>Days</span>
          <span className={styles.value}>{daysCount}</span>
        </p>
        <p>
          <span className={styles.label}>Exercises</span>
          <span className={styles.value}>{exercisesCount}</span>
        </p>
      </div>
    </div>
  )
}
