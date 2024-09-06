import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      bgcolor: (theme) => (theme.palette.mode === 'dark') ? '#223450' : '#015EDD',
      p: '10px 0'
    }}>
      <ListColumns columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
