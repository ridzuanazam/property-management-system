import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import {
  areaElementClasses,
  lineElementClasses,
} from "@mui/x-charts/LineChart";
import { chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import Box from "@mui/material/Box";

export default function SparkLineCard({
  title,
  data,
  color = "#8B5CF6",
  icon: Icon,
}) {
  // Extract Arrays
  const counts = data.map((item) => item.count);
  const dates = data.map((item) => item.date);

  const [dateIndex, setDateIndex] = React.useState(null);

  const settings = {
    data: counts,
    baseline: "min",
    margin: { bottom: 0, top: 5, left: 10, right: 0 },
    xAxis: { id: "date-axis", data: dates },
    yAxis: {
      domainLimit: (_, maxValue) => ({
        min: -maxValue / 6,
        max: maxValue,
      }),
    },
    sx: {
      [`& .${areaElementClasses.root}`]: { opacity: 0.2 },
      [`& .${lineElementClasses.root}`]: { strokeWidth: 3 },
      [`& .${chartsAxisHighlightClasses.root}`]: {
        stroke: color, // purple highlight
        strokeDasharray: "none",
        strokeWidth: 2,
      },
    },
    slotProps: {
      lineHighlight: { r: 4 },
    },
    clipAreaOffset: { top: 2, bottom: 2 },
    axisHighlight: { x: "line" },
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f8f9fb", // softer off-white background
        borderRadius: 3,
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)", // stronger shadow
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 8px 22px rgba(0,0,0,0.18)", // slightly deeper shadow only
        },
      }}
    >
      {/* Card Content */}
      <Stack direction="column" spacing={1}>
        {/* Title #6B7280*/}
        <Typography
          sx={{
            color: color, // gray-500
            fontWeight: 500,
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {Icon && (
            <Icon
              fill="#fff"
              color={color}
              width="1.5rem"
              height="1.5rem"
              strokeWidth="2"
              style={{ marginRight: 6 }}
            />
          )}

          {dateIndex === null ? title : dates[dateIndex]}
        </Typography>

        {/* Value + Chart */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ borderBottom: `solid 2px ${color}`, pb: 1 }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#1F2937", // gray-800
            }}
          >
            {counts[dateIndex ?? counts.length - 1].toLocaleString()}
          </Typography>

          <SparkLineChart
            height={40}
            width={200}
            area
            showHighlight
            color={color}
            onHighlightedAxisChange={(axisItems) => {
              setDateIndex(axisItems[0]?.dataIndex ?? null);
            }}
            highlightedAxis={
              dateIndex === null
                ? []
                : [{ axisId: "date-axis", dataIndex: dateIndex }]
            }
            {...settings}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
