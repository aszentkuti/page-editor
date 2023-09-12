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
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import TextFieldsIcon from '@mui/icons-material/TextFields';
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
		<>
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
							{!selectedBox.full && (
								<Grid item xs mb={2}>
									<Grid
										container
										alignItems="center"
										spacing={1}
									>
										<Grid item>
											<HeightIcon
												style={{
													transform: "rotate(90deg)",
												}}
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
										<Slider
											disabled={selectedBox.full}
											marks={[
												{ value: 16, label: "Half" },
											]}
											min={9}
											max={24}
											onChange={(_, value: number) =>
												setBoxes(
													boxes.map(
														([box1, box2]) => {
															if (
																box1.id ===
																selectedBox.id
															) {
																box1.gridColumnEnd =
																	value;
																box2.gridColumnStart =
																	value;
																box2.width =
																	33 - value;
															}
															if (
																box2.id ===
																selectedBox.id
															) {
																box1.gridColumnEnd =
																	33 - value;
																box2.gridColumnStart =
																	33 - value;
																box1.width =
																	33 - value;
															}
															selectedBox.width =
																value;
															return [box1, box2];
														}
													)
												)
											}
											value={selectedBox.width}
											defaultValue={selectedBox.width}
											aria-label="width"
											valueLabelDisplay="auto"
										/>
									</Grid>
								</Grid>
							)}
							{selectedBox.article && (
								<>
									<Grid
										container
										alignItems="center"
										spacing={1}
									>
										<Grid item>
											<TextFieldsIcon />
										</Grid>
										<Grid item>
											<Typography
												id="title"
												gutterBottom
												m={0}
											>
												Title
											</Typography>
										</Grid>
									</Grid>
									<Grid container alignItems="center" mb={3}>
										<Grid item xs>
											<TextField
												multiline
												sx={{ width: "100%" }}
												defaultValue={selectedBox.article.title}
												value={
													selectedBox.article.editedTitle
												}
												onBlur={(e)=>editBox(selectedBox.id, {
													article: {
														editedTitle: e.target
															.value || selectedBox.article.title,
													},
												})}
												onChange={(e) =>
													editBox(selectedBox.id, {
														article: {
															editedTitle: e.target
																.value,
														},
													})
												}
											/>
										</Grid>
									</Grid>
									<Grid
										container
										alignItems="center"
										spacing={1}
									>
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
									<Grid container alignItems="center" mb={3}>
										<Grid item xs>
											<Slider
												step={0.1}
												min={1}
												max={8}
												onChange={(
													_,
													value: number
												) => {
													editBox(selectedBox.id, {
														fontSize: value,
													});
													selectedBox.fontSize =
														value;
												}}
												value={selectedBox.fontSize}
												defaultValue={
													selectedBox.fontSize
												}
												aria-label="fontSize"
												valueLabelDisplay="auto"
											/>
										</Grid>
									</Grid>
									<Grid
										container
										alignItems="center"
										spacing={1}
										mb={1}
									>
										<Grid item>
											<ImageIcon />
										</Grid>
										<Grid item>
											<Typography gutterBottom m={0}>
												Image Properties
											</Typography>
										</Grid>
									</Grid>
									<Box pl={3}>
										<Grid item container gap={1}>
											<AspectRatioIcon />
											<Typography gutterBottom m={0}>
												Aspect Ratio
											</Typography>
										</Grid>
										<Grid container alignItems="center">
											<Grid item xs>
												<Slider
													marks={[
														{
															value: 0.5625,
															label: "16/9",
														},
														{
															value: 0.75,
															label: "4/3",
														},
													]}
													step={0.01}
													min={0.1}
													max={1}
													onChange={(
														_,
														value: number
													) => {
														editBox(
															selectedBox.id,
															{
																imageHeight:
																	value,
															}
														);
														selectedBox.imageHeight =
															value;
													}}
													value={
														selectedBox.imageHeight
													}
													defaultValue={
														selectedBox.imageHeight
													}
													aria-label="imageHeight"
													valueLabelDisplay="auto"
												/>
											</Grid>
										</Grid>
										<Grid item container gap={1}>
											<ZoomInIcon />
											<Typography gutterBottom m={0}>
												Zoom
											</Typography>
										</Grid>
										<Grid container alignItems="center">
											<Grid item xs>
												<Slider
													marks={[
														{
															value: 1.5,
															label: "x1.5",
														},
														{
															value: 2,
															label: "x2",
														},
														{
															value: 2.5,
															label: "x2.5",
														},
														{
															value: 3,
															label: "x3",
														},
													]}
													step={0.1}
													min={1}
													max={3}
													onChange={(
														_,
														value: number
													) => {
														editBox(
															selectedBox.id,
															{
																zoom: value,
															}
														);
														selectedBox.zoom =
															value;
													}}
													value={selectedBox.zoom}
													defaultValue={
														selectedBox.zoom
													}
													aria-label="zoom"
													valueLabelDisplay="auto"
												/>
											</Grid>
										</Grid>
										<Box></Box>
										<Grid item container gap={1}>
											<HeightIcon />
											<Typography gutterBottom m={0}>
												Y Position
											</Typography>
										</Grid>
										<Grid container alignItems="center">
											<Grid item xs>
												<Slider
													marks={[
														{
															value: 0,
															label: "0",
														},
													]}
													step={1}
													min={-300}
													max={300}
													onChange={(
														_,
														value: number
													) => {
														editBox(
															selectedBox.id,
															{
																imageYPosition:
																	value,
															}
														);
														selectedBox.imageYPosition =
															value;
													}}
													value={
														selectedBox.imageYPosition
													}
													defaultValue={
														selectedBox.imageYPosition
													}
													aria-label="imageYPosition"
													valueLabelDisplay="auto"
												/>
											</Grid>
										</Grid>
										<Grid item container gap={1}>
											<HeightIcon
												style={{
													transform: "rotate(90deg)",
												}}
											/>
											<Typography gutterBottom m={0}>
												X Position
											</Typography>
										</Grid>
										<Grid container alignItems="center">
											<Grid item xs>
												<Slider
													marks={[
														{
															value: 0,
															label: "0",
														},
													]}
													step={1}
													min={-500}
													max={500}
													onChange={(
														_,
														value: number
													) => {
														editBox(
															selectedBox.id,
															{
																imageXPosition:
																	value,
															}
														);
														selectedBox.imageXPosition =
															value;
													}}
													value={
														selectedBox.imageXPosition
													}
													defaultValue={
														selectedBox.imageXPosition
													}
													aria-label="imageXPosition"
													valueLabelDisplay="auto"
												/>
											</Grid>
										</Grid>
									</Box>
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
				<Tooltip title="Add New Row">
					<Fab
						size={"large"}
						style={{
							transition: "all .3s",
							position: "absolute",
							left: 0,
							bottom: 0,
							transform: "translate(-65px, -96px)",
						}}
						onClick={() => addNewBox()}
						color="primary"
						aria-label="add"
					>
						<AddIcon />
					</Fab>
				</Tooltip>
			</Stack>
		</>
	);
}

export default SideBar;
