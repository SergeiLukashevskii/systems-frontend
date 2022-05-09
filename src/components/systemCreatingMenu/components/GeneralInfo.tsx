import { FC } from 'react'
import { TextField, Button } from '@mui/material'
import styles from '../index.module.scss'

interface Props {
  name: string | number
  days: string | number
  handleChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeDays: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNextClick: (e:React.MouseEvent<HTMLButtonElement>) => void
}

export const GeneralInfo: FC<Props> = ({ name, days, handleChangeName, handleChangeDays, handleNextClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textFieldContainer}>
        <TextField
          label='Name'
          variant='outlined'
          className={styles.input}
          value={name}
          onChange={handleChangeName}
          autoFocus
        />
        <TextField
          label='Days'
          variant='outlined'
          className={styles.input}
          value={days}
          onChange={handleChangeDays}
        />
      </div>
      <Button
        variant='contained'
        className={styles.firstPageButton}
        disabled={days && name ? false : true}
        onClick={handleNextClick}
      >
        Next
      </Button>
    </div>
  )
}
