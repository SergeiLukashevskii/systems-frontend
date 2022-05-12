import { useEffect } from 'react'
import styles from './index.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useTypeDispatch, useTypeSelector } from '../../../../../store/store'
import { getSystems } from '../../../../../http/systemsApi'

export const SystemDaysInfo = () => {
  const dispatch = useTypeDispatch()
  const { systemId }: any = useParams()
  console.log(systemId)
  // приходя из systems видит system.exer... , а просто по url systems/n - крашит
  useEffect(() => {
    dispatch(getSystems())
  }, [dispatch])

  const correctId = [...systemId].pop()
  const days = useTypeSelector(state => state.systems[correctId - 1].exercises)
  const daysKeysArray = Object.keys(days)
  const path = window.location.pathname
  
  return (
    <div className={styles.container}>
      {daysKeysArray?.map((e, index) => (
        <Link to={`${path}/day${index + 1}`}>
          <div className={styles.dayContainer}>{e}</div>
        </Link>
      ))}
    </div>
  )
}
