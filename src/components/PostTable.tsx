import { NavigateNext } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Breadcrumbs,
    Chip,
    IconButton,
    Link,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Search } from "./styledComponents/Search";
import { SearchIconWrapper } from "./styledComponents/SearchIconWrapper";
import { StyledInputBase } from "./styledComponents/StyledInputBase";
import { useGetPosts } from "../hooks";
import { Posts, showDialogProps } from "../types";
import { StyledTableCell } from "./styledComponents/StyledTableCell";
import { PostDialog } from "./PostDialog";
import { DeleteDialog } from "./DeleteDialog";

export const PostTable: React.FC = () => {
    const [page, setPage] = useState(1);
    const [showDialog, setShowDialog] = useState<showDialogProps>({
        showView: false,
        showEdit: false,
        showDelete: false,
        data: undefined
    });
    const handlePagination = (_event: ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };
    const { data: posts, isLoading } = useGetPosts({ page });

    const handleViewClick = (post: Posts) => {
        setShowDialog((prev) => {
            return {
                ...prev,
                showView: true,
                data: { ...post }
            }
        })
    }
    const handleEditClick = (post: Posts) => {
        setShowDialog((prev) => {
            return {
                ...prev,
                showEdit: true,
                data: { ...post }
            }
        })
    }
    const handleDeleteClick = (post: Posts) => {
        setShowDialog((prev) => {
            return {
                ...prev,
                showDelete: true,
                data: { ...post }
            }
        })
    }
    const handleClose = () => {
        setShowDialog({
            showView: false,
            showEdit: false,
            showDelete: false,
            data: undefined
        })
    }
    return (
        <Box
            sx={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNext fontSize="medium" />}
            >
                <Link
                    href="#"
                    underline="none"
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "18px",
                        color: "rgba(0, 0, 0, 0.88)",
                    }}
                >
                    Posts
                </Link>
                <Link
                    href="#"
                    underline="none"
                    aria-current="page"
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "18px",
                        color: "#0080FF",
                    }}
                >
                    Management
                </Link>
            </Breadcrumbs>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Search
                    sx={{
                        borderRadius: "0.875rem",
                        border: "1.25px solid  rgba(0, 0, 0, 0.12)",
                    }}
                >
                    <SearchIconWrapper>
                        <img src="/images/search.svg" alt="search" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Type here"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: "0.5rem",
                }}>
                    <Typography sx={{
                        color: '#121212',
                        fontFamily: 'Poppins',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        lineHeight: '1.25rem',
                        letterSpacing: 0,
                    }}>
                        Media:
                    </Typography>
                    <Chip
                        label="All"
                        sx={{
                            bgcolor: '#ebebeb'
                        }}
                        deleteIcon={<img src="/images/arrow.svg" alt="arrow" />}
                        onDelete={() => { }}
                    />
                    <Typography sx={{
                        color: '#121212',
                        fontFamily: 'Poppins',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        lineHeight: '1.25rem',
                        letterSpacing: 0,
                    }}>
                        Privacy:
                    </Typography>
                    <Chip
                        label="Public"
                        sx={{
                            bgcolor: '#ebf5ff',
                            color: '#007fff'
                        }}
                        deleteIcon={<img src="/images/cross.svg" alt="cross" />}
                        onDelete={() => { }}
                    />
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: "#e5f2ff",
                            }}
                        >
                            <StyledTableCell sx={{ fontWeight: 600 }}>Post ID</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 600 }}>Name</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 600 }}>Content</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 600 }}>Media URL</StyledTableCell>
                            <StyledTableCell sx={{ fontWeight: 600 }}>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {isLoading ? (
                        <Box padding={2}>Loading...</Box>
                    ) : (
                        <TableBody>
                            {posts?.data &&
                                posts?.data?.map((post: Posts) => (
                                    <TableRow key={post?.id}>
                                        <StyledTableCell >{post?.id}</StyledTableCell>
                                        <StyledTableCell >
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 1,
                                                width: '200px',
                                            }}>
                                                <Avatar alt="Remy Sharp" src="/images/avatar.png" />
                                                <Typography>{post?.user?.name}</Typography>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            <Typography
                                                sx={{
                                                    textOverflow: "ellipsis",
                                                    textAlign: "center",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    width: "200px",
                                                }}
                                            >
                                                {post?.title}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            <Typography
                                                sx={{
                                                    textOverflow: "ellipsis",
                                                    textAlign: "center",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    width: "200px",
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                {post?.user?.albums?.data?.[0]?.photos?.data?.[0]?.url}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            <IconButton onClick={() => handleViewClick(post)}>
                                                <img src="/images/view.svg" alt="View" />
                                            </IconButton>
                                            <IconButton onClick={() => handleEditClick(post)}>
                                                <img src="/images/content.svg" alt="Edit" />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteClick(post)}>
                                                <img src="/images/essential.svg" alt="Delete" />
                                            </IconButton>
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    )}
                </Table>
                <TableFooter
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        padding: "1rem",
                        borderBottomRightRadius: '1.25rem'
                    }}
                >
                    <Pagination
                        count={posts?.meta?.totalCount / 5 || 0}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePagination}
                        page={page}
                        sx={{
                            '& .css-wjh20t-MuiPagination-ul li': {
                                marginRight: 0.625,
                                borderRadius: '0.875rem',
                                backgroundColor: '#ebebeb'
                            },
                            '& .css-wjh20t-MuiPagination-ul li button': {
                                border: 0
                            },
                            '& .Mui-selected': {
                                borderRadius: '0.875rem',
                                backgroundColor: '#0066cc !important',
                                color: '#ebebeb'
                            },
                        }}
                    />
                </TableFooter>
            </TableContainer>
            {showDialog.showView && <PostDialog open={showDialog.showView} handleClose={handleClose} type="View" data={showDialog?.data} page={page}/>}
            {showDialog.showEdit && <PostDialog open={showDialog.showEdit} handleClose={handleClose} type="Edit" data={showDialog?.data} page={page} />}
            {showDialog.showDelete && <DeleteDialog open={showDialog.showDelete} handleClose={handleClose} data={showDialog?.data} page={page} />}
        </Box>
    );
};
