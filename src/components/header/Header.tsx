import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material'
import styles from './Header.module.scss'
import { useTypeSelector } from '../../store/store'
import { ProfileButton } from './ProfileButton'

export const Header: FC = () => {
  const user = useTypeSelector(state => state.user)

  return (
    <div style={{ width: '100%', marginBottom: 50 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='sticky'>
          <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}></IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link className={styles.loginButton} to={'/creating'}>
                <Button
                  color='inherit'
                  onClick={() => {
                    if (!user) {
                      alert('you need to login')
                    }
                  }}
                >
                  Create a system
                </Button>
              </Link>
            </Typography>
            {user ? (
              <ProfileButton />
            ) : (
              <Link className={styles.loginButton} to={'/login'}>
                <Button color='inherit'>Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
