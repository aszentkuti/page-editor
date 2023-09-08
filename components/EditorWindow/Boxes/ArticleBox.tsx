/* eslint-disable @next/next/no-img-element */
import EditorContext from "@/context/EditorConfigContext";
import { Box as BoxInterface } from "@/types";
import { Box } from "@mui/material";
import React, { useContext } from "react";

interface BoxProps {
	box: BoxInterface;
	deleted?: boolean;
	full?: boolean;
	rowIndex: number;
}

function ArticleBox({ deleted, full, box, rowIndex }: BoxProps) {
	const { setSelectedBox, selectedBox } = useContext(EditorContext);

	return (
		!deleted && (
			<Box
				sx={{
					fontFamily: "inter",
					outline:
						selectedBox?.id == box.id
							? "2px solid #1976d2"
							: box.article
							? ""
							: "1px dashed grey",
				}}
				onClick={() => setSelectedBox(box)}
				style={{
					cursor: "pointer",
					borderRadius: "5px",
					minHeight: "250px",
					gridColumnStart: full ? 1 : box.gridColumnStart,
					gridColumnEnd: full ? 33 : box.gridColumnEnd,
					gridRow: rowIndex,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					placeItems: "flex-start",
				}}
				key={box.id}
			>
				{box.article ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "100%",
						}}
					>
						<div
							style={{
								height: "100%",
								overflow: "hidden",
								aspectRatio: `1/${box.imageHeight}`,
							}}
						>
							<img
								style={{
									width: "100%",
									maxWidth: "100%",
									height: "100%",
									objectFit: "cover",
								}}
								src={box.article?.enclosures?.url}
								alt={box.article?.title}
							/>
						</div>
						<div>
							<p
								style={{
									marginTop: "8px",
									fontSize: `${box?.fontSize || 1}rem`,
									overflowWrap: "anywhere",
								}}
							>
								{box.article?.title}
							</p>
						</div>
					</div>
				) : (
					<div style={{ aspectRatio: 16 / 9, width: "100%" }}></div>
				)}
			</Box>
		)
	);
}

export default ArticleBox;
