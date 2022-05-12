import { FC } from 'react'
import styles from '../index.module.scss'
import { TextField, Button, ButtonGroup } from '@mui/material'
import { Exercise } from '../../../store/mainReducer'

interface Props {
  exercises: Exercise[]
  handleChangeExerciseName: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => void
  handleChangeReps: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => void
  handleChangeWeight: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => void
  addExercise: () => void
  decreaseDay: () => void
  handleNextClick: () => void
  addSystemHandler: () => void
  validate: () => boolean
  daysCount: string
  currentDay: number
}

export const DaysExercises: FC<Props> = ({
  exercises,
  handleChangeExerciseName,
  handleChangeReps,
  handleChangeWeight,
  handleNextClick,
  addExercise,
  decreaseDay,
  validate,
  daysCount,
  currentDay,
  addSystemHandler
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.textFieldContainer}>
        {exercises.map(({ name, reps, weight }: Exercise, id: any) => (
          <div key={id} style={{ marginBottom: 20 }}>
            <TextField
              value={name}
              label='exercise'
              variant='outlined'
              className={styles.input}
              onChange={e => handleChangeExerciseName(e, id)}
            />
            <TextField
              value={reps}
              label='reps'
              variant='outlined'
              className={styles.input}
              onChange={e => handleChangeReps(e, id)}
            />
            <TextField
              value={weight}
              label='weight'
              variant='outlined'
              className={styles.input}
              onChange={e => handleChangeWeight(e, id)}
            />
          </div>
        ))}
        <Button onClick={addExercise}>Add exercise</Button>
      </div>
      <ButtonGroup disableElevation variant='contained' className={styles.buttonGroup}>
        <Button className={styles.prevButton} onClick={decreaseDay}>
          Prev
        </Button>
        <Button
          className={styles.nextButton}
          onClick={+currentDay !== +daysCount ? handleNextClick : addSystemHandler}
          disabled={validate() ? false : true}
        >
          {+currentDay !== +daysCount ? 'Next' : 'Finish'}
        </Button>
      </ButtonGroup>
    </div>
  )
}
