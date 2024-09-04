import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      bgcolor: (theme) => (theme.palette.mode === 'dark') ? '#34495e' : '#1976d2',
      display: 'flex',
      alignItems: 'center'
    }}>
      Content
    </Box>
  )
}

export default BoardContent
