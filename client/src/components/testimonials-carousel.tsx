import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <Card className="relative black-card-red-border">
      <CardContent className="p-8">
        <div className="text-center">
          <img
            src={currentTestimonial.avatar}
            alt={currentTestimonial.name}
            className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-red-500 red-glow"
          />
          <blockquote className="text-gray-300 italic mb-6 text-lg leading-relaxed">
            "{currentTestimonial.message}"
          </blockquote>
          <div className="font-bold text-white text-lg">{currentTestimonial.name}</div>
          <div className="text-red-400 font-medium">{currentTestimonial.role}</div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-black border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-lg red-glow"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-black border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-lg red-glow"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-3 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-red-500 red-glow"
                  : "bg-gray-600 hover:bg-red-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
