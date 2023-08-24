import React, { FC, useState } from "react";
import Link from "next/link";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { IListNavProps } from "@interface/navigation";
import { useAppDispatch } from "@store/store";
import { logout } from "@store/slices/authSlice";

const ListNavItem: FC<IListNavProps> = ({ list, pathname, subHeader }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);

  const renderLinkNav = () => {
    return list?.map((nav, i) => {
      const renderItem = () => {
        if (nav.to && !nav.isAction && !nav.listChildren) {
          return (
            <Link href={nav.to} style={{ width: "100%" }}>
              <ListItemButton
                selected={pathname === String(nav.to)}
                sx={{ borderRadius: "10px" }}
              >
                <ListItemIcon sx={{ minWidth: "35px" }}>
                  <nav.icon />
                </ListItemIcon>
                <ListItemText primary={nav.name} color={theme.color.black} />
              </ListItemButton>
            </Link>
          );
        } else if (nav.isAction && !nav.to && !nav.listChildren) {
          return (
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={async () => await dispatch(logout())}
            >
              <ListItemIcon sx={{ minWidth: "35px" }}>
                <nav.icon />
              </ListItemIcon>
              <ListItemText primary={nav.name} color={theme.color.black} />
            </ListItemButton>
          );
        } else if (!nav.to && nav.isAction && nav.listChildren) {
          return (
            <>
              <ListItemButton
                onClick={() => setOpenCollapse(!openCollapse)}
                sx={{ width: "100%" }}
                selected={openCollapse}
              >
                <ListItemIcon sx={{ minWidth: "35px" }}>
                  {<nav.icon />}
                </ListItemIcon>
                <ListItemText primary={nav.name} />
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                {nav.listChildren.map((child, i) => (
                  <Link href={child.to}  style={{ width: "100%" }} key={i}>
                    <ListItemButton
                      selected={pathname === String(child.to)}
                      sx={{ borderRadius: "10px", pl: "5px" }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "35px",
                          "& .MuiSvgIcon-root": { fontSize: "1.2rem" },
                        }}
                      >
                        <child.icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={child.name}
                        color={theme.color.black}
                      />
                    </ListItemButton>
                  </Link>
                ))}
              </Collapse>
            </>
          );
        }
      };

      return (
        <ListItem
          disablePadding
          key={i}
          sx={{
            flexDirection: nav.listChildren ? "column" : "row",
            mb: openCollapse ? "10px" : 0,
            transition: "all linear 0.3s"
          }}
        >
          {renderItem()}
        </ListItem>
      );
    });
  };

  return (
    <List
      subheader={
        <ListSubheader
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            px: "10px",
            lineHeight: "40px",
            color: "rgba(0, 0, 0, 0.8)",
            textTransform: "uppercase",
          }}
          component="div"
        >
          {subHeader ? subHeader : ""}
        </ListSubheader>
      }
    >
      {renderLinkNav()}
    </List>
  );
};

export default ListNavItem;
