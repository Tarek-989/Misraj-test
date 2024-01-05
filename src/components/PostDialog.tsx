import React from 'react'
import { PostDialogForm, PostDialogProps } from '../types'
import { Avatar, Box, Button, Dialog, DialogContent, IconButton, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreatePost, useUpdatePost } from '../hooks';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const PostDialog: React.FC<PostDialogProps> = ({ open, handleClose, type, data, page }) => {
	const schema = yup.object().shape({
		title: yup.string().required('Title is required'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostDialogForm>({
		resolver: yupResolver(schema),
	});

	const EditMutation = useUpdatePost({ page })
	const CreateMutation = useCreatePost({ page })
	const queryClient = useQueryClient();

	const onSubmit: SubmitHandler<PostDialogForm> = async (values) => {
		if (data) {
			EditMutation.mutate({
				id: data?.id,
				input: {
					title: values.title,
				},
			}, {
				onSuccess: () => {
					queryClient.invalidateQueries(['posts', page]);
					handleClose();
					toast.success('Updated successfully!');
				},
			})
		} else {
			CreateMutation.mutate({
				input: {
					title: values.title,
					body: values.title,
				}
			}, {
				onSuccess: () => {
					queryClient.invalidateQueries(['posts', page]);
					handleClose();
					toast.success('Created successfully!');
				},
			})
		}

	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					borderRadius: '1rem',
					maxWidth: '80%',
					maxHeight: 'calc(100% - 1rem)',
				}
			}}
		>
			<DialogContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '1rem',
					padding: '2.5rem 1.5rem',
				}}
			>
				<Typography
					sx={{
						fontFamily: 'Poppins',
						fontSize: '1rem',
						color: 'rgba(0, 0, 0, 0.88)',
						fontWeight: 700,
						lineHeight: '1.5rem',
					}}
				>
					{type} post
				</Typography>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: '1rem',
						top: '1rem',
					}}
				>
					<Close />
				</IconButton>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'start',
						gap: 1,
					}}
				>
					{type !== 'Create' &&
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '1rem'
							}}
						>
							<Avatar alt="Remy Sharp" src="/images/avatar.png" />
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
								}}
							>
								<Typography
									sx={{
										fontFamily: 'Poppins',
										fontSize: '0.875rem',
										color: '#121212',
										fontWeight: 600,
										lineHeight: '1.375rem',
									}}
								>
									{data?.user.name}
								</Typography>
								<Typography
									sx={{
										fontFamily: 'Poppins',
										fontSize: ' 0.75rem',
										color: 'rgba(0, 0, 0, 0.40)',
										fontWeight: 400,
										lineHeight: '1.25rem',
									}}
								>
									12 Aug 2022 10:00 PM
								</Typography>
							</Box>
						</Box>}
					<form
						onSubmit={handleSubmit(onSubmit)}
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'stretch',
							gap: 1,
						}}
					>
						{type !== 'View' ?
							<TextField
								{...register('title')}
								error={!!errors.title}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								defaultValue={data?.title}
								sx={{
									'& .MuiOutlinedInput-notchedOutline': { borderRadius: '14px' },
								}}
							/> :
							<Typography
								sx={{
									fontFamily: 'Poppins',
									fontSize: '0.875rem',
									color: 'rgba(0, 0, 0, 0.88)',
									fontWeight: 400,
									lineHeight: '1.75rem',
									textAlign: 'start',
								}}
							>
								{data?.title}
							</Typography>
						}
						<Box sx={{
							padding: '0.25rem',
							position: 'relative',
							display: 'flex',
							flexDirection: 'column',
							borderRadius: '1rem',
							boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
							mb: '0.5rem',
						}}>
							<img
								src="/images/post-Image.png"
								alt="post-Image"
								style={{
									width: '44rem',
									height: '20rem',
									borderRadius: '1rem',
								}}
							/>
							<img
								src="/images/cancel.svg"
								alt="cancel"
								style={{
									position: 'absolute',
									right: '0.8rem',
									top: '0.8rem',
								}}
							/>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									padding: '0.5rem',
									gap: '0.5rem',
								}}
							>

								<img
									src="/images/like.svg"
									alt="like"
									style={{
										width: '1.5rem',
										height: '1.5rem',
									}}
								/>
								<Typography
									sx={{
										fontFamily: 'Poppins',
										fontSize: '0.875rem',
										color: '#212B36',
										fontWeight: 400,
										lineHeight: '1.375rem',
									}}
								>
									36
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '1rem',
							}}
						>
							<Button
								onClick={handleClose}
								variant='outlined'
								sx={{
									border: '1.25px solid #0080FF',
									borderRadius: '0.875rem',
									display: 'flex',
									padding: '0.625rem 1.25rem',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								Cancel
							</Button>
							{type !== 'View' && <Button
								type='submit'
								variant='contained'
								sx={{
									background: '#0080FF',
									borderRadius: '0.875rem',
									display: 'flex',
									padding: '0.625rem 1.25rem',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{type}
							</Button>}
						</Box>
					</form>
				</Box>
			</DialogContent>
		</Dialog>
	)
}
