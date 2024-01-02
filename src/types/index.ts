export interface LoginForm {
	email: string;
	password: string;
}

export interface LoginPageProps {
	onLogin: () => void;
}
