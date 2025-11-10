import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Newsletter {
  id: string;
  email: string;
  name?: string;
  status: string;
  created_at: string;
}

interface NewsletterSectionProps {
  newsletters: Newsletter[];
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export function NewsletterSection({ newsletters, onDelete, onRefresh }: NewsletterSectionProps) {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this subscriber?")) {
      onDelete(id);
      toast.success("Subscriber removed successfully");
    }
  };

  const activeSubscribers = newsletters.filter((n) => n.status === "subscribed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Newsletter Subscribers</h2>
          <p className="text-muted-foreground mt-1">
            {activeSubscribers.length} active subscribers
          </p>
        </div>
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {newsletters.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No newsletter subscribers yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {newsletters.map((subscriber) => (
            <Card
              key={subscriber.id}
              className={`border-l-4 ${
                subscriber.status === "subscribed"
                  ? "border-l-purple-500"
                  : "border-l-gray-300"
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {subscriber.name && (
                      <p className="font-medium truncate">{subscriber.name}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-muted-foreground truncate">
                        {subscriber.email}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          subscriber.status === "subscribed"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {subscriber.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(subscriber.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(subscriber.id)}
                    className="text-destructive hover:text-destructive ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
