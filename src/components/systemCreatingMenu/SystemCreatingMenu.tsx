import { FC, useState } from 'react'
import { useTypeSelector } from '../../store/store'
import { Navigate, useNavigate } from 'react-router-dom'
import { Exercise } from '../../store/mainReducer'
import { FORM_STEP } from './consts'
import { GeneralInfo } from './components/GeneralInfo'
import { DaysExercises } from './components/DaysExercises'
import { createSystem } from '../../http/systemsApi'
import { DaysExercisesInterface } from '../../store/mainReducer'

export const SystemCreatingMenu: FC = () => {
  const navigate = useNavigate()
  const user = useTypeSelector(state => state.user)

  const [currentStep, setCurrentStep] = useState<string>(FORM_STEP.GENERAL_INFO)
  const [daysexercises, setDaysexercises] = useState<DaysExercisesInterface>({})
  const [currentDay, setCurrentDay] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [daysCount, setDaysCount] = useState<string>('')

  const exercises = daysexercises[`day${currentDay}`]

  const addExercise = () => {
    const newExercises = [...exercises, { name: '', reps: '', weight: '' }]
    setDaysexercises({ ...daysexercises, [`day${currentDay}`]: newExercises })
  }

  const changeExerciseProperty = (property: keyof Exercise, value: string, id: number) => {
    setDaysexercises(daysExercises => {
      const newDaysExercises = { ...daysExercises }
      newDaysExercises[`day${currentDay}`][id][property] = value
      return newDaysExercises
    })
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^([а-яА-Яa-zA-Z ]){0,20}$/i.test(value)) {
      setName(e.target.value)
    }
  }
  const increaseDay = () => {
    if (currentDay !== +daysCount) setCurrentDay(currentDay => currentDay + 1)
    else {
      setCurrentStep(FORM_STEP.FINISH)
    }
  }

  const decreaseDay = () => {
    if (currentDay !== 1) setCurrentDay(currentDay => currentDay - 1)
    else {
      setCurrentStep(FORM_STEP.GENERAL_INFO)
    }
  }

  const handleNextClick = () => {
    if (currentStep === FORM_STEP.GENERAL_INFO) {
      const newDaysexercises: DaysExercisesInterface = {}
      for (let i = 1; i <= Number(daysCount); i++) {
        newDaysexercises[`day${i}`] = [{ name: '', reps: '', weight: '' }]
      }
      setDaysexercises(newDaysexercises)
      setCurrentStep(FORM_STEP.DAYS_EXERCISES)
    } else {
      increaseDay()
    }
  }

  const handleChangeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^[1-7]{0,1}$/i.test(value)) {
      setDaysCount(value)
    }
  }

  const handleChangeExerciseName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    const { value } = e.target
    if (/^([а-яА-Яa-zA-Z ]){0,20}$/i.test(value)) {
      changeExerciseProperty('name', value, id)
    }
  }

  const handleChangeReps = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    const { value } = e.target
    if (/^[0-9]{0,3}$/i.test(value)) {
      changeExerciseProperty('reps', value, id)
    }
  }

  const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    const { value } = e.target
    if (/^[0-9]{0,3}$/i.test(value)) {
      changeExerciseProperty('weight', value, id)
    }
  }

  const validate = () => {
    const name = Object.values(exercises).map(e => (!e.name ? false : true))
    const reps = Object.values(exercises).map(e => (!e.reps ? false : true))
    const weight = Object.values(exercises).map(e => (!e.weight ? false : true))
    return !(name.includes(false) || reps.includes(false) || weight.includes(false))
  }

  const addSystemHandler = () => {
    createSystem(name, daysexercises)
      .then(() => setCurrentStep(FORM_STEP.FINISH))
      .catch(e => alert(e))
  }

  if (currentStep === FORM_STEP.FINISH) {
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <>
      {user ? (
        <>
          {currentStep === FORM_STEP.GENERAL_INFO && (
            <GeneralInfo
              name={name}
              days={daysCount}
              handleChangeDays={handleChangeDays}
              handleNextClick={handleNextClick}
              handleChangeName={handleChangeName}
            />
          )}
          {currentStep === FORM_STEP.DAYS_EXERCISES && (
            <DaysExercises
              exercises={exercises}
              handleChangeExerciseName={handleChangeExerciseName}
              handleChangeReps={handleChangeReps}
              handleChangeWeight={handleChangeWeight}
              handleNextClick={handleNextClick}
              addExercise={addExercise}
              decreaseDay={decreaseDay}
              validate={validate}
              daysCount={daysCount}
              currentDay={currentDay}
              addSystemHandler={addSystemHandler}
            />
          )}
          {currentStep === FORM_STEP.FINISH && <div style={{ marginTop: 250 }}>system was successfully added</div>}
        </>
      ) : (
        <Navigate to={'/login'} />
      )}
    </>
  )
}
