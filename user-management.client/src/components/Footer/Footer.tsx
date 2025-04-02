import { Box, Typography } from '@mui/material'

export function Footer() {
    return (
        <Box component="footer" sx={{ p: 2, textAlign: 'center', mt: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
                @ 2025 User Management. Created by Kravchenko Denys.
            </Typography>
        </Box>
    )
}
