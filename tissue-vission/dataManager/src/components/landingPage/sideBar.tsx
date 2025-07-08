import { Box, Typography, Chip, Stack, IconButton, Accordion, AccordionSummary } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {

  const navigate = useNavigate();
  
  function navigateToDatasets(name:string){
    console.log('navigating')
    navigate(`/datasets/${name}`)
  }

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: 'grey.100',
        p: 2,
        boxShadow: 1,
        height: '100vh',
        overflow: 'auto',
        position: 'fixed',
        top: 65,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" sx={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
        Projects
      </Typography>

      {['000-0-001'].map((name) => (
        <Accordion key={name} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="body2" onClick={() => navigateToDatasets(name)}>{name}</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <FolderIcon fontSize="small" sx={{ color: 'black' }} />
            </IconButton>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <DownloadIcon fontSize="small" sx={{ color: 'black' }} />
            </IconButton>
          </AccordionSummary>
        </Accordion>
      ))}

      <Typography variant="body2" sx={{ my: 2, color: 'black' }}>
        Some description for the project as provided during the project creation phase up to 200 characters
      </Typography>

      <Typography variant="subtitle2" sx={{ color: 'white', textAlign: 'left', backgroundColor:"black" }}>Attributes:</Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Chip label="Geno Type" size="small" />
        <Chip label="Gender" size="small" />
        <Chip label="Age" size="small" />
      </Stack>

    
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
      <Box sx={{ flexGrow: 1 }} />
        <IconButton size="small">
          <EditIcon sx={{ color: 'black' }} />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon sx={{ color: 'black' }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Sidebar;
