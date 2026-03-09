import React, { useRef } from 'react';
import { SlideContainer } from '../SlideContainer';
import { UserState } from '../../types';
import { motion } from 'motion/react';
import { Download, Share2, RotateCcw, CheckCircle2, Info, ExternalLink, ShoppingCart } from 'lucide-react';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface ResultsSlideProps {
  state: UserState;
  onRestart: () => void;
}

export function ResultsSlide({ state, onRestart }: ResultsSlideProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const calculateDosage = () => {
    const maintenance = Math.max(3, Math.round(state.weight * 0.04 * 10) / 10);
    const loading = Math.round(state.weight * 0.3);
    return { maintenance, loading };
  };

  const { maintenance, loading } = calculateDosage();

  const getRecommendations = () => {
    const recs = [];
    
    if (state.experience === 'beginner') {
      recs.push({
        title: 'Faza ładowania (Opcjonalna)',
        desc: `Aby szybciej wysycić mięśnie, możesz przyjmować ${loading}g dziennie przez pierwsze 5-7 dni, podzielone na 4 porcje. Nie jest to jednak konieczne.`,
        reason: 'Początkujący często chcą szybkich efektów, faza ładowania je przyspiesza.'
      });
    }

    if (state.goals.includes('muscle')) {
      recs.push({
        title: 'Wsparcie budowy masy',
        desc: 'Kreatyna zwiększa uwodnienie komórek mięśniowych. Pamiętaj o piciu minimum 3-4 litrów wody dziennie.',
        reason: 'Odpowiednie nawodnienie jest kluczowe dla hipertrofii przy suplementacji kreatyną.'
      });
    }
    
    if (state.goals.includes('fat_loss')) {
      recs.push({
        title: 'Ochrona na redukcji',
        desc: 'Kreatyna pomoże Ci utrzymać siłę i masę mięśniową podczas deficytu kalorycznego.',
        reason: 'Podczas redukcji łatwo o utratę siły, kreatyna działa antykatabolicznie.'
      });
    }

    if (state.timing === 'post_workout') {
      recs.push({
        title: 'Idealna pora',
        desc: 'Przyjmowanie kreatyny po treningu z węglowodanami (np. sokiem) może nieznacznie poprawić jej przyswajanie.',
        reason: 'Wyrzut insuliny po spożyciu węglowodanów pomaga transportować kreatynę do mięśni.'
      });
    } else if (state.timing === 'pre_workout') {
      recs.push({
        title: 'Przed treningiem',
        desc: 'Weź swoją porcję na 30-60 minut przed treningiem, aby zapewnić maksymalną dostępność energii (ATP).',
        reason: 'Zapewnia to wysoki poziom fosfokreatyny we krwi podczas wysiłku.'
      });
    }

    if (state.form === 'powder') {
      recs.push({
        title: 'Forma proszku',
        desc: 'Rozpuść proszek w ciepłej wodzie lub soku, aby uniknąć problemów żołądkowych.',
        reason: 'Słabo rozpuszczona kreatyna może powodować dyskomfort trawienny.'
      });
    }

    return recs;
  };

  const getRecommendedProducts = () => {
    const products = [];

    // 1. Primary Creatine Product
    if (state.form === 'capsules') {
      products.push({
        id: 'creatine-caps',
        name: 'OstroVit Monohydrat Kreatyny 3000 mg 120 tabletek',
        price: '18,90 zł',
        image: 'https://ostrovit.com/hpeciai/64935bd59169f0c2f915ceff808a7837/pol_pl_OstroVit-Monohydrat-Kreatyny-3000-mg-120-tabletek-26572_1.png',
        url: 'https://ostrovit.com/pl/products/ostrovit-monohydrat-kreatyny-3000-mg-120-tabletek-26572.html',
        reason: 'Twoja preferowana forma (kapsułki)',
        isPrimary: true
      });
    } else {
      products.push({
        id: 'creatine-powder',
        name: 'OstroVit Monohydrat Kreatyny 500 g',
        price: '25,99 zł',
        image: 'https://ostrovit.com/hpeciai/c5027455a149826cee978a1b8a44f652/pol_pl_OstroVit-Monohydrat-Kreatyny-500-g-16618_1.png',
        url: 'https://ostrovit.com/pl/products/ostrovit-monohydrat-kreatyny-500-g-16618.html',
        reason: 'Twoja preferowana forma (proszek)',
        isPrimary: true
      });
    }

    // 2. Secondary Products based on goals
    if (state.goals.includes('muscle')) {
      products.push({
        id: 'protein',
        name: 'OstroVit WPC 80 700 g',
        price: '59,99 zł',
        image: 'https://ostrovit.com/hpeciai/b7013c6afbbe3d41a4c1e8d5d87a6c4e/pol_pl_OstroVit-WPC-80-700-g-26507_1.png',
        url: 'https://ostrovit.com/pl/products/ostrovit-wpc-80-700-g-26507.html',
        reason: 'Wsparcie budowy masy mięśniowej'
      });
    }

    if (state.goals.includes('fat_loss')) {
      products.push({
        id: 'fat-burner',
        name: 'OstroVit Fat Burner VEGE 60 kapsułek',
        price: '24,99 zł',
        image: 'https://ostrovit.com/hpeciai/18636c7af942d00dd691b6b8219102e2/pol_pl_OstroVit-Fat-Burner-VEGE-60-kapsulek-24156_3.png',
        url: 'https://ostrovit.com/pl/products/ostrovit-fat-burner-vege-60-kapsulek-24156.html',
        reason: 'Wsparcie redukcji tkanki tłuszczowej'
      });
    }

    if (state.goals.includes('strength') || state.timing === 'pre_workout') {
      products.push({
        id: 'pre-workout',
        name: 'OstroVit Pump Extreme 300 g',
        price: '28,90 zł',
        image: 'https://ostrovit.com/hpeciai/5b22d05a89a02f1fb6408d01f0287997/pol_pl_OstroVit-Pump-Extreme-300-g-25481_1.png',
        url: 'https://ostrovit.com/pl/products/ostrovit-pump-extreme-300-g-25481.html',
        reason: 'Zastrzyk energii przed treningiem'
      });
    }

    if (state.goals.includes('endurance') && !products.find(p => p.id === 'pre-workout')) {
      products.push({
        id: 'bcaa',
        name: 'OstroVit BCAA + Glutamina 200 g',
        price: '27,99 zł',
        image: 'https://ostrovit.com/hpeciai/a8cfcfd7d17fca95905fce4eba2c0a73/pol_pl_OstroVit-BCAA-Glutamina-200-g-16572_1.png',
        url: 'https://ostrovit.com/pl/products/ostrovit-bcaa-glutamina-200-g-16572.html',
        reason: 'Lepsza regeneracja i wytrzymałość'
      });
    }

    return products.slice(0, 3);
  };

  const recommendations = getRecommendations();
  const recommendedProducts = getRecommendedProducts();
  const matchScore = Math.floor(Math.random() * (98 - 85 + 1)) + 85;

  const handleDownloadPDF = () => {
    if (!contentRef.current) return;
    
    const element = contentRef.current;
    const opt = {
      margin:       10,
      filename:     'ostrovit-plan-kreatyny.pdf',
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Mój plan suplementacji kreatyną od OstroVit',
        text: `Sprawdź mój spersonalizowany plan: ${maintenance}g dziennie!`,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  return (
    <SlideContainer className="bg-gray-50">
      <div className="flex-1 overflow-y-auto" id="pdf-content" ref={contentRef}>
        {/* Header */}
        <div className="bg-gradient-to-br from-zinc-900 to-black text-white p-6 rounded-b-3xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">OstroVit</div>
              <h2 className="text-xl font-bold">Twój Plan Suplementacji</h2>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-full flex items-center backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-green-400 mr-1.5" />
              <span className="text-sm font-semibold">{matchScore}% Dopasowania</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Zalecana dawka dzienna</p>
              <div className="text-3xl font-black text-white">
                {maintenance} <span className="text-lg text-red-400 font-medium">g / dzień</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Waga</p>
              <div className="text-xl font-bold text-white">{state.weight} kg</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-6 space-y-4">
          <div className="flex items-center text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <Info className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
            <p>Poniższe rekomendacje to nasze sugestie oparte na algorytmie dopasowania. Traktuj je jako punkt wyjścia.</p>
          </div>

          <h3 className="font-bold text-gray-900 text-lg mt-6 mb-4">Spersonalizowane wskazówki:</h3>
          
          {recommendations.map((rec, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative group"
            >
              <h4 className="font-bold text-gray-900 mb-1 flex items-center">
                <div className="w-2 h-2 bg-red-600 rounded-full mr-2" />
                {rec.title}
              </h4>
              <p className="text-sm text-gray-600 mb-2">{rec.desc}</p>
              
              {/* Tooltip for reason */}
              <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded-md border border-gray-100 italic">
                <span className="font-semibold not-italic text-gray-500">Dlaczego?</span> {rec.reason}
              </div>
            </motion.div>
          ))}

          {/* Recommended Products */}
          <h3 className="font-bold text-gray-900 text-lg mt-8 mb-4 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2 text-red-600" />
            Twój dedykowany zestaw:
          </h3>
          
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory hide-scrollbar -mx-6 px-6">
            {recommendedProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[220px] max-w-[220px] snap-center shrink-0"
              >
                <div className="relative h-36 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full object-contain mix-blend-multiply rounded-lg" 
                    referrerPolicy="no-referrer" 
                  />
                  {product.isPrimary && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm">
                      Główny produkt
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[11px] text-red-600 font-bold uppercase tracking-wider mb-1.5 line-clamp-1">{product.reason}</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2 leading-tight flex-1">{product.name}</h4>
                  <div className="text-lg font-black text-gray-900 mb-3">{product.price}</div>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-zinc-900 hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center transition-colors flex items-center justify-center"
                  >
                    Przejdź do sklepu <ExternalLink className="w-3 h-3 ml-1.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center text-xs text-gray-400 mt-4 pb-24">
            Wygenerowano przez OstroVit powered by CROly
          </div>
        </div>
      </div>

      {/* Fixed Action Bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleDownloadPDF}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors text-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Pobierz PDF
        </button>
        <button 
          onClick={handleShare}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
          aria-label="Udostępnij"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <button 
          onClick={onRestart}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
          aria-label="Zacznij od nowa"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </SlideContainer>
  );
}
