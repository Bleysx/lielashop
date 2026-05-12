import { useEffect, useState, useRef } from "react";
function ImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <img
        src={images[index]}
        className="h-64 w-full object-cover rounded-xl"
      />

      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 bg-white/70 px-2 rounded-full">
            ‹
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 bg-white/70 px-2 rounded-full">
            ›
          </button>
        </>
      )}
    </div>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10z"/>
      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M22 12a10 10 0 10-11 10v-7H8v-3h3V9c0-3 2-5 5-5h2v3h-2c-1 0-2 .5-2 2v2h4l-1 3h-3v7a10 10 0 0010-10z"/>
    </svg>
  );
}

export default function LielashopMakeup() {

  const products = [
  
  {
    id: 1,
    name: "Tinta de labios fresa",
    price: "COP 7,000",
    category: "labios",
   
    images: [
      "https://i.ibb.co/Q3LFkyV1/image.png"
        ]
  },
  {
    id: 2,
    name: "Tinta Miss Betty",
    price: "COP 7,000",
    category: "labios",
    images: [
      "https://i.ibb.co/Zp5C3qTC/Captura-de-pantalla-2026-05-11-111947.png"
        ]
  },
  {
    id: 3,
    name: "Lip gloss con llavero",
    price: "COP 18,000",
    category: "labios",
    images: [
    "https://i.ibb.co/rf1XCmjr/image.png"
      ]
  },
  {
    id: 4,
    name: "Brillo mágico nude",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/LwWjsJM/image.png"
      ]
  },
  {
    id: 5,
    name: "Lip oil juicy",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/zTXgY73B/image.png"
      ]
  },
  {
    id: 6,
    name: "Lápiz de labios Samy",
    price: "COP 8,000",
    category: "labios",
     images: [
    "https://i.ibb.co/1txPz4Kv/image.png"
      ]
  },
  {
    id: 7,
    name: "Tinta de labios Kiss",
    price: "COP 9,000",
    category: "labios",
    images: [
    "https://i.ibb.co/H59X2PL/image.png"
      ]
  },
  {
    id: 8,
    name: "Hidratante de labios",
    price: "COP 5,000",
    category: "labios",  
    images: [
    "https://i.ibb.co/JR9H2rGx/image.png"
      ]
  },
  {
    id: 9,
    name: "Lip gloss osito con llavero",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/Pzr993Pj/image.png"
      ]
  },
  {
    id: 134,
    name: "Tinta de labios osito con llavero",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/bMQVSgk8/image.png"
      ]
  },
  {
    id: 10,
    name: "Lip gloss con llavero",
    price: "COP 10,000",
    category: "labios",
    images: [
    "https://i.ibb.co/DfkWSGqs/image.png"
      ]
  },
  {
    id: 11,
    name: "Lip gloss con color SFR",
    price: "COP 13,000",
    category: "labios",
    images: [
    "https://i.ibb.co/ksk94d7X/image.png",
      "https://i.ibb.co/NgJ2qZzW/image.png"
      ]
  },
  {
    id: 12,
    name: "Lip gloss LIFTER",
    price: "COP 10,000",
    category: "labios",
    images: [
    "https://i.ibb.co/wNX9v08P/image.png",
      "https://i.ibb.co/Kc24m91p/image.png"
      ]
  },
  {
    id: 13,
    name: "Lip gloss Fat Oil Maike",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/DDKYJ9d8/image.png",
      "https://i.ibb.co/7d2yBf48/image.png"
      ]
  },
  {
    id: 14,
    name: "Labial hidratante",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/nMbkFs4S/image.png",
      "https://i.ibb.co/3mcHS10f/image.png"
      ]
  },
  {
    id: 15,
    name: "Lip gloss mágico",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/33rRSBM/image.png"
      ]
  },
  {
    id: 16,
    name: "Tinta de labios",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/TDtX0s6r/image.png"
      ]  
  },
  {
    id: 17,
    name: "Tinta de labios love",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/n8kwNPch/image.png"
      ]  
  },
  {
    id: 18,
    name: "Lip gloss Magic Flora",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/QvHcGxTD/image.png"
      ]  
  },
  {
    id: 19,
    name: "Tinta de labios Magic",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/YTZtRKzr/image.png"
      ] 
  },
  {
    id: 20,
    name: "Lip gloss Magic Kiss",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/yn7B0R7b/image.png"
      ] 
  },
  {
    id: 21,
    name: "Lip gloss Fat Oil",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/xSSBN3Zg/image.png",
       "https://i.ibb.co/9HY4XbcD/image.png"
      ] 
  },
  {
    id: 22,
    name: "Lápiz de labios Jumbo Karité",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/1HM39Dm/image.png",
       "https://i.ibb.co/b5vtKXPc/image.png"
      ] 
  },
  {
    id: 23,
    name: "Labial en barra matte",
    price: "COP 10,000",
    category: "labios",
    images: [
    "https://i.ibb.co/RGDX3WQJ/image.png",
       "https://i.ibb.co/vxyHSMbF/image.png"
      ] 
  },
  {
    id: 24,
    name: "Tinta de labios Milk",
    price: "COP 9,000",
    category: "labios",
    images: [
    "https://i.ibb.co/FbtZw4kW/image.png"
      ] 
  },
  {
    id: 25,
    name: "Tinta Bene Tint",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/0yXv9t1b/image.png"
      ] 
  },
  {
    id: 26,
    name: "Lip gloss Honey",
    price: "COP 9,000",
    category: "labios",
    images: [
    "https://i.ibb.co/7t4rgdkd/image.png"
      ] 
  },
  {
    id: 27,
    name: "Tinta de labios",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/9kHy9LxD/image.png"
      ] 
  },
  {
    id: 28,
    name: "Tinta fresita",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/W42znN1L/image.png"
      ] 
  },
  {
    id: 29,
    name: "Labial en barra",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/M5JJkxrc/image.png",
      "https://i.ibb.co/wZNzRsYm/image.png"
      ] 
  },
  {
    id: 30,
    name: "Tinta DEWY",
    price: "COP 9,000",
    category: "labios",
    images: [
    "https://i.ibb.co/bj1sKCwM/image.png"
      ]
  },
  {
    id: 31,
    name: "Lip gloss",
    price: "COP 9,500",
    category: "labios",
    images: [
    "https://i.ibb.co/S7sgjY1C/image.png",
      "https://i.ibb.co/rJB0P4K/image.png",
       "https://i.ibb.co/6R2b3VyW/image.png"
      ] 
  },
  {
    id: 32,
    name: "Lip gloss",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/FLkVjMZS/image.png"
      ]
  },
  {
    id: 33,
    name: "Lip gloss Victoria",
    price: "COP 9,500",
    category: "labios",
    images: [
    "https://i.ibb.co/m528mfFv/image.png"
      ]
  },
  {
    id: 34,
    name: "Lip gloss Love",
    price: "COP 6,000",
    category: "labios",
    images: [
    "https://i.ibb.co/Y4F1RwbW/image.png"
      ]
  },
  {
    id: 35,
    name: "Lip gloss con aplicador Jumbo",
    price: "COP 7,000",
    category: "labios",
    images: [
    "https://i.ibb.co/PZMRTrQh/image.png",
      "https://i.ibb.co/TDfJBjq3/image.png"
      ]
  },
  {
    id: 36,
    name: "Labial líquido",
    price: "COP 8,000",
    category: "labios",
    images: [
    "https://i.ibb.co/QyCVpr5/image.png",
      "https://i.ibb.co/ymGVTr54/image.png"
      ]
  },

  // =====================
  // CUIDADO FACIAL
  // =====================
  {
    id: 37,
    name: "Protector solar retinol",
    price: "COP 12,000",
    category: "cuidado_facial",
    images: [
    "https://i.ibb.co/5hHT79t5/image.png"
      ]
  },
  {
    id: 38,
    name: "Protector solar",
    price: "COP 7,000",
    category: "cuidado_facial",
    images: [
    "https://i.ibb.co/j9G85Bjn/image.png"
      ]
  },
  {
    id: 39,
    name: "Protector solar de arroz",
    price: "COP 10,000",
    category: "cuidado_facial",
    images: [
    "https://i.ibb.co/gMPZphCc/image.png"
      ]
  },
  {
    id: 40,
    name: "Protector solar Rimocoo",
    price: "COP 9,000",
    category: "cuidado_facial",
    images: [
    "https://i.ibb.co/3ydZ7Dwb/image.png"
      ]
  },
  {
    id: 41,
    name: "Protector solar en spray con arroz",
    price: "COP 22,000",
    category: "cuidado_facial",
    images: [
    "https://i.ibb.co/BKQzW9KT/image.png"
      ]
  },
  {
    id: 42,
    name: "Kit ácido salicílico",
    price: "COP 28,000",
    category: "cuidado_facial",
    description: "Limpiador + Serum + Crema localizadora",
    images: [
    "https://i.ibb.co/pBjQyCpM/image.png"
      ]
  },
  {
    id: 43,
    name: "Kit de cuidado facial viajero x 5 piezas de rosas",
    price: "COP 34,000",
    category: "cuidado_facial",
    images: [
    "https://i.ibb.co/LX7SsGBk/image.png"
      ]
  },
  {
    id: 44,
    name: "Kit facial vitamina C",
    price: "COP 47,000",
    category: "cuidado_facial",
    description: "Limpiador + Crema + Serum + Contorno de ojos",
    images: [
    "https://i.ibb.co/VWk6G8Dt/image.png"
      ]
  },
  {
    id: 45,
    name: "Kit de arroz facial sencillo",
    price: "COP 43,000",
    category: "cuidado_facial",
    description: "Limpiador + Crema hidratante + Serum + Contorno de ojos",
    images: [
    "https://i.ibb.co/QjxC6TfJ/image.png"
      ]
  },
  {
    id: 46,
    name: "Kit centella asiática",
    price: "COP 43,000",
    category: "cuidado_facial",
    description: "Limpiador + Crema hidratante + Serum + Contorno de ojos",
    images: [
    "https://i.ibb.co/99pCkcyB/image.png"
      ]
  },
  {
    id: 47,
    name: "Kit de arroz facial completo",
    price: "COP 66,000",
    category: "cuidado_facial",
    description: "Limpiador + Crema + Serum + Contorno de ojos + Tónico + Protector solar",
    images: [
    "https://i.ibb.co/Y7qdsFxJ/image.png"
      ]
  },
  {
    id: 48,
    name: "Protector solar de vitamina C",
    price: "COP 7,000",
    category: "cuidado_facial",
    images: [
    "https://i.ibb.co/dJpPGZXT/image.png"
      ]
  },
  {
    id: 49,
    name: "Kit de arroz sencillo",
    price: "COP 39,000",
    category: "cuidado_facial",
    description: "Limpiador facial + Crema hidratante + Serum",
    images: [
    "https://i.ibb.co/h1sNr9MQ/image.png"
      ]
  },

  // =====================
  // CEJAS Y PESTAÑAS
  // =====================
  {
    id: 50,
    name: "Pestañina colosal",
    price: "COP 8,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Opx7cGHHY-TGOgCdT7q.jpg"
      ]
  },
  {
    id: 51,
    name: "Lápiz jumbo doble para ojos",
    price: "COP 5,000",
    category: "cejas_pestanas",
    images: [
    "https://i.ibb.co/vCPjjDmr/image.png"
      ]
  },
  {
    id: 52,
    name: "Betún de cejas Gulf",
    price: "COP 12,000",
    category: "cejas_pestanas",
    images: [
    "https://i.ibb.co/MygZnykp/image.png",
      "https://i.ibb.co/jvXgH50k/image.png"
      ]
  },
  {
    id: 53,
    name: "Sombra de cejas x3 tonos",
    price: "COP 9,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK0mQD7BfbY65OgIgy.jpg"
      ]
  },
  {
    id: 54,
    name: "Lápiz 2 en 1 Engol",
    price: "COP 2,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnNVpcc5de_4LWfo_iw.jpg"
      ]
  },
  {
    id: 55,
    name: "Lápiz cejas café",
    price: "COP 2,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnNVruO3VJoShPp3yQ7.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnNVrywNQc4nbG0pmPc.jpg"
      ]
  },
  {
    id: 56,
    name: "Delineador líquido negro",
    price: "COP 8,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK2Dt5bZ1GoYmkxEqM.jpg"
      ]
  },
  {
    id: 57,
    name: "Pinza de cejas tornasol",
    price: "COP 4,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OaLjmxnBQ2XPatzg0N0.jpg"
      ]
  },
  {
    id: 58,
    name: "Encrespador de pestañas",
    price: "COP 12,000",
    category: "cejas_pestanas",
    images: [
    "https://i.ibb.co/Kc1hbJVV/image.png"
      ]
  },
  {
    id: 59,
    name: "Pestañina negra Lucky Model",
    price: "COP 10,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lIR53UomO3nagGCJ.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lIVoRl5Y_r6BHYsn.jpg"
      ]
  },
  {
    id: 60,
    name: "Sombras de cejas Powder x3 tonos",
    price: "COP 10,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OoaEQaibpuRncQ3UZUA.jpg"
      ]
  },
  {
    id: 61,
    name: "Pestañina negra",
    price: "COP 8,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lPgEir40zCvYhUoO.jpg"
      ]
  },
  {
    id: 62,
    name: "Serum crecimiento y fortalecimiento de pestañas Bioaqua",
    price: "COP 10,000",
    category: "cejas_pestanas",
    images: [
    "https://i.ibb.co/XrGGMWSk/image.png"
      ]
  },
  {
    id: 63,
    name: "Gel de cejas con color",
    price: "COP 9,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK1xauYObcMQLLheJS.jpg"
      ]
  },
  {
    id: 64,
    name: "Encrespador de pestañas metálico",
    price: "COP 9,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKbub4BrK8a58hx0tn.jpg"
      ]
  },
  {
    id: 65,
    name: "Pestañina negra Pick",
    price: "COP 7,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKbuYR5BlQ4UrEhPMx.jpg"
      ]
  },
  {
    id: 66,
    name: "Pestañina negra Miss Betty",
    price: "COP 8,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKbuZNmez5x4NysxVn.jpg"
      ]
  },
  {
    id: 67,
    name: "Encrespador MTK",
    price: "COP 10,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKbu_Ffg3gCk3Axh6m.jpg"
      ]
  },
  {
    id: 68,
    name: "Delineador de ojos doble punta",
    price: "COP 6,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKU-_er83paPe9AHRZ.jpg"
      ]
  },
  {
    id: 69,
    name: "Pestañina transparente de colágeno",
    price: "COP 7,000",
    category: "cejas_pestanas",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKTiOSuqhdzlw2A0vK.jpg"
      ]
  },
    {
  id: 70,
  name: "Rubor compacto Romantic Ace Face",
  price: "COP 8,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Opx7caJj_-8yjTNerWf.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Opx8m37OcLt-pZHuvDn.jpg"
      ]
},
{
  id: 71,
  name: "2 en 1 rubor crema + rubor compacto",
  price: "COP 12,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OevU5Cb_HS02QxjllZ6.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OevdChTcHvLTApTkcNy.jpg"
      ]
},
{
  id: 72,
  name: "Rubor líquido aplicador jumbo Mocmallure",
  price: "COP 10,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OgYBjF-fWW3OrMIK6Xx.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OgYEH7r4HaB8Tu4qD0K.jpg"
      ]
},
{
  id: 73,
  name: "Rubor líquido Huda",
  price: "COP 7,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lGhS1jiiqfvCy-zw.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lGm6ZTEH32V1eN3c.jpg"
      ]
},
{
  id: 74,
  name: "Rubor crema Gulf",
  price: "COP 8,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OkK4p4DbTo21Fs2hoF.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OkK4p3eWgTqOm0sLFSo.jpg"
      ]
},
{
  id: 75,
  name: "Rubor líquido estampita",
  price: "COP 10,000",
  category: "rubor",
    images: [
    "https://i.ibb.co/mCMYmqyM/image.png",
      "https://i.ibb.co/LdBjrthN/image.png"
      ]
},
{
  id: 76,
  name: "Rubor compacto Miss Fon",
  price: "COP 9,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Opx7cRCnN2fEvCluofT.jpg"
      ]
      },
{
  id: 77,
  name: "Rubor compacto Always",
  price: "COP 12,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlqKQMNgUC2oIa6Y4od.jpg"
      ]
},
{
  id: 78,
  name: "Rubor líquido aplicador jumbo Mocmallure",
  price: "COP 10,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OewRiDB1XuKCpsPj7Mv.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OewU4kGfWnS6ZKxK-CF.jpg"
      ]
},
{
  id: 79,
  name: "Dúo rubor compacto SFR",
  price: "COP 12,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlinJ9KDHImt4q0kq4f.jpg"
      ]
},
{
  id: 80,
  name: "Rubor compacto",
  price: "COP 10,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OofoRG4O6sUrMoUoqOo.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OofoRFejA1K7gU5U4L6.jpg"
      ]
},
{
  id: 81,
  name: "Rubor en crema",
  price: "COP 7,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_vvz0vlHcl1DXfc1T.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_vw2hGlrXrhrQnme6.jpg"
      ]
},
{
  id: 82,
  name: "Rubor compacto + iluminador",
  price: "COP 12,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Opx7c_zNFkeu2hmbG_7.jpg"
       ]
},  
{
  id: 83,
  name: "Rubor líquido MY FACE",
  price: "COP 7,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OkK5BCjra7GdRp2_CcZ.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OkK5BHLcsjBJSBNlOfg.jpg"
      ]
},
{
  id: 84,
  name: "Rubor compacto Romantic",
  price: "COP 7,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lQ0vSRUiL2n5h16e.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lQ1EjVAwMCS4ldRY.jpg"
      ]
},
{
  id: 85,
  name: "Rubor mineralizado",
  price: "COP 15,000",
  category: "rubor",
    images: [
    "https://i.ibb.co/Lz1Tkty8/image.png"
      ]
},
{
  id: 86,
  name: "Jelly tintas mágicas",
  price: "COP 9,000",
  category: "rubor",
  description: "Se activan con el pH",
    images: [
    "https://i.ibb.co/fYpLWVcP/image.png"
      ]
},
{
  id: 87,
  name: "Rubor líquido aplicador grande",
  price: "COP 10,000",
  category: "rubor",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKd86ApWFmhvT2olT6.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKd8B6Kc91yVna5oZy.jpg"
      ]
},
{
  id: 88,
  name: "Serum rubor con niacinamida Anik",
  price: "COP 28,000",
  category: "rubor",
    images: [
    "https://i.ibb.co/DHwPGbbJ/image.png",
      "https://i.ibb.co/rKLQ3WtP/image.png"
      ]
},
    {
  id: 89,
  name: "Paleta de sombras + rubor e iluminadores",
  price: "COP 43,000",
  category: "sombras",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK0mVEYzRt3chT2JPt.jpg"
      ]
},
{
  id: 90,
  name: "Paleta de maquillaje x70 tonos",
  price: "COP 55,000",
  category: "sombras",
    images: [
    "https://i.ibb.co/9kHgWPj6/image.png"
      ]
},
{
  id: 91,
  name: "Paleta de sombras súper completa (25 tonos + rubor + contorno + polvo + iluminador)",
  price: "COP 50,000",
  category: "sombras",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lQ1Z9tE509saKsTh.jpg"
      ]
},
{
  id: 92,
  name: "Paleta de sombras x12 tonos + iluminador, rubor y contorno",
  price: "COP 25,000",
  category: "sombras",
    images: [
    "https://i.ibb.co/3Ydz62gY/image.png"
      ]
},
{
  id: 93,
  name: "Paleta de sombras x9 tonos",
  price: "COP 16,000",
  category: "sombras",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlipKj0nZ0sJcwq42lT.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlipKeNcUBbjrj7oLiN.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlipKntGQdL9FVVAd6W.jpg"
      ]
},
{
  id: 94,
  name: "Kit de brochas kabuki",
  price: "COP 20,000",
  category: "sombras",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKTs7AnwDy6QbiJgLc.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKTs6HIpZYcBRqjxzN.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKTs84Tub2Rynwc9m_.jpg"
      ]
},
    {
  id: 95,
  name: "Base de Anik",
  price: "COP 45,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OGlavhxBSqgqaZQzC5j.jpg"
      ]
},
{
  id: 96,
  name: "Base líquida Fit",
  price: "COP 8,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lF1czWY1EA7_DUmL.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lF6NgZSAacoj5wRb.jpg"
      ]
},
{
  id: 97,
  name: "Base líquida Pro",
  price: "COP 8,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_l1BIfITyLGihE5pe.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_l1B-87P2p-EeddQ_.jpg"
      ]
},
{
  id: 98,
  name: "Base líquida con protección solar SPF 50",
  price: "COP 10,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olip-FwZgEg_UeVl8dD.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olip-KWbBAIyWfHTA_1.jpg"
      ]
},
{
  id: 99,
  name: "Base líquida alta cobertura Rimocco",
  price: "COP 8,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK1nHlrx1pfZYXaOKg.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK1nMQ1tmVkniMXixw.jpg"
      ]
},
{
  id: 100,
  name: "Base líquida Paulis cobertura media",
  price: "COP 12,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OevU5F9ZHxu54KGmLsX.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OevdGCM8X-mNE_4zpkb.jpg"
      ]
},
{
  id: 101,
  name: "Base líquida 36H",
  price: "COP 8,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlirPS0gBxjCmPJ_jby.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olip8pudQkr94eUfoWK.jpg"
      ]
},
{
  id: 102,
  name: "Base líquida alta cobertura Pink Key",
  price: "COP 20,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olip6gZ0_exc3L_zfe7.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olip6l5yGe2QXoE88I0.jpg",
       "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olip4b8UliMPw9QspQJ.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olip4fi8vgYrfFcs32m.jpg"
      ]
},
{
  id: 103,
  name: "Base líquida alta cobertura Miss Rose",
  price: "COP 20,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKd6qFahGAiTW5vjZV.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKd6uyz-DNc0QG4vNB.jpg"
      ]
},
{
  id: 104,
  name: "Corrector líquido Paulis alta cobertura",
  price: "COP 18,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlioyIv_j_eEChe4Uo5.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlioyNW3bz62zmy3lwC.jpg"
      ]
},
{
  id: 105,
  name: "Corrector líquido con brocha y aplicador Jumbo",
  price: "COP 12,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olio_YLDyMnsewW-5Xl.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Olio_cH_8_IcUFKwbjZ.jpg"
      ]
},
{
  id: 106,
  name: "Corrector líquido Pro",
  price: "COP 8,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OmjuoHJDzHV_8X_tkRo.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OmjvLUZogb7bjeBlCZk.jpg"
      ]
},
{
  id: 107,
  name: "Corrector líquido con esponjita",
  price: "COP 10,000",
  category: "bases_corrector",
    images: [
    "https://i.ibb.co/gLfYKy7L/image.png",
      "https://i.ibb.co/hxrJ9N74/image.png"
      ]
},
{
  id: 108,
  name: "Corrector líquido alta cobertura",
  price: "COP 10,000",
  category: "bases_corrector",
    images: [
    "https://i.ibb.co/WWgmmgg0/image.png",
      "https://i.ibb.co/fz3J6RSS/image.png"
      ]
},
{
  id: 109,
  name: "Corrector Súper Star Miss Betty con aplicador Jumbo",
  price: "COP 10,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oliow3rbZvn7PehR7A2.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oliow60ETI22cRLNtZ4.jpg"
      ]
},
{
  id: 110,
  name: "Corrector de Anik",
  price: "COP 25,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrUStVJ6SUfbYrWXX8O.jpg"
      ]
},
{
  id: 111,
  name: "Primer en gel fit",
  price: "COP 8,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lClsA99McceFQvqE.jpg"
      ]
},
{
  id: 112,
  name: "Primer en gel HEDY",
  price: "COP 8,000",
  category: "bases_corrector",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlipKAfuON-oSEM7c1y.jpg"
      ]
},
{
  id: 113,
  name: "Polvos sueltos Pink Key",
  price: "COP 18,000",
  category: "polvos",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlipGW_vpa4xNPasS6I.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OlipGaEb7DzuBy8pNcL.jpg"
      ]
},
{
  id: 114,
  name: "Polvo compacto Paulis",
  price: "COP 15,000",
  category: "polvos",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnNEHcH3mdhrJ1K8SMg.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnNEHgyh9c2why1HFAJ.jpg"
      ]
},
{
  id: 115,
  name: "Polvos sueltos",
  price: "COP 12,000",
  category: "polvos",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK1xkk7MARdIEdmsZB.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK1xfr9vz6C7780Y_g.jpg"
      ]
},
{
  id: 116,
  name: "Polvo compacto Engol",
  price: "COP 15,000",
  category: "polvos",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-O_RuC1D01thcarDg6sC.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OjS3CClsxWeaEUtrCeG.jpg"
      ]
},
{
  id: 117,
  name: "Polvo de hadas",
  price: "COP 10,000",
  category: "polvos",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnO3FRqiNtvLFRyfeZa.jpg"
      ]
},
{
  id: 118,
  name: "Polvo de hadas Lyvenna",
  price: "COP 8,000",
  category: "polvos",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Oo_lPJqM9I6G1R-j6KJ.jpg"
      ]
},
{
  id: 119,
  name: "Polvo compacto",
  price: "COP 10,000",
  category: "polvos",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK25hSXk6vq5ph3jKY.jpg",
      "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK25m4gmYlTnJ32EKb.jpg",
      ]
},
{
  id: 120,
  name: "Polvo de hadas con pompón",
  price: "COP 12,000",
  category: "polvos",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OnK1x9ms5TTqwYJoeVk.jpg"
      ]
},
    {
  id: 121,
  name: "Gorros satin",
  price: "COP 11,000",
  category: "cabello",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OrKTlKgg3BreLaiiqZF.jpg"
      ] 
},
{
  id: 122,
  name: "Keratina Ritual Botánico",
  price: "COP 35,000",
  category: "cabello",
  description: "El Ritual Botánico de Keratina es un tratamiento orgánico que se aplica lavando con champú de limpieza profunda, secando al 100%, aplicando la keratina a 5mm de la raíz, reposando por 45-90 min, secando sin cepillar, planchando en mechones finos y lavando el mismo día."
,
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OofRuPGgQ_CoIxbsFin.jpg"
      ] 
},
{
  id: 123,
  name: "Shampoo de romero y eucalipto",
  price: "COP 38,000",
  category: "cabello",
  description: "Producto diseñado para el control de grasa y crecimiento intensivo del cabello. Ideal para cuero cabelludo graso o mixto con limpieza profunda sin maltratar las hebras."
,
    images: [
    "https://i.ibb.co/YB6FwSNz/image.png"
      ] 
},
{
  id: 124,
  name: "Tratamiento intensivo Plex",
  price: "COP 38,000",
  category: "cabello",
  description: "Ideal para cabellos muy dañados, secos o procesados químicamente. Contiene aguacate y argán para máxima hidratación."
,
    images: [
    "https://i.ibb.co/B25BDPYh/image.png"
      ] 
},
{
  id: 125,
  name: "Mascarilla Bomba Botánica S.O.S",
  price: "COP 38,000",
  category: "cabello",
  description: "Tratamiento capilar intensivo para reparar cabellos severamente dañados, secos o quebradizos."
,
    images: [
    "https://i.ibb.co/fGtKyyrB/image.png"
      ] 
},
{
  id: 126,
  name: "Laminado capilar",
  price: "COP 35,000",
  category: "cabello",
  description: "Tratamiento que crea una capa protectora, sellando la cutícula para brillo espejo, suavidad extrema y efecto liso sin frizz."
,
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OofRu41lIO4WjZe_GW6.jpg"
      ] 
},
{
  id: 127,
  name: "Gel para el cabello",
  price: "COP 18,000",
  category: "cabello"
,
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OiDylJJliwOcJEJjgm6.jpg"
      ] 
},
{
  id: 128,
  name: "Shampoo de cebolla y argán",
  price: "COP 38,000",
  category: "cabello",
  description: "Tratamiento para estimular crecimiento, fortalecer la fibra capilar y reparar cabello maltratado o con procesos químicos."
,
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-OofRuFOXhMnk7VhDe-9.jpg"
      ] 
},
{
  id: 129,
  name: "Pinza flor hawaiana",
  price: "COP 7,500",
  category: "cabello",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Ore9xY4dS9ECY7OQpGR.jpg"
      ] 
},
{
  id: 130,
  name: "Pinza hawaiana 1",
  price: "COP 7,500",
  category: "cabello",
    images: [
    "https://i.ibb.co/6cNLLP4X/image.png"
      ] 
},
{
  id: 131,
  name: "Pinza hawaiana tornasol",
  price: "COP 7,000",
  category: "cabello",
    images: [
    "https://i.ibb.co/7JmTDKVd/image.png"
      ] 
},
{
  id: 132,
  name: "Pinza hawaiana 2",
  price: "COP 7,600",
  category: "cabello",
    images: [
    "https://i.ibb.co/4gjCBksJ/image.png"
      ] 
},
{
  id: 133,
  name: "Pinza hawaiana grande",
  price: "COP 7,500",
  category: "cabello",
    images: [
    "https://cdn.quicksell.co/-O0ncwakDXzFVGQRcU-L/products/-Ore9xbwPdZgM0-d5jWt.jpg"
      ] 
}
];
  const logoUrl = "https://i.ibb.co/0p21PF9J/logo.jpg";

  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const catalogRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % products.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const featuredProducts = [
    products[featuredIndex % products.length],
    products[(featuredIndex + 1) % products.length],
    products[(featuredIndex + 2) % products.length],
  ];

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
const handleFavoriteClick = (product) => {
  setShowCatalog(true);

  // abrir la sección correcta
  setOpenSection(product.category);

  // esperar a que renderice y hacer scroll
  setTimeout(() => {
    catalogRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
};
  const decreaseQty = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (!exists) return prev;
      if (exists.qty === 1) return prev.filter((p) => p.id !== product.id);
      return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty - 1 } : p);
    });
  };

  const getQty = (id) => {
    const item = cart.find((p) => p.id === id);
    return item ? item.qty : 0;
  };
  const goToProduct = (anchor) => {
  setShowCatalog(true);

  setTimeout(() => {
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 300);
};

  const parsePrice = (price) => {
  if (!price) return 0;

  return Number(
    price.toString().replace(/[^0-9]/g, "")
  );
};

  const total = cart.reduce(
  (acc, item) => acc + parsePrice(item.price) * item.qty,
  0
);

  const formatTotal = (v) => "$" + v.toLocaleString("es-CO");

  const buildWhatsAppMessage = () => {
    if (cart.length === 0) return "Hola, quiero hacer un pedido";

    const items = cart.map((p, i) => `${i + 1}. ${p.name} x${p.qty} - ${p.price}`).join("%0A");

    return `Hola, quiero este pedido:%0A${items}%0A%0ATotal: ${formatTotal(total)}`;
  };

  const getProductsByCategory = (cat) => products.filter((p) => p.category === cat);

  const catalogSections = [
    { title: "Labios", key: "labios" },
    { title: "Cuidado facial", key: "cuidado_facial" },
    { title: "Cejas y pestañas", key: "cejas_pestanas" },
    { title: "Rubor", key: "rubor" },
    { title: "Paleta de sombras", key: "sombras" },
    { title: "Bases y corrector", key: "bases_corrector" },
    { title: "Polvos sueltos y compactos", key: "polvos" },
    { title: "Cabello", key: "cabello" }
  ];

  return (
    <div className="bg-pink-50 min-h-screen text-gray-800">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-pink-200 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-3">
          <img src={logoUrl} className={`rounded-full transition-all duration-300 ${scrolled ? "w-10 h-10" : "w-16 h-16"}`} />
          <div className="leading-tight">
            <h1 className={`font-bold transition-all duration-300 ${scrolled ? "text-lg" : "text-2xl"}`}>Lielashop Makeup</h1>
            <p className="text-sm text-pink-400 transition-all duration-300 opacity-100">
              Belleza y Maquillaje
            </p>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
  className="text-center py-16 bg-cover bg-center relative"
  style={{
    backgroundImage: "url(https://media.istockphoto.com/id/1658893205/es/foto/inventar-productos-en-la-vista-superior-de-fondo-rosa.jpg?s=612x612&w=0&k=20&c=XX_FdY2MVCSnlJY-D9BuC-C6qCJAqStGokQRAoD58Go=)"
  }}
>
  <div className="absolute inset-0 bg-white/70" />

  <div className="relative">
    <h1 className="text-5xl font-bold">
      La belleza empieza aquí ✨
    </h1>

    <p className="text-gray-600 mt-3">
      Descubre tus productos favoritos
    </p>
    <button
  onClick={() => {
    setShowCatalog(true);

    setTimeout(() => {
      catalogRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }}
  className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
>
  Comprar ahora
</button>
  </div>
</section>

      {/* FAVORITOS */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Favoritos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {featuredProducts.map((p) => (
  <div
    key={p.id}
    onClick={() => handleFavoriteClick(p)}
    className="bg-white rounded-xl shadow cursor-pointer hover:scale-[1.02] transition"
  >
              <ImageCarousel images={p.images || []} />
              <div className="p-4">
                <p className="font-semibold">{p.name}</p>
                <p className="text-pink-500 font-bold">{p.price}</p>
                {p.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {p.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
<div className="flex justify-center mt-4">
        <button
  onClick={() => {
    setShowCatalog((prev) => {
      const newValue = !prev;

      // si estás cerrando el catálogo, también cierras secciones
      if (prev === true) {
        setOpenSection(null);
      }

      return newValue;
    });
  }}
  className="bg-pink-500 text-white px-4 py-2 rounded-full"
>
  {showCatalog ? "Cerrar catálogo" : "Ver catálogo"}
</button>
  </div>
      </section>

      {/* CATÁLOGO */}
      {showCatalog && (
        <section ref={catalogRef} className="existing-classes py-10 px-4">
          {catalogSections.map((section) => {
  const isOpen = openSection === section.key;
  const items = getProductsByCategory(section.key);

  return (
    <div
  id={`section-${section.key}`}
  key={section.title}
  className="mb-6 scroll-mt-24"
>
      <button
       onClick={() => {
  setOpenSection(isOpen ? null : section.key);

  setTimeout(() => {
    const sectionElement = document.getElementById(`section-${section.key}`);

    sectionElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}}
        className="w-full flex justify-between items-center bg-pink-100 px-4 py-3 rounded-xl font-semibold text-pink-700"
      >
        <div className="flex flex-col items-start">
          <span className="text-gray-800 font-bold">
  {section.title}
</span>

          {/* línea decorativa */}
          <div className="w-12 h-1 bg-pink-500 mt-1 rounded-full"></div>
        </div>

        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {items.length === 0 ? (
            <p className="text-gray-400">Próximamente productos</p>
          ) : (
            items.map((product) => (
            <div
  id={product.anchor}
  key={product.id}
  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-3 scroll-mt-24"
>
               <ImageCarousel images={product.images} />
                <div className="p-4">
                  <p className="font-semibold">{product.name}</p>

                  {product.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {product.description}
                    </p>
                  )}

                  <p className="text-pink-500 font-bold">{product.price}</p>

                  <div className="flex justify-between items-center mt-3 bg-pink-50 rounded-full px-3 py-2">
                    <button onClick={() => decreaseQty(product)} className="w-9 h-9 bg-white rounded-full">−</button>
                    <span>{getQty(product.id)}</span>
                    <button onClick={() => addToCart(product)} className="w-9 h-9 bg-pink-500 text-white rounded-full">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
})}
        </section>
      )}

      {/* BANNER FRASE */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-2xl bg-gradient-to-r from-pink-200 via-pink-100 to-rose-100 py-10 text-center shadow-sm">
          <p className="text-pink-600 font-medium text-lg">
            Cada producto resalta tu belleza única ✨
          </p>
        </div>
      </section>

      {/* CART */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {cart.length > 0 ? (
          <>
            <button
              onClick={() => setShowSummary(true)}
              className="bg-pink-500 text-white px-4 py-3 rounded-full"
            >
              🛒 {cart.length}
            </button>

            <a
              href={`https://wa.me/573017170457?text=${buildWhatsAppMessage()}`}
              className="bg-green-500 text-white px-4 py-3 rounded-full"
            >
              WhatsApp
            </a>
          </>
        ) : (
          <a
            href={`https://wa.me/573017170457?text=${buildWhatsAppMessage()}`}
            className="bg-green-500 text-white px-4 py-3 rounded-full"
          >
            WhatsApp
          </a>
        )}
      </div>

      {/* MINI CART DRAWER */}
      {showSummary && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl p-4 z-50">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Carrito</h3>
              <button onClick={() => setShowSummary(false)}>✕</button>
            </div>

            <div className="mt-4 space-y-2">
              {cart.map((c) => (
                <div key={c.id} className="flex justify-between text-sm">
                  <span>{c.name} x{c.qty}</span>

<div className="text-xs text-gray-400">
  COP {formatTotal(parsePrice(c.price))} c/u
</div>

<span className="font-semibold">
  COP {formatTotal(parsePrice(c.price) * c.qty)}
</span>
                </div>
              ))}
            </div>

            <p className="mt-4 font-bold">Total: {formatTotal(total)}</p>

            <a
              href={`https://wa.me/573017170457?text=${buildWhatsAppMessage()}`}
              className="block mt-4 bg-green-500 text-white text-center py-3 rounded-full"
            >
              Finalizar compra
            </a>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-pink-200 bg-white py-8 text-center space-y-3">
        <p className="font-semibold">Lielashop Makeup</p>
        <p className="text-sm text-gray-500">Belleza y maquillaje</p>

        <div className="flex justify-center gap-4 pt-2">
          <a href="https://www.instagram.com/lielashop_makeup" target="_blank">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/people/Lielashop-Make-Up/61578019997912/?rdid=ZxbPrJxpS2yhKUal&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18WPPxJimF%2F" target="_blank">
            <FacebookIcon />
          </a>
        </div>
      </footer>

    </div>
  );
}