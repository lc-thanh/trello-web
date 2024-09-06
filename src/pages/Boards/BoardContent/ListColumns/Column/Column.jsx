import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddCardIcon from '@mui/icons-material/AddCard'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import ArchiveIcon from '@mui/icons-material/Archive'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Divider from '@mui/material/Divider'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'

function Column({ column }) {
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{
      minWidth: '300px',
      maxWidth: '300px',
      bgcolor: (theme) => (theme.palette.mode === 'dark') ? '#212335' : '#ebecf0',
      ml: 2,
      borderRadius: '6px',
      height: 'fit-content',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
    }}>
      {/* Column Header */}
      <Box sx={{
        height: (theme) => theme.trello.columnHeaderHeight,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {column?.title}
        </Typography>
        {/* Context Menu */}
        <Box>
          <Tooltip title="More options">
            <ExpandMoreIcon
              sx={{ cursor: 'pointer' }}
              color="text.primary"
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
          </Tooltip>
          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><ArchiveIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Column Content */}
      <ListCards cards={orderedCards} />

      {/* Column Footer */}
      <Box sx={{
        height: (theme) => theme.trello.columnFooterHeight,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button startIcon={<AddCardIcon />}>Add new card</Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column
