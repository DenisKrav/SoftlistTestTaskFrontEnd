import {
    Typography, Paper, TextField, Table, TableHead, TableRow, TableCell,
    TableBody, TableContainer, TablePagination, IconButton,
    Chip,
    TableSortLabel,
    CircularProgress,
    Box,
    Alert,
    Button
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { UserDialog } from '../components/UserDialog/UserDialog'

export function UsersPage() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isDialogOpen, setDialogOpen] = useState(false)

    const [sortBy, setSortBy] = useState<'fullName' | 'email' | 'role' | 'position' | 'phone' | 'dateOfBirth' | 'active'>('fullName')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const { data: users, isLoading, isError } = useUsers()

    const filteredUsers = (users ?? []).filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        let aValue: string | number | boolean = ''
        let bValue: string | number | boolean = ''

        if (sortBy === 'dateOfBirth') {
            aValue = new Date(a.dateOfBirth).getTime()
            bValue = new Date(b.dateOfBirth).getTime()
        } else if (sortBy === 'active') {
            aValue = a.active
            bValue = b.active
        } else {
            aValue = a[sortBy]?.toString().toLowerCase()
            bValue = b[sortBy]?.toString().toLowerCase()
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
        return 0
    })

    const paginatedUsers = sortedUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleSort = (column: typeof sortBy) => {
        if (sortBy === column) {
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortBy(column)
            setSortDirection('asc')
        }
    }

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    mx: 'auto',
                    p: 4,
                    borderRadius: 4,
                    mt: 4,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Users list
                </Typography>

                {isError ?
                    <Alert severity="error" sx={{ my: 2 }}>
                        An error occurred while loading users.
                    </Alert>
                    :
                    isLoading ?
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                            <CircularProgress />
                        </Box>
                        :
                        <>
                            <Button
                                variant="contained"
                                sx={{ mb: 2 }}
                                onClick={() => setDialogOpen(true)}
                            >
                                Add user
                            </Button>

                            <TextField
                                label="Find user (input full name or email)"
                                variant="outlined"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                sx={{ mb: 3 }}
                            />

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={sortBy === 'fullName'}
                                                    direction={sortBy === 'fullName' ? sortDirection : 'asc'}
                                                    onClick={() => handleSort('fullName')}
                                                >
                                                    Full name
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={sortBy === 'email'}
                                                    direction={sortBy === 'email' ? sortDirection : 'asc'}
                                                    onClick={() => handleSort('email')}
                                                >
                                                    Email
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={sortBy === 'phone'}
                                                    direction={sortBy === 'phone' ? sortDirection : 'asc'}
                                                    onClick={() => handleSort('phone')}
                                                >
                                                    Phone
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={sortBy === 'dateOfBirth'}
                                                    direction={sortBy === 'dateOfBirth' ? sortDirection : 'asc'}
                                                    onClick={() => handleSort('dateOfBirth')}
                                                >
                                                    Date of birth
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={sortBy === 'role'}
                                                    direction={sortBy === 'role' ? sortDirection : 'asc'}
                                                    onClick={() => handleSort('role')}
                                                >
                                                    Role
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={sortBy === 'position'}
                                                    direction={sortBy === 'position' ? sortDirection : 'asc'}
                                                    onClick={() => handleSort('position')}
                                                >
                                                    Position
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={sortBy === 'active'}
                                                    direction={sortBy === 'active' ? sortDirection : 'asc'}
                                                    onClick={() => handleSort('active')}
                                                >
                                                    Status
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedUsers.map((user) => (
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
                                                    <IconButton onClick={() => console.log('Edit', user)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => console.log('Delete', user)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TablePagination
                                component="div"
                                count={filteredUsers.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                }
            </Paper>
            
            <UserDialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={(data) => {
                    console.log("Дані для створення:", data)
                    setDialogOpen(false)
                    // Тут буде useMutation(createUser)
                }}
            />
        </>
    )
}
