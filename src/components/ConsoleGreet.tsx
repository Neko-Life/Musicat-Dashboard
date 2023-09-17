import { Box, Button } from '@mui/material';
import Markdown from './Markdown';

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
      <Markdown>Starts with `help`</Markdown>
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
            fontSize: '16px',
          }}
          onClick={discordInvite}
        >
          Discord Server
        </Button>
      </Box>
    </Box>
  );
}
