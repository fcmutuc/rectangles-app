import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import DeleteIcon from '@mui/icons-material/Delete';

const handleIconClicks = name => () => {
  console.log(name);
}

export default function Actions() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton name="add-rectangle" aria-label="add a rectangle" onClick={handleIconClicks('add')}>
        <CropLandscapeIcon />
      </IconButton>
      <IconButton name="clear-canvas" aria-label="clear the canvas" onClick={handleIconClicks('clear')}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
