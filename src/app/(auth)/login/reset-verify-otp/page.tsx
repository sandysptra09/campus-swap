import VerifyOTPResetForm from "@/components/customs/forms/verify-otp-reset-form"

export default function ResetVerifyOTPPage({ }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return <VerifyOTPResetForm />;
}
