import LoginForm from "@/components/customs/forms/login-form";

export default function LoginPage({ }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return <LoginForm />;
}
