import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

const slides: CarouselSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjM3MTgxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Collaborate Seamlessly',
    description: 'Work together with your team in real-time, no matter where you are'
  },
  {
    image: 'https://images.unsplash.com/photo-1758691737138-7b9b1884b1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjBzdWNjZXNzJTIwcGVvcGxlfGVufDF8fHx8MTc2MzcyNjU1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Achieve Your Goals',
    description: 'Track progress and celebrate success with powerful insights'
  },
  {
    image: 'https://images.unsplash.com/photo-1761818645908-25523b8df309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjM3MjA4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Stay Organized',
    description: 'Keep everything in one place and never lose track of important tasks'
  }
];

export function SignUpCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Carousel Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: currentSlide === index ? 1 : 0 }}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end p-12 text-white">
        <div className="max-w-lg">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="transition-all duration-500 ease-in-out"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                position: currentSlide === index ? 'relative' : 'absolute'
              }}
            >
              <h2 className="mb-4">{slide.title}</h2>
              <p className="text-white/90">
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mt-12">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
