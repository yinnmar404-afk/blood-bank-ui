document.addEventListener('DOMContentLoaded', function () {
  const emblaNode = document.querySelector('#embla-carousel');
  if (emblaNode && typeof EmblaCarousel !== 'undefined' && typeof EmblaCarouselAutoplay !== 'undefined') {
    // Initialize the autoplay plugin
    const autoplay = EmblaCarouselAutoplay({
      delay: 1000, // Slower rotation speed (4 seconds)
      stopOnInteraction: false, // Carousel will resume playing after interaction
      stopOnMouseEnter: true, // Pause when the user hovers over the carousel
    });

    const options = { 
      loop: true,
      align: 'start',
      dragFree: true,
      containScroll: 'trimSnaps'
    };
    
    // Initialize Embla Carousel with the autoplay plugin
    const emblaApi = EmblaCarousel(emblaNode, options, [autoplay]);
  }
});