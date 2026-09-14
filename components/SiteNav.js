"use client";
import {
    Box,
    Paper,
    Grid,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

import Image from "next/image";
import InfoIcon from '@mui/icons-material/Info';
import useStore from "@/components/useStore";

export default function SiteNav() {
    const upperRange = useStore((state) => state.upperRange);
    const times = useStore((state) => state.times);
    const randomType = useStore((state) => state.randomType);
    const setUpperRange = useStore((state) => state.setUpperRange);
    const setTimes = useStore((state) => state.setTimes);
    const setRandomType = useStore((state) => state.setRandomType);
    const setAboutOpen = useStore((state) => state.setAboutOpen);
    const generate = useStore((state) => state.generate);

    return (
        <Box
            as="nav"
            sx={{
                backgroundColor: "theme.palette.primary.main",
                flexShrink: 0,
                mb: { xs: 0, lg: 3 },
                position: { xs: "sticky", lg: "static" },
                top: 0,
                zIndex: { xs: 1200, lg: "auto" },
                // px: { xs: 1, lg: 0 },
                // pt: { xs: 1, lg: 0 },
            }}
        >
            <Paper elevation={3}>
                <Grid
                    container
                    // alignItems="center"
                    // justifyContent="space-between"
                    // direction={{ xs: "column", lg: "row" }}
                    sx={{
                        px: 2,
                        py: 1,
                        gap: { xs: 1, lg: 0 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", lg: "row" }
                    }}
                >

                    <Grid
                        // item
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: { xs: "100%", lg: "auto" },
                        }}
                    >

                        {/* <Image
                            src="/icon.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        /> */}
                        <Button
                            variant="outlined"
                            color="info"
                            // startIcon={}
                            onClick={() => setAboutOpen(true)}
                        // sx={{ ml: 2 }}
                        >
                            <InfoIcon />
                            {/* About */}
                        </Button>

                        <Typography
                            variant="h5"
                            component="div"
                            onClick={() => generate()}
                            sx={{
                                fontWeight: "bold",
                                ml: 2,
                                fontSize: { xs: "1.1rem", sm: "1.5rem" },
                                cursor: "pointer",
                            }}
                        >
                            How Random is Random?
                        </Typography>

                    </Grid>

                    <Grid
                        // item
                        sx={{ width: { xs: "100%", lg: "auto" } }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 1, lg: 2 }}
                            // alignItems="center"
                            sx={{
                                flexWrap: "nowrap",
                                alignItems: "center",
                                justifyContent: {
                                    xs: "space-between",
                                    lg: "flex-end",
                                },
                            }}
                        // wrap="wrap"
                        >
                            <Grid
                            //   item
                            >
                                {/* <Typography variant="body1">Numbers</Typography> */}
                                <TextField
                                    type="number"
                                    value={upperRange}
                                    onChange={(e) =>
                                        setUpperRange(e.target.value)
                                    }
                                    size="small"
                                    variant="standard"
                                    label="Numbers"
                                    // inputProps={{ min: 1 }}
                                    sx={{ width: 80, ml: 1 }}
                                />
                            </Grid>
                            <Grid
                            // item
                            >
                                {/* <Typography variant="body1">Times</Typography> */}
                                <TextField
                                    type="number"
                                    value={times}
                                    onChange={(e) => setTimes(e.target.value)}
                                    size="small"
                                    variant="standard"
                                    label="Iterations"
                                    // inputProps={{ min: 1 }}
                                    sx={{ width: 80, ml: 1 }}
                                />
                            </Grid>
                            <Grid
                            // item
                            >
                                <FormControl
                                    size="small"
                                    sx={{ minWidth: 120, ml: 2 }}
                                >
                                    <InputLabel id="random-type-label">
                                        Random Type
                                    </InputLabel>
                                    <Select
                                        labelId="random-type-label"
                                        id="random-type-select"
                                        value={randomType}
                                        label="Random Type"
                                        onChange={(e) =>
                                            setRandomType(e.target.value)
                                        }
                                    >
                                        <MenuItem value="math">
                                            Math.random()
                                        </MenuItem>
                                        <MenuItem value="crypto">
                                            crypto.getRandomValues
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </Box>
    );
}
