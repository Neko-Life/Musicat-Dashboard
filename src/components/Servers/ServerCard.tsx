import { Box, Button, Card, Typography } from '@mui/material';
import { getColors } from '@/util/theme';
import { IServerCardProps } from '@/interfaces/components/Servers';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import useTouchRipple from '@/hooks/useTouchRipple';

const colors = getColors();

export default function ServerCard({ server }: IServerCardProps) {
  const handleServerClick = () => {};

  const { rippleRef, rippleParentProps, rippleParentStyles } = useTouchRipple();

  return (
    <Card
      {...rippleParentProps}
      sx={{
        ...rippleParentStyles,
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
            flexGrow: 1,
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
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography
              fontSize={20}
              margin="12px"
              overflow="hidden"
              textOverflow="ellipsis"
              fontFamily="texgyreadventorbold"
              fontWeight={600}
              sx={{
                wordBreak: 'break-all',
              }}
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
                fontFamily: 'texgyreadventorregular',
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
      <TouchRipple ref={rippleRef} style={{ color: colors.serverCardRipple }} />
    </Card>
  );
}
