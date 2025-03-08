"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { apartmentsApi } from "@/lib/api";
import { Apartment, ApartmentFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormField,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const form = useForm<ApartmentFormData>({
    defaultValues: {
      name: "",
      address: "",
      description: "",
      numberOfRooms: 1,
      price: 0,
      image: null,
    },
  });

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login");
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  // Fetch apartments
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await apartmentsApi.getAll();
        setApartments(data);
        setFetchError(null);
      } catch (err: any) {
        setFetchError("Failed to fetch apartments");
        console.error("Error fetching apartments:", err);
      }
    };

    if (isAuthenticated && isAdmin) {
      fetchApartments();
    }
  }, [isAuthenticated, isAdmin]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      form.setValue("image", e.target.files[0]);
    }
  };

  const onSubmit = async (data: ApartmentFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      await apartmentsApi.create(data);

      // Reset form and refresh apartment list
      form.reset();
      setSelectedFile(null);
      setIsCreating(false);

      // Refresh apartment list
      const newData = await apartmentsApi.getAll();
      setApartments(newData);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create apartment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this apartment?")) {
      try {
        await apartmentsApi.delete(id);
        // Refresh apartment list
        const data = await apartmentsApi.getAll();
        setApartments(data);
      } catch {
        setError("Failed to delete apartment");
      }
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Only render content if user is authenticated and admin
  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          variant={isCreating ? "outline" : "default"}
        >
          {isCreating ? "Cancel" : "Add New Apartment"}
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}

      {/* Create Apartment Form */}
      {isCreating && (
        <div className="mb-8 p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Create New Apartment</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="numberOfRooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Rooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($/month)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apartment Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          required
                        />
                      </FormControl>
                      {selectedFile && (
                        <FormDescription>
                          Selected file: {selectedFile.name}
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Apartment"}
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* Apartments List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Manage Apartments</h2>

        {fetchError && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">
            {fetchError}
          </div>
        )}

        {apartments.length === 0 ? (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-muted-foreground">No apartments available</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apartments.map((apartment) => (
                <TableRow key={apartment.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 rounded overflow-hidden">
                      <Image
                        src={
                          apartment.imageUrl.startsWith("http")
                            ? apartment.imageUrl
                            : `${
                                process.env.NEXT_PUBLIC_API_URL ||
                                "http://localhost:8080"
                              }${apartment.imageUrl}`
                        }
                        alt={apartment.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{apartment.name}</TableCell>
                  <TableCell>{apartment.address}</TableCell>
                  <TableCell>{apartment.numberOfRooms}</TableCell>
                  <TableCell>${apartment.price}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        apartment.isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {apartment.isAvailable ? "Available" : "Not Available"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/apartments/${apartment.id}`} passHref>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(apartment.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
