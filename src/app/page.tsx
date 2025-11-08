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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { qrData, backgroundColor: bg, foregroundColor: fg, finderFrame, finderCenter, moduleShape };
    console.log("Submit payload", payload);
    // TODO: send to API (e.g., fetch('/api/qrcode', { method: 'POST', body: JSON.stringify(payload) }))
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
              <Button type="submit" className="w-full">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
