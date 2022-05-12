import styles from './SystemsPage.module.scss'
import { useTypeSelector, useTypeDispatch } from '../../../store/store'
import { useEffect } from 'react'
import { getSystems } from '../../../http/systemsApi'
import { SystemCard } from './components/systemCardInfo/SystemCard'

export const SystemsPage = () => {
  const dispatch = useTypeDispatch()
  const systems = useTypeSelector(state => state.systems)

  useEffect(() => {
    dispatch(getSystems())
  }, [dispatch])

  const path = window.location.pathname

  return (
    /*Object.keys(systems).length?*/
    <div className={styles.systemsList}>
      {systems?.map((system, index) => (
        <SystemCard
          path={`${path}/system${+index + 1}`}
          key={system.id}
          name={system.name}
          daysCount={system.daysCount}
          exercisesCount={Object.keys(system.exercises).length}
        />
      ))}
    </div>
  )
}
