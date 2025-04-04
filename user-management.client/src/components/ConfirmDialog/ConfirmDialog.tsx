import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'

type ConfirmDialogProps = {
    open: boolean
    title?: string
    message: string
    onConfirm: () => void
    onCancel: () => void
    confirmText?: string
    cancelText?: string
}

export function ConfirmDialog({
    open,
    title = 'Confirm Action',
    message,
    onConfirm,
    onCancel,
    confirmText = 'Yes',
    cancelText = 'No'
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{cancelText}</Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
