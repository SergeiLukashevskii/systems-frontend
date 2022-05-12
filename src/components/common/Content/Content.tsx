import classnames from 'classnames'
import styles from './Content.module.scss'

type Props = {
  children: React.ReactNode,
  className?: string
}

export const Content:React.FC<Props> = ({children, className, ...props}) => {
  return (
    <div className={classnames([styles.content, className])} {...props}>{children}</div>
  )
}
