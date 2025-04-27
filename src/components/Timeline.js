import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaCalendarAlt,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import { projectData } from "../data/projectData";

// 🔹 获取状态颜色
const getStatusColor = (status) => {
  switch (status) {
    case "Done":
      return "#198754";
    case "In Progress":
      return "#FFC107";
    case "Ongoing":
      return "#0D6EFD";
    case "Not Started":
      return "#ADB5BD";
    case "Infeasible":
      return "#DC3545";
    default:
      return "#0DCAF0";
  }
};

// 🔹 获取状态图标
const getStatusIcon = (status) => {
  const color = getStatusColor(status);
  switch (status) {
    case "Done":
      return <FaCheckCircle style={{ color }} />;
    case "In Progress":
      return <FaHourglassHalf style={{ color }} />;
    case "Ongoing":
      return <FaSpinner style={{ color }} />;
    case "Not Started":
      return <FaTimesCircle style={{ color }} />;
    case "Infeasible":
      return <FaTimesCircle style={{ color }} />;
    default:
      return <FaCalendarAlt style={{ color: "#0DCAF0" }} />;
  }
};

export default function Timeline() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRecom, setSelectedRecom] = useState("All");

  const statusOptions = [
    "All",
    "In Progress",
    "Ongoing",
    "Done",
    "Not Started",
    "Infeasible",
  ];
  const recomOptions = [
    "All",
    ...new Set(projectData.map((item) => item.recom)),
  ];

  const filteredData = projectData.filter((item) => {
    const statusMatch =
      selectedStatus === "All" || item.status === selectedStatus;
    const recomMatch = selectedRecom === "All" || item.recom === selectedRecom;
    return statusMatch && recomMatch;
  });

  const sortedData = [...filteredData].sort(
    (a, b) => parseInt(a.year) - parseInt(b.year)
  );

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 顶部导航栏（status筛选） */}
      <nav
        style={{
          backgroundColor: "#ffffff",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          borderBottom: "1px solid #dee2e6",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {statusOptions.map((status) => {
          const color = getStatusColor(status);
          const isSelected = selectedStatus === status;
          return (
            <div
              key={status}
              onClick={() => setSelectedStatus(status)}
              style={{
                minWidth: "120px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                borderRadius: "8px",
                cursor: "pointer",
                background: isSelected ? `${color}` : `${color}55`,
                boxShadow: isSelected
                  ? `0px 6px 14px ${color}44`
                  : "0px 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {status}
            </div>
          );
        })}
      </nav>

      {/* 中间部分：左栏 + Timeline */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* 左侧 recom 筛选栏 */}
        <aside
          style={{
            width: "230px", // ✅ 更窄一些
            backgroundColor: "#ffffff",
            borderRight: "1px solid #dee2e6",
            padding: "16px 8px",
            boxShadow: "2px 0 6px rgba(0, 0, 0, 0.05)",
            position: "sticky",
            top: "60px",
            height: "calc(100vh - 60px)",
            overflowY: "auto", // ✅ 可滚动
            scrollbarWidth: "none", // ✅ 隐藏 Firefox 滚动条
            msOverflowStyle: "none", // ✅ 隐藏 IE 滚动条
          }}
        >
          <style>
            {`
      aside::-webkit-scrollbar {
        display: none;                   /* ✅ 隐藏 Chrome 滚动条 */
      }
    `}
          </style>

          <h4
            style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
          >
            📚 Topics
          </h4>
          {recomOptions.map((recom) => {
            const isSelected = selectedRecom === recom;
            return (
              <div
                key={recom}
                onClick={() => setSelectedRecom(recom)}
                style={{
                  marginBottom: "12px",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: isSelected ? "#0d6efd" : "#f1f1f1",
                  color: isSelected ? "#fff" : "#333",
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {recom}
              </div>
            );
          })}
        </aside>

        {/* 主内容区：Timeline */}
        <main style={{ flex: 1, padding: "20px" }}>
          <h2
            style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
          >
            DEI Projects ({selectedStatus}, {selectedRecom})
          </h2>

          <VerticalTimeline lineColor="#333">
            {sortedData.map((item) => {
              const color = getStatusColor(item.status);
              return (
                <VerticalTimelineElement
                  key={item.id}
                  date={item.year}
                  icon={getStatusIcon(item.status)}
                  iconStyle={{
                    background: "#f0f0f0",
                    boxShadow: "0 0 0 4px " + color,
                  }}
                  contentStyle={{
                    background: "#fff",
                    border: `2px solid ${color}`,
                    color: "#000",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid " + color,
                  }}
                  style={{ cursor: "pointer" }}
                  onTimelineElementClick={() => navigate(`/project/${item.id}`)}
                >
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                  <p style={{ margin: 0, color }}>Status: {item.status}</p>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </main>
      </div>
    </div>
  );
}
