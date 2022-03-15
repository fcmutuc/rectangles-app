import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Actions() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="add an rectangle">
        <CropLandscapeIcon />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
