import attarBar1 from './assets/stations/attar-bar-1.png';
import attarBar2 from './assets/stations/attar_bar_2.jpg';
import attarBar3 from './assets/stations/attar_bar_3.jpg';
import floral1 from './assets/stations/floral_1.jpg';
import floral2 from './assets/stations/floral_2.jpg';
import floral3 from './assets/stations/floral_3.jpg';
import floral4 from './assets/stations/floral_4.jpg';
import floral5 from './assets/stations/floral_5.jpg';
import perfumeBar1 from './assets/stations/perfume_bar_1.jpg';
import perfumeBar2 from './assets/stations/perfume_bar_2.jpg';
import perfumeBar3 from './assets/stations/perfume_bar_3.jpg';
import perfumeBar4 from './assets/stations/perfume_bar_4.jpg';
import perfumeBar5 from './assets/stations/perfume_bar_5.jpg';
import thappaMehendi1 from './assets/stations/thappa_mehendi_1.jpg';
import thappaMehendi2 from './assets/stations/thappa_mehendi_2.jpg';
import thappaMehendi3 from './assets/stations/thappa_mehendi_3.jpg';
import thappaMehendi4 from './assets/stations/thappa_mehendi_4.jpg';
import bangle1 from './assets/stations/bangle-1.png';
import bangle2 from './assets/stations/bangle_2.png';
import bangle3 from './assets/stations/bangle_3.png';
import caricature1 from './assets/stations/caricature_1.jpg';
import caricature2 from './assets/stations/caricature_2.jpg';
import caricature3 from './assets/stations/caricature_3.jpg';
import caricature4 from './assets/stations/caricature_4.jpg';
import caricature5 from './assets/stations/caricature_5.jpg';
import potli1 from './assets/stations/potli_1.jpg';
import potli2 from './assets/stations/potli_2.jpg';
import potli3 from './assets/stations/potli_3.jpg';
import potli4 from './assets/stations/potli_4.jpg';
import candy1 from './assets/stations/candy_1.jpg';
import candy2 from './assets/stations/candy_2.jpg';
import candy3 from './assets/stations/candy_3.jpg';
import candy4 from './assets/stations/candy_4.jpg';
import candy5 from './assets/stations/candy_5.jpg';

// Import images for occasions/categories
import weddingCollageImg from './assets/luxury_wedding_games_india.png';
import charmStall1 from './assets/stations/charm_stall_1.jpg';
import heroInteraction from './assets/hero-interaction.png';

export const STATIONS = [
  {
    id: 'attar-bar',
    name: 'Royal Attar Bar',
    nameHi: 'शाही अत्तर बार',
    description: 'Transport your guests to an era of royal luxury with exotic, handcrafted aromas blended live.',
    descriptionHi: 'हाथ से बने विदेशी सुगंधों के साथ अपने मेहमानों को शाही विलासिता के युग में ले जाएं।',
    image: attarBar1,
    gallery: [attarBar1, attarBar2, attarBar3],
    category: 'Premium Stalls',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-on-a-table-34490-large.mp4',
    popularFor: ['wedding-games', 'mehndi-activities', 'interactive-stalls']
  },
  {
    id: 'floral-jewellery',
    name: 'Artisanal Floral Jewellery',
    nameHi: 'फूलों के गहने',
    description: 'Live creation of bespoke floral ornaments for your guests, perfect for Mehndi and Haldi.',
    descriptionHi: 'मेहमानों के लिए विशेष रूप से तैयार किए गए फूलों के गहने, मेहंदी और हल्दी के लिए एकदम सही।',
    image: floral1,
    gallery: [floral1, floral2, floral3, floral4, floral5],
    category: 'Mehndi Activities',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-making-a-flower-crown-34487-large.mp4',
    popularFor: ['mehndi-activities', 'haldi-games']
  },
  {
    id: 'perfume-bar',
    name: 'Signature Perfume Blending',
    nameHi: 'परफ्यूम बार',
    description: 'A luxury experience where guests blend their own signature scents as a personalized wedding favor.',
    descriptionHi: 'एक लग्जरी अनुभव जहां मेहमान अपने स्वयं के सिग्नेचर इत्र को व्यक्तिगत शादी के उपहार के रूप में बनाते हैं।',
    image: perfumeBar1,
    gallery: [perfumeBar1, perfumeBar2, perfumeBar3, perfumeBar4, perfumeBar5],
    category: 'Premium Stalls',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-on-a-table-34490-large.mp4',
    popularFor: ['wedding-games', 'interactive-stalls']
  },
  {
    id: 'thappa-mehendi',
    name: 'Instant Thappa Mehendi',
    nameHi: 'थप्पा मेहंदी',
    description: 'Instant traditional elegance for guests who want the look without the long wait.',
    descriptionHi: 'बिना लंबे इंतजार के पारंपरिक लालित्य चाहने वाले मेहमानों के लिए तत्काल समाधान।',
    image: thappaMehendi1,
    gallery: [thappaMehendi1, thappaMehendi2, thappaMehendi3, thappaMehendi4],
    category: 'Mehndi Activities',
    popularFor: ['mehndi-activities']
  },
  {
    id: 'bangle-bar',
    name: 'Custom Bangle Bar',
    nameHi: 'चूड़ी स्टॉल',
    description: 'A vibrant celebration of colors where guests find their perfect match for the celebration.',
    descriptionHi: 'रंगों का एक जीवंत उत्सव जहाँ मेहमान उत्सव के लिए अपना आदर्श मैच पाते हैं।',
    image: bangle1,
    gallery: [bangle1, bangle2, bangle3],
    category: 'Interactive Stalls',
    popularFor: ['mehndi-activities', 'haldi-games', 'interactive-stalls']
  },
  {
    id: 'live-caricature',
    name: 'Live Wedding Caricatures',
    nameHi: 'लाइव कैरिकेचर',
    description: 'Whimsical, personalized portraits that capture laughter and become the most talked-about souvenir.',
    descriptionHi: 'हंसी-मजाक से भरे व्यक्तिगत चित्र जो कार्यक्रम का सबसे चर्चित उपहार बन जाते हैं।',
    image: caricature5,
    gallery: [caricature1, caricature2, caricature3, caricature4, caricature5],
    category: 'Entertainment',
    popularFor: ['wedding-games', 'interactive-stalls']
  },
  {
    id: 'potli-stall',
    name: 'Heritage Potli Customization',
    nameHi: 'पोटली स्टॉल',
    description: 'Heritage-inspired keepsakes that add a traditional soul and elegance to your modern celebration.',
    descriptionHi: 'विरासत से प्रेरित उपहार जो आपके आधुनिक उत्सव में एक पारंपरिक आत्मा और भव्यता जोड़ते हैं।',
    image: potli1,
    gallery: [potli1, potli2, potli3, potli4],
    category: 'Interactive Stalls',
    popularFor: ['interactive-stalls', 'mehndi-activities']
  },
  {
    id: '90s-candy',
    name: '90s Candy Nostalgia',
    nameHi: '90 के दशक की कैंडी',
    description: 'A sweet trip down memory lane that bridges generations through shared childhood joys.',
    descriptionHi: 'बचपन की साझा खुशियों के माध्यम से पीढ़ियों को जोड़ने वाली यादों की एक मीठी यात्रा।',
    image: candy1,
    gallery: [candy1, candy2, candy3, candy4, candy5],
    category: 'Entertainment',
    popularFor: ['wedding-games', 'haldi-games']
  }
];

export const PACKAGES = [
  {
    id: 'engagement-essential',
    name: 'Engagement Essential',
    nameHi: 'एंगेजमेंट एसेंशियल',
    basePrice: 15000,
    stationsCount: 2,
    guestsCount: 50,
    durationHours: 3
  },
  {
    id: 'celebration-signature',
    name: 'Celebration Signature',
    nameHi: 'सेलिब्रेशन सिग्नेचर',
    basePrice: 35000,
    stationsCount: 4,
    guestsCount: 150,
    durationHours: 4,
    isPopular: true
  },
  {
    id: 'luxury-unlimited',
    name: 'Luxury Unlimited',
    nameHi: 'लक्जरी अनलिमिटेड',
    basePrice: 75000,
    stationsCount: 6,
    guestsCount: 300,
    durationHours: 5
  }
];

export const CITIES = [
  {
    id: 'delhi',
    name: 'Delhi NCR',
    nameHi: 'दिल्ली एनसीआर',
    slug: 'delhi',
    title: 'Wedding Guest Engagement & Entertainment in Delhi NCR',
    description: 'Elevate your Delhi wedding with professional guest engagement services. From South Delhi farmhouses to Gurgaon luxury hotels.',
    keywords: 'wedding games Delhi, guest engagement Delhi, sangeet entertainment Delhi'
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    nameHi: 'लखनऊ',
    slug: 'lucknow',
    title: 'Professional Wedding Entertainment in Lucknow',
    description: 'Bringing Awadhi charm and interactive fun to weddings across Lucknow and Uttar Pradesh.',
    keywords: 'wedding games Lucknow, guest engagement Lucknow, UP wedding entertainment'
  },
  {
    id: 'kanpur',
    name: 'Kanpur',
    nameHi: 'कानपुर',
    slug: 'kanpur',
    title: 'Wedding Guest Engagement Services in Kanpur',
    description: 'The best interactive wedding games and haldi entertainment in Kanpur city.',
    keywords: 'wedding games Kanpur, guest engagement Kanpur, Kanpur wedding entertainment'
  },
  {
    id: 'indore',
    name: 'Indore',
    nameHi: 'इंदौर',
    slug: 'indore',
    title: 'Interactive Wedding Games & Engagement in Indore',
    description: 'The #1 choice for wedding guest engagement and entertainment in Indore and Madhya Pradesh.',
    keywords: 'wedding games Indore, MP wedding entertainment, indore event engagement'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    nameHi: 'जयपुर',
    slug: 'jaipur',
    title: 'Royal Wedding Guest Engagement in Jaipur',
    description: 'Making destination weddings in Jaipur more interactive and fun with heritage-inspired games and activities.',
    keywords: 'wedding games Jaipur, palace wedding entertainment, jaipur wedding activities'
  }
];

export const FAQS = [
  {
    question: 'What kind of wedding games do you provide?',
    questionHi: 'आप किस तरह के वेडिंग गेम्स प्रदान करते हैं?',
    answer: 'We provide a mix of interactive hosting games, DIY craft stations (Perfume Bar, Bangle Stall), and traditional activities like Thappa Mehendi. Every concept is tailored to your event theme.',
    answerHi: 'हम इंटरैक्टिव होस्टिंग गेम्स, DIY क्राफ्ट स्टेशन्स (परफ्यूम बार, चूड़ी स्टॉल) और थप्पा मेहंदी जैसी पारंपरिक गतिविधियों का मिश्रण प्रदान करते हैं।'
  },
  {
    question: 'Do you provide services outside major cities?',
    questionHi: 'क्या आप प्रमुख शहरों के बाहर सेवाएं प्रदान करते हैं?',
    answer: 'Yes! While we focus on Delhi, Lucknow, Indore, and Jaipur, we travel across India for premium destination weddings.',
    answerHi: 'हाँ! जबकि हम दिल्ली, लखनऊ, इंदौर और जयपुर पर ध्यान केंद्रित करते हैं, हम प्रीमियम डेस्टिनेशन शादियों के लिए पूरे भारत में यात्रा करते हैं।'
  },
  {
    question: 'How do you ensure guest participation?',
    questionHi: 'आप मेहमानों की भागीदारी कैसे सुनिश्चित करते हैं?',
    answer: 'We don’t just set up stalls. Our professional engagement team proactively invites guests, explains activities, and ensures everyone from kids to elders is having a great time.',
    answerHi: 'हम केवल स्टॉल नहीं लगाते हैं। हमारी पेशेवर टीम सक्रिय रूप से मेहमानों को आमंत्रित करती है, गतिविधियों के बारे में बताती है और यह सुनिश्चित करती है कि सभी का समय अच्छा बीते।'
  }
];

export const OCCASIONS = [
  {
    id: 'wedding-games',
    name: 'Wedding Games',
    nameHi: 'वेडिंग गेम्स',
    slug: 'wedding-games-india',
    image: weddingCollageImg,
    description: 'Professional hosting and high-energy games that keep every guest involved, not just watching.',
    popularFor: ['wedding-games']
  },
  {
    id: 'mehndi-activities',
    name: 'Mehndi Activities',
    nameHi: 'मेहंदी गतिविधियां',
    slug: 'mehndi-activities-india',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2000&auto=format&fit=crop',
    description: 'Interactive stalls and creative activities designed to add a vibrant soul to your Mehndi function.',
    popularFor: ['mehndi-activities']
  },
  {
    id: 'haldi-games',
    name: 'Haldi Games',
    nameHi: 'हल्दी गेम्स',
    slug: 'haldi-games-india',
    image: 'https://images.unsplash.com/photo-1621345155106-9399264c760d?auto=format&fit=crop&q=80',
    description: 'Fun, messy, and high-energy activities that turn your Haldi into a celebration everyone remembers.',
    popularFor: ['haldi-games']
  },
  {
    id: 'interactive-stalls',
    name: 'Interactive Stalls',
    nameHi: 'इंटरैक्टिव स्टॉल',
    slug: 'interactive-stalls-india',
    image: charmStall1,
    description: 'Unique experience zones where guests create their own personalized wedding favors and souvenirs.',
    popularFor: ['interactive-stalls']
  }
];

export const BLOG_POSTS = [
  {
    id: 'wedding-games-for-guests-in-india',
    title: 'Wedding Games for Guests in India',
    titleHi: 'भारत में मेहमानों के लिए वेडिंग गेम्स',
    date: '2024-04-15',
    category: 'Wedding Guide',
    categoryHi: 'वेडिंग गाइड',
    summary: 'Keeping guests engaged is the secret to a successful wedding. Discover top-rated games for Indian weddings.',
    summaryHi: 'मेहमानों को व्यस्त रखना एक सफल शादी का रहस्य है। भारतीय शादियों के लिए टॉप-रेटेड गेम्स खोजें।',
    image: weddingCollageImg,
    readTime: '8 min read',
    fullContent: `
      <h2>The Secret to a High-Energy Indian Wedding</h2>
      <p>Most Indian weddings focus heavily on decor and food, but the real soul of the party is <strong>Guest Engagement</strong>.</p>
    `
  },
  {
    id: 'mehndi-function-activities-ideas',
    title: 'Mehndi Function Activities Ideas',
    titleHi: 'मेहंदी फंक्शन गतिविधियों के विचार',
    date: '2024-04-18',
    category: 'Activities',
    categoryHi: 'गतिविधियां',
    summary: 'Make your Mehndi function unforgettable with these interactive stalls and activities.',
    summaryHi: 'इन इंटरैक्टिव स्टालों और गतिविधियों के साथ अपने मेहंदी समारोह को अविस्मरणीय बनाएं।',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2000&auto=format&fit=crop',
    readTime: '5 min read',
    fullContent: `
      <h2>Mehndi Engagement Ideas</h2>
      <p>Interactive stalls like a custom bangle bar or floral jewellery making.</p>
    `
  },
  {
    id: 'haldi-ceremony-games-guide',
    title: 'Haldi Ceremony Games Guide',
    titleHi: 'हल्दी समारोह खेल गाइड',
    date: '2024-04-20',
    category: 'Games',
    categoryHi: 'खेल',
    summary: 'High-energy games that turn your Haldi into a celebration everyone remembers.',
    summaryHi: 'उच्च ऊर्जा वाले खेल जो आपकी हल्दी को एक ऐसे उत्सव में बदल देते हैं जिसे हर कोई याद रखता है।',
    image: 'https://images.unsplash.com/photo-1621345155106-9399264c760d?auto=format&fit=crop&q=80',
    readTime: '6 min read',
    fullContent: `
      <h2>Fun Haldi Games</h2>
      <p>Incorporate messy, fun, and high-energy games into the yellow morning.</p>
    `
  }
];
