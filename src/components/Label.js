import { alpha, styled } from '@mui/material/styles';

const RootStyle = styled('span')(({ theme, ownerState }) => {
  const { color } = ownerState;

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'pointer',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette[color]['dark'],
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  };
});

export default function Label({ children, color = 'default', onClick }) {
  return (
    <RootStyle ownerState={{ color }} onClick={onClick}>
      {children}
    </RootStyle>
  );
}
