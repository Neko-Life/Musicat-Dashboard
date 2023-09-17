import { main } from '@/configs/themes';
import type { SxProps, Theme } from '@mui/material';

export const sxButtonCommonStyles: (active?: boolean) => SxProps<Theme> = (
  active
) => ({
  fontWeight: 600,
  backgroundColor: active ? main.color.mainBg : '',
  padding: '12px',
  color: active ? main.color.textWhite : main.color.textMuiBtn,
  '&:hover': {
    backgroundColor: active ? main.color.btnHoverActive : main.color.btnHover,
  },
});
