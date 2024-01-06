import React from 'react'
import { DeleteDialogProps } from '../types'
import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import { useDeletePost } from '../hooks'
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material'


export const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, handleClose, data, page }) => {
    const deleteMutation = useDeletePost({page})
    const handleSubmit = () => {
        deleteMutation.mutate(data?.id, {
            onSuccess: () => {
                handleClose();
                toast.success('Deleted successfully!');
            },
        })
    }
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{
            sx: {
                borderRadius: '1rem',
            }
        }}>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2.5rem',
                    padding: '2.5rem 1.5rem',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>
                <Typography
                    sx={{
                        color: '#121212',
                        fontFamily: 'Poppins',
                        fontSize: '1rem',
                        fontWeight: 700,
                        lineHeight: '1.5rem',
                        letterSpacing: 0,
                        mt: '1rem',
                    }}
                >
                    Do you really want to delete this post?</Typography>
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
                    <Button
                        onClick={handleSubmit}
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
                        Delete
                    </Button>
                </Box>
            </DialogContent>
        </Dialog >
    )
}
