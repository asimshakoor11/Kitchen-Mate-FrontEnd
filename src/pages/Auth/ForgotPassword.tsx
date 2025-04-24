import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send reset email");
      }

      setEmailSent(true);
      toast({
        title: "Success",
        description: "Password reset email sent! Please check your inbox.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 my-10">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-center">
                {emailSent
                  ? "Check your email for password reset instructions"
                  : "Enter your email to reset your password"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!emailSent ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    We've sent password reset instructions to your email address.
                    Please check your inbox and follow the link to reset your
                    password.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setEmailSent(false)}
                  >
                    Try another email
                  </Button>
                </div>
              )}

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link to="/login" className="text-amber-500 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword; 