
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Ready to transform your meetings?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who have already saved countless hours with our meeting summarization and action tracking platform.
          </p>
          <Link to="/auth?mode=register">
            <ButtonCustom variant="outline" size="xl" className="bg-white text-primary hover:bg-white/90">
              Get Started for Free
            </ButtonCustom>
          </Link>
          <p className="mt-4 text-sm text-white/70">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
