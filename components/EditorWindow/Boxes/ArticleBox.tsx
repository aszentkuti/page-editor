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
					userSelect: "none",
					cursor: "pointer",
					borderRadius: "5px",
					minHeight: "250px",
					gridColumnStart: full ? 1 : box.gridColumnStart,
					gridColumnEnd: full ? 33 : box.gridColumnEnd,
					gridRow: 1,
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
								transition: "aspect-ratio .15s",
								aspectRatio: `1/${box.imageHeight}`,
							}}
						>
							<img
								style={{
									width: "100%",
									maxWidth: "100%",
									height: "100%",
									objectFit: "cover",
									transition: "all .15s,",
									transform: `scale(${box.zoom || 1})`,
									objectPosition: `${
										box.imageXPosition || 0
									}px ${box.imageYPosition || 0}px`,
								}}
								src={box.article?.enclosures?.url}
								alt={box.article?.title}
							/>
						</div>
						<div>
							<p
								style={{
									marginTop: "8px",
									marginBottom: 0,
									fontSize: `${box?.fontSize || 1}rem`,
									overflowWrap: "anywhere",
									transition: "font-size .15s",
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
