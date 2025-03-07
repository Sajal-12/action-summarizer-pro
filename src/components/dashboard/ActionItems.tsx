
import { useState } from "react";
import { Check, Clock, Filter, MoreVertical, Search, AlertCircle, Calendar, CheckSquare, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button-custom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for action items
const mockActionItems = [
  {
    id: 1,
    description: "Prepare Q3 roadmap draft",
    assignee: { name: "John Doe", avatar: "", initials: "JD" },
    dueDate: "2023-07-05",
    status: "completed",
    meeting: "Product Team Weekly Sync",
  },
  {
    id: 2,
    description: "Create social media campaign for new feature launch",
    assignee: { name: "Sarah Williams", avatar: "", initials: "SW" },
    dueDate: "2023-07-10",
    status: "in-progress",
    meeting: "Marketing Campaign Review",
  },
  {
    id: 3,
    description: "Update investor pitch deck with new financials",
    assignee: { name: "Robert Chen", avatar: "", initials: "RC" },
    dueDate: "2023-07-02",
    status: "pending",
    meeting: "Investor Pitch Preparation",
  },
  {
    id: 4,
    description: "Refactor authentication system",
    assignee: { name: "David Miller", avatar: "", initials: "DM" },
    dueDate: "2023-07-15",
    status: "in-progress",
    meeting: "Engineering Sprint Planning",
  },
  {
    id: 5,
    description: "Implement new API endpoints for mobile app",
    assignee: { name: "James Wilson", avatar: "", initials: "JW" },
    dueDate: "2023-07-20",
    status: "pending",
    meeting: "Engineering Sprint Planning",
  },
  {
    id: 6,
    description: "Schedule user research sessions",
    assignee: { name: "Emma Watson", avatar: "", initials: "EW" },
    dueDate: "2023-06-28",
    status: "overdue",
    meeting: "Product Team Weekly Sync",
  },
];

const ActionItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionItems, setActionItems] = useState(mockActionItems);
  const [filter, setFilter] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // In a real app, this would be a debounced API call
  };

  const handleFilter = (status: string) => {
    setFilter(status);
  };

  const handleToggleStatus = (id: number) => {
    setActionItems(
      actionItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "completed" ? "pending" : "completed",
          };
        }
        return item;
      })
    );
  };

  const filteredItems = actionItems.filter((item) => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.assignee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.meeting.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && item.status === filter;
  });

  // Helper for formatting dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper for determining if a date is in the past
  const isOverdue = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-display font-semibold">Action Items</h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search action items..."
            className="pl-9"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <ButtonCustom
          variant={filter === "all" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleFilter("all")}
        >
          All
        </ButtonCustom>
        <ButtonCustom
          variant={filter === "pending" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleFilter("pending")}
        >
          Pending
        </ButtonCustom>
        <ButtonCustom
          variant={filter === "in-progress" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleFilter("in-progress")}
        >
          In Progress
        </ButtonCustom>
        <ButtonCustom
          variant={filter === "completed" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleFilter("completed")}
        >
          Completed
        </ButtonCustom>
        <ButtonCustom
          variant={filter === "overdue" ? "primary" : "outline"}
          size="sm"
          onClick={() => handleFilter("overdue")}
        >
          Overdue
        </ButtonCustom>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Action Items ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Meeting</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className="animate-fade-in">
                  <TableCell>
                    <button
                      className={`h-6 w-6 rounded-md border flex items-center justify-center ${
                        item.status === "completed"
                          ? "bg-primary border-primary"
                          : "border-muted-foreground"
                      }`}
                      onClick={() => handleToggleStatus(item.id)}
                    >
                      {item.status === "completed" && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell>
                    <span className={item.status === "completed" ? "line-through text-muted-foreground" : ""}>
                      {item.description}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={item.assignee.avatar} />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {item.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{item.assignee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className={`text-sm ${
                        isOverdue(item.dueDate) && item.status !== "completed" 
                          ? "text-destructive" 
                          : ""
                      }`}>
                        {formatDate(item.dueDate)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{renderStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <span className="text-sm">{item.meeting}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <CheckSquare className="h-4 w-4 mr-2" />
                          Mark as completed
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Change due date
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-destructive focus:text-destructive">
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No action items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionItems;
