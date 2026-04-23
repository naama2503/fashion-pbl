/*
 * Fashion PBL – Home Landing Page
 * Design: Warm beige/tan with bold black text, minimalist style
 * Based on the provided design reference
 */
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-amber-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-orange-300 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 blur-3xl" />

        <div className="container relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-tight">
              HOW CAN FASHION CREATE
              <br />
              <span className="text-orange-600">SOCIAL CHANGE?</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 font-light max-w-2xl mx-auto">
              Fashion can change the world! (אופנה יכולה לשנות את העולם!)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => setLocation("/project")}
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg font-bold flex items-center gap-2"
            >
              Start Your Project
              <ArrowRight size={20} />
            </Button>
            <Button
              onClick={() => setLocation("/admin")}
              variant="outline"
              size="lg"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
            >
              Teacher Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-16 border-t-4 border-gray-900">
        <div className="container space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">Your PBL Journey</h2>
            <p className="text-lg text-gray-600">
              Work in groups to create fashion items that send a message for social change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "Group Decision (החלטה קבוצתית)",
                desc: "Choose a group to help and why",
              },
              {
                num: "2",
                title: "Research (מחקר)",
                desc: "Learn about their needs and challenges",
              },
              {
                num: "3",
                title: "Design (עיצוב)",
                desc: "Create a fashion item with a message",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-amber-50 border-2 border-gray-900 p-6 text-center space-y-3"
              >
                <div className="text-5xl font-black text-orange-600">{step.num}</div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-700">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
