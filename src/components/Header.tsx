import { MoreVert } from '@mui/icons-material';
import { AppBar, Avatar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Search } from './styledComponents/Search';
import { SearchIconWrapper } from './styledComponents/SearchIconWrapper';
import { StyledInputBase } from './styledComponents/StyledInputBase';
import { PostDialog } from './PostDialog';


export const Header: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
	const [openCreate, setOpenCreate] = useState<boolean>(false);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleCreatePost = () => {
		handleMenuClose();
		setOpenCreate(true);
	}

	const handleLogout = () => {
		handleMenuClose();
		localStorage.removeItem('authToken');
		window.location.replace('/login');
	};

	const handleClose = () => {
		setOpenCreate(false);
	}

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
			sx={{
				marginTop: '2.5rem',
			}}
		>
			<MenuItem onClick={handleCreatePost}>Create a post</MenuItem>
			<MenuItem onClick={handleLogout}>Log out</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			sx={{
				marginTop: '2.5rem',
			}}
		>

			<MenuItem>
				<IconButton
					size='large'
					aria-label='show 1 new notifications'
					color='inherit'
				>
					<Badge badgeContent={1} color='error'>
						<img src='/images/notification.svg' alt='notifications' />
					</Badge>
				</IconButton>
				<Typography>Notifications</Typography>
			</MenuItem>
			<MenuItem>
				<IconButton size='large' color='inherit'>
					<img src='/images/setting.svg' alt='setting' />
				</IconButton>
				<Typography>Setting</Typography>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<Avatar alt='Remy Sharp' src='/images/avatar.png' />
				</IconButton>
				<Typography>My Profile</Typography>
			</MenuItem>
		</Menu>
	);
	return (
		<Box >
			<AppBar
				position='static'
				sx={{
					bgcolor: 'transparent',
					color: 'inherit'
				}}
			>
				<Toolbar>
					<Search>
						<SearchIconWrapper>
							<img src='/images/search.svg' alt='search' />
						</SearchIconWrapper>
						<StyledInputBase
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton
							size='large'
							aria-label='show 1 new notifications'
							color='inherit'
						>
							<Badge badgeContent={1} color='error'>
								<img src='/images/notification.svg' alt='notifications' />
							</Badge>
						</IconButton>
						<IconButton size='large' color='inherit'>
							<img src='/images/setting.svg' alt='setting' />
						</IconButton>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<Avatar alt='Remy Sharp' src='/images/avatar.png' />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreVert />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			<PostDialog open={openCreate} handleClose={handleClose} type={'Create'} page={1} />
		</Box>
	)
}
