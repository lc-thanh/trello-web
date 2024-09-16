import { useEffect, useState, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { mapOrder } from '~/utils/sorts'
import { cloneDeep } from 'lodash'
import {
  // PointerSensor,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  // closestCorners,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { ACTIVE_ITEM_TYPE } from '~/utils/constants'

function BoardContent({ board }) {
  const [activeItemId, setActiveItemId] = useState(null)
  const [activeItemType, setActiveItemType] = useState(null)
  const [activeItemData, setActiveItemData] = useState(null)
  const [oldColumn, setOldColumn] = useState(null)
  const [clonedColumn, setClonedColumn] = useState(null)

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

  const lastOverId = useRef(null)
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeItemId && activeItemType === ACTIVE_ITEM_TYPE.COLUMN) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container?.data?.current?.type === ACTIVE_ITEM_TYPE.COLUMN
          )
        })
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)
      const intersections =
        pointerIntersections.length > 0 ?
          // If there are droppables intersecting with the pointer, return those
          pointerIntersections : rectIntersection(args)
      const over = getFirstCollision(intersections)
      let overId = over?.id
      let overType = over?.data?.droppableContainer?.data?.current?.type

      if (overId != null) {
        if (overType === ACTIVE_ITEM_TYPE.COLUMN) {
          const containerItems = findColumn(overId, ACTIVE_ITEM_TYPE.COLUMN)?.cards.map(card => card._id)

          // If a container is matched and it contains items
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              )
            })[0]?.id
          }
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeItemId, activeItemType]
  )

  // Xử lý sự kiện khi bắt đầu kéo
  const handleDragStart = (event) => {
    console.log('handleDragStart: ', event)
    setActiveItemId(event?.active?.id)
    setActiveItemType(getItemType(event?.active))
    setActiveItemData(event?.active?.data?.current?.itemData)

    if (getItemType(event?.active) === ACTIVE_ITEM_TYPE.CARD) {
      setOldColumn(findColumn(event?.active?.id, ACTIVE_ITEM_TYPE.CARD))
    }
  }

  // Xử lý sự kiện khi đang kéo
  const handleDragOver = (event) => {
    const { active, over } = event
    const activeId = active.id
    const overId = over?.id
    // Chỉ xét cho Card, để xử lý trường hợp Card di chuyển sang container khác
    if (!overId || activeItemType === ACTIVE_ITEM_TYPE.COLUMN) {
      return
    }

    // Tìm column chứa Card đang kéo
    // Ở đây chỉ xét trường hợp kéo Card => nên type chỉ có thể là CARD
    const activeColumn = findColumn(activeId, ACTIVE_ITEM_TYPE.CARD)
    // Còn over (vị trí thả) thì có thể là cả CARD cả COLUMN
    const overColumn = findColumn(overId, getItemType(over))
    if (!overColumn || !activeColumn) {
      return
    }

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(active, over, activeId, overId, activeColumn, overColumn)
    }
  }

  // Xử lý sự kiện sau khi kéo xong
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event
    if (!active || !over) return

    if (activeItemType === ACTIVE_ITEM_TYPE.CARD) {
      const activeId = active.id
      const overId = over.id
      if (!activeId || !overId) return

      // Tìm column chứa Card đang kéo
      // Ở đây chỉ xét trường hợp kéo Card => nên type chỉ có thể là CARD
      const activeColumn = findColumn(activeId, ACTIVE_ITEM_TYPE.CARD)
      // Còn over (vị trí thả) thì có thể là cả CARD cả COLUMN
      const overColumn = findColumn(overId, getItemType(over))
      if (!overColumn) return

      // Trường hợp kéo card sang column khác
      // Trong dragEnd, phải sử dụng state oldColumn vì state oderedColumns đã bị dragOver thay đổi rồi
      if (oldColumn._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(active, over, activeId, overId, activeColumn, overColumn)
      }
      // Trường hợp kéo card trong cùng 1 column
      else {
        const oldCardIndex = oldColumn?.cards?.findIndex(card => card._id === activeId)
        const newCardIndex = overColumn?.cards?.findIndex(card => card._id === overId)

        const dndOrderedCards = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          // Sử dụng cloneDeep() của Lodash
          const nextColumns = cloneDeep(prevColumns)

          const targetColumn = nextColumns.find(column => column._id === oldColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })
      }
    }

    if (activeItemType === ACTIVE_ITEM_TYPE.COLUMN) {
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

    setActiveItemId(null)
    setActiveItemType(null)
    setActiveItemData(null)
    setOldColumn(null)
  }

  const getItemType = (activeOrOver) => {
    return activeOrOver?.data?.current?.type
  }

  // Tìm column dựa theo itemId và itemType đã cho
  const findColumn = (itemId, itemType) => {
    return itemType === ACTIVE_ITEM_TYPE.CARD ?
      orderedColumns.find(column => column.cards?.map(card => card._id)?.includes(itemId)) :
      itemType === ACTIVE_ITEM_TYPE.COLUMN ? orderedColumns.find(column => column._id === itemId) : null
  }

  const moveCardBetweenDifferentColumns = (
    active,
    over,
    activeId,
    overId,
    activeColumn,
    overColumn
  ) => {
    setOrderedColumns((prevColumns) => {
      // index mới cho card đang kéo
      let newIndex

      // Di chuyển vào container trống
      if (getItemType(over) === ACTIVE_ITEM_TYPE.COLUMN) {
        newIndex = 0
      } else {
        const overItems = overColumn.cards
        const overIndex = overItems.findIndex(card => card._id === overId)

        // Nếu vừa di chuyển card xuống bên dưới card khác (dưới cùng của container)
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newIndex =
          overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      // Sử dụng cloneDeep() của Lodash
      const nextColumns = cloneDeep(prevColumns)
      // Clone ra nextActiveColumn và nextOverColumn mới để không bị đụng chạm đến
      // dữ liệu của activeColumn và overColumn cũ
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeId)
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeId)
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newIndex,
          0,
          { ...active?.data?.current?.itemData, columnId: nextOverColumn._id }
        )
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumns
    })
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    // Cách nest chuẩn các context của dnd-kit
    // https://docs.dndkit.com/presets/sortable/sortable-context#usage
    <DndContext
      sensors={sensor}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        bgcolor: (theme) => (theme.palette.mode === 'dark') ? '#223450' : '#015EDD',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {activeItemId ?
            activeItemType === ACTIVE_ITEM_TYPE.COLUMN ?
              <Column column={activeItemData} /> : <Card card={activeItemData} />
            : null
          }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
