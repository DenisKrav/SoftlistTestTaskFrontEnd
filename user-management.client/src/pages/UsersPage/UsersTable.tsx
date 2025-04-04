import {
    Table, TableHead, TableRow, TableCell,
    TableBody, TableSortLabel, Chip, IconButton
  } from '@mui/material'
  import EditIcon from '@mui/icons-material/Edit'
  import DeleteIcon from '@mui/icons-material/Delete'
  import { User } from '../../api/Models/UserModel'
  
  type Props = {
    users: User[]
    sortBy: string
    sortDirection: 'asc' | 'desc'
    onSort: (column: any) => void
    onEdit: (user: User) => void
    onDelete: (id: number) => void
  }
  
  export const UsersTable = ({ users, sortBy, sortDirection, onSort, onEdit, onDelete }: Props) => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            {['fullName', 'email', 'phone', 'dateOfBirth', 'role', 'position', 'active'].map((col) => (
              <TableCell key={col}>
                <TableSortLabel
                  active={sortBy === col}
                  direction={sortDirection}
                  onClick={() => onSort(col)}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.dateOfBirth}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.position}</TableCell>
              <TableCell>
                <Chip
                  label={user.active ? 'Active' : 'Not active'}
                  size="small"
                  sx={{
                    bgcolor: user.active ? '#579e68' : '#ad3618',
                    color: "#F1EEEE"
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  