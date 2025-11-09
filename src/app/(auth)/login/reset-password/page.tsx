import ResetPasswordForm from "@/components/customs/forms/reset-password-form";

export default function ResetPasswordPage({ }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return <ResetPasswordForm />;
}