import { useTypeSelector } from '../../../store/store'
import styles from './Profile.module.scss'

export const Profile = () => {
  const user = useTypeSelector(state => state.user)
  const email = user?.email

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <div>
            email: <span>{email}</span>
          </div>
          <div>
            состояние : <span>депрессия</span>
          </div>
          <div>
            возраст :<span> 0 лет</span>
          </div>
        </>
      ) : (
        'no user :('
      )}
    </div>
  )
}
