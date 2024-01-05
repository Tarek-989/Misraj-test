import React from 'react'
import { List, Box, ListItemButton, ListItemIcon, Collapse, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export const NavBar: React.FC = () => {
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Box flex={2} height={'90vh'} sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: '3rem',
			padding: '1rem',
			borderRight: '1px dashed #000'
		}}>
			<Typography
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 1,
					fontFamily: 'Poppins',
					fontSize: '1.5rem',
					fontWeight: 600,
					color: '#121212'
				}}
			>
				<img src="/images/Logo-colored.svg" alt="Logo colored" />
				Socialha
			</Typography>
			<List
				sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
				component="nav"
				aria-labelledby="nested-list-subheader"
			>
				<ListItemButton onClick={handleClick}>
					<ListItemIcon>
					<img src="/images/note.svg" alt="note" />
					</ListItemIcon>
					<ListItemText
						primary="Posts"
						primaryTypographyProps={{
							fontFamily: 'Poppins',
							fontSize: '1rem',
							fontWeight: 700,
							color: '#0080FF',
							lineHeight: '1.25rem'
						}}
					/>
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{ pl: 3 }}>
							<ListItemIcon>
								<img src="/images/Oval-dark.svg" alt="Oval dark" />
							</ListItemIcon>
							<ListItemText
								primary="Statistics"
								primaryTypographyProps={{
									fontFamily: 'Poppins',
									fontSize: '1rem',
									fontWeight: 400,
									color: 'rgba(0, 0, 0, 0.64)'
								}}
							/>
						</ListItemButton>
						<ListItemButton sx={{ pl: 3 }}>
							<ListItemIcon>
								<img src="/images/Oval.svg" alt="Oval" />
							</ListItemIcon>
							<ListItemText
								primary="Management"
								primaryTypographyProps={{
									fontFamily: 'Poppins',
									fontSize: '1rem',
									fontWeight: 400,
									color: '#121212'
								}}
							/>
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</Box>
	)
}

