import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { HiMagnifyingGlass } from "react-icons/hi2";
import FilterSidebar from "../components/FiltersSideBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tab";
import AuctionCard from "../components/AuctionCard";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../service/axiosInstance";
export default function HomePage() {
  const [auctions, setAuctions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const currentPage = parseInt(searchParams.get("page") || 1, 10);
  const limit = parseInt(searchParams.get("limit") || 5, 10);
  const categoriesquery = searchParams.get("categories") || "";
  const conditionssquery = searchParams.get("conditions") || "";
  const searchquery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await axiosInstance.get("/api/auctions", {
        params: {
          category: categoriesquery,
          condition: conditionssquery,
          search: searchquery,
        },
      });
      setAuctions(response.content);
    };
    fetchAuctions();
  }, [categoriesquery, setSearchParams, conditionssquery]);

  useEffect(() => {
    const getAllConditions = async () => {
      const response = await axiosInstance.get("/api/auctions/conditions");
      setConditions(response);
    };

    getAllConditions();
  }, []);

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await axiosInstance.get("/api/auctions/categories");
      setCategories(response);
    };
    getAllCategories();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Discover Unique Items at Auction
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Bid on exclusive items from around the world. Find rare
              collectibles, art, and more.
            </p>
            <div className="w-full max-w-md space-y-2">
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for items..."
                  className="w-full bg-background pl-10 p-2 border border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
            <div className="md:w-64 lg:w-72 col-span-1">
              <FilterSidebar conditions={conditions} categories={categories} />
            </div>

            <Button className="mb-4 flex items-center md:hidden">
              Filters
            </Button>

            <div className="flex-1 items-center col-span-2">
              <Tabs defaultValue="All" className="mb-8">
                <TabsList className="mb-4 flex w-full overflow-x-auto">
                  <TabsTrigger value="All">All</TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.name}
                      className="flex-shrink-0"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent
                  value="All"
                  className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                  {auctions.map((auc) => (
                    <AuctionCard key={auc.id} auction={auc} />
                  ))}
                </TabsContent>

                {/* {categories.map((category) => (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="mt-0"
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {allAuctions
                        .filter(
                          (auction) =>
                            auction.category.toLowerCase() === category.id
                        )
                        .map((auction) => (
                          <AuctionCard key={auction.id} auction={auction} />
                        ))}
                    </div>
                  </TabsContent>
                ))} */}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
