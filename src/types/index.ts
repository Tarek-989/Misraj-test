export interface LoginForm {
	email: string;
	password: string;
}
export interface LoginPageProps {
	onLogin: () => void;
}
export interface PostDialogProps {
	open: boolean;
	type: string;
	handleClose: () => void;
	data?: Posts;
	page: number;
}

export interface Posts {
	id: string;
	title: string;
	body: string;
	user: User;
	__typename: string;
}

export interface User {
	id: string;
	name: string;
	albums: Albums;
	__typename: string;
}

export interface Albums {
	data: AlbumsDatum[];
	__typename: string;
}

export interface AlbumsDatum {
	photos: Photos;
	__typename: string;
}

export interface Photos {
	data: PhotosDatum[];
	__typename: string;
}

export interface PhotosDatum {
	id: string;
	title: string;
	url: string;
	__typename: string;
}
export interface showDialogProps {
	showView: boolean;
	showEdit: boolean;
	showDelete: boolean;
	data: Posts | undefined;
}
export interface DeleteDialogProps {
	open: boolean;
	handleClose: () => void;
	data?: Posts;
	page: number;
}

export interface PostDialogForm {
	title: string;
}

export type TProps = {
    page: number
}
