import { Metadata } from 'next';
import { apartmentsApi } from '@/lib/api';
import { Apartment } from '@/types';
import ApartmentCard from '@/components/apartment-card';

export const metadata: Metadata = {
  title: 'Available Apartments | The Address Apartments',
  description: 'Browse our selection of luxury apartments available for rent',
};

// Use SSR for better performance and SEO
async function getApartments() {
  try {
    // This will run on the server
    const apartments = await apartmentsApi.getAll();
    return apartments;
  } catch (error) {
    console.error('Failed to fetch apartments:', error);
    return [];
  }
}

export default async function ApartmentsPage() {
  const apartments: Apartment[] = await getApartments();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Available Apartments</h1>
      
      {apartments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No apartments available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      )}
    </div>
  );
}