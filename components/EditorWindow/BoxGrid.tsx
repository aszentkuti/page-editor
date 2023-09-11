"use client";
import React, { Fragment, useContext } from "react";
import ArticleBox from "./Boxes/ArticleBox";
import EditorContext from "@/context/EditorConfigContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const BoxGrid = () => {
	const { boxes, setBoxes } = useContext(EditorContext);
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
	  
		return result;
	  };
	  const onDragEnd = (result) =>{
		if (!result.destination) {
		  return;
		}
	
		const items = reorder(
		  boxes,
		  result.source.index,
		  result.destination.index
		);
	
		setBoxes(items)
	  }
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided) => (
					<div
						style={{ display: "flex", flexDirection: "column", gap: "15px" }}
						ref={provided.innerRef}
					>
						{boxes &&
							boxes.map((row, rowIndex) => (
								<Draggable
									key={`${row[0].id || rowIndex}-${row[1].id || rowIndex}`}
									draggableId={`${row[0].id || rowIndex}-${row[1].id || rowIndex}`}
									index={rowIndex}
								>
									{(provided, snapshot) => (
										<div
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
										>
											<div
												style={{
													maxWidth: "70vw",
													display: "grid",
													gap: "10px",
													gridTemplateColumns:
														"repeat(32, 1fr)",
													opacity: snapshot.isDragging ? 0.7 : 1,
													transform: snapshot.isDragging ? "scale(0.8)" : "",
													transition: "transform .25s",
												}}
											>
												{row.map((box) => (
													<ArticleBox
														key={`${box.id}`}
														deleted={box.deleted}
														full={box.full}
														box={box}
														rowIndex={rowIndex}
													/>
												))}
											</div>
										</div>
									)}
								</Draggable>
							))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default BoxGrid;
