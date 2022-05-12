import { useEffect } from 'react'
import styles from './index.module.scss'
import { useParams } from 'react-router-dom'
import { useTypeDispatch, useTypeSelector } from '../../../../../store/store'
import { getSystems } from '../../../../../http/systemsApi'
import { ExersiceCard } from './components/ExerciseCard'

export const SystemExecisesInfo = () => {
  const { systemId, dayId }: any = useParams()
  const dispatch = useTypeDispatch()

  useEffect(() => {
    dispatch(getSystems())
  }, [dispatch])

  const corrcetSystemId = [...systemId].pop()
  const exercises = useTypeSelector(state => state.systems[corrcetSystemId - 1].exercises[dayId])
  console.log(exercises)

  return (
    <div className={styles.container}>
      {exercises.map(e => (
        <ExersiceCard name={e.name} reps={e.reps} weight={e.weight} />
      ))}
    </div>
  )
}
