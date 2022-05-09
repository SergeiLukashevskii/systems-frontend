import { FC } from 'react'
import { TextField, Button, ButtonGroup } from '@mui/material'
import styles from '../index.module.scss'
import { Exercise } from '../../../store/mainReducer'

interface Props {
  exercises: Exercise[]
  handleChangeExersiceName: (e: any, id: number) => void
  handleChangeReps: (e: any, id: number) => void
  handleChangeWeight: (e: any, id: number) => void
  addExerciseButton: (e: React.MouseEvent<HTMLButtonElement>) => void
  decrementHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleNextClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  addSystemHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  validation: () => boolean
  days: number | string
  currentDay: number | string
}

export const DaysExersices: FC<Props> = ({
  exercises,
  handleChangeExersiceName,
  handleChangeReps,
  handleChangeWeight,
  handleNextClick,
  addExerciseButton,
  decrementHandler,
  validation,
  days,
  currentDay,
  addSystemHandler
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.textFieldContainer}>
        {exercises.map(({ name, reps, weight }: any, id: any) => (
          <div key={id} style={{ marginBottom: 20 }}>
            <TextField
              value={name}
              id='outlined-basic'
              label='exercise'
              variant='outlined'
              className={styles.input}
              onChange={e => handleChangeExersiceName(e, id)}
            />
            <TextField
              value={reps}
              id='outlined-basic'
              label='reps'
              variant='outlined'
              className={styles.input}
              onChange={e => handleChangeReps(e, id)}
            />
            <TextField
              value={weight}
              id='outlined-basic'
              label='weight'
              variant='outlined'
              className={styles.input}
              onChange={e => handleChangeWeight(e, id)}
            />
          </div>
        ))}
        <Button onClick={addExerciseButton}>Add exercise</Button>
      </div>
      <ButtonGroup disableElevation variant='contained' className={styles.buttonGroup}>
        <Button className={styles.prevButton} onClick={decrementHandler}>
          Prev
        </Button>
        <Button
          className={styles.nextButton}
          onClick={+currentDay !== +days ? handleNextClick : addSystemHandler}
          disabled={validation() ? false : true}
        >
          {+currentDay !== +days ? 'Next' : 'Finish'}
        </Button>
      </ButtonGroup>
    </div>
  )
}
