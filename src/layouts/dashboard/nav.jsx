import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Scrollbar from 'src/components/scrollbar';
import { Tooltip } from '@mui/material';

import Collapse from '@mui/material/Collapse';
import Iconify from 'src/components/iconify';
import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.pink.def, 0.8),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color:'secondary'}}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" style={{overflow:'auto'}} spacing={0.5} sx={{ px: 2 }} className='nav-scroll' >
      {navConfig.map((item, index) => (
        <NavItem key={item.title} item={item} index={index} />
      ))}
    </Stack>
  );

  const renderUpgrade = (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box
          component="img"
          src="/assets/illustrations/illustration_avatar.png"
          sx={{ width: 100, position: 'absolute', top: -50 }}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Get more?</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            From only $69
          </Typography>
        </Box>

        <Button
          href="https://material-ui.com/store/items/minimal-dashboard/"
          target="_blank"
          variant="contained"
          color="inherit"
        >
          Upgrade to Pro
        </Button>
      </Stack>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: (theme) => alpha(theme.palette.pink.main, 1),

        },
      }}
    >
      {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {/* {renderUpgrade} */}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            backgroundColor: (theme) => alpha(theme.palette.grey[700], 0),
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          style={{ backgroundColor: (theme) => alpha(theme.palette.pink.main, 0) }}
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item, index }) {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  // const [active, setActive] = useState(item.path === pathname);
  const handleSubMenuClick = (indexx) => {
    setOpenSubMenu(openSubMenu === indexx ? null : indexx);
  };
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <Tooltip title={item.toolTip ? item.toolTip : ''}>
      {item?.children ? (
        <>
          <ListItemButton
            component={RouterLink}
            onClick={() => handleSubMenuClick(index)}
            href={item.path}
            sx={{
              minHeight: 44,
              borderRadius: 0.75,
              typography: 'body2',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'capitalize',
              fontWeight: 'fontWeightMedium',
              ...(active && {
                color: 'primary.main',
                fontWeight: 'fontWeightSemiBold',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                },
              }),
            }}
          >
            <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
              {item.icon}
            </Box>
            <Box
              component="span"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              {item.title}
              {openSubMenu === index ? (
                <Iconify
                  icon="iconamoon:arrow-down-2-light"
                  sx={{
                    color: '#247EF2',
                  }}
                />
              ) : (
                <Iconify
                  icon="iconamoon:arrow-up-2-light"
                  sx={{
                    color: '#247EF2',
                  }}
                />
              )}
            </Box>
          </ListItemButton>
          <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
            {item?.children?.map((subNavItem, subIndex) => {
              const activee = subNavItem.path === pathname;
              console.log('subNavItem.path === pathname', subNavItem.path === pathname);
              console.log('activee', activee);
              console.log('pathname', pathname, subNavItem.path);

              return (
                <ListItemButton
                key={subNavItem.path}
                  component={RouterLink}
                  href={subNavItem.path}
                  sx={{
                    minHeight: 44,
                    borderRadius: 0.75,
                    typography: 'body2',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'capitalize',
                    fontWeight: 'fontWeightMedium',
                    ...(activee && {
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 'fontWeightSemiBold',
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                      },
                    }),
                  }}
                >
                  <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                    {subNavItem.icon}
                  </Box>
                  <Box component="span">{subNavItem.title} </Box>
                </ListItemButton>
              );
            })}
          </Collapse>
        </>
      ) : (
        <ListItemButton
          component={RouterLink}
          href={item.path}
          sx={{
            minHeight: 44,
            borderRadius: 0.75,
            typography: 'body2',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'capitalize',
            fontWeight: 'fontWeightMedium',
            ...(active && {
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 'fontWeightSemiBold',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }),
          }}
        >
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item.icon}
          </Box>

          <Box component="span">{item.title} </Box>
        </ListItemButton>
      )}
    </Tooltip>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.any,
};
