import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards({ cards }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      p: '0 5px',
      m: '0 5px',
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
        ${theme.trello.boardContentHeight} - 
        ${theme.spacing(5)} - 
        ${theme.trello.columnHeaderHeight} - 
        ${theme.trello.columnFooterHeight}
      )`
    }}>
      {cards?.map(card => <Card key={card._id} card={card} />)}

      {/* <Card />
      <Card temporaryHideMedia /> */}

      {/* {(() => {
        const count = 8
        return [...Array(count)].map((_, index) => (
          <Card key={index}>
            <CardContent>
              <Typography>Card {index + 1}</Typography>
            </CardContent>
          </Card>
        ))
      })()} */}
    </Box>
  )
}

export default ListCards
