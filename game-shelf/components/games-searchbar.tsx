"use client";
import { ChevronDown, Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function GamesSearchbar() {
  return (
    <div className="flex flex-row w-[70%] gap-2 h-12 pb-2.5 border-b-2 border-gray-200">
      <InputGroup className="items-center h-full border-2 border-black">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..."></InputGroupInput>
      </InputGroup>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={(props) => (
            <Button
              className="h-full bg-yellow-300 text-black border-2 border-black"
              {...props}
            >
              Sort Games
              <ChevronDown />
            </Button>
          )}
        ></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Oldest</DropdownMenuItem>
            <DropdownMenuItem>A-Z</DropdownMenuItem>
            <DropdownMenuItem>Z-A</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
