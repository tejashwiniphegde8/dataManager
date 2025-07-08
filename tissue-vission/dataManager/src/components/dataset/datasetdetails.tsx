import { Paper, Divider, Stack, Chip, Tooltip, IconButton } from "@mui/material";
import type { Dataset } from "./index";
import React, { useState } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import axios from "axios";

type Props = {
  dataset: Dataset | {};
  projectId:string
};

const isDataset = (obj: any): obj is Dataset => {
  // Check for required Dataset properties
  return (
    obj &&
    typeof obj === "object" &&
    "title" in obj &&
    "sid" in obj &&
    "blockId" in obj
  );
};

const DatasetDetails: React.FC<Props> = ({ dataset }) => {

  const [files,setFiles] = React.useState<object>({})
  const [progress,setProgress] = React.useState<[boolean,number,string]>([false,0,""])


  const fetchFiles = async () => {
    try {
      const options = {
        url: `${import.meta.env.VITE_API_URL}/manage/files`,
        method:'get',
        params: {
          prefix:"INTRW-000/000-0-001/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34",
          limit: 2
        },
        data: {},
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(options);
      console.log("response", response);
      if (response.status === 200) {
        const data = response.data;
        console.log("Fetched dataset:", data);
        return data
      } else {
        throw "Error in fetching datasets";
      }
    } catch (e) {
      alert("Error in fetching datasets");
    }
  };


  const fetchProgress = async () => {
    try {
      const options = {
        url: `${import.meta.env.VITE_API_URL}/download/progress/${progress[2]}`,
        method:'get',
        params: {},
        data: {},
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(options);
      console.log("response", response);
      if (response.status === 200 && response.data.message === 'IN_PROGRESS') {
        const data = response.data;
        console.log(data)
        setProgress([true,data.percentageCompleted,progress[2]])
      }else if(response.status === 200 && response.data.message === 'COMPLETED'){
        setProgress([false,0,""])
      // Download the file with the given url
        const link = document.createElement('a');
        link.href = response.data.url;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert('Files Downloaded')
      
      }else {
        throw "Error in fetching progress";
      }
    } catch (e) {
      alert("Error in fetching progress");
    }
  };

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    // Only poll if progress is active and not complete
    if (progress && progress[0] && progress[1] < 100 && progress[2]) {
      interval = setInterval(fetchProgress, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [progress]);

  const startDownload = async (files:string[]) => {
    try {
      const options = {
        url: `${import.meta.env.VITE_API_URL}/download`,
        method:'post',
        params: {},
        data: {
          files:files
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(options);
      console.log("response", response);
      if (response.status === 200) {
        const data = response.data;
        return data
      } else {
        throw "Error in download";
      }
    } catch (e) {
      alert("Error in download");
    }
  };

  const handleDownload = async (dataset: string) => {
    try {
      let fileRes = null
      if (!(dataset in files)) {
        fileRes = await fetchFiles();
        setFiles({
          ...files,
          dataset: fileRes?.["data"]?.["keys"]
        });
      }
      else{
        fileRes = files?.[dataset as keyof typeof files]
      }
      
      // Safely access keys array from the response
      const fileList = (fileRes?.["data" as keyof typeof fileRes]?.["data"]?.["keys"]||[]).map((eachkey: { key: string }) => eachkey.key) || [];
      const downloadRes = await startDownload(fileList);
      console.log(downloadRes)
      if (downloadRes?.["message"] === "CREATED") {
        const ref = downloadRes?.["ref"];
        setProgress([true,0,ref])
        // You can use the ref here if needed, e.g., show a notification or trigger a download
      }
    } catch (e) {
      alert("Error in downloading files");
    }
  }

  console.log('dataset', dataset)
  if (!isDataset(dataset)) {
    return (
      <Paper sx={{ p: 2 }}>
        Select a DataSet to view the corresponding details
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, mt: 15 }}>
      <Typography variant="subtitle1">{dataset.title}</Typography>

      {
        Object.keys(dataset).map((eachkey: string) =>
          typeof (dataset as any)[eachkey] === 'string'?
          <Typography variant="body2" sx={{ mb: 1 }}>
            {eachkey}: <strong>{(dataset as any)?.[eachkey]}</strong>
          </Typography>
          :<></>
        )
      }

      <Divider sx={{ my: 1 }} />

      <Typography variant="subtitle2">Modalities</Typography>

      {(dataset?.modalities || []).map((modality, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography fontWeight="bold">{modality.name}</Typography>
          <Stack spacing={0.5}>
            <Typography variant="body2">
              Viewer Status: {modality.viewerStatus}
            </Typography>
            <Typography variant="body2">
              Modality: {modality.modality}
            </Typography>
            <Typography variant="body2">
              Physical Sections: {modality.physicalSections}
            </Typography>
            <Typography variant="body2">
              Physical Spacing: {modality.physicalSpacing}
            </Typography>
            <Typography variant="body2">
              Pixel Size: {modality.pixelSize}
            </Typography>
            <Typography variant="body2">
              Bit Depth: {modality.bitDepth}
            </Typography>
            <Typography variant="body2">
              Channels: {modality.channels}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap">
            {modality.channelDetails &&
              modality.channelDetails.map((ch: string, i: number) => (
                <Chip key={i} label={`Channel No. ${i + 1} ${ch}`} size="small" />
              ))}
          </Stack>
        </Box>
      ))}


      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>Download Dataset</Typography>
        <Tooltip title="Download dataset files">
          <IconButton onClick={()=>handleDownload(dataset?.dataset||"")} size="small">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>



      {
        progress[0]?
        <Box sx={{ width: "100%", mb: 2 }}>
          <LinearProgress variant="determinate" value={progress[1]} />
          <Typography variant="caption" sx={{ ml: 1 }}>
            {progress[1]}%
          </Typography>
        </Box>:<></>
      }
      
  
      

    </Paper>
  );
};

export default DatasetDetails;
