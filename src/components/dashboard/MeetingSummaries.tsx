
import { useState } from "react";
import { 
  CalendarDays, 
  Clock, 
  MoreVertical, 
  Download, 
  Share, 
  Trash, 
  Search, 
  Filter 
} from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for meeting summaries
const mockSummaries = [
  {
    id: 1,
    title: "Product Team Weekly Sync",
    date: "2023-06-15",
    duration: "45 min",
    summary: "Discussed Q3 roadmap items. Team agreed to prioritize the new analytics dashboard and defer the mobile app redesign.",
    actionItems: 3,
    participants: ["John Doe", "Jane Smith", "Mike Johnson"]
  },
  {
    id: 2,
    title: "Marketing Campaign Review",
    date: "2023-06-12",
    duration: "60 min",
    summary: "Reviewed performance of Q2 campaigns. Decision to increase budget for social media ads by 15% and reduce email marketing spending.",
    actionItems: 5,
    participants: ["Alex Green", "Sarah Williams", "Tom Brown"]
  },
  {
    id: 3,
    title: "Investor Pitch Preparation",
    date: "2023-06-10",
    duration: "90 min",
    summary: "Finalized slide deck for Series B funding. CEO will lead the pitch focusing on revenue growth and market expansion plans.",
    actionItems: 7,
    participants: ["Robert Chen", "Emma Watson", "Chris Evans"]
  },
  {
    id: 4,
    title: "Engineering Sprint Planning",
    date: "2023-06-08",
    duration: "120 min",
    summary: "Planned tasks for the upcoming sprint. Focus on refactoring authentication system and implementing new API endpoints.",
    actionItems: 12,
    participants: ["David Miller", "Sophie Turner", "James Wilson"]
  }
];

const MeetingSummaries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [summaries, setSummaries] = useState(mockSummaries);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // In a real app, this would be a debounced API call
  };

  const handleDelete = (id: number) => {
    setSummaries(summaries.filter(summary => summary.id !== id));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-display font-semibold">Meeting Summaries</h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search summaries..."
            className="pl-9"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex space-x-2">
          <ButtonCustom variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </ButtonCustom>
          <ButtonCustom variant="outline" size="sm">
            Latest
          </ButtonCustom>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {summaries.length} summaries
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {summaries.map((summary) => (
          <Card key={summary.id} className="hover:shadow-md transition-shadow animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium mr-2">{summary.title}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {summary.actionItems} Action Items
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <span className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {formatDate(summary.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {summary.duration}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {summary.summary}
                  </p>
                  
                  <div className="flex items-center flex-wrap gap-1 mt-2">
                    {summary.participants.map((participant, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-muted px-2 py-0.5 rounded-full"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex sm:flex-col items-center sm:items-end gap-3 mt-2 sm:mt-0">
                  <ButtonCustom size="sm">
                    View Details
                  </ButtonCustom>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center text-destructive focus:text-destructive"
                        onClick={() => handleDelete(summary.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MeetingSummaries;
