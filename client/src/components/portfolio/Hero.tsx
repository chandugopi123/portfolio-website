import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Chandu Venkata Sai Phani Gopi
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light">
            Full-Stack Developer | B.Tech CSE Student
          </p>
        </div>

        {/* Bio */}
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          I build clean, functional web applications using modern technologies. Focused on learning full-stack development and solving practical problems through code.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            onClick={() => scrollToSection("projects")}
            size="lg"
            className="px-8 py-6 text-base font-semibold"
          >
            View My Work
          </Button>
          <Button
            onClick={() => scrollToSection("contact")}
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base font-semibold"
          >
            Get In Touch
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-16 animate-bounce">
          <button
            onClick={() => scrollToSection("about")}
            className="inline-flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
