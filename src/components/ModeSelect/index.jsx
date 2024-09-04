import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl
      size="small"
      sx={{ minWidth: '120px' }}
    >
      <InputLabel
        id="mode-select-label"
        sx={{
          color: 'appBarPrimary.main',
          '&.Mui-focused': {
            color: 'appBarPrimary.main'
          }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="mode-select-label"
        id="mode-select"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'appBarPrimary.main',
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'appBarPrimary.light' },
          '.MuiSvgIcon-root': { color: 'appBarPrimary.main' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'appBarPrimary.main' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'appBarPrimary.main' }
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon fontSize='small' /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize='small' /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
