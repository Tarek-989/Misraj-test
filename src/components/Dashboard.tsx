import React from 'react';
import { Box } from '@mui/material';
import { NavBar } from './NavBar';
import { RightSection } from './RightSection';

export const Dashboard: React.FC = () => {

	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'center',
		}}>
			<NavBar />
			<RightSection />
		</Box>
	)
};
