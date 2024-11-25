"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";

// Schema for form validation
const formSchema = z.object({
  no_of_request: z.preprocess(
    (value) => Number(value),
    z.number().min(1, { message: "Number of requests must be at least 1" })
  ),
});

// Define the API response type
interface ApiResponse {
  message: string;
  output: string;
  error: string;
}

export const Main = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      no_of_request: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true); // Start loading
    const requestBody = {
      architecture: 1,
      numRequests: values.no_of_request,
    };

    try {
      const response = await fetch("http://localhost:8083/run-architecture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: ApiResponse = await response.json();
      setApiResponse(responseData); // Set the response data to state
    } catch (error) {
      console.error("Error:", error); // Debugging
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <>
      <div className="flex flex-col w-full space-y-4 p-6">
        <div className="flex items-center justify-center text-center text-3xl font-bold">
          Client Server Architecture
        </div>
        <div className="flex flex-col items-center justify-center text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="no_of_request"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number Of Request</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Number Of Request"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          {loading && (
            <div className="flex items-center justify-center w-full h-full">
              <Loading />
            </div>
          )}
          {apiResponse && !loading && (
            <div className="mt-4 p-4 border border-gray-300 rounded w-full max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold">Response :-</h2>
              <p>
                <strong>Message:</strong> {apiResponse.message}
              </p>
              <p>
                <strong>Output:</strong>
              </p>
              <div className="bg-gray-100 p-2 rounded">
                {apiResponse.output.split("\n").map((line, index) => (
                  <div key={index} className="break-words">
                    {line}
                  </div>
                ))}
              </div>
              {apiResponse.error && (
                <p>
                  <strong>Error:</strong> {apiResponse.error}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
