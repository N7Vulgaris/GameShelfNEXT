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

interface GameSearchbarProps {
  onSearch: (title: string) => void;
  sortGames: (sortMethod: string) => void;
}

export default function GamesSearchbar({
  onSearch,
  sortGames,
}: GameSearchbarProps) {
  return (
    <div className="flex flex-row w-[70%] gap-2 h-12 mb-6 border-gray-200">
      <InputGroup className="items-center h-full border-2 border-black">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        ></InputGroupInput>
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
            <DropdownMenuItem onClick={() => sortGames("newest")}>
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortGames("oldest")}>
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortGames("az")}>
              A-Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortGames("za")}>
              Z-A
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
