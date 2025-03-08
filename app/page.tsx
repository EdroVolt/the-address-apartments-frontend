import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image 
          src="/home.jpg" 
          alt="Luxury apartment building"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Welcome to The Address Apartments</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">Discover luxury living spaces designed for comfort and style</p>
          <Link href="/apartments" passHref>
            <Button size="lg" className="text-lg px-8 py-6">Browse Apartments</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose The Address?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col items-center text-center">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4">Prime Locations</h3>
                <p className="text-muted-foreground">All our properties are situated in the most desirable neighborhoods with easy access to amenities.</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4">Luxury Amenities</h3>
                <p className="text-muted-foreground">Enjoy premium features like modern appliances, fitness centers, and 24/7 concierge services.</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4">Dedicated Support</h3>
                <p className="text-muted-foreground">Our professional team is always ready to assist with any questions or maintenance needs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your New Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Browse our selection of premium apartments and find the perfect match for your lifestyle.</p>
          <Link href="/apartments" passHref>
            <Button variant="secondary" size="lg" className="text-lg px-8">
              View Available Apartments
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
