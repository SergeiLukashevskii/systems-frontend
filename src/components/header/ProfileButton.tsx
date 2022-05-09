import { useState } from 'react'
import styles from '../header/Header.module.scss'
import { Box, Menu, MenuItem, Button, ListItemIcon, IconButton, Tooltip } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../store/mainReducer'
import { useTypeDispatch } from '../../store/store'

export const ProfileButton = (button: any) => {
  const navigate = useNavigate()
  const dispatch = useTypeDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Button style={{ color: 'white' }}>Profile</Button>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link className={styles.loginButton} to={'/profile'}>
          <MenuItem>
             <div style={{ color: 'blue' }}>My account</div>
          </MenuItem>
        </Link>
        <Link className={styles.loginButton} to={'/systems'}>
          <MenuItem>
            <div style={{ color: 'blue' }}>My systems</div>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            dispatch(setUser(null))
            localStorage.removeItem('token')
            navigate('/')
          }}
        >
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon >
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
