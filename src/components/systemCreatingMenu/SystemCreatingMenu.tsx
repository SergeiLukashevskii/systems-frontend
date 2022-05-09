import { FC, useState } from 'react'
import { useTypeDispatch, useTypeSelector } from '../../store/store'
import {
  setName,
  setDays,
  incrementCurrentDay,
  decrementCurrentDay,
  setReps,
  setWeight,
  addExercise,
  setExerciseName,
  cleanStore,
  setUserSystems
} from '../../store/mainReducer'
import { FORM_STEP } from './consts'
import { GeneralInfo } from './components/GeneralInfo'
import { DaysExersices } from './components/DaysExersices'
import { Navigate, useNavigate } from 'react-router-dom'
import { createSystem } from '../../http/userApi'

export const SystemCreatingMenu: FC = () => {
  const navigate = useNavigate()
  const dispatch = useTypeDispatch()
  const name = useTypeSelector(state => state.name)
  const days = useTypeSelector(state => state.daysCount)
  const currentDay = useTypeSelector(state => state.currentDay)
  const exercises = useTypeSelector(state => state.daysExersices[`day${currentDay}`])
  const user = useTypeSelector(state => state.user)
  const daysExersices = useTypeSelector(state => state.daysExersices)

  const [currentStep, setCurrentStep] = useState<String>(FORM_STEP.GENERAL_INFO)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setName(e.target.value))
  const incrementHandler = () => {
    if (+currentDay !== +days) dispatch(incrementCurrentDay())
    else {
      setCurrentStep(FORM_STEP.FINISH)
    }
  }
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentStep === FORM_STEP.GENERAL_INFO) {
      setCurrentStep(FORM_STEP.DAYS_EXERSICES)
    } else {
      incrementHandler()
    }
  }
  const decrementHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (+currentDay !== 1) dispatch(decrementCurrentDay())
    else {
      setCurrentStep(FORM_STEP.GENERAL_INFO)
    }
  }
  const addExerciseButton = (e: React.MouseEvent<HTMLButtonElement>) => dispatch(addExercise())
  const handleChangeExersiceName = (e: any, id: number) => dispatch(setExerciseName({ value: e.target.value, id }))
  const handleChangeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^[1-7]{0,1}$/i.test(value)) {
      dispatch(setDays(value))
    }
  }
  const handleChangeReps = (e: any, id: number) => {
    const { value } = e.target
    if (/^[0-9]{0,3}$/i.test(value)) {
      dispatch(setReps({ value: e.target.value, id }))
    }
  }
  const handleChangeWeight = (e: any, id: number) => {
    const { value } = e.target
    if (/^[0-9]{0,3}$/i.test(value)) {
      dispatch(setWeight({ value: e.target.value, id }))
    }
  }
  const validation = () => {
    const name = Object.values(exercises).map(e => (!e.name ? false : true))
    const reps = Object.values(exercises).map(e => (!e.reps ? false : true))
    const weight = Object.values(exercises).map(e => (!e.weight ? false : true))
    return !(name.includes(false) || reps.includes(false) || weight.includes(false))
  }

  const addSystemHandler = async () => {
    try {
      const data = await createSystem(name, daysExersices)
      dispatch(setUserSystems(data))
      setCurrentStep(FORM_STEP.FINISH)
    } catch (e: any) {
      alert(e)
    }
  }

  if (currentStep === FORM_STEP.FINISH) {
    setTimeout(() => {
      dispatch(cleanStore()) // fix
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
              days={days}
              handleChangeDays={handleChangeDays}
              handleNextClick={handleNextClick}
              handleChangeName={handleChangeName}
            />
          )}
          {currentStep === FORM_STEP.DAYS_EXERSICES && (
            <DaysExersices
              exercises={exercises}
              handleChangeExersiceName={handleChangeExersiceName}
              handleChangeReps={handleChangeReps}
              handleChangeWeight={handleChangeWeight}
              handleNextClick={handleNextClick}
              addExerciseButton={addExerciseButton}
              decrementHandler={decrementHandler}
              validation={validation}
              days={days}
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
