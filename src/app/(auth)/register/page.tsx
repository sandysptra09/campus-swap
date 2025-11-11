import RegisterForm from "@/components/customs/forms/register-form";

export default function RegisterPage({ }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return <RegisterForm />;
}