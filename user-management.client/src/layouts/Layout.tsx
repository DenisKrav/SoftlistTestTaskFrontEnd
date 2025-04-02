import { Container, Box } from '@mui/material'
import { ReactNode } from 'react'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}
