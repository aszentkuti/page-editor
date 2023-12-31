export interface Box {
	id: string;
	width: number;
	gridColumnStart: number;
	gridColumnEnd: number;
	article?: any;
	full?: boolean;
	deleted?: boolean;
	fontSize: number;
	imageHeight: number;
	zoom: number;
	imageYPosition: number;
	imageXPosition: number;
}
export type BoxRow = Box[];
