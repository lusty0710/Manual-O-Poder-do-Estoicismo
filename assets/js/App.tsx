
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Minus,
  Facebook, 
  Instagram, 
  Music2 as Tiktok,
  Play,
  MoveRight,
  Gift,
  Lock,
  Star
} from 'lucide-react';

// --- Reusable Components ---

const CountdownTimer: React.FC<{ size?: 'normal' | 'large' }> = ({ size = 'normal' }) => {
  const [time, setTime] = useState({ hours: 3, minutes: 24, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  if (size === 'large') {
    return (
      <div className="flex gap-2 sm:gap-4 justify-center">
        {[
          { label: 'Horas', val: time.hours },
          { label: 'Minutos', val: time.minutes },
          { label: 'Segundos', val: time.seconds }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center bg-gradient-to-b from-[#ff5100] to-[#ff9e00] rounded-xl sm:rounded-2xl w-24 sm:w-28 py-3 sm:py-5 shadow-lg">
            <span className="text-white font-black text-3xl sm:text-5xl leading-none">{format(item.val)}</span>
            <span className="text-white font-serif font-bold text-[9px] sm:text-xs uppercase mt-1 sm:mt-2 opacity-90">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-4">
      <div className="flex flex-col items-center">
        <span className="bg-[#ff6b00] text-black font-bold text-base sm:text-lg px-2 py-0.5 rounded leading-tight">{format(time.hours)}</span>
        <span className="text-[8px] sm:text-[9px] uppercase font-bold text-white mt-0.5">horas</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="bg-[#ff6b00] text-black font-bold text-base sm:text-lg px-2 py-0.5 rounded leading-tight">{format(time.minutes)}</span>
        <span className="text-[8px] sm:text-[9px] uppercase font-bold text-white mt-0.5">min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="bg-[#ff6b00] text-black font-bold text-base sm:text-lg px-2 py-0.5 rounded leading-tight">{format(time.seconds)}</span>
        <span className="text-[8px] sm:text-[9px] uppercase font-bold text-white mt-0.5">seg</span>
      </div>
    </div>
  );
};

const CTAButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; href?: string }> = ({ children, className, onClick, href }) => {
  const styles = `bg-gradient-to-r from-[#ff4d00] to-[#ffc400] text-black font-black py-4 sm:py-6 px-8 sm:px-12 rounded-2xl hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,107,0,0.3)] active:scale-[0.98] active:translate-y-0.5 transition-all duration-300 ease-out uppercase tracking-tight text-lg sm:text-xl shadow-2xl flex items-center justify-center gap-3 cursor-pointer ${className}`;
  
  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
};

const ModuleCard: React.FC<{ number: string, title: string, items: string[] }> = ({ number, title, items }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden group transition-all hover:border-white/20">
    <div className="absolute top-2 right-4 text-white/5 text-6xl sm:text-7xl font-black">{number}</div>
    <h3 className="text-stoic-orange font-bold text-xl sm:text-2xl mb-4 sm:mb-6 relative z-10">{title}</h3>
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-gray-300 text-sm sm:text-base">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-4 sm:py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left hover:text-stoic-orange transition-colors group"
      >
        <span className="font-bold text-base sm:text-lg pr-4">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-stoic-orange flex-shrink-0" /> : <Plus className="w-5 h-5 text-stoic-orange flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="mt-4 animate-fade-in">
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Header: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => (
  <header className="fixed top-2 sm:top-6 left-0 right-0 z-50 px-4">
    <div className="max-w-7xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 py-3 px-4 sm:px-8 rounded-2xl flex items-center justify-between gap-4">
      <div className="flex items-center">
        <img src="https://iili.io/fciwNhx.webp" alt="Logo" className="h-6 sm:h-10 w-auto" />
      </div>
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="hidden sm:flex items-center gap-6">
           <CountdownTimer />
           <div className="text-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none">OFERTA</p>
             <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none">ACABANDO</p>
           </div>
        </div>
        <button onClick={onCTAClick} className="bg-stoic-orange text-white font-black px-4 sm:px-10 py-2.5 sm:py-3.5 rounded-xl uppercase text-[10px] sm:text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all whitespace-nowrap shadow-lg shadow-orange-500/20 active:scale-95">
          Quero meu acesso
        </button>
      </div>
    </div>
  </header>
);

const Hero: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section className="relative pt-24 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-8 flex items-center justify-center overflow-hidden min-h-[85vh]">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1549467727-9346e44ca8b6?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale brightness-[0.15]" alt="texture" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center gap-6 sm:gap-10 text-center">
        <div className="space-y-4 sm:space-y-6 w-full flex flex-col items-center">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1]">
            O Poder do <span className="text-stoic-orange">Estoicismo</span><br />
            Forje uma <span className="text-stoic-orange">Mente</span><br />
            Inabalável em <span className="text-stoic-orange">21 Dias!</span>
          </h1>
          <h2 className="text-gray-300 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed opacity-80">
            Disciplina, clareza e equilíbrio. Aprenda a aplicar o estoicismo na prática para viver com propósito e se tornar inabalável.
          </h2>
          <div className="relative group max-w-2xl mx-auto w-full" onClick={() => setIsPlaying(true)}>
            <div className="aspect-[16/10] bg-black/60 rounded-3xl border-2 border-stoic-orange/30 overflow-hidden relative glow-orange shadow-2xl flex flex-col items-center justify-center p-6 sm:p-10 cursor-pointer transition-all duration-300 hover:border-stoic-orange">
               {!isPlaying ? (
                 <>
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop')] opacity-20 mix-blend-overlay grayscale"></div>
                   <div className="relative z-10 text-center space-y-4">
                      <div className="flex items-center justify-center gap-2 mb-2"><div className="h-px w-8 bg-stoic-orange"></div><span className="text-stoic-orange font-bold text-sm sm:text-lg uppercase tracking-[0.3em]">DÊ O PLAY</span><div className="h-px w-8 bg-stoic-orange"></div></div>
                      <h3 className="text-white font-black text-3xl sm:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tighter">DESCUBRA O <br /><span className="text-stoic-orange">SEGREDO</span> <br />DOS ESTOICOS</h3>
                      <div className="mt-8 flex justify-center"><div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl"><Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white translate-x-1" /></div></div>
                   </div>
                 </>
               ) : (
                 <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/Lj4PBezIeUI?autoplay=1" title="Video" frameBorder="0" allowFullScreen></iframe>
               )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 pt-2 w-full">
            <CTAButton onClick={onCTAClick} className="w-full sm:!w-[450px]">QUERO MEU ACESSO <MoveRight /></CTAButton>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="avatar" /></div>
                  ))}
               </div>
               <div className="text-left"><p className="text-[10px] sm:text-xs text-gray-400 font-bold leading-tight">Mais de 3.000 pessoas já <br />adquiriram O Poder do Estoicismo</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IdealFor: React.FC = () => (
  <section className="py-12 sm:py-14 px-4 sm:px-8 bg-black">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
      <div className="flex-1 text-center lg:text-left">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Para quem é ideal<br /> <span className="text-stoic-orange text-4xl sm:text-6xl">O Poder do Estoicismo?</span></h2>
        <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">Este manual foi forjado para quem busca controle total sobre sua vida e suas emoções no mundo moderno.</p>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {[
          { icon: 'https://iili.io/fciKpON.webp', title: 'Desejam evoluir', desc: 'Ideal para quem quer aplicar princípios milenares de forma prática e conquistar resultados reais.' },
          { icon: 'https://iili.io/fciKpON.webp', title: 'Buscam sabedoria', desc: 'Perfeito para quem deseja clareza e equilíbrio emocional em meio ao caos do dia a dia.' }
        ].map((item, idx) => (
          <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-stoic-orange/30 transition-all hover:-translate-y-1">
            <img src={item.icon} alt="Icon" className="w-14 h-14 mb-6 brightness-125" />
            <h3 className="text-stoic-orange font-black text-xl mb-3 uppercase tracking-tight">{item.title}</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features: React.FC = () => (
  <section className="py-12 sm:py-14 px-4 sm:px-8">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
      <div className="flex-1 w-full order-2 lg:order-1"><div className="relative group"><img src="https://iili.io/fcP0s4f.webp" className="rounded-3xl shadow-2xl brightness-90 hover:brightness-100 transition-all duration-700 w-full" alt="Feature" /></div></div>
      <div className="flex-1 space-y-4 order-1 lg:order-2 text-center lg:text-left">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Entenda como funciona <span className="text-stoic-orange">O Poder do Estoicismo</span></h2>
        <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">O Poder do Estoicismo é um manual prático e transformador, com conteúdos 100% aplicáveis.</p>
      </div>
    </div>
  </section>
);

const ManualHighlights: React.FC = () => (
  <section className="py-12 sm:py-14 px-4 sm:px-8 bg-black relative overflow-hidden">
     <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-10 space-y-4">
        <div className="bg-[#0a0a0a] px-4 py-2 border border-white/10 rounded-full text-[10px] sm:text-[11px] uppercase font-black tracking-[0.2em] inline-flex items-center gap-2">★ MUITO MAIS FÁCIL DE APLICAR</div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto">Manual Estoico pronto para ser aplicado <span className="text-stoic-orange">uso imediato e 100% prático.</span></h2>
     </div>
     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {[
          { img: "https://iili.io/fcPWGkv.webp", title: "Sabedoria milenar.", text: "Princípios atemporais do estoicismo para uma vida moderna." },
          { img: "https://iili.io/fcPWXhN.webp", title: "Mente forte.", text: "O estoicismo não transforma apenas você, mas quem está ao seu redor." },
          { img: "https://iili.io/fcPWWIp.webp", title: "Disciplina visível.", text: "A verdadeira revolução começa dentro de você. Aja de forma inabalável." }
        ].map((card, idx) => (
          <div key={idx} className="group relative flex flex-col bg-[#0a0a0a] rounded-[2rem] overflow-hidden shadow-2xl transition-all hover:scale-[1.02]">
            <div className="aspect-[3/4] sm:aspect-[4/3] w-full overflow-hidden relative">
              <img src={card.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={card.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-6 sm:p-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white">{card.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed opacity-80">{card.text}</p>
            </div>
          </div>
        ))}
     </div>
  </section>
);

const Curriculum: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => (
  <section className="py-12 sm:py-14 px-4 sm:px-8 bg-black">
    <div className="max-w-5xl mx-auto mb-8 sm:mb-10 text-center">
       <div className="mb-8 flex justify-center"><CTAButton onClick={onCTAClick} className="w-full sm:max-w-lg">QUERO O MANUAL COMPLETO <MoveRight /></CTAButton></div>
       <div className="bg-[#0a0a0a] rounded-[2.5rem] p-8 sm:p-10 border border-white/5 space-y-6 shadow-2xl">
          <img src="https://iili.io/fciKpON.webp" alt="Seal" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto brightness-125" />
          <h2 className="font-serif text-3xl sm:text-4xl font-black leading-tight">Conteúdo Completo e Validado.</h2>
          <div className="flex flex-wrap justify-center gap-3">{['PROFUNDIDADE', 'CLAREZA', 'PRÁTICA'].map(t => (<span key={t} className="px-5 py-2 border border-white/20 rounded-full text-[10px] sm:text-xs font-black tracking-widest">{t}</span>))}</div>
       </div>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      <ModuleCard number="01" title="Arte do Estoicismo" items={['Introdução ao Estoicismo', 'Virtude como Sabedoria', 'Estoicismo no Dia a Dia']} />
      <ModuleCard number="02" title="Autocontrole" items={['Autocontrole Prático', 'Autodisciplina de Ferro', 'Fim do Medo']} />
      <ModuleCard number="03" title="Ansiedade" items={['Diminua a Ansiedade', 'Vença a Procrastinação', 'Força Interior']} />
      <ModuleCard number="04" title="Relações" items={['Amor e Sabedoria', 'Conflitos e Paz', 'Conteúdo Bônus']} />
    </div>
  </section>
);

const Bonuses: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => (
    <section className="pt-12 sm:pt-16 pb-0 px-4 sm:px-8 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-black text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-10"><Gift className="w-4 h-4" /> BÔNUS EXCLUSIVOS</div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8">E não para por aí... <span className="text-stoic-orange">BÔNUS GRATUITOS!</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {[
            { id: "01", title: 'ARSENAL DA LIBERTAÇÃO', price: "R$ 147,00", items: ['Libertação Estoica', '28 Lições Estoicas', '30 Dias de Hábitos'] },
            { id: "02", title: 'MENTALIDADE DE GUERRA', price: "R$ 97,00", items: ['Virtude e Riqueza', 'Mindset do Guerreiro', 'Papéis de Parede'] }
          ].map((bonus, idx) => (
            <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 text-left transition-all hover:border-stoic-orange/40 group relative overflow-hidden">
              <div className="flex justify-between items-center mb-6"><div><span className="text-stoic-orange font-black text-xs tracking-[0.3em]">BÔNUS {bonus.id}</span><h3 className="text-2xl sm:text-3xl font-black text-white">{bonus.title}</h3></div><span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest">GRÁTIS</span></div>
              <div className="space-y-3">{bonus.items.map((item, i) => (<div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5"><div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Star className="w-4 h-4 text-white" /></div><span className="text-white font-bold text-sm">{item}</span></div>))}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-8 rounded-[2rem] bg-gradient-to-r from-stoic-orange to-orange-400 text-black flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
           <div className="flex items-center gap-6"><div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center"><Star className="w-6 h-6" /></div><h4 className="text-xl sm:text-2xl font-black uppercase">Valor Total: R$ 0,00</h4></div>
        </div>
      </div>
    </section>
);

const Testimonials: React.FC = () => (
    <section className="py-12 px-4 sm:px-8 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
        <div className="lg:w-1/3 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-3 bg-[#0a0a0a] px-4 py-2 border border-white/10 rounded-full text-xs font-black tracking-widest"><span className="w-2 h-2 bg-stoic-orange rounded-full"></span> FEEDBACK</div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black leading-tight">O que nossos alunos estão <span className="text-stoic-orange">conquistando</span></h2>
        </div>
        <div className="lg:w-2/3 grid grid-cols-2 gap-4">
          {['https://iili.io/fcPL1mQ.webp', 'https://iili.io/fcPLGIV.webp'].map((img, i) => (<img key={i} src={img} className="rounded-3xl border border-white/10" alt="Testimonial" />))}
        </div>
      </div>
    </section>
);

const FinalOffer: React.FC = () => (
  <section id="pricing" className="py-12 sm:py-16 px-4 sm:px-8 bg-black">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
      <div className="flex-1 text-center lg:text-left space-y-6">
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">Não é teoria: é <span className="text-stoic-orange">aplicação.</span></h2>
        <div className="space-y-4">
          {['100% Aplicável', 'Acesso Vitalício', 'Resultados Reais'].map(t => (
            <div key={t} className="flex gap-4 items-center"><div className="w-1.5 h-6 bg-stoic-orange rounded-full"></div><h3 className="font-black text-white uppercase">{t}</h3></div>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full max-w-xl">
         <div className="bg-[#0e0e0e] border border-white/10 rounded-[3rem] p-8 text-center space-y-6 shadow-2xl relative">
            <img src="https://iili.io/fciwNhx.webp" className="h-10 mx-auto" alt="Logo" />
            <div className="py-4"><CountdownTimer size="large" /></div>
            <img src="https://iili.io/fcPrO7V.webp" className="w-full max-w-[280px] mx-auto" alt="Product" />
            <div><p className="text-gray-400 text-xs font-bold uppercase line-through">R$ 397,00</p><h4 className="text-[#ff6b00] text-6xl font-black leading-none">R$ 67,00</h4></div>
            <CTAButton href="https://pay.kiwify.com.br/9U2mYbG" className="w-full">QUERO ACESSO IMEDIATO <MoveRight /></CTAButton>
         </div>
      </div>
    </div>
  </section>
);

const FAQ: React.FC = () => (
  <section className="py-12 px-4 sm:px-8 bg-black">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
      <h2 className="text-5xl font-black opacity-10">F.A.Q</h2>
      <div className="lg:col-span-2 space-y-1">
        <FAQItem question="Como recebo o conteúdo?" answer="Acesso imediato via e-mail após a compra." />
        <FAQItem question="Tem garantia?" answer="Sim, 7 dias de garantia incondicional." />
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
    <footer className="py-10 px-4 sm:px-8 bg-black border-t border-white/5 text-center">
       <p className="text-[10px] text-gray-600 uppercase font-black">Copyright © 2024 • O Poder do Estoicismo • CNPJ: 61.870.668/0001-84</p>
    </footer>
);

export default function App() {
  const scrollToPricing = () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="min-h-screen bg-black">
      <Header onCTAClick={scrollToPricing} />
      <Hero onCTAClick={scrollToPricing} />
      <IdealFor />
      <Features />
      <ManualHighlights />
      <Curriculum onCTAClick={scrollToPricing} />
      <Bonuses onCTAClick={scrollToPricing} />
      <Testimonials />
      <FinalOffer />
      <FAQ />
      <Footer />
    </div>
  );
}
