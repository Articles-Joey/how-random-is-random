import { Box, Button, Typography, Modal } from "@mui/material";
import Link from "next/link";

export default function AboutModal({ open, onClose }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                maxWidth: 400,
            }}>
                <Typography variant="h6" gutterBottom>
                    How Random is Random?
                </Typography>
                <Typography variant="body1">
                    This application generates random numbers based on user-defined parameters. You can specify the range of numbers and how many times to generate them. The results are displayed in a list and a bar chart, showing how many times each number appeared.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Link href="/howrandomisrandom.html">
                            <Button sx={{ mt: 2 }} variant="contained" color="warning">
                                Old
                            </Button>
                        </Link>
                        <Link href="https://github.com/Articles-Joey/how-random-is-random" target="_blank" rel="noopener noreferrer">
                            <Button sx={{ mt: 2 }} variant="contained" color="secondary">
                                GitHub
                            </Button>
                        </Link>
                    </Box>
                    <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
                        Close
                    </Button>
                </Box>

                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    Old version was vanilla JavaScript, never finished, and used CDNs, this version is built with Next.js and React.
                </Typography>
            </Box>
        </Modal>
    );
}
