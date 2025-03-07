
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 lg:pt-36 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-50 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-muted border border-border">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
            <span className="text-xs font-medium">
              AI-powered meeting assistant
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight md:leading-tight lg:leading-tight mb-6 text-balance">
            Transform meetings into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              actionable insights
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Automatically summarize your meetings, extract action items, and track progress—all powered by AI. Save time and never miss a follow-up again.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=register">
              <ButtonCustom size="xl" rightIcon>
                Get Started for Free
              </ButtonCustom>
            </Link>
            <Link to="/#demo">
              <ButtonCustom variant="outline" size="xl">
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch Demo
              </ButtonCustom>
            </Link>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            No credit card required • 14-day free trial
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-24 z-10 bottom-0" />
            <img
              src="https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=2071"
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl w-full border border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
