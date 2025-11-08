"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  const [qrData, setQrData] = useState("");
  const [bg, setBg] = useState("#f8f2ec");
  const [fg, setFg] = useState("#552048");
  const [finderFrame, setFinderFrame] = useState("square");
  const [finderCenter, setFinderCenter] = useState("square");
  const [moduleShape, setModuleShape] = useState("square");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [svgResult, setSvgResult] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSvgResult(null);
    
    const payload = { qrData, backgroundColor: bg, foregroundColor: fg, finderFrame, finderCenter, moduleShape };
    
    try {
      const response = await fetch("/api/qrcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Request failed" }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const svg = await response.text();
      setSvgResult(svg);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Nice QR Maker</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="qrData">QR Data (url)</Label>
              <Input id="qrData" placeholder="https://example.com" value={qrData} onChange={(e) => setQrData(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bg">Background color</Label>
                <Input id="bg" type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fg">Foreground color</Label>
                <Input id="fg" type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
              </div>
            </div>

            {/* Finder frame shape */}
            <div className="space-y-2">
              <Label>Finder frame shape</Label>
              <Select value={finderFrame} onValueChange={setFinderFrame}>
                <SelectTrigger><SelectValue placeholder="Select shape" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">square</SelectItem>
                  <SelectItem value="rounded">rounded</SelectItem>
                  <SelectItem value="circle">circle</SelectItem>
                  <SelectItem value="diamond">diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Finder center shape */}
            <div className="space-y-2">
              <Label>Finder center shape</Label>
              <Select value={finderCenter} onValueChange={setFinderCenter}>
                <SelectTrigger><SelectValue placeholder="Select shape" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">square</SelectItem>
                  <SelectItem value="rounded">rounded</SelectItem>
                  <SelectItem value="circle">circle</SelectItem>
                  <SelectItem value="diamond">diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Module shape */}
            <div className="space-y-2">
              <Label>Module shape</Label>
              <Select value={moduleShape} onValueChange={setModuleShape}>
                <SelectTrigger><SelectValue placeholder="Select shape" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">square</SelectItem>
                  <SelectItem value="rounded">rounded</SelectItem>
                  <SelectItem value="circle">circle</SelectItem>
                  <SelectItem value="diamond">diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CardFooter className="px-0">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Generating..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
          
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {svgResult && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-center p-4 bg-muted rounded-md">
                <div dangerouslySetInnerHTML={{ __html: svgResult }} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
