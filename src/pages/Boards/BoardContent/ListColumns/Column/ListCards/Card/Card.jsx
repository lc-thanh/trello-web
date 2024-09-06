import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ card }) {
  const haveCardAction = () => !!card?.memberIds.length || !!card?.comments.length || !!card?.attachments.length

  return (
    <MuiCard>
      {
        !!card?.cover && typeof card?.cover === 'string' &&
          <CardMedia
            image={card?.cover}
            // image="https://images5.alphacoders.com/112/1129255.jpg"
            // title="green iguana"
          />
      }
      <CardContent>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {
        haveCardAction() &&
          <CardActions>
            {!!card?.memberIds.length && <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds.length}</Button>}
            {!!card?.comments.length && <Button size="small" startIcon={<CommentIcon />}>{card?.comments.length}</Button>}
            {!!card?.attachments.length && <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments.length}</Button>}
          </CardActions>
      }
    </MuiCard>
  )
}

export default Card
