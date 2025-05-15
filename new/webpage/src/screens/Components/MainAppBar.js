import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Grid,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import VerticalAppBar from "./VerticalAppBar";


// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

// Main component
const MainAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClick = () => setShowSidebar(!showSidebar);
  const handleMobileMenuOpen = (e) => setMobileMenuAnchor(e.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuAnchor(null);
  const handleMenuClose = () => setAnchorEl(null);

  const mobileMenu = (
    <Menu anchorEl={mobileMenuAnchor} open={Boolean(mobileMenuAnchor)} onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleMobileMenuClose}>
        <SearchIcon sx={{ color: "black" }} /> Search
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Badge badgeContent={17} color="error">
          <NotificationsIcon sx={{ color: "black" }} />
        </Badge>{" "}
        Notifications
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <AccountCircle sx={{ color: "black" }} /> Profile
      </MenuItem>
    </Menu>
  );

  const profileMenu = (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          backgroundImage: "linear-gradient(45deg,rgb(254, 248, 206),rgb(249, 143, 61))",
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" wrap="nowrap" sx={{ width: "100%" }}>
            {/* Left Section: Menu Icon + Logo */}
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                minWidth: "fit-content",
              }}
            >
               
              <IconButton size="large" edge="start" sx={{ color: "black" }} onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>

              <Grid item sx={{ flexGrow: 1 }} />

              <img
                src="https://inovaantage.com/wp-content/uploads/2023/08/inovaantage-logo-new.png"
                alt="Inovaantage Logo"
                style={{ height: "50px", marginLeft: 8, cursor: "pointer" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            </Grid>

            {/* Spacer */}
            <Grid item sx={{ flexGrow: 1 }} />

            {/* Right Section: Search + Icons */}
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexShrink: 0,
                minWidth: "fit-content",
              }}
            >
              <Search
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "black" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  sx={{ "& .MuiInputBase-input": { color: "black" } }}
                />
              </Search>

              <IconButton size="large" sx={{ color: "black" }}>
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>

              <IconButton size="large" edge="end" onClick={handleProfileMenuOpen} sx={{ color: "black" }}>
                <AccountCircle />
              </IconButton>

              <IconButton
                size="large"
                sx={{ color: "black", display: { xs: "inline-flex", md: "none" } }}
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </Grid>
          </Grid>

          {/* Sidebar toggle */}
          {showSidebar && <VerticalAppBar onClose={() => setShowSidebar(false)} />}
        </Toolbar>
      </AppBar>

      {/* Menus */}
      {mobileMenu}
      {profileMenu}
    </>
  );
};

export default MainAppBar;
