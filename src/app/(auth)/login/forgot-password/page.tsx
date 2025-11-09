import ForgetPasswordForm from "@/components/customs/forms/forgot-password-form";

export default function ForgetPasswordPage({ }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return <ForgetPasswordForm />;
}