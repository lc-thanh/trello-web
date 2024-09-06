import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import PostAddIcon from '@mui/icons-material/PostAdd'

function ListColumns({ columns }) {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { mx: 2 }
    }}>
      {columns?.map(column => <Column key={column._id} column={column} />)}

      {/* Add new column */}
      <Box sx={{
        height: 'fit-content',
        mx: 2
      }}>
        <Button
          startIcon={<PostAddIcon />}
          color="appBarPrimary"
          variant="outlined"
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            py: 1
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
