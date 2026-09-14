"use client";
import { useEffect } from "react";
// import dynamic from "next/dynamic";

// import { useHotkeys } from "react-hotkeys-hook";

import useStore from "@/components/useStore";
// import Link from "next/link";

import { Box, Typography, Paper } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import AboutModal from "./AboutModal";

export default function PageContent() {
    // const [canvasKey, setCanvasKey] = useState(0);

    // const quantity = useStore(state => state.quantity);
    // const setQuantity = useStore(state => state.setQuantity);

    // const autoRotate = useStore(state => state.autoRotate);
    // const setAutoRotate = useStore(state => state.setAutoRotate);

    // useHotkeys("r", () => setCanvasKey(prevKey => prevKey + 1));
    // useHotkeys("a", () => setAutoRotate(!autoRotate), [autoRotate]);
    // useHotkeys("f", () => handleFullscreen(), []);

    // useHotkeys("left", () => {
    //     setQuantity(quantity - 1);
    // }, [quantity]);
    // useHotkeys("right", () => {
    //     setQuantity(quantity + 1);
    // }, [quantity]);

    // const handleFullscreen = () => {
    //     const element = document.getElementById('canvas-wrap');
    //     if (element) {
    //         if (!document.fullscreenElement) {
    //             element.requestFullscreen().catch((err) => {
    //                 console.error("Error attempting to enable fullscreen:", err);
    //             });
    //         } else {
    //             document.exitFullscreen();
    //         }
    //     }
    // };

    const list = useStore((state) => state.list);
    const chartData = useStore((state) => state.chartData);
    const chartLabels = useStore((state) => state.chartLabels);
    const chartColors = useStore((state) => state.chartColors);
    const aboutOpen = useStore((state) => state.aboutOpen);
    const setAboutOpen = useStore((state) => state.setAboutOpen);
    const generate = useStore((state) => state.generate);

    useEffect(() => {
        generate();
    }, [generate]);

    return (
        <Box
            sx={{
                height: "calc(100dvh - 90px)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: "grid",
                    gap: { xs: 1, lg: 2 },
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "minmax(0, 1fr) minmax(0, 3fr)",
                    },
                    gridTemplateRows: {
                        xs: "minmax(250px, 42dvh) minmax(0, 1fr)",
                        lg: "minmax(0, 1fr)",
                    },
                    gridTemplateAreas: {
                        xs: '"chart" "numbers"',
                        lg: '"numbers chart"',
                    },
                    p: { xs: 1, lg: 2 },
                }}
            >
                {/* Numbers Data */}
                <Box
                    sx={{
                        gridArea: "numbers",
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ flexShrink: 0 }}
                    >
                        Numbers Data
                    </Typography>
                    <Paper
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            overflowY: "auto",
                            p: 2,
                        }}
                    >
                        {list.map((item, idx) => (
                            <Typography
                                key={idx}
                                variant="body2"
                            >
                                {item}
                            </Typography>
                        ))}
                    </Paper>
                </Box>

                {/* Chart */}
                <Box
                    sx={{
                        gridArea: "chart",
                        minWidth: 0,
                        minHeight: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    <BarChart
                        xAxis={[
                            {
                                id: "numbers",
                                data: chartLabels,
                                scaleType: "band",
                                colorMap: {
                                    type: "ordinal",
                                    colors: chartColors,
                                },
                            },
                        ]}
                        series={[
                            {
                                data: chartData,
                                label: "# of Random Times Called",
                            },
                        ]}
                        sx={{ width: "100%", height: "100%" }}
                    />
                </Box>
            </Box>

            <AboutModal
                open={aboutOpen}
                onClose={() => setAboutOpen(false)}
            />
        </Box>
    );
}
