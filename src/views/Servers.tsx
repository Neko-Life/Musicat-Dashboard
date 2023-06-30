import { useEffect } from 'react';
import { getDebugState } from '@/util/dbg';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import { useMainSelector } from '@/hooks/useSelector';
import { loopCb } from '@/util/util';
import { getSocket } from '@/socket/instance';
import { Box, Button, Typography } from '@mui/material';
import { getColors } from '@/util/theme';

const colors = getColors();

function Servers() {
  const socket = getSocket();
  const { serverList } = useMainSelector();

  useEffect(() => {
    if (socket)
      loopCb(() => (socket?.isOpen() ? socket.requestServerList() : false), 10);
  }, [socket]);

  if (getDebugState()) console.log(serverList);

  const handleServerClick = () => {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '16px',
      }}
    >
      {serverList.map((server) => {
        return (
          <Button
            key={server.id}
            sx={{
              overflow: 'hidden',
              backgroundColor: colors.serverCardBg,
              color: 'black',
              width: '300px',
              maxWidth: '300px',
              zIndex: 0,
              padding: 0,
              cursor: 'default',
              textTransform: 'none',
              display: 'flex',
              flexDirection: 'column',
              transition: '.2s',
              '&:hover': {
                backgroundColor: 'white',
                boxShadow: '0px 0px 100px 0px rgba(0,0,0,0.5)',
                zIndex: 1,
                scale: '103%',
                transition: '.2s',
              },
              '& span': {
                color: colors.serverCardRipple,
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
              }}
            >
              <Box
                sx={{
                  overflow: 'hidden',
                  height: '300px',
                  position: 'relative',
                }}
              >
                <Box
                  className="server-card-img"
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <img
                    src={server.banner_url || server.icon_url}
                    alt="Server Icon"
                    style={{
                      aspectRatio: '1/1',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: 'pricedown',
                      position: 'absolute',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      fontSize: 80,
                      fontWeight: 800,
                      color: 'red',
                      opacity: 0,
                      top: 0,
                      left: 0,
                    }}
                  >
                    WASTED
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={server.splash}
                  alt=""
                  style={{
                    position: 'absolute',
                    width: '100%',
                  }}
                />
                <Box>
                  <Typography
                    fontSize={20}
                    margin="12px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    fontWeight={600}
                  >
                    {server.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    paddingBottom: '24px',
                  }}
                >
                  <Button
                    onClick={handleServerClick}
                    variant="contained"
                    color={server.isMutual ? 'secondary' : 'success'}
                    sx={{
                      zIndex: 1,
                      fontWeight: 600,
                      '& span': {
                        color: colors.buttonRipple + ' !important',
                      },
                    }}
                  >
                    {server.isMutual ? 'Manage' : 'Add'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
}

defineComponentLayout(Servers, AppLayout);

export default Servers;
