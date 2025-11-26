import CampusSwapNavbar from "@/components/customs/navbar/navbar"
import CampusSwapFooter from "@/components/customs/footer/footer"

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CampusSwapNavbar />
            {children}
            <CampusSwapFooter />
        </>
    )
}
