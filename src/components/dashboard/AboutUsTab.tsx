
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AboutUsData {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  teamSize: string;
  experience: string;
  heroImage: string;
}

const AboutUsTab = () => {
  const { toast } = useToast();
  const [aboutData, setAboutData] = useState<AboutUsData>({
    title: "About Our Agency",
    subtitle: "Leading Digital Marketing Experts",
    description: "We are a team of passionate digital marketing professionals dedicated to helping businesses grow through strategic advertising campaigns across Amazon, Walmart, and Meta platforms.",
    mission: "To empower businesses with data-driven advertising strategies that deliver exceptional returns on investment.",
    vision: "To be the world's most trusted digital marketing partner for e-commerce businesses.",
    values: ["Transparency", "Results-Driven", "Innovation", "Client Success"],
    teamSize: "50+",
    experience: "10+",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('aboutUsData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setAboutData(parsedData);
      } catch (error) {
        console.error("Failed to parse about us data:", error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('aboutUsData', JSON.stringify(aboutData));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('aboutUsUpdated', {
      detail: aboutData
    }));
    
    toast({
      title: "Success",
      description: "About Us content has been updated successfully"
    });
  };

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...aboutData.values];
    newValues[index] = value;
    setAboutData({ ...aboutData, values: newValues });
  };

  const addValue = () => {
    setAboutData({ ...aboutData, values: [...aboutData.values, ""] });
  };

  const removeValue = (index: number) => {
    const newValues = aboutData.values.filter((_, i) => i !== index);
    setAboutData({ ...aboutData, values: newValues });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">About Us Management</CardTitle>
          <CardDescription>Customize your About Us page content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={aboutData.title}
                onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                placeholder="About Our Agency"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={aboutData.subtitle}
                onChange={(e) => setAboutData({ ...aboutData, subtitle: e.target.value })}
                placeholder="Leading Digital Marketing Experts"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Main Description</Label>
            <Textarea
              id="description"
              value={aboutData.description}
              onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
              placeholder="Main description about your company"
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea
                id="mission"
                value={aboutData.mission}
                onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                placeholder="Your company mission"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vision">Vision Statement</Label>
              <Textarea
                id="vision"
                value={aboutData.vision}
                onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                placeholder="Your company vision"
                rows={3}
              />
            </div>
          </div>

          <div>
            <Label>Company Values</Label>
            <div className="space-y-2 mt-2">
              {aboutData.values.map((value, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    placeholder={`Value ${index + 1}`}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeValue(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addValue} size="sm">
                Add Value
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                value={aboutData.teamSize}
                onChange={(e) => setAboutData({ ...aboutData, teamSize: e.target.value })}
                placeholder="50+"
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                value={aboutData.experience}
                onChange={(e) => setAboutData({ ...aboutData, experience: e.target.value })}
                placeholder="10+"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="heroImage">Hero Image URL</Label>
            <Input
              id="heroImage"
              value={aboutData.heroImage}
              onChange={(e) => setAboutData({ ...aboutData, heroImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{aboutData.title}</h2>
              <p className="text-lg text-slate-600">{aboutData.subtitle}</p>
            </div>
            <p className="text-slate-700">{aboutData.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">Mission</h3>
                <p className="text-sm text-slate-600">{aboutData.mission}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Vision</h3>
                <p className="text-sm text-slate-600">{aboutData.vision}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Values</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {aboutData.values.map((value, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUsTab;
