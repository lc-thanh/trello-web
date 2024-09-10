import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    // Lấy dữ liệu các columns từ mock-data và sắp xếp chúng dựa theo mảng columnOrderIds
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Mặc định, dnd-kit sử dụng Pointer và Keyboard sensor, nhưng trong project này, tác giả đã lựa chọn
  // sử dụng kết hợp Mouse và Touch sensor để tối ưu trải nghiệm cho mobile
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Chuột cần phải giữ rồi kéo ít nhất 10px thì mới kích hoạt tính năng kéo thả
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Nhấn giữ 250ms và dung sai của cảm ứng (di chuyển/chênh lệch) không quá 5px thì mới kích hoạt event
  // Có nghĩa là trong lúc tính thời gian nhấn giữ 250ms, mà người dùng di chuyển quá 5px thì event không được kích hoạt
  // Để tránh trường hợp người dùng chỉ muốn lướt đi (chứ không nhấn giữ để kéo)
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensor = useSensors(mouseSensor, touchSensor)

  // Xử lý sự kiện sau khi kéo xong
  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event

    // Nếu kéo ra ngoài, thì over sẽ bị null, lúc này không cần xử lý gì hết
    if (!over) return

    if (active.id !== over.id) {
      // Lấy vị trí trước và sau của phần tử
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      // Thuật toán di chuyển phần tử trong mảng của dndKit
      // https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // Sau này gọi API ở đây!
      // const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumnIds', dndOrderedColumnIds)

      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensor}>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        bgcolor: (theme) => (theme.palette.mode === 'dark') ? '#223450' : '#015EDD',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
