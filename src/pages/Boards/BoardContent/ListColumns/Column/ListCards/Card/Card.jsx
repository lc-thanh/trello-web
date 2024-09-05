import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard>
        <CardContent>
          <Typography>Not Media Card</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard>
      <CardMedia
        image="https://images5.alphacoders.com/112/1129255.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography>Black Myth: Wukong</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<GroupIcon />}>10</Button>
        <Button size="small" startIcon={<CommentIcon />}>15</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
