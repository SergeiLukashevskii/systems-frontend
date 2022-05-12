import classnames from 'classnames';
import {FC, ReactNode} from 'react'
import styles from './ContentWrapper.module.scss';

type Props = {
  children: ReactNode,
  className?: string
}

export const ContentWrapper: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={classnames([styles.contentWrapper, className])} {...props}>
      {children}
    </div>
  )
}
