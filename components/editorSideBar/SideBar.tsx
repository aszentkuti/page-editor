"use client";
import EditorContext from "@/context/EditorConfigContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ImageIcon from "@mui/icons-material/Image";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import HeightIcon from "@mui/icons-material/Height";
import React, { useContext } from "react";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

function SideBar({ articles }) {
	const {
		removeBox,
		editBox,
		boxes,
		addNewBox,
		selectedBox,
		setSelectedBox,
		setBoxes,
	} = useContext(EditorContext);

	if (!articles)
		return (
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={true}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	return (
		<Stack
			padding={5}
			spacing={3}
			style={{
				position: "fixed",
				width: "100%",
				right: 0,
				top: 0,
				height: "100%",
				maxWidth: "400px",
			}}
			bgcolor={"#dddee282"}
		>
			<Button
				onClick={() => addNewBox()}
				variant="outlined"
				startIcon={<Add />}
			>
				Add New Row{" "}
			</Button>
			{selectedBox && (
				<>
					{articles && (
						<Autocomplete
							value={selectedBox.article || null}
							onChange={(e, value) => {
								selectedBox.article = value;
								editBox(selectedBox.id, { article: value });
							}}
							disablePortal
							id="article-select"
							options={articles}
							renderInput={(params) => (
								<TextField {...params} label="Article" />
							)}
						/>
					)}
					<Box sx={{ m: 3 }}>
						<Grid container alignItems="center" spacing={1}>
							<Grid item>
								<HeightIcon
									style={{ transform: "rotate(90deg)" }}
								/>
							</Grid>
							<Grid item>
								<Typography
									id="width-slider"
									gutterBottom
									m={0}
								>
									Article Box Width
								</Typography>
							</Grid>
						</Grid>
						<Grid container alignItems="center">
							<Grid item xs>
								<Slider
									disabled={selectedBox.full}
									marks={[{ value: 16, label: "Half" }]}
									min={9}
									max={24}
									onChange={(_, value: number) =>
										setBoxes(
											boxes.map(([box1, box2]) => {
												if (
													box1.id === selectedBox.id
												) {
													box1.gridColumnEnd = value;
													box2.gridColumnStart =
														value;
													box2.width = 33 - value;
												}
												if (
													box2.id === selectedBox.id
												) {
													box1.gridColumnEnd =
														33 - value;
													box2.gridColumnStart =
														33 - value;
													box1.width = 33 - value;
												}
												selectedBox.width = value;
												return [box1, box2];
											})
										)
									}
									value={selectedBox.width}
									defaultValue={selectedBox.width}
									aria-label="width"
									valueLabelDisplay="auto"
								/>
							</Grid>
						</Grid>
						{selectedBox.article && (
							<>
								<Grid container alignItems="center" spacing={1}>
									<Grid item>
										<FontDownloadIcon />
									</Grid>
									<Grid item>
										<Typography
											id="font-slider"
											gutterBottom
											m={0}
										>
											Font Size
										</Typography>
									</Grid>
								</Grid>
								<Grid container alignItems="center">
									<Grid item xs>
										<Slider
											marks
											step={0.1}
											min={1}
											max={8}
											onChange={(_, value: number) => {
												editBox(selectedBox.id, {
													fontSize: value,
												});
												selectedBox.fontSize = value;
											}}
											value={selectedBox.fontSize}
											defaultValue={selectedBox.fontSize}
											aria-label="fontSize"
											valueLabelDisplay="auto"
										/>
									</Grid>
								</Grid>
								<Grid container alignItems="center" spacing={1}>
									<Grid item>
										<ImageIcon />
									</Grid>
									<Grid item>
										<Typography
											id="font-slider"
											gutterBottom
											m={0}
										>
											Image Aspect Ratio
										</Typography>
									</Grid>
								</Grid>

								<Grid container alignItems="center">
									<Grid item xs>
										<Slider
											step={0.01}
											marks
											min={0.1}
											max={1}
											onChange={(_, value: number) => {
												editBox(selectedBox.id, {
													imageHeight: value,
												});
												selectedBox.imageHeight = value;
											}}
											value={selectedBox.imageHeight}
											defaultValue={
												selectedBox.imageHeight
											}
											aria-label="imageHeight"
											valueLabelDisplay="auto"
										/>
									</Grid>
								</Grid>
							</>
						)}

						<Button
							color="error"
							onClick={() => removeBox(selectedBox.id)}
							variant="contained"
							startIcon={<DeleteIcon fontSize="large" />}
						>
							DELETE BOX
						</Button>
					</Box>
				</>
			)}
		</Stack>
	);
}

export default SideBar;
