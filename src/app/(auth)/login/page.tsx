// Login page component. Renders the authentication form for existing users.
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>
        <p className="text-muted-foreground mb-4 text-sm">
          Authentication will be implemented in a future issue.
        </p>
        <p className="text-sm text-muted-foreground">
          No account?{' '}
          <Link href="/register" className="underline hover:text-foreground">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
