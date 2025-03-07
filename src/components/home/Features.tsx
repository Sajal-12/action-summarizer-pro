
import { CheckCircle, FileText, Clock, Zap, MessageSquare, Calendar } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Automatic Meeting Summaries",
      description:
        "Convert hours of meetings into concise, accurate summaries within seconds—no manual note-taking required."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
      title: "Action Item Extraction",
      description:
        "Automatically detect and extract action items, tasks, and follow-ups from your meeting transcripts."
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Deadline Tracking",
      description:
        "Set and track deadlines for action items with automated reminders and notifications."
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Real-time Collaboration",
      description:
        "Share meeting summaries and action items with your team instantly, enabling seamless collaboration."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "Integration with Communication Tools",
      description:
        "Seamlessly integrate with Slack, Teams, and other communication platforms for instant updates."
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "Calendar Integration",
      description:
        "Sync with Google Calendar to automatically process scheduled meetings and add action items as events."
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1.5 mb-3 rounded-full bg-muted border border-border">
            <span className="text-xs font-medium">Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Everything you need to maximize meeting productivity
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform handles the tedious parts of meetings so you can focus on what matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
