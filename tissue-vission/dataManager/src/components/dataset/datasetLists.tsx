import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { Dataset } from "./index";
import React from "react";

type Props = {
  datasets: { total: number, data: Dataset[] };
  selectedTitle: string | "";
  pageIndex: number;
  fetchDataSets: () => void
  setpageIndex: (pageIndex: number) => void;
  onSelect: (dataset: Dataset) => void;
};

const ROWS_PER_pageIndex = 10;

const DatasetList: React.FC<Props> = ({ datasets, selectedTitle, onSelect, pageIndex, setpageIndex, fetchDataSets }) => {
  //const [pageIndex, setpageIndex] = React.useState(0);

  // const handlePrev = () => setpageIndex(Math.max(0, pageIndex - 1));
  // const handleNext = () => {
  //   // Only go to next pageIndex if there are more datasets to show
  //   if ((pageIndex + 1) * ROWS_PER_pageIndex < datasets.total) {
  //     setpageIndex(pageIndex + 1);
  //   }
  // };

  const fetchNextData = async () => {
    // Calculate the range of data needed for the next page
    const nextPageStart = (pageIndex) * ROWS_PER_pageIndex;
    const nextPageEnd = nextPageStart + ROWS_PER_pageIndex;
    console.log(nextPageStart,nextPageEnd)
    // If we already have enough data for the next page, just update the page index
    if (datasets.data.length >= Math.min(nextPageEnd,datasets.total)) {
      setpageIndex(pageIndex + 1);
    } else {
      // Otherwise, fetch more data and then update the page index
      await fetchDataSets();
      setpageIndex(pageIndex + 1);
    }

  }

  const fetchPreviousData = () => {

    if (pageIndex > 0) {
      setpageIndex(pageIndex - 1);
    }

  }

  console.log('datasets', datasets)

  const paginated = datasets.data.slice(
    (pageIndex-1) * ROWS_PER_pageIndex,
    (pageIndex) * ROWS_PER_pageIndex
  );
  console.log('pageIndex',pageIndex-1,pageIndex)

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ border: "none" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#BFBFBF" }}>
              <TableCell>Title</TableCell>
              <TableCell>Animal ID</TableCell>
              <TableCell>Block ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((dataset, idx) => (
              <React.Fragment key={`${dataset.title}-${dataset.blockId}`}>
                <TableRow
                  hover
                  selected={selectedTitle === `${dataset.title}-${dataset.blockId}`}
                  onClick={() => onSelect(dataset)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: selectedTitle === dataset.title ? "#e3f2fd" : "white",
                    borderRadius: "12px",
                    boxShadow: "2px 2px 8px 2px rgba(21, 22, 23, 0.1)", // soft shadow
                    transition: "box-shadow 0.2s",
                  }}
                >
                  <TableCell sx={{ borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px", border: "none" }}>
                    {dataset.title}
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>{dataset.sid}</TableCell>
                  <TableCell sx={{ borderTopRightRadius: "12px", borderBottomRightRadius: "12px", border: "none" }}>
                    {dataset.blockId}
                  </TableCell>
                </TableRow>
                {/* Spacer row, except after the last item */}
                {idx < paginated.length - 1 && (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ height: 16, border: "none", padding: 0, background: "transparent" }} />
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, px: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {datasets.data.length === 0
            ? "0"
            : `${(pageIndex-1) * ROWS_PER_pageIndex + 1}-${Math.min((pageIndex) * ROWS_PER_pageIndex, datasets.data.length)}`}
        </Typography>
        <Box>
          <IconButton
            onClick={fetchPreviousData}
            disabled={pageIndex === 0}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={fetchNextData}
            disabled={(pageIndex) * ROWS_PER_pageIndex >= datasets.total}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default DatasetList;
