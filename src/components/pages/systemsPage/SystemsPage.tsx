import { useTypeSelector, useTypeDispatch } from '../../../store/store'
import { useEffect } from 'react'
import { getSystems } from '../../../store/mainReducer'

export const SystemsPage = () => {
  const dispatch = useTypeDispatch()
  const systems = useTypeSelector(state => state.userSystems.systems)
  console.log(systems)

  useEffect(() => {
    dispatch(getSystems())
  }, [dispatch])

  return <div style={{ marginTop: 200 }}></div>
}
