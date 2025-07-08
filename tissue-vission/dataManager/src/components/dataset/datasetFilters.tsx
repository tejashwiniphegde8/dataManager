import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

type Props = {
  groupBy: string;
  filterBy: string;
  sortBy: string;
  onChange: (field: string, value: string) => void;
};

const DatasetFilters: React.FC<Props> = ({ groupBy, filterBy, sortBy, onChange }) => {
  return (
      <Box sx={{ display: "flex", gap: 1, left: 400, top: 100, position: 'absolute', zIndex: 1000, padding: 2 }}>
      <Typography> <InputLabel sx={{fontSize:"14px",mt:1, color:"black"}}>Group By:</InputLabel></Typography>
      <FormControl size="small" sx={{width:100}}>
        <Select value={groupBy} sx={{borderRadius:"10px",border:"black"}} onChange={(e: SelectChangeEvent) => onChange("groupBy", e.target.value)}>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
      <Typography> <InputLabel sx={{fontSize:"14px",mt:1, color:"black"}}>Filter By:</InputLabel></Typography>
      <FormControl size="small"  sx={{width:100}}>
        <Select value={filterBy} sx={{borderRadius:"10px",border:"black"}} onChange={(e: SelectChangeEvent) => onChange("filterBy", e.target.value)}>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
      <Typography> <InputLabel sx={{fontSize:"14px",mt:1, color:"black"}}>Sort By:</InputLabel></Typography>
      <FormControl size="small"  sx={{width:100}}>
        <Select value={sortBy} sx={{borderRadius:"10px",border:"black"}} onChange={(e: SelectChangeEvent) => onChange("sortBy", e.target.value)}>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DatasetFilters;
