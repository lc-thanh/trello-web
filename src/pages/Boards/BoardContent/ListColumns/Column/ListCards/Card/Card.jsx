import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ACTIVE_ITEM_TYPE } from '~/utils/constants'

function Card({ card }) {
  const haveCardAction = () => !!card?.memberIds.length || !!card?.comments.length || !!card?.attachments.length

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: {
      type: ACTIVE_ITEM_TYPE.CARD,
      itemData: { ...card }
    }
  })

  const dndKitCardStyles = {
    // Để tối ưu cho kéo thả trên mobile
    // touchAction: 'none', // Nhưng dành cho PointerSensor (để tối ưu hơn nữa thì nên dùng MouseSensor và TouchSensor)

    // Nếu sử dụng CSS.Transform như docs sẽ bị lỗi kiểu stretch
    // Video: https://youtu.be/IttteelPx-k?t=1244
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
    >
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
