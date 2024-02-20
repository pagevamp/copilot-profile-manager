import { Box } from '@mui/material';

interface CompanyIconProps {
  label: string;
  iconImageUrl: string;
  fallbackColor?: string;
}

export const CompanyIcon = ({ label, iconImageUrl, fallbackColor }: CompanyIconProps) => {
  return iconImageUrl ? (
    <Box component="img" src={iconImageUrl} alt="avatar" sx={{ width: '20px', height: '20px' }} />
  ) : (
    <Box
      sx={{
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        // #09AA6C is the primary color for copilot. Use as fallback when fallbackColor is not provided
        backgroundColor: fallbackColor || '#09AA6C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '0.8em',
      }}
    >
      {label}
    </Box>
  );
};
