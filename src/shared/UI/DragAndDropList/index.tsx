import React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import classNames from 'classnames'
import styles from './styles.module.scss'

interface DragAndDropListProps<T extends { id: string | number; sort?: number | null }> {
    items: T[]
    renderItem: (
        item: T,
        index: number,
        dragHandleProps: any,
        draggableProps: any
    ) => React.ReactNode
    onReorder: (reorderedItems: T[]) => void
}

const DragAndDropList = <T extends { id: string | number; sort?: number | null }>({
    items,
    renderItem,
    onReorder
}: DragAndDropListProps<T>) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const updatedItems = Array.from(items)

        const sourceIndex = result.source.index
        const destinationIndex = result.destination.index

        const [removed] = updatedItems.splice(sourceIndex, 1)

        updatedItems.splice(destinationIndex, 0, removed)

        const sortedItems = updatedItems.map((item, index) => ({
            ...item,
            sort: index + 1
        }))

        onReorder(sortedItems)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable-list'>
                {(provided) => (
                    <div
                        className={styles.list}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id.toString()}
                                draggableId={item.id.toString()}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={classNames(styles.draggableItem)}
                                    >
                                        {renderItem(
                                            item,
                                            index,
                                            provided.dragHandleProps,
                                            provided.draggableProps
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DragAndDropList
