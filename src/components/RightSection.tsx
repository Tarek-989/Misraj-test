import { Box } from '@mui/material'
import React from 'react'
import { Header } from './Header'
import { PostTable } from './PostTable'

export const RightSection: React.FC = () => {
	return (
		<Box flex={8.5} sx={{
			display: 'flex',
			flexDirection: 'column'
		}}>
			<Header />
			<PostTable />
		</Box>
	)
}
