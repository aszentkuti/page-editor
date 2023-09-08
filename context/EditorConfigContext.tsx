"use client";

import { Box, BoxRow } from "@/types";
import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface EditorContext {
	boxes: BoxRow[];
	setBoxes: any;
	selectedBox: Box;
	setSelectedBox: (prevBox: Box) => void;
	addNewBox: (width1?: number, width2?: number) => void;
	editBox: (id: string, newData: any) => void;
	removeBox: (id: string) => void;
}
export const EditorContext = createContext<EditorContext | null>(null);

const getNewRow = (width1 = 16, width2 = 16) => {
	const id1 = uuidv4();
	const id2 = uuidv4();
	return [
		{
			id: id1,
			width: width1,
			gridColumnStart: 1,
			gridColumnEnd: 17,
			fontSize: 1,
			imageHeight: 0.5625,
		},
		{
			id: id2,
			width: width2,
			gridColumnStart: 17,
			gridColumnEnd: 33,
			fontSize: 1,
			imageHeight: 0.5625,
		},
	];
};

export const EditorContextProvider = ({ children }) => {
	const [boxes, setBoxes] = useState([getNewRow()]);
	const [selectedBox, setSelectedBox] = useState(null);
	const editBox = (id: string, newData: any) => {
		setBoxes((boxes) =>
			boxes.map((row) =>
				row.map((box) => {
					if (box.id !== id) return box;
					box = { ...box, ...newData };
					return box;
				})
			)
		);
	};

	const removeBox = (removeId: string) => {
		setBoxes((prevBoxes) =>
			prevBoxes
				.map(([box1, box2]: [Box, Box]) => {
					if (box1.id === removeId) {
						box1.deleted = true;
						box2.full = true;
					}
					if (box2.id === removeId) {
						box1.full = true;
						box2.deleted = true;
					}
					if (box1.deleted && box2.deleted) return [];
					return [box1, box2];
				})
				.filter((row) => row.length)
		);
	};

	const addNewBox = (width1 = 16, width2 = 16) => {
		setBoxes((prevBoxes) => [...prevBoxes, getNewRow(width1, width2)]);
	};
	return (
		<EditorContext.Provider
			value={{
				boxes,
				setBoxes,
				selectedBox,
				setSelectedBox,
				addNewBox,
				editBox,
				removeBox,
			}}
		>
			{children}
		</EditorContext.Provider>
	);
};

export default EditorContext;
