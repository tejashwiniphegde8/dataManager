import { Box, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState, type SetStateAction } from "react";
import DatasetList from "./datasetLists";
import DatasetDetails from "./datasetdetails";
import DatasetFilters from "./datasetFilters";
import { useParams } from "react-router-dom";
import AppBar from "../common/appbar";
import axios from "axios";
import { useRef } from "react";

export type Dataset = {
  title: string;
  sid: string;
  blockId: string;
  dataset:string;
  description: string;
  modalities: {
    name: string;
    viewerStatus: string;
    modality: string;
    physicalSections: number;
    physicalSpacing: number;
    pixelSize: number;
    bitDepth: number;
    channels: number;
    channelDetails: string[];
  }[];
};

const App: React.FC = () => {
  const [selected, setSelected] = useState<Dataset | {}>({});
  const [filters, setFilters] = useState({
    groupBy: "None",
    filterBy: "None",
    sortBy: "Title",
  });
  // Fix: dataSet should be an array, not an object
  const [dataSet, setDataSet] = useState<{total:number,data:Dataset[]}>({total:0,data:[]});
  const [pageIndex, setPageIndex] = useState<number>(0);

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const { projectId } = useParams();

  console.log("projectId", projectId);

  // To avoid double-fetching in React 18 Strict Mode, use a ref to track initial mount
  const didFetch = useRef(false);

  useEffect(() => {
    if (projectId && !didFetch.current) {
      didFetch.current = true;
      console.log('fetching');
      fetchDataSets();
    }
  }, [projectId]); 


  const fetchDataSets = async () => {
    try {
      const options = {
        url: `${import.meta.env.VITE_API_URL}/dataset/${projectId}`,
        method:'post',
        params: {
          limit: 10,
          page:`${pageIndex + 1}`,
          sponsorId: "INTRW-000",
        },
        data: {
          // orderBy: "createdAt",
          // order: "asc",
          // attributes: {
          //   sex: ["M", "F"],
          //   group: ["SDI-18", "SDA-9"]
          // }
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(options);
      console.log("response", response);
      if (response.status === 200) {
        const data = response.data;
        console.log("Fetched dataset:", data);
        setDataSet((prev: any) => ({
          total:data.total,
          data: prev.data ? [...prev.data, ...data.data] : [...data.data]
        }));
        setPageIndex((prev) => prev + 1);
      } else {
        throw "Error in fetching datasets";
      }
    } catch (e) {
      alert("Error in fetching datasets");
    }
  };


  return (
    <>
      <AppBar />
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", width: "100vw", overflowX: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100vw", // Ensures full viewport width
            mt: "64px",
            p: 2,
            backgroundColor: "white",
            boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Left main content */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              color="black"
              sx={{ fontWeight: "bold", textAlign: "left", mb: 2 }}
            >
              Datasets
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <TextField size="small" placeholder="Search by Title/Animal Id" />
              <DatasetFilters
                groupBy={filters.groupBy}
                filterBy={filters.filterBy}
                sortBy={filters.sortBy}
                onChange={handleFilterChange}
              />
            </Stack>

            <DatasetList
              datasets={dataSet}
              selectedTitle={selected && "title" in selected ? selected.title : ""}
              pageIndex={pageIndex}
              setpageIndex={setPageIndex}
              fetchDataSets={fetchDataSets}
              onSelect={(dataset: SetStateAction<Dataset>) => setSelected(dataset)}
            />
          </Box>

          {/* Right details panel */}
          <Box sx={{ width: 320, ml: 2 }}>
            <DatasetDetails dataset={selected} projectId={projectId||""}/>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
