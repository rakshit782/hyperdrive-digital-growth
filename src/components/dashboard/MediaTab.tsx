
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Plus } from "lucide-react";

const MediaTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Media Library</h2>
          <p className="text-gray-600 mt-2">Manage your images, videos, and other media</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Image className="h-5 w-5 mr-2" />
            Media Files
          </CardTitle>
          <CardDescription>Upload and organize your media files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media files yet</h3>
              <p className="text-gray-500 mb-4">Upload your first media file</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaTab;
