import { Box, Button } from '@mui/material';

export default function ConsoleGreet() {
  const discordInvite = () => {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          margin: 0,
        }}
      >
        Welcome!
      </h1>
      <div>Starts with `help`</div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>Check out our</span>
        <Button
          sx={{
            textTransform: 'none',
          }}
          onClick={discordInvite}
        >
          Discord Server
        </Button>
      </Box>
    </Box>
  );
}
