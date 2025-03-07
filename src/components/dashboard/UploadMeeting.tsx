
import { useState } from "react";
import { UploadCloud, Mic, Clock, FileText, Play, Pause, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const UploadMeeting = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upload");
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          setProcessing(true);
          
          // Simulate processing time
          setTimeout(() => {
            setProcessing(false);
            toast({
              title: "Upload completed",
              description: "Your meeting has been uploaded and processed successfully",
            });
          }, 3000);
          
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      // In a real app, this would stop the recording and process the audio
      toast({
        title: "Recording stopped",
        description: "Your recording has been saved",
      });
    } else {
      setRecording(true);
      setRecordingTime(0);
      // In a real app, this would start the recording
      toast({
        title: "Recording started",
        description: "Recording your meeting...",
      });
    }
  };

  // Format recording time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Simulate increasing recording time
  useState(() => {
    let interval: number | null = null;
    
    if (recording) {
      interval = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-semibold">Upload Meeting</h1>
      
      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload">
            <FileText className="h-4 w-4 mr-2" />
            Upload Recording
          </TabsTrigger>
          <TabsTrigger value="record">
            <Mic className="h-4 w-4 mr-2" />
            Record Meeting
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Meeting Recording</CardTitle>
              <CardDescription>
                Upload an audio or video recording of your meeting to generate a summary and extract action items.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Label htmlFor="meeting-title">Meeting Title</Label>
                <Input id="meeting-title" placeholder="Enter meeting title" />
              </div>
              
              <div className="grid gap-4">
                <Label htmlFor="meeting-description">Description (Optional)</Label>
                <Textarea id="meeting-description" placeholder="Enter meeting description" />
              </div>
              
              <div className="grid gap-4">
                <Label htmlFor="file-upload">Upload File</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    selectedFile ? "border-primary/50 bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <UploadCloud className="h-6 w-6 text-primary" />
                    </div>
                    {selectedFile ? (
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col items-center">
                          <p className="font-medium">Drag and drop your file here</p>
                          <p className="text-sm text-muted-foreground">
                            or click to browse files
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Supports MP3, MP4, WAV, M4A up to 500MB
                        </p>
                      </>
                    )}
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".mp3,.mp4,.wav,.m4a"
                      onChange={handleFileChange}
                    />
                    <ButtonCustom
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Browse Files
                    </ButtonCustom>
                  </div>
                </div>
              </div>
              
              {(uploading || processing) && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{uploading ? "Uploading..." : "Processing..."}</span>
                    <span>{uploading ? `${uploadProgress}%` : "Please wait"}</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <ButtonCustom
                onClick={handleUpload}
                disabled={!selectedFile || uploading || processing}
                className="w-full sm:w-auto"
                loading={uploading || processing}
              >
                {uploading ? "Uploading..." : processing ? "Processing..." : "Upload and Process"}
              </ButtonCustom>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="record" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Record Meeting</CardTitle>
              <CardDescription>
                Record a meeting directly from your browser to generate a summary and extract action items.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <Label htmlFor="live-meeting-title">Meeting Title</Label>
                <Input id="live-meeting-title" placeholder="Enter meeting title" />
              </div>
              
              <div className="grid gap-4">
                <Label htmlFor="live-meeting-description">Description (Optional)</Label>
                <Textarea id="live-meeting-description" placeholder="Enter meeting description" />
              </div>
              
              <div className="rounded-lg bg-muted p-8">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className={`rounded-full p-8 ${recording ? "bg-red-500/10 animate-pulse" : "bg-primary/10"}`}>
                    <Mic className={`h-12 w-12 ${recording ? "text-red-500" : "text-primary"}`} />
                  </div>
                  
                  {recording && (
                    <div className="flex items-center space-x-2 text-red-500">
                      <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="font-medium">Recording</span>
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(recordingTime)}</span>
                    </div>
                  )}
                  
                  <ButtonCustom
                    onClick={toggleRecording}
                    variant={recording ? "outline" : "primary"}
                    size="lg"
                    className={recording ? "border-red-500 text-red-500 hover:bg-red-500/10" : ""}
                  >
                    {recording ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Recording
                      </>
                    )}
                  </ButtonCustom>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Note: Make sure you have granted microphone permissions to this site. Recording quality depends on your microphone and internet connection.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadMeeting;
