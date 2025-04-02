import { AppBar, Toolbar, Typography, Box } from '@mui/material'

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{ height: 40, mr: 2 }}
        />

        <Typography variant="h6" sx={{ color: '#F1EEEE' }}>
          User Management
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
