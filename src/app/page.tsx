import Image from "next/image";
import Dashboard from "@/components/component/dashboard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Links from "@/components/component/links";
import { FavoriteIcon, SearchIcon, AppCenterIcon } from "@/components/ui/svg";

export default function Home() {
  return (
    <Tabs defaultValue="week" className="items-center mt-4">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">
            <AppCenterIcon className="h-4 w-4 text-muted-foreground" />
          </TabsTrigger>
          <TabsTrigger value="month">
            <FavoriteIcon className="h-4 w-4 text-muted-foreground" color="grey"/>
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
        </div>
      </div>

      <Links />
    </Tabs>
  );
}
