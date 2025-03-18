import {
  ArrowRight,
  Users,
  Sparkles,
  Shield,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function Intro() {
  const features = [
    {
      icon: Users,
      title: "Connect with Others",
      description:
        "Find and connect with people who share your emotional journey",
    },
    {
      icon: Sparkles,
      title: "Express Yourself",
      description:
        "Share your moods and thoughts in a safe, understanding space",
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "A protected space where you can be your authentic self",
    },
    {
      icon: MessageCircle,
      title: "Meaningful Conversations",
      description:
        "Start conversations with others who understand your feelings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#78a6d4] to-[#382dd8]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-200 mb-6">
            <span className="bg-gradient-to-r from-blue-800 to-fuchsia-500 bg-clip-text text-transparent">
              ~
            </span>
            <span className=" text-white">MoodShare</span>
            <span className="bg-gradient-to-r from-blue-800 to-fuchsia-500 bg-clip-text text-transparent">
              ~
            </span>
          </h1>
          <h1 className="text-2xl md:text-4xl font-bold text-cyan-200 mb-6">
            Share Your Journey, Connect Through Emotions
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Join a community where you can express your feelings, connect with
            others on similar emotional journeys, and find support in a safe,
            understanding space.
          </p>
          <Link
            to="/auth"
            className="mt-8 w-fit px-8 py-3 rounded-full bg-gradient-to-r from-blue-800 to-fuchsia-950 text-white font-medium hover:from-blue-800 hover:to-fuchsia-800 transition-all duration-200 transform hover:scale-[1.02] flex items-center space-x-2 mx-auto"
          >
            Join MoodShare
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#032f5a] via-blue-950 to-violet-950 p-6 rounded-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-lg border border-gray-700 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 mb-6">
            Join thousands of others who have found their emotional support
            network.
          </p>
          <Link
            to="/auth"
            className="px-8 py-3 w-fit rounded-full bg-gradient-to-r from-blue-800 to-fuchsia-950 text-cyan-200 font-medium hover:from-blue-800 hover:to-fuchsia-800 transition-all duration-200 transform hover:scale-[1.02] flex items-center space-x-2 mx-auto"
          >
            Get Started Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Intro;
