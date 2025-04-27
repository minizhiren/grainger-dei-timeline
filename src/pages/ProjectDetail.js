import React from "react";
import { useParams } from "react-router-dom";
import { projectData } from "../data/projectData";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import SourceIcon from "@mui/icons-material/Source";
import LabelIcon from "@mui/icons-material/Label";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LoopIcon from "@mui/icons-material/Loop";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectData.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <Typography
        variant="h4"
        color="error"
        sx={{ textAlign: "center", marginTop: "40px" }}
      >
        ❌ Project Not Found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        paddingTop: "40px",
      }}
    >
      <Card
        sx={{
          width: "900px",
          boxShadow: 3,
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <CardContent>
          {/* 📌 项目标题 */}
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {project.title}
          </Typography>

          {/* 📌 项目信息标签 */}
          <Stack spacing={2} direction="row" flexWrap="wrap" sx={{ mb: 3 }}>
            {/* Year */}
            <Chip
              icon={<EventIcon />}
              label={project.year}
              color="primary"
              variant="outlined"
            />
            {/* Source */}
            <Chip
              icon={<SourceIcon />}
              label={project.source}
              color="secondary"
              variant="outlined"
            />
            {/* Recommendation */}
            <Chip
              icon={<LabelIcon />}
              label={project.recom}
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            />
            {/* Status */}
            <Chip
              icon={getStatusIcon(project.status)}
              label={project.status}
              sx={{
                backgroundColor: getStatusColor(project.status),
                color: "#fff",
                fontWeight: "bold",
              }}
            />
          </Stack>

          <Divider sx={{ my: 3 }} />
          {/* 📌 前缀标题 */}
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            color="text.secondary"
          >
            Fall 2022 Update
          </Typography>
          {/* 📌 项目详细描述 */}
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.8,
              fontSize: "16px",
            }}
          >
            {project.details}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

/* 🔹 辅助函数 */
const getStatusColor = (status) => {
  const colorMap = {
    Done: "#198754",
    "In Progress": "#FFC107",
    Ongoing: "#0D6EFD",
    "Not Started": "#ADB5BD",
    Infeasible: "#DC3545",
  };
  return colorMap[status] || "#6c757d";
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Done":
      return <CheckCircleIcon />;
    case "In Progress":
      return <HourglassEmptyIcon />;
    case "Ongoing":
      return <LoopIcon />;
    case "Not Started":
      return <CancelIcon />;
    case "Infeasible":
      return <ErrorOutlineIcon />;
    default:
      return <CancelIcon />;
  }
};
