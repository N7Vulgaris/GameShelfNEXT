"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { signIn } from "@/lib/auth/auth-client";

export default function SignInDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  async function handleSignIn(e: React.SubmitEvent) {
    e.preventDefault();

    setError("");
    setIsSigningIn(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });
      if (result.error) {
        setError(`Failed to sign up: ${result.error.message}`);
      } else {
        setOpen(false);
      }
    } catch (err) {
      setError(`An error occurred while signing in: ${err}`);
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button variant="ghost" {...props}>
            Sign In
          </Button>
        )}
      ></DialogTrigger>

      <DialogContent>
        <div className="space-y-4">
          <div>
            <DialogTitle className="text-2xl font-bold">Sign In</DialogTitle>
            <DialogDescription>
              Sign in using your credentials
            </DialogDescription>
          </div>

          <form className="space-y-4" onSubmit={handleSignIn}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johnn@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>

              {error && (
                <div className="text-destructive bg-destructive/10 rounded-sm p-3 my-3">
                  {error}
                </div>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  disabled={isSigningIn}
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-900"
                  disabled={isSigningIn}
                >
                  {isSigningIn ? "Signing in..." : "Sign In"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
