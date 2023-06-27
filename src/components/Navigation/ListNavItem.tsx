import React from 'react';
import Link from 'next/link';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    SvgIconTypeMap,
    useTheme,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface NavProps {
    name: string;
    to?: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    };
}

interface ListNavProps {
    list: NavProps[];
    pathname?: string;
    subHeader?: string;
}

const ListNavItem = ({ list, pathname, subHeader }: ListNavProps) => {
    const theme = useTheme();

    return (
        <List
            subheader={
                <ListSubheader
                    sx={{
                        fontSize: '12px',
                        fontWeight: 700,
                        px: '10px',
                        lineHeight: '40px',
                        color: "rgba(0, 0, 0, 0.8)",
                        textTransform: 'uppercase',
                    }}
                    component="div"
                >
                    {subHeader ? subHeader : ''}
                </ListSubheader>
            }
        >
            {list?.map((nav, i) => (
                <ListItem disablePadding key={i}>
                    {nav.to ? (
                        <Link href={nav.to} style={{ width: '100%' }}>
                            <ListItemButton
                                selected={pathname === nav.to}
                                sx={{ borderRadius: '10px' }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    {<nav.icon />}
                                </ListItemIcon>
                                <ListItemText primary={nav.name} color={theme.color.black} />
                            </ListItemButton>
                        </Link>
                    ) : (
                        <ListItemButton
                            selected={pathname === nav.to}
                            sx={{ borderRadius: '10px' }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>{<nav.icon />}</ListItemIcon>
                            <ListItemText primary={nav.name} color={theme.color.black} />
                        </ListItemButton>
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default ListNavItem;
