"use client"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useHotkeys } from "react-hotkeys-hook";

import useStore from "@/components/useStore";
import Link from "next/link";

import { Box, Button, Grid, Typography, TextField, Paper, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import Image from "next/image";
import AboutModal from "./AboutModal";

export default function PageContent() {

    const [canvasKey, setCanvasKey] = useState(0);

    const quantity = useStore(state => state.quantity);
    const setQuantity = useStore(state => state.setQuantity);

    const autoRotate = useStore(state => state.autoRotate);
    const setAutoRotate = useStore(state => state.setAutoRotate);

    useHotkeys("r", () => setCanvasKey(prevKey => prevKey + 1));
    useHotkeys("a", () => setAutoRotate(!autoRotate), [autoRotate]);
    useHotkeys("f", () => handleFullscreen(), []);

    useHotkeys("left", () => {
        setQuantity(quantity - 1);
    }, [quantity]);
    useHotkeys("right", () => {
        setQuantity(quantity + 1);
    }, [quantity]);

    const handleFullscreen = () => {
        const element = document.getElementById('canvas-wrap');
        if (element) {
            if (!document.fullscreenElement) {
                element.requestFullscreen().catch((err) => {
                    console.error("Error attempting to enable fullscreen:", err);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    const [upperRange, setUpperRange] = useState(10);
    const [times, setTimes] = useState(10);
    const [numberRange, setNumberRange] = useState([]);
    const [list, setList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [randomType, setRandomType] = useState("math"); // "math" or "crypto"

    const generate = () => {
        let tempNumberRange = Array(upperRange + 1).fill(0);
        for (let i = 0; i < times; i++) {
            let r;
            if (randomType === "crypto" && typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
                // Use crypto.getRandomValues for better randomness
                const array = new Uint32Array(1);
                window.crypto.getRandomValues(array);
                r = (array[0] % upperRange) + 1;
            } else {
                // Fallback to Math.random
                r = Math.floor(Math.random() * upperRange) + 1;
            }
            tempNumberRange[r]++;
        }
        setNumberRange(tempNumberRange);
        const tempList = [];
        const tempChartData = [];
        const tempChartLabels = [];
        for (let i = 1; i <= upperRange; i++) {
            tempList.push(`The number ${i} has appeared ${tempNumberRange[i]} Times`);
            tempChartData.push(tempNumberRange[i]);
            tempChartLabels.push(`Number ${i}`);
        }
        setList(tempList);
        setChartData(tempChartData);
        setChartLabels(tempChartLabels);
    };

    const handleClear = () => {
        setNumberRange([]);
        setList([]);
        setChartData([]);
        setChartLabels([]);
    };

    useEffect(() => {
        generate();
    }, [])

    const [open, setOpen] = useState(false);

    return (
        <Box>
            
            <Box sx={{ flexGrow: 1, mb: 3 }}>
                <Paper elevation={3}>
                    <Grid container alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                            <Image src="/icon.png" alt="Logo" width={50} height={50} />
                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', ml: 2 }}>
                                How Random is Random?
                            </Typography>
                            <Button variant="outlined" color="info" onClick={() => setOpen(true)} sx={{ ml: 2 }}>
                                About
                            </Button>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography variant="body1">Numbers</Typography>
                                    <TextField
                                        type="number"
                                        value={upperRange}
                                        onChange={e => setUpperRange(Number(e.target.value))}
                                        size="small"
                                        inputProps={{ min: 1 }}
                                        sx={{ width: 80, ml: 1 }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Times</Typography>
                                    <TextField
                                        type="number"
                                        value={times}
                                        onChange={e => setTimes(Number(e.target.value))}
                                        size="small"
                                        inputProps={{ min: 1 }}
                                        sx={{ width: 80, ml: 1 }}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControl size="small" sx={{ minWidth: 120, ml: 2 }}>
                                        <InputLabel id="random-type-label">Random Type</InputLabel>
                                        <Select
                                            labelId="random-type-label"
                                            id="random-type-select"
                                            value={randomType}
                                            label="Random Type"
                                            onChange={e => setRandomType(e.target.value)}
                                        >
                                            <MenuItem value="math">Math.random()</MenuItem>
                                            <MenuItem value="crypto">crypto.getRandomValues</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={generate} sx={{ mr: 1 }}>Submit</Button>
                                    <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)', p: 2 }}>

                <Box>
                    <Typography variant="h5">List</Typography>
                    <Paper sx={{ maxHeight: '70vh', overflowY: 'auto', p: 2 }}>
                        {list.map((item, idx) => (
                            <Typography key={idx} variant="body2">{item}</Typography>
                        ))}
                    </Paper>
                </Box>

                <Box>
                    <BarChart
                        xAxis={[{
                            id: 'numbers',
                            data: chartLabels,
                            scaleType: 'band',
                        }]}
                        series={[{
                            data: chartData,
                            label: '# of Random Times Called',
                        }]}
                        height={400}
                    />
                </Box>

            </Box>

            <AboutModal open={open} onClose={() => setOpen(false)} />

        </Box>
    );

}