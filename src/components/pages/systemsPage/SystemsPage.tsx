import { useTypeSelector, useTypeDispatch } from '../../../store/store'
import { useEffect } from 'react'
import { getSystems } from '../../../http/systemsApi'
import { SystemCard } from './components/SystemCard'
import styles from './SystemsPage.module.scss'

export const SystemsPage = () => {
  const dispatch = useTypeDispatch()
  const systems = useTypeSelector(state => state.systems)

  useEffect(() => {
    dispatch(getSystems())
  }, [dispatch])

  return (
    <div className={styles.systemsList}>
      {systems?.map((system) => (
        <SystemCard
          name={system.name}
          daysCount={system.daysCount}
          exercisesCount={Object.keys(system.exersices).length}
        />
      ))}
    </div>
  )
}
