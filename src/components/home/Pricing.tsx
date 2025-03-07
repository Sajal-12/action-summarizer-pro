
import { useState } from "react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      description: "For individuals getting started",
      price: { monthly: "$0", annually: "$0" },
      features: [
        "5 meeting summaries per month",
        "Basic action item extraction",
        "7-day data retention",
        "Email support"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      description: "For professionals and small teams",
      price: { monthly: "$19", annually: "$15" },
      features: [
        "50 meeting summaries per month",
        "Advanced action item tracking",
        "30-day data retention",
        "Google Calendar integration",
        "Slack notifications",
        "Priority support"
      ],
      cta: "Start 14-day Free Trial",
      highlight: true
    },
    {
      name: "Team",
      description: "For growing teams and organizations",
      price: { monthly: "$49", annually: "$39" },
      features: [
        "Unlimited meeting summaries",
        "Advanced action item tracking",
        "Unlimited data retention",
        "All integrations included",
        "Team collaboration tools",
        "Custom AI training",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1.5 mb-3 rounded-full bg-muted border border-border">
            <span className="text-xs font-medium">Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${annual ? "text-muted-foreground" : "text-foreground font-medium"}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                annual ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform ${
                  annual ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm flex items-center ${annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Annual
              <span className="ml-2 text-xs py-0.5 px-1.5 rounded-full bg-green-100 text-green-800 font-medium">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border ${
                plan.highlight
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-border"
              } bg-card overflow-hidden transition-all hover:shadow-md animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.highlight && (
                <div className="bg-primary py-1.5 text-center">
                  <span className="text-xs font-medium text-primary-foreground">Most Popular</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-semibold">
                    {annual ? plan.price.annually : plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {plan.name !== "Free" && "/user/month"}
                  </span>
                </div>

                <Link to="/auth?mode=register">
                  <ButtonCustom
                    className={`w-full mb-6 ${
                      plan.highlight ? "bg-primary" : ""
                    }`}
                    variant={plan.highlight ? "primary" : "outline"}
                  >
                    {plan.cta}
                  </ButtonCustom>
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
