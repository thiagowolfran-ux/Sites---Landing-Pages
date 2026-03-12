import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  MapPin, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  Star,
  Clock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    // Reveal Elements on Scroll
    gsap.utils.toArray('.gs-reveal').forEach((elem: any) => {
      gsap.from(elem, {
        scrollTrigger: { 
          trigger: elem, 
          start: "top 85%" 
        },
        y: 30, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out"
      });
    });

    // Specific Title Animation
    gsap.utils.toArray('h2.font-display').forEach((title: any) => {
      gsap.from(title, {
        scrollTrigger: { 
          trigger: title, 
          start: "top 90%" 
        },
        x: -20, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power2.out"
      });
    });
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollTestimonial = (direction: 'next' | 'prev') => {
    if (!testimonialCarouselRef.current) return;
    const scrollAmount = 400;
    if (direction === 'next') {
      if (testimonialCarouselRef.current.scrollLeft + testimonialCarouselRef.current.offsetWidth >= testimonialCarouselRef.current.scrollWidth - 10) {
        testimonialCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        testimonialCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (testimonialCarouselRef.current.scrollLeft <= 0) {
        testimonialCarouselRef.current.scrollTo({ left: testimonialCarouselRef.current.scrollWidth, behavior: 'smooth' });
      } else {
        testimonialCarouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollGallery = (direction: 'next' | 'prev') => {
    if (!galleryCarouselRef.current) return;
    const scrollAmount = galleryCarouselRef.current.offsetWidth;
    let targetScroll = galleryCarouselRef.current.scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount);
    
    if (targetScroll >= galleryCarouselRef.current.scrollWidth - 10 && direction === 'next') {
      targetScroll = 0;
    } else if (targetScroll < 0 && direction === 'prev') {
      targetScroll = galleryCarouselRef.current.scrollWidth - galleryCarouselRef.current.offsetWidth;
    }

    gsap.to(galleryCarouselRef.current, {
      scrollLeft: targetScroll,
      duration: 0.8,
      ease: "power3.inOut"
    });

    gsap.fromTo(galleryCarouselRef.current.querySelectorAll('img'), 
      { scale: 0.95, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.05 }
    );
  };

  return (
    <div className="font-sans antialiased">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass bg-dark/90 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="font-display text-2xl font-semibold tracking-wider text-gold">PablinaBeauty</div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300 tracking-wide">
            <a href="#sobre" className="hover:text-gold transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-gold transition-colors">Serviços</a>
            <a href="#portfolio" className="hover:text-gold transition-colors">Portfólio</a>
            <a href="#faq" className="hover:text-gold transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://api.whatsapp.com/send/?phone=5569992728415" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-gold to-gold-light text-dark font-semibold text-sm rounded-full hover:scale-105 hover-glow transition-all duration-300"
            >
              Agendar
            </a>
            
            <button 
              onClick={toggleMenu}
              className="md:hidden text-gray-300 hover:text-gold focus:outline-none p-2"
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl font-medium text-gray-300 transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-gray-300 hover:text-gold p-2"
        >
          <X size={40} />
        </button>
        <a href="#sobre" onClick={toggleMenu} className="hover:text-gold transition-colors">Sobre</a>
        <a href="#servicos" onClick={toggleMenu} className="hover:text-gold transition-colors">Serviços</a>
        <a href="#portfolio" onClick={toggleMenu} className="hover:text-gold transition-colors">Portfólio</a>
        <a href="#faq" onClick={toggleMenu} className="hover:text-gold transition-colors">FAQ</a>
        <a 
          href="https://api.whatsapp.com/send/?phone=5569992728415" 
          className="mt-4 px-8 py-3 bg-gradient-to-r from-gold to-gold-light text-dark rounded-full font-semibold text-lg"
        >
          Agendar Agora
        </a>
      </div>

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
              { title: 'Clássico', desc: 'Fio a fio perfeito para quem busca naturalidade e elegância discreta no dia a dia.' },
              { title: 'Vol. Brasileiro', desc: 'Fios em formato Y que proporcionam um volume texturizado e marcante.' },
              { title: 'Vol. Russo', desc: 'Máximo glamour com fans artesanais para um olhar denso, escuro e poderoso.' },
              { title: 'Design de Sobrancelhas', desc: 'Harmonização facial através do design estratégico e aplicação de henna.' }
            ].map((serv, i) => (
              <div key={i} className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 gs-reveal">
                <h3 className="font-display text-2xl text-gold mb-3">{serv.title}</h3>
                <p className="text-gray-400 text-sm font-light mb-6">{serv.desc}</p>
                <a 
                  href="https://api.whatsapp.com/send/?phone=5569992728415" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-pink-soft font-semibold hover:text-gold transition-colors flex items-center gap-2"
                >
                  Agendar <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="gs-reveal">
            <h2 className="font-display text-4xl md:text-5xl mb-4">Galeria de <span className="italic text-gold">Resultados</span></h2>
            <p className="text-gray-400">Transformações reais de nossas clientes.</p>
          </div>
          <div className="flex gap-4 gs-reveal">
            <button 
              onClick={() => scrollGallery('prev')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-dark transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scrollGallery('next')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-dark transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div 
          ref={galleryCarouselRef}
          className="flex gap-6 overflow-x-auto hide-scroll px-6 snap-x snap-mandatory"
        >
          {[
            'https://lh3.googleusercontent.com/d/1_wT3x9O-p_L_L_L_L_L_L_L_L_L_L_L',
            'https://lh3.googleusercontent.com/d/1_wT3x9O-p_L_L_L_L_L_L_L_L_L_L_L',
            'https://lh3.googleusercontent.com/d/1_wT3x9O-p_L_L_L_L_L_L_L_L_L_L_L',
            'https://lh3.googleusercontent.com/d/1_wT3x9O-p_L_L_L_L_L_L_L_L_L_L_L'
          ].map((img, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-square rounded-3xl overflow-hidden snap-center">
              <img src={img} alt={`Trabalho ${i+1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ))}
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
              { q: 'Quanto tempo dura a extensão?', a: 'A durabilidade média é de 20 a 30 dias, dependendo dos cuidados em casa e do ciclo natural de crescimento dos seus cílios.' },
              { q: 'O procedimento dói?', a: 'Não, o procedimento é totalmente indolor e relaxante. Muitas clientes até dormem durante a aplicação.' },
              { q: 'Posso usar rímel com a extensão?', a: 'Não recomendamos o uso de rímel, pois ele pode acumular na base dos fios e prejudicar a retenção.' }
            ].map((faq, i) => (
              <div key={i} className="glass p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-white mb-2">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
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
            <ul className="space-y-2 text-gray-400 text-sm mb-6">
              <li>Rua Maracatiara, 1620 - Nova Brasilia</li>
              <li>Ji-Paraná - RO, 76908-602</li>
            </ul>
            <div className="rounded-xl overflow-hidden glass h-48 w-full gs-reveal">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.223838448839!2d-61.942442!3d-10.871889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93cb419614964193%3A0x6296419314964193!2sR.%20Maracatiara%2C%201620%20-%20Nova%20Brasilia%2C%20Ji-Paran%C3%A1%20-%20RO%2C%2076908-602!5e0!3m2!1spt-BR!2sbr!4v1710175833000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://api.whatsapp.com/send/?phone=5569992728415" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300 group">
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/pablinabeauty/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300 group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/pablinabeauty/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300 group">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Pablina Beauty. Todos os direitos reservados.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://api.whatsapp.com/send/?phone=5569992728415" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group animate-pulse-gold"
      >
        <MessageCircle size={30} className="text-white" />
        <span className="absolute right-full mr-4 bg-white text-dark px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Fale Conosco
        </span>
      </a>
    </div>
  );
}
