import { Button } from "@mui/material"
import siteName from "constants/siteName"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
    title: `404 | ${siteName}`,
}

export default async function NotFound() {

    return (
        <div className='page page-not-found text-center py-5'>
            <Image src="/icon.png" alt="Logo" width={50} height={50} />
            <h2 style={{marginBottom: '0rem'}}>Not Found</h2>
            <p style={{marginBottom: '2rem'}}>Could not find requested resource</p>
            <Link href="/">
                <Button variant="contained" color="primary">
                    Return Home
                </Button>
            </Link>
        </div>
    )

}