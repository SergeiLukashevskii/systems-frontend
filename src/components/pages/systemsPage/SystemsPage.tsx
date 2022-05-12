import { useTypeSelector, useTypeDispatch } from '../../../store/store'
import { useEffect } from 'react'
import { getSystems } from '../../../http/systemsApi'
import { SystemCard } from './components/systemCardInfo/SystemCard'
import { ContentWrapper } from '../../common/ContentWrapper/ContentWrapper'
import { ContentHeader } from '../../common/ContentHeader/ContentHeader'
import { Content } from '../../common/Content/Content'
import styles from './SystemsPage.module.scss'

export const SystemsPage = () => {
  const dispatch = useTypeDispatch()
  const systems = useTypeSelector(state => state.systems)

  useEffect(() => {
    dispatch(getSystems())
  }, [dispatch])

  return (
    <ContentWrapper>
      <ContentHeader>Systems List</ContentHeader>
      <Content className={styles.systemsList}>
        {systems?.map((system) => (
          <SystemCard
            path={system.id}
            key={system.id}
            name={system.name}
            daysCount={system.daysCount}
            exercisesCount={Object.keys(system.exercises).length}
          />
        ))}
      </Content>
    </ContentWrapper>
  )
}
