import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { capitalizeFirstLetter } from '~/utils/formatters'

const CHIP_STYLES = {
  border: 'none',
  color: 'appBarPrimary.main',
  paddingX: '5px',
  borderRadius: '4px',
  fontWeight: '500',
  '&.MuiChip-clickable:hover': {
    backgroundColor: 'appBarPrimary.50'
  },
  '.MuiSvgIcon-root': {
    color: 'appBarPrimary.main'
  }
}

function BoardBar({ board }) {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      bgcolor: (theme) => (theme.palette.mode === 'dark') ? '#223450' : '#015EDD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          icon={<DashboardIcon />}
          label={board?.title}
          variant="outlined"
          clickable
          sx={CHIP_STYLES}
        />
        <Chip
          icon={<VpnLockIcon />}
          label={`${capitalizeFirstLetter(board?.type)} Workspace`}
          variant="outlined"
          clickable
          sx={CHIP_STYLES}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          variant="outlined"
          clickable
          sx={CHIP_STYLES}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          variant="outlined"
          clickable
          sx={CHIP_STYLES}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          variant="outlined"
          clickable
          sx={CHIP_STYLES}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button color="appBarPrimary" variant="outlined" startIcon={<PersonAddAltIcon />}>
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              border: '2px solid',
              borderColor: 'appBarPrimary.main',
              cursor: 'pointer'
            }
          }}
        >
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src="https://i.imgur.com/kW4fzui.jpeg" />
          </Tooltip>
          <Tooltip title="Tony Stark">
            <Avatar alt="Tony Stark" src="https://i.imgur.com/5hbLSJb.jpeg" />
          </Tooltip>
          <Tooltip title="Cindy Baker">
            <Avatar alt="Cindy Baker" src="#" />
          </Tooltip>
          <Tooltip title="Agnes Walker">
            <Avatar alt="Agnes Walker" src="" />
          </Tooltip>
          <Tooltip title="Trevor Henderson">
            <Avatar alt="Trevor Henderson" src="" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
