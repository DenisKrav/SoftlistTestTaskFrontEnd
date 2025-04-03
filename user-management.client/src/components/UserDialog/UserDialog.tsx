import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Checkbox, FormControlLabel, MenuItem
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User } from '../../api/Models/UserModel'

type UserDialogProps = {
    open: boolean
    onClose: () => void
    onSubmit: (data: Omit<User, 'id'>) => void
}

const userSchema = z.object({
    fullName: z.string().min(1, 'Required field').max(100),
    email: z.string().email('Email is not valid'),
    phone: z.string().min(10, 'Minimum 10 characters'),
    dateOfBirth: z.string(),
    role: z.enum(['Admin', 'User']),
    position: z.string().max(255),
    active: z.boolean(),
})

type FormData = z.infer<typeof userSchema>

export function UserDialog({ open, onClose, onSubmit }: UserDialogProps) {

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            dateOfBirth: new Date().toISOString().split('T')[0],
            role: 'User',
            position: '',
            active: true
        }
    })

    const handleFormSubmit: SubmitHandler<FormData> = (data) => {
        onSubmit(data)
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ mt: 1, mb: 1 }}>New user</DialogTitle>

            <DialogContent
                style={{paddingTop: "5px"}}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 1,
                    pb: 0,
                    pt: 3,
                }}
            >
                <TextField
                    label="Full Name"
                    {...register('fullName')}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                />
                <TextField
                    label="Email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Phone"
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
                <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            type="date"
                            label="Date of Birth"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...field}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth?.message}
                        />
                    )}
                />
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            select
                            label="Role"
                            fullWidth
                            {...field}
                            error={!!errors.role}
                            helperText={errors.role?.message}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                        </TextField>
                    )}
                />
                <TextField
                    label="Position"
                    {...register('position')}
                    error={!!errors.position}
                    helperText={errors.position?.message}
                />
                <Controller
                    name="active"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            }
                            label="Active"
                        />
                    )}
                />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2, pt: 2 }}>
                <Button
                    onClick={() => {
                        reset();
                        onClose();
                    }}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}
