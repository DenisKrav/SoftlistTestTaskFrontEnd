import { Box, Paper, Typography, Chip, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { User } from '../../api/Models/UserModel'

type Props = {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: number) => void
}

export const UsersMobileList = ({ users, onEdit, onDelete }: Props) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {users.map((user) => (
        <Paper key={user.id} sx={{ p: 2 }}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="subtitle1"><strong>{user.fullName}</strong></Typography>
            <Typography variant="body2">📧 {user.email}</Typography>
            <Typography variant="body2">📞 {user.phone}</Typography>
            <Typography variant="body2">🎂 {user.dateOfBirth}</Typography>
            <Typography variant="body2">🛡️ {user.role}</Typography>
            <Typography variant="body2">👔 {user.position}</Typography>
            <Chip
              label={user.active ? 'Active' : 'Not active'}
              size="small"
              sx={{
                bgcolor: user.active ? '#579e68' : '#ad3618',
                color: "#F1EEEE",
                width: "fit-content"
              }}
            />
            <Box display="flex" gap={1} mt={1}>
              <IconButton size="small" onClick={() => onEdit(user)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => onDelete(user.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  )
}
