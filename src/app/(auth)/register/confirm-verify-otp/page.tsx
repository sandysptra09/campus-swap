import VerifyOTPConfirmForm from "@/components/customs/forms/verify-otp-confirm-form";

export default function ConfirmVerifyOTPPage({ }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return <VerifyOTPConfirmForm />;
}
