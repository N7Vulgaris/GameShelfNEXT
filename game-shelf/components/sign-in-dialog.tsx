"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignInDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button variant="ghost" {...props}>
            Login
          </Button>
        )}
      ></DialogTrigger>

      <DialogContent>
        <div>
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <form className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="johnn@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="********" />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-700 hover:bg-blue-900">
                  Sign In
                </Button>
              </DialogFooter>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
