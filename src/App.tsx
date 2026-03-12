import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="font-display text-2xl font-semibold tracking-wider text-gold">PablinaBeauty</div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300 tracking-wide">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-gold transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="https://api.whatsapp.com/send/?phone=5569992728415" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden sm:block px-6 py-2.5 bg-linear-to-r from-gold to-gold-light text-dark font-semibold text-sm rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Agendar
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gold p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full glass transition-all duration-500 overflow-hidden ${
        isMenuOpen ? 'max-h-64 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
      }`}>
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-300 hover:text-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://api.whatsapp.com/send/?phone=5569992728415" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-2 bg-gold text-dark font-bold rounded-full"
          >
            Agendar Agora
          </a>
        </nav>
      </div>
    </header>
  );
};

const ServiceCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="glass p-8 rounded-3xl hover:border-gold/30 transition-all duration-500 gs-reveal group">
    <h3 className="font-display text-2xl text-gold mb-3 group-hover:translate-x-1 transition-transform">{title}</h3>
    <p className="text-gray-400 text-sm font-light mb-6 leading-relaxed">{desc}</p>
    <a 
      href="https://api.whatsapp.com/send/?phone=5569992728415" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-pink-soft font-semibold hover:text-gold transition-colors flex items-center gap-2 group/btn"
    >
      Agendar <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
    </a>
  </div>
);

const TestimonialCard = ({ name, text }: { name: string; text: string; key?: React.Key }) => (
  <div className="min-w-[300px] md:min-w-[400px] glass p-8 rounded-3xl snap-center gs-reveal">
    <div className="text-gold mb-4 flex gap-1">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-gray-300 font-light mb-6">"{text}"</p>
    <p className="font-semibold text-pink-soft">- {name}</p>
  </div>
);

// --- Main App ---

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Text Animation
    gsap.from(".hero-text", { 
      y: 50, 
      opacity: 0, 
      duration: 1.2, 
      stagger: 0.2, 
      ease: "power4.out", 
      delay: 0.5 
    });

    // Hero Parallax
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 15,
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
    const reveals = gsap.utils.toArray<HTMLElement>('.gs-reveal');
    reveals.forEach(elem => {
      gsap.from(elem, {
        scrollTrigger: { 
          trigger: elem, 
          start: "top 90%",
          toggleActions: "play none none none"
        },
        y: 40, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out"
      });
    });

    // Testimonial Auto-slide
    const scrollNext = () => {
      const carousel = testimonialCarouselRef.current;
      if (!carousel) return;
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
      }
    };
    const interval = setInterval(scrollNext, 6000);
    return () => clearInterval(interval);
  }, { scope: containerRef });

  const handleCarouselScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'next' | 'prev') => {
    const carousel = ref.current;
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

  return (
    <div ref={containerRef} className="font-sans antialiased selection:bg-gold selection:text-dark">
      <Navbar />

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            ref={heroBgRef}
            src="https://lh3.googleusercontent.com/d/1xGwnuNdhBCaeCXIjqrHa9-mdWz_i_Fre" 
            alt="Beauty" 
            className="w-full h-[120%] object-cover opacity-40 -top-[10%] relative" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/60 to-dark"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-12">
          <p className="hero-text text-pink-soft tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-6">Especialista em Cílios & Sobrancelhas</p>
          <h1 className="hero-text font-display text-5xl md:text-7xl lg:text-9xl font-medium leading-[1] tracking-tight text-white max-w-5xl mb-8">
            Realce sua <br/><span className="text-gradient italic">Beleza Natural</span>
          </h1>
          <p className="hero-text text-gray-400 text-lg md:text-2xl max-w-2xl font-light mb-12">
            Há mais de 7 anos transformando olhares com excelência e paixão em Ji-Paraná.
          </p>
          <div className="hero-text flex flex-col sm:flex-row gap-4">
            <a href="https://api.whatsapp.com/send/?phone=5569992728415" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-gold text-dark font-bold rounded-full hover:bg-gold-light transition-all duration-300">Agendar Agora</a>
            <a href="#portfolio" className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all duration-300">Ver Portfólio</a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl gs-reveal">
            <img 
              src="https://lh3.googleusercontent.com/d/1LbCjYPKdRYiH597SAX-62SaWrg-WaLq7" 
              alt="Pablina" 
              className="w-full h-full object-cover object-top" 
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-10 left-10">
              <h3 className="font-display text-4xl text-gold mb-1">Pablina</h3>
              <p className="text-pink-soft tracking-widest uppercase text-sm font-bold">Master Lash Designer</p>
            </div>
          </div>
          <div className="gs-reveal">
            <h2 className="font-display text-4xl md:text-6xl mb-8 leading-tight">A Arte de <br/><span className="italic text-gold">Transformar Olhares</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
              Com anos de experiência e paixão pela estética, criei um espaço onde cada detalhe é pensado para o seu bem-estar. Minha missão é elevar sua autoestima através de técnicas avançadas e um olhar clínico para a harmonia facial.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border-l-2 border-gold/30 pl-6 py-2">
                <h4 className="text-xl font-display text-white mb-3">Materiais Premium</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Produtos de altíssima qualidade para durabilidade e segurança total dos seus olhos.</p>
              </div>
              <div className="border-l-2 border-gold/30 pl-6 py-2">
                <h4 className="text-xl font-display text-white mb-3">Design Exclusivo</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Cada procedimento é único, respeitando seus traços e realçando sua personalidade.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-32 bg-darker">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 gs-reveal">
            <h2 className="font-display text-4xl md:text-6xl mb-6">Nossos <span className="italic text-gold">Serviços</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">Técnicas exclusivas desenvolvidas para proporcionar o olhar dos seus sonhos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard title="Clássico" desc="Fio a fio perfeito para quem busca naturalidade e elegância discreta no dia a dia." />
            <ServiceCard title="Vol. Brasileiro" desc="Fios em formato Y que proporcionam um volume texturizado e marcante." />
            <ServiceCard title="Vol. Russo" desc="Máximo glamour com fans artesanais para um olhar denso, escuro e poderoso." />
            <ServiceCard title="Manutenção" desc="Cuidado essencial para manter seus cílios sempre impecáveis e saudáveis." />
          </div>
        </div>
      </section>

      {/* Passo a Passo */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 gs-reveal">
          <h2 className="font-display text-4xl md:text-6xl mb-6">A Experiência <span className="italic text-gold">Pablina</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">Como transformamos o seu olhar em 4 passos fundamentais.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 -translate-y-1/2 z-0"></div>
          {[
            { step: 1, title: "Avaliação", desc: "Análise detalhada do seu formato de olho e saúde dos fios naturais." },
            { step: 2, title: "Lash Mapping", desc: "Mapeamento personalizado para garantir a harmonia perfeita com seu rosto." },
            { step: 3, title: "Aplicação", desc: "Procedimento relaxante realizado com precisão e materiais de luxo." },
            { step: 4, title: "Finalização", desc: "Orientações completas de cuidados para garantir a máxima durabilidade." }
          ].map((item, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center gs-reveal">
              <div className="w-20 h-20 rounded-full bg-darker border border-gold/30 flex items-center justify-center text-gold text-2xl font-display mb-6 shadow-[0_0_30px_rgba(212,175,55,0.1)]">{item.step}</div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="py-32 bg-darker overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 gs-reveal">
            <div className="text-left">
              <h2 className="font-display text-4xl md:text-6xl mb-4">Nossa <span className="italic text-gold">Galeria</span></h2>
              <p className="text-gray-400 text-lg">Resultados reais de clientes apaixonadas.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => handleCarouselScroll(galleryCarouselRef, 'prev')}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => handleCarouselScroll(galleryCarouselRef, 'next')}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
                aria-label="Próximo"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          <div ref={galleryCarouselRef} className="flex overflow-x-auto hide-scroll snap-x snap-mandatory scroll-smooth -mx-4">
            {[
              "1MV6wwNCfOyIMZHaIdOTGma-HL8ye-XWO",
              "18qXnHPD8qzsL16ZXmSMS5oHOxFkGohLU",
              "1ATr-gZBsNzQrZoJ3sWyXnvOuTqy__qw8",
              "1Z_7lMIB1fWQXdLKksNcD78n2qDjg51-T",
              "1GgW-MTFcPpa0-hCHIPtFBQ0QJQp9vLLd",
              "1thZJUy1HdTuB0V6CGULQI_5WibG0K51q"
            ].map((id, i) => (
              <div key={i} className="min-w-[80%] md:min-w-[33.333%] px-4 snap-start gs-reveal">
                <div className="aspect-square rounded-[2rem] overflow-hidden group relative">
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${id}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={`Trabalho ${i + 1}`} 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden relative">
        <div className="text-center mb-20 gs-reveal">
          <h2 className="font-display text-4xl md:text-6xl mb-6">O que <span className="italic text-gold">Dizem</span></h2>
          <p className="text-gray-400 text-lg">A satisfação das nossas clientes é o nosso maior orgulho.</p>
        </div>
        
        <div className="relative">
          <div ref={testimonialCarouselRef} className="flex gap-8 overflow-x-auto hide-scroll snap-x snap-mandatory pb-12 scroll-smooth">
            {[
              { name: "Juliana M.", text: "Trabalho impecável! O volume brasileiro ficou natural, super atenciosa." },
              { name: "Camila R.", text: "Ambiente maravilhoso, me senti uma rainha. Os cílios clássicos realçaram meu olhar sem exageros." },
              { name: "Amanda T.", text: "A melhor da cidade! O volume russo é perfeito, super leve e não incomoda. Recomendo muito!" },
              { name: "Beatriz S.", text: "Fiz o design de sobrancelhas e amei o resultado. Ficou muito harmônico com meu rosto." },
              { name: "Fernanda L.", text: "Atendimento nota 10. Os cílios duram muito e a técnica é super cuidadosa." },
              { name: "Larissa K.", text: "Lugar lindo e profissionalismo incrível. Saí me sentindo maravilhosa!" },
              { name: "Patrícia G.", text: "Sempre faço a manutenção aqui e não troco por nada. Qualidade impecável." }
            ].map((t, i) => (
              <TestimonialCard key={i} name={t.name} text={t.text} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => handleCarouselScroll(testimonialCarouselRef, 'prev')}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => handleCarouselScroll(testimonialCarouselRef, 'next')}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-darker">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 gs-reveal">
            <h2 className="font-display text-4xl md:text-6xl mb-6">Dúvidas <span className="italic text-gold">Frequentes</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-6 gs-reveal">
            {[
              { q: "Quanto tempo dura a extensão?", a: "A durabilidade média é de 20 a 30 dias, dependendo dos cuidados em casa e do ciclo natural de crescimento dos seus cílios. Recomendamos manutenção a cada 15-20 dias para manter o volume sempre impecável." },
              { q: "O procedimento dói?", a: "Não, o procedimento é totalmente indolor e relaxante. O ambiente é preparado com música suave e poltronas confortáveis, permitindo que você descanse enquanto cuidamos do seu olhar." },
              { q: "Posso usar rímel com a extensão?", a: "Não recomendamos o uso de rímel, pois ele pode acumular na base dos fios, prejudicar a retenção da cola e dificultar a higienização correta, o que pode causar irritações." },
              { q: "Como devo lavar meus cílios?", a: "A higienização deve ser feita diariamente com shampoo neutro (tipo infantil) diluído em água, usando movimentos suaves. Isso garante a saúde dos seus olhos e a durabilidade da extensão." }
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-3xl hover:border-gold/20 transition-colors">
                <h4 className="text-xl font-bold text-white mb-4">{item.q}</h4>
                <p className="text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="font-display text-4xl font-semibold tracking-wider text-gold mb-6">PablinaBeauty</div>
            <p className="text-gray-400 text-lg max-w-sm mb-8 leading-relaxed">Elevando a sua autoestima com técnicas exclusivas e um atendimento personalizado em Ji-Paraná.</p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/pablinabeauty/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-500 group" aria-label="Instagram">
                <Instagram size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/pablinabeauty/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-500 group" aria-label="Facebook">
                <Facebook size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5569992728415" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-500 group" aria-label="WhatsApp">
                <Phone size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
              <MapPin size={22} className="text-gold" />
              Onde Estamos
            </h4>
            <ul className="space-y-3 text-gray-400 text-lg font-light">
              <li>Rua Maracatiara, 1620</li>
              <li>Nova Brasilia</li>
              <li>Ji-Paraná - RO</li>
              <li>76908-602</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-gray-400 text-lg font-light">
              <li><a href="#sobre" className="hover:text-gold transition-colors">Nossa História</a></li>
              <li><a href="#servicos" className="hover:text-gold transition-colors">Serviços</a></li>
              <li><a href="#portfolio" className="hover:text-gold transition-colors">Portfólio</a></li>
              <li><a href="https://api.whatsapp.com/send/?phone=5569992728415" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Agendamento</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 text-center text-gray-600">
          <p>&copy; 2026 Pablina Beauty. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://api.whatsapp.com/send/?phone=5569992728415" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 group" 
        aria-label="WhatsApp"
      >
        <Phone size={32} className="text-white" />
        <span className="absolute right-full mr-6 bg-white text-dark px-5 py-2.5 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-2xl">Fale Conosco</span>
      </a>
    </div>
  );
}
