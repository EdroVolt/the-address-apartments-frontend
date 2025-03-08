import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { apartmentsApi } from "@/lib/api";
import { Apartment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const apartment = await apartmentsApi.getById(parseInt(params.id));
    return {
      title: `${apartment.name} | The Address Apartments`,
      description: apartment.description.substring(0, 160),
    };
  } catch {
    return {
      title: "Apartment Not Found | The Address Apartments",
      description: "The requested apartment could not be found",
    };
  }
}

// Fetch apartment data
async function getApartment(id: string) {
  try {
    return await apartmentsApi.getById(parseInt(id));
  } catch {
    return null;
  }
}

export default async function ApartmentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const apartment: Apartment | null = await getApartment(params.id);

  if (!apartment) {
    notFound();
  }

  // Construct the full image URL by prepending the API URL if the imageUrl doesn't already include http/https
  const imageUrl = apartment.imageUrl.startsWith("http")
    ? apartment.imageUrl
    : `${API_URL}${apartment.imageUrl}`;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Apartment Image */}
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={apartment.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Apartment Details */}
        <div>
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-3xl">{apartment.name}</CardTitle>
            <p className="text-lg text-muted-foreground">{apartment.address}</p>
          </CardHeader>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Rooms</p>
                <p className="text-xl font-semibold">
                  {apartment.numberOfRooms}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-xl font-semibold">
                  ${apartment.price}
                  <span className="text-sm text-muted-foreground"> /month</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{apartment.description}</p>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2 text-sm">
            <span>Status:</span>
            <Badge variant={apartment.isAvailable ? "default" : "destructive"}>
              {apartment.isAvailable ? "Available" : "Not Available"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
