import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const headerRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animation
    gsap.from(".hero-text", { 
      y: 50, 
      opacity: 0, 
      duration: 1, 
      stagger: 0.2, 
      ease: "power3.out", 
      delay: 0.2 
    });

    // Hero Parallax
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Header Scroll Effect
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 50) {
          headerRef.current.classList.add('bg-dark/90');
          headerRef.current.classList.remove('bg-transparent');
        } else {
          headerRef.current.classList.remove('bg-dark/90');
          headerRef.current.classList.add('bg-transparent');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Reveal Elements on Scroll
    gsap.utils.toArray<HTMLElement>('.gs-reveal').forEach(elem => {
      gsap.from(elem, {
        scrollTrigger: { trigger: elem, start: "top 85%" },
        y: 30, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power3.out"
      });
    });

    // Testimonial Auto-slide
    let autoSlideInterval: number;
    if (testimonialCarouselRef.current) {
      const scrollNext = () => {
        const carousel = testimonialCarouselRef.current;
        if (!carousel) return;
        if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
        }
      };
      autoSlideInterval = window.setInterval(scrollNext, 5000);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    };
  }, []);

  const handleTestimonialScroll = (direction: 'next' | 'prev') => {
    const carousel = testimonialCarouselRef.current;
    if (!carousel) return;
    const scrollAmount = carousel.offsetWidth;
    if (direction === 'next') {
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (carousel.scrollLeft <= 0) {
        carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleGalleryScroll = (direction: 'next' | 'prev') => {
    const carousel = galleryCarouselRef.current;
    if (!carousel) return;
    
    const scrollAmount = carousel.offsetWidth;
    let targetScroll = carousel.scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount);
    
    // Loop logic
    if (targetScroll >= carousel.scrollWidth - 10 && direction === 'next') {
      targetScroll = 0;
    } else if (targetScroll < 0 && direction === 'prev') {
      targetScroll = carousel.scrollWidth - carousel.offsetWidth;
    }

    // Animate Scroll
    gsap.to(carousel, {
      scrollLeft: targetScroll,
      duration: 0.8,
      ease: "power3.inOut"
    });

    // Subtle image animation during transition
    gsap.fromTo(carousel.querySelectorAll('img'), 
      { scale: 0.95, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.05 }
    );
  };

  return (
    <div className="font-sans antialiased selection:bg-gold selection:text-dark">
      {/* Header */}
      <header ref={headerRef} className="fixed top-0 w-full z-50 glass transition-all duration-300" id="header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display text-2xl font-semibold tracking-wider text-gold">PablinaBeauty</div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300 tracking-wide">
            <a href="#sobre" className="hover:text-pink-soft transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-pink-soft transition-colors">Serviços</a>
            <a href="#portfolio" className="hover:text-pink-soft transition-colors">Portfólio</a>
            <a href="#faq" className="hover:text-pink-soft transition-colors">FAQ</a>
          </nav>
          <a href="https://api.whatsapp.com/send/?phone=5569992728415" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-linear-to-r from-gold to-gold-light text-dark font-semibold text-sm rounded-full hover:scale-105 transition-transform">Agendar</a>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            ref={heroBgRef}
            src="https://lh3.googleusercontent.com/d/1xGwnuNdhBCaeCXIjqrHa9-mdWz_i_Fre" 
            alt="Beauty" 
            className="w-full h-[120%] object-cover opacity-50 -top-[10%] relative" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/60 to-dark"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-12">
          <p className="hero-text text-pink-soft tracking-[0.2em] text-xs md:text-sm font-semibold uppercase mb-4">Especialista em Cílios & Sobrancelhas</p>
          <h1 className="hero-text font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight text-white max-w-4xl mb-6">
            Desperte seu <br/><span className="text-gradient italic">Lado Único</span>
          </h1>
          <p className="hero-text text-gray-400 text-lg md:text-xl max-w-2xl font-light mb-10">
            Há mais de 7 anos transformando olhares em Ji-Paraná
          </p>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] gs-reveal">
            <img 
              src="https://lh3.googleusercontent.com/d/1LbCjYPKdRYiH597SAX-62SaWrg-WaLq7" 
              alt="Pablina" 
              className="w-full h-full object-cover object-top" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="font-display text-3xl text-gold mb-1">Pablina</h3>
              <p className="text-pink-soft">Master Lash Designer</p>
            </div>
          </div>
          <div className="gs-reveal">
            <h2 className="font-display text-4xl md:text-5xl mb-6">A Arte do <span className="italic text-gold">Olhar</span></h2>
            <p className="text-gray-400 font-light leading-relaxed mb-8">
              Com anos de experiência e paixão pela estética, criei um espaço onde cada detalhe é pensado para o seu bem-estar. Minha missão é elevar sua autoestima através de técnicas avançadas e um olhar clínico para a harmonia facial.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-gold pl-4">
                <h4 className="text-xl font-display text-white mb-2">Materiais Premium</h4>
                <p className="text-sm text-gray-500">Produtos de altíssima qualidade para durabilidade e segurança.</p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <h4 className="text-xl font-display text-white mb-2">Design Personalizado</h4>
                <p className="text-sm text-gray-500">Cada procedimento é único, respeitando seus traços.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 bg-darker">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 gs-reveal">
            <h2 className="font-display text-4xl md:text-5xl mb-4">Menu de <span className="italic text-gold">Serviços</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Técnicas exclusivas para um olhar marcante.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Clássico", desc: "Fio a fio perfeito para quem busca naturalidade e elegância discreta no dia a dia." },
              { title: "Vol. Brasileiro", desc: "Fios em formato Y que proporcionam um volume texturizado e marcante." },
              { title: "Vol. Russo", desc: "Máximo glamour com fans artesanais para um olhar denso, escuro e poderoso." },
              { title: "Manutenção", desc: "Cuidado essencial para manter seus cílios sempre impecáveis e saudáveis." }
            ].map((service, i) => (
              <div key={i} className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 gs-reveal">
                <h3 className="font-display text-2xl text-gold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm font-light mb-6">{service.desc}</p>
                <a href="https://api.whatsapp.com/send/?phone=5569992728415" target="_blank" rel="noopener noreferrer" className="text-pink-soft font-semibold hover:text-gold transition-colors flex items-center gap-2">
                  Agendar <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passo a Passo */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 gs-reveal">
          <h2 className="font-display text-4xl md:text-5xl mb-4">A Experiência <span className="italic text-gold">Pablina</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">Como transformamos o seu olhar em 4 passos.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-gold/10 via-gold/50 to-gold/10 -translate-y-1/2 z-0"></div>
          {[
            { step: 1, title: "Avaliação", desc: "Análise do seu formato de olho e saúde dos fios naturais." },
            { step: 2, title: "Design", desc: "Mapeamento personalizado (Lash Mapping) para o seu rosto." },
            { step: 3, title: "Aplicação", desc: "Procedimento relaxante com materiais de luxo e precisão." },
            { step: 4, title: "Finalização", desc: "Orientações de cuidados para máxima durabilidade." }
          ].map((item, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center gs-reveal">
              <div className="w-16 h-16 rounded-full bg-darker border-2 border-gold flex items-center justify-center text-gold text-xl font-display mb-4">{item.step}</div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="py-24 bg-darker">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 gs-reveal">
            <h2 className="font-display text-4xl md:text-5xl mb-4">Nossa <span className="italic text-gold">Galeria</span></h2>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="px-6 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-dark transition-colors">Todos</button>
              <button className="px-6 py-2 rounded-full border border-white/20 text-gray-400 hover:border-gold hover:text-gold transition-colors">Clássico</button>
              <button className="px-6 py-2 rounded-full border border-white/20 text-gray-400 hover:border-gold hover:text-gold transition-colors">Volume</button>
            </div>
          </div>
          <div className="relative group">
            <div ref={galleryCarouselRef} className="flex overflow-x-auto hide-scroll snap-x snap-mandatory scroll-smooth -mx-2">
              {[
                "1MV6wwNCfOyIMZHaIdOTGma-HL8ye-XWO",
                "18qXnHPD8qzsL16ZXmSMS5oHOxFkGohLU",
                "1ATr-gZBsNzQrZoJ3sWyXnvOuTqy__qw8",
                "1Z_7lMIB1fWQXdLKksNcD78n2qDjg51-T",
                "1GgW-MTFcPpa0-hCHIPtFBQ0QJQp9vLLd",
                "1thZJUy1HdTuB0V6CGULQI_5WibG0K51q"
              ].map((id, i) => (
                <div key={i} className="min-w-[50%] md:min-w-[25%] px-2 snap-start gs-reveal group">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img 
                      src={`https://lh3.googleusercontent.com/d/${id}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={`Portfolio ${i + 1}`} 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Navigation Arrows */}
            <button 
              onClick={() => handleGalleryScroll('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-opacity z-10 -ml-4 md:ml-4" 
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => handleGalleryScroll('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-opacity z-10 -mr-4 md:mr-4" 
              aria-label="Próximo"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden relative">
        <div className="text-center mb-16 gs-reveal">
          <h2 className="font-display text-4xl md:text-5xl mb-4">O que <span className="italic text-gold">Dizem</span></h2>
        </div>
        
        <div className="relative group">
          <div ref={testimonialCarouselRef} className="flex gap-6 overflow-x-auto hide-scroll snap-x snap-mandatory pb-8 scroll-smooth">
            {[
              { name: "Juliana M.", text: "Trabalho impecável! O volume brasileiro ficou natural, super atenciosa." },
              { name: "Camila R.", text: "Ambiente maravilhoso, me senti uma rainha. Os cílios clássicos realçaram meu olhar sem exageros." },
              { name: "Amanda T.", text: "A melhor da cidade! O volume russo é perfeito, super leve e não incomoda. Recomendo muito!" },
              { name: "Beatriz S.", text: "Fiz o design de sobrancelhas e amei o resultado. Ficou muito harmônico com meu rosto." },
              { name: "Fernanda L.", text: "Atendimento nota 10. Os cílios duram muito e a técnica é super cuidadosa." },
              { name: "Larissa K.", text: "Lugar lindo e profissionalismo incrível. Saí me sentindo maravilhosa!" },
              { name: "Patrícia G.", text: "Sempre faço a manutenção aqui e não troco por nada. Qualidade impecável." }
            ].map((t, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] glass p-8 rounded-3xl snap-center gs-reveal">
                <div className="text-gold mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 font-light mb-6">"{t.text}"</p>
                <p className="font-semibold text-pink-soft">- {t.name}</p>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => handleTestimonialScroll('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-opacity z-10 -ml-4 md:ml-0" 
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => handleTestimonialScroll('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-opacity z-10 -mr-4 md:mr-0" 
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-darker">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 gs-reveal">
            <h2 className="font-display text-4xl md:text-5xl mb-4">Dúvidas <span className="italic text-gold">Frequentes</span></h2>
          </div>
          <div className="space-y-4 gs-reveal">
            {[
              { q: "Quanto tempo dura a extensão?", a: "A durabilidade média é de 20 a 30 dias, dependendo dos cuidados em casa e do ciclo natural de crescimento dos seus cílios. Recomendamos manutenção a cada 15-20 dias." },
              { q: "O procedimento dói?", a: "Não, o procedimento é totalmente indolor e relaxante. Muitas clientes até dormem durante a aplicação." },
              { q: "Posso usar rímel com a extensão?", a: "Não recomendamos o uso de rímel, pois ele pode acumular na base dos fios, prejudicar a retenção e dificultar a higienização." }
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-white mb-2">{item.q}</h4>
                <p className="text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="font-display text-3xl font-semibold tracking-wider text-gold mb-4">PablinaBeauty</div>
            <p className="text-gray-400 text-sm max-w-sm mb-6">Elevando a sua autoestima com técnicas exclusivas de extensão de cílios e design de sobrancelhas em um ambiente personalizado.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-gold" />
              Localização
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Rua Maracatiara, 1620 - Nova Brasilia</li>
              <li>Ji-Paraná - RO, 76908-602</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://api.whatsapp.com/send/?phone=5569992728415" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300 group" aria-label="WhatsApp">
                <Phone size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/pablinabeauty/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300 group" aria-label="Instagram">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/pablinabeauty/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300 group" aria-label="Facebook">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
          &copy; 2026 Pablina Beauty. Todos os direitos reservados.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://api.whatsapp.com/send/?phone=5569992728415" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group" aria-label="WhatsApp">
        <Phone size={30} className="text-white" />
        <span className="absolute right-full mr-4 bg-white text-dark px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">Fale Conosco</span>
      </a>
    </div>
  );
}
