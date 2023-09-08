"use client";
import React, { Fragment, useContext } from "react";
import ArticleBox from "./Boxes/ArticleBox";
import EditorContext from "@/context/EditorConfigContext";

const BoxGrid = () => {
	const { boxes } = useContext(EditorContext);

	return (
		<div
			style={{
				maxWidth: "70vw",
				display: "grid",
				gap: "8px",
				gridTemplateColumns: "repeat(32, 1fr)",
			}}
		>
			{boxes &&
				boxes.map((row, rowIndex) => (
					<Fragment key={`grid-${rowIndex}`}>
						{row.map((box) => (
							<ArticleBox
								key={box.id}
								deleted={box.deleted}
								full={box.full}
								box={box}
								rowIndex={rowIndex}
							/>
						))}
					</Fragment>
				))}
		</div>
	);
};

export default BoxGrid;
