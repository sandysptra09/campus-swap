import CampusSwapNavbar from "@/components/customs/navbar/navbar"

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CampusSwapNavbar />
            {children}
        </>
    )
}
