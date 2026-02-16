import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { SignUpButtonComponent } from '@/components/auth-buttons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link2, BarChart3, Shield, Zap, Globe, Users } from 'lucide-react'

export default async function Home() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center sm:py-32">
        <Badge className="mb-6 text-sm">Modern Link Management</Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          Shorten Links, <br className="hidden sm:inline" />
          Amplify Your Reach
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
          Create short, memorable links that are easy to share. Track performance, 
          manage your links, and gain insights with our powerful analytics platform.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SignUpButtonComponent />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Powerful features to help you manage and track your shortened links effectively
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Link2 className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Quick Link Shortening</CardTitle>
              <CardDescription>
                Transform long URLs into short, shareable links in seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Paste any URL and get a shortened link instantly. Perfect for social media, 
                emails, and anywhere you need clean, professional links.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <BarChart3 className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>
                Track clicks and monitor link performance in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get detailed analytics on how your links perform. See click counts, 
                geographic data, and referral sources.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Shield className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Enterprise-grade security for your links and data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your links and data are protected with industry-standard security. 
                Reliable uptime ensures your links always work.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Zap className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Blazing fast redirects with global CDN
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ultra-fast link redirects powered by a global CDN. Your users will 
                reach their destination in milliseconds.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Globe className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Custom Short Links</CardTitle>
              <CardDescription>
                Create branded, memorable short links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate custom short codes that match your brand. Make your links 
                more memorable and professional.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Users className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Easy Management</CardTitle>
              <CardDescription>
                Organize and manage all your links in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simple dashboard to view, edit, and organize all your shortened links. 
                Find what you need quickly with powerful search.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 pb-32 text-center">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 sm:p-12">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
            Join thousands of users who trust our platform for their link management needs
          </p>
          <SignUpButtonComponent />
        </div>
      </section>
    </div>
  );
}
