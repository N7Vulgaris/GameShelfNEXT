import { DeleteIcon, Edit, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function GameEditAndDelete() {
  return (
    <div className="flex flex-row justify-between mt-auto gap-2">
      <Button className="bg-destructive hover:bg-destructive/50">
        Delete
        <DeleteIcon />
      </Button>
      <Button className="bg-blue-600">
        Edit <Edit />
      </Button>
    </div>
  );
}
