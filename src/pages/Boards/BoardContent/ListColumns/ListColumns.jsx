import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import PostAddIcon from '@mui/icons-material/PostAdd'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  return (
    /**
     * SortableContext yêu cầu dữ liệu truyền vào items là một mảng chứa các kiểu dữ liệu nguyên thủy (Primitive Data type)
     * ví dụ như: [1, 2, 3] hay ['id-1', 'id-2', 'id-3'].
     * Chứ không được chứa các kiểu dữ liệu đối tượng (Object) như: [{ id: 'id-1' }, { id: 'id-2' }].
     * Nếu truyền không đúng, thì chức năng kéo thả vẫn hoạt động, nhưng không có animation
     * https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
     */
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
    </SortableContext>
  )
}

export default ListColumns
