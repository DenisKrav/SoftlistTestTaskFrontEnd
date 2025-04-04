import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Alert, Typography } from '@mui/material'
import { useEffect } from 'react'

type StatusDialogProps = {
    open: boolean
    status: 'loading' | 'success' | 'error'
    message: string
    onClose: () => void
    autoCloseDelay?: number
}

export function StatusDialog({
    open,
    status,
    message,
    onClose,
    autoCloseDelay = 5000,
}: StatusDialogProps) {
    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => onClose(), autoCloseDelay)
            return () => clearTimeout(timer)
        }
    }, [status, autoCloseDelay, onClose])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Status</DialogTitle>
            <DialogContent sx={{ minWidth: 300, py: 2 }}>
                {status === 'loading' && (
                    <Typography align="center">
                        <CircularProgress />
                    </Typography>
                )}
                {status === 'success' && <Alert severity="success">{message}</Alert>}
                {status === 'error' && <Alert severity="error">{message}</Alert>}
            </DialogContent>
            {status !== 'loading' && (
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            )}
        </Dialog>
    )
}
