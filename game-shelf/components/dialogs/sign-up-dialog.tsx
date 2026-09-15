"use client";
import { useState } from "react";
import { signUp } from "@/lib/auth/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function SignUpDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningUp, setIsSigningup] = useState<boolean>(false);

  async function handleSignUp(e: React.SubmitEvent) {
    e.preventDefault();

    setError("");
    setIsSigningup(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
      });
      if (result.error) {
        setError(`Failed to sign up: ${result.error.message}`);
      } else {
        setOpen(false);
      }
    } catch (err) {
      setError(`An error occurred while signing up: ${err}`);
    } finally {
      setIsSigningup(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button variant="ghost" {...props}>
            Sign Up
          </Button>
        )}
      ></DialogTrigger>

      <DialogContent>
        <div className="space-y-4">
          <div>
            <DialogTitle className="text-2xl font-bold">Sign Up</DialogTitle>
            <DialogDescription>Create a new account</DialogDescription>
          </div>
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="johnn@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="********"
                  minLength={8}
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
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-900"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? "Signing Up..." : "Sign Up"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
