import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginForm, LoginPageProps } from '../types';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const schema = yup.object().shape({
		email: yup.string().required('Email is required').email('Invalid email'),
		password: yup.string().required('Password is required'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		if (data?.password) {
			localStorage.setItem('authToken', btoa(data?.password));
			toast.success('Logged in successfully!');
			onLogin();
		} else {
			toast.error('Login failed!');
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				height: '100vh',
			}}
			style={{
				background: '#99CCFF',
			}}
		>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					gap: 3,
					padding: 2,
				}}
				style={{
					background: 'linear-gradient(90deg, #3399FF 0%, #99CCFF 100%)',
				}}
			>
				<Typography
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 1,
						fontFamily: 'Poppins',
						fontSize: 24,
						fontWeight: 600,
						color: 'white'
					}}
				>
					<img src="/images/Logo.svg" alt="Logo" />
					Socialha
				</Typography>
				<Box position={'relative'}>
					<Typography
						sx={{
							WebkitTextStrokeColor: '#fff',
							WebkitTextStrokeWidth: 1.5,
							color: '#121212',
							opacity: 0.4,
							fontFamily: 'Poppins',
							fontSize: 40,
							fontWeight: 700,
							textWrap: 'nowrap',
							position: 'absolute',
							letterSpacing: 0,
							lineHeight: '24px'
						}}
					>
						Empowering Connections
					</Typography>
					<Typography
						sx={{
							WebkitTextStrokeColor: '#fff',
							WebkitTextStrokeWidth: 1,
							color: '#121212',
							opacity: 0.4,
							fontFamily: 'Poppins',
							fontSize: 40,
							fontWeight: 700,
							marginInlineStart: 40,
							textWrap: 'nowrap',
							position: 'absolute',
							top: '4rem',
							letterSpacing: 0,
							lineHeight: '24px'
						}}
					>
						Inspiring Moments
					</Typography>
					<img
						src="/images/login-image.svg"
						alt="Login image"
						style={{
							width: '50vw',
							height: '60vh',
							position: 'absolute',
							top: '10rem'
						}} />
				</Box>
			</Box>
			<Box
				sx={{
					flex: 1.5,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '0 3rem',
					bgcolor: '#FFF',
					borderBottomLeftRadius: 40,
					borderTopLeftRadius: 40
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						mt: 5
					}}
				>
					<Typography
						sx={{
							color: '#121212',
							fontFamily: 'Poppins',
							fontSize: 32,
							fontWeight: 700,
							lineHeight: 'normal',
							letterSpacing: 0,
						}}
					>
						Welcome to Socialha 👋🏼
					</Typography>
					<Typography
						sx={{
							color: '#121212',
							fontFamily: 'Poppins',
							fontSize: 20,
							fontWeight: 400,
							lineHeight: 'normal',
							letterSpacing: 0,
						}}>
						Please enter your information below
					</Typography>
					<form
						onSubmit={handleSubmit(onSubmit)}
						style={{
							marginTop: 40,
							width: '80%',
						}}
					>
						<TextField
							{...register('email')}
							error={!!errors.email}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							placeholder="Please enter your email"
							sx={{
								backgroundColor: '#ebebeb',
								borderRadius: 20,
								transition: 'box-shadow 0.3s',
								'& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': { border: 0 },
								'& .MuiOutlinedInput-notchedOutline': { borderRadius: 20 },
								'&:hover': {
									boxShadow: '0 10px 10px rgba(0, 0, 0, 0.3)',
									backgroundColor: 'white'
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<img
											src="/images/email.svg"
											alt="email"
										/>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end" />
								),
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							{...register('password')}
							error={!!errors.password}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							placeholder="Please enter your password"
							type={showPassword ? 'text' : 'password'}
							sx={{
								backgroundColor: '#ebebeb',
								borderRadius: 20,
								transition: 'box-shadow 0.3s',
								'& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': { border: 0 },
								'& .MuiOutlinedInput-notchedOutline': { borderRadius: 20 },
								'&:hover': {
									boxShadow: '4px 10px 10px rgba(0, 0, 0, 0.3)',
									backgroundColor: 'white'
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<img
											src="/images/password.svg"
											alt="Password"
										/>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>

						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							width="100%"
						>
							<FormControlLabel
								control={<Checkbox value="remember" />}
								label="Remember me"
								sx={{
									'& .MuiButtonBase-root': { color: 'rgba(0, 0, 0, 0.23)' },
									'& .MuiTypography-root': {
										fontFamily: 'Poppins',
										fontSize: '18px',
										color: '#000',
										fontWeight: 400
									},
								}}
							/>
							<Typography
								sx={{
									fontFamily: 'Poppins',
									fontSize: '18px',
									color: '#007fff',
									fontWeight: 400
								}}
							>
								Forgot Password?
							</Typography>
						</Box>

						<Box
							display="flex"
							my={2}
						>
							<Button
								variant="contained"
								type="submit"
								style={{
									flex: 1,
									backgroundColor: '#0080FF',
									borderRadius: 20,
									textTransform: 'none',
									padding: 10,
									fontFamily: 'Poppins',
									fontSize: '18px',
									color: '#fff',
									fontWeight: 700
								}}
							>
								Sing in
							</Button>
						</Box>
					</form>
					<Typography
						align="center"
						sx={{
							fontFamily: 'Poppins',
							fontSize: '18px',
							fontWeight: 400
						}}
						style={{ display: 'flex' }}
					>
						Don’t you have an account?{' '}
						<Typography
							sx={{
								fontFamily: 'Poppins',
								fontSize: '18px',
								color: '#007fff',
								fontWeight: 600
							}}
						>
							&nbsp;Sign up
						</Typography>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
