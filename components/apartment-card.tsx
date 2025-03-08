"use client";

import Image from "next/image";
import Link from "next/link";
import { Apartment } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ApartmentCardProps {
  apartment: Apartment;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  // Construct the full image URL by prepending the API URL if the imageUrl doesn't already include http/https
  const imageUrl = apartment.imageUrl.startsWith('http') 
    ? apartment.imageUrl 
    : `${API_URL}${apartment.imageUrl}`;

  return (
    <Card className="overflow-hidden pt-0 gap-1.5">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={apartment.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pt-4 pb-0">
        <CardTitle>{apartment.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{apartment.address}</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">Rooms: </span>
            <span className="text-sm">{apartment.numberOfRooms}</span>
          </div>
          <div>
            <span className="text-lg font-bold">${apartment.price}</span>
            <span className="text-sm text-muted-foreground"> /month</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/apartments/${apartment.id}`} passHref className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
