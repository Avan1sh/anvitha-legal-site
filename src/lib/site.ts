export type Locale = 'en' | 'hi';
export type PageKey =
  'home' | 'about' | 'how-we-help' | 'our-work' | 'get-help' | 'faq' | 'privacy' | 'disclaimer';

export const pages: PageKey[] = [
  'home',
  'about',
  'how-we-help',
  'our-work',
  'get-help',
  'faq',
  'privacy',
  'disclaimer'
];

export function urlFor(page: PageKey, locale: Locale): string {
  const slug = page === 'home' ? '' : page;
  return `${locale === 'hi' ? '/hi' : ''}${slug ? `/${slug}` : '/'}`;
}

export const facts = {
  name: 'Anvitha Legal',
  trust: 'A S Godara Foundation Trust',
  // The owner has not supplied public contact or office details.
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  serviceCity: null as string | null
};

const en = {
  langName: 'English',
  nav: {
    home: 'Home',
    about: 'About',
    'how-we-help': 'Areas of work',
    'our-work': 'Our work',
    'get-help': 'Legal aid',
    faq: 'FAQs',
    privacy: 'Privacy',
    disclaimer: 'Disclaimer'
  },
  menu: 'Menu',
  switchLanguage: 'हिंदी',
  initiative: 'Legal Aid Initiative — A S Godara Foundation Trust',
  generalNotice:
    'Information about areas of work only. The details of any matter require individual advice.',
  home: {
    title: 'Areas of work | Anvitha Legal',
    description:
      'Criminal, family, civil, banking, service and education law, documentation, legal aid and marriage services.',
    eyebrow: 'Areas of work',
    heading: 'Find clarity before your next step.',
    intro:
      'Explore the listed areas of work in criminal, family and civil law, banking and debt recovery, service and education law, documentation, legal aid and marriage services.',
    primary: 'Explore areas of work',
    secondary: 'View legal aid initiative',
    imageCaption: 'Areas of work and services.',
    supportTitle: 'Work across law and legal aid.',
    supportIntro: 'Explore the current areas of work and services.',
    services: [
      {
        number: '01',
        title: 'Criminal Law',
        text: 'Cheque dishonour, bail, complaints, trials, quashing and revision petitions.'
      },
      {
        number: '02',
        title: 'Family & Matrimonial Law',
        text: 'Divorce, maintenance, domestic violence, custody and judicial separation.'
      },
      {
        number: '03',
        title: 'Documentation & Advisory',
        text: 'Legal notices, court documents, agreements and pre-litigation opinions.'
      },
      {
        number: '04',
        title: 'Legal Aid Initiative',
        text: 'Free or concessional legal guidance for eligible persons and assistance with applications.'
      }
    ],
    approachTitle: 'Advice, documents and proceedings.',
    approachIntro: 'The listed work includes consultation, drafting and representation.',
    steps: [
      {
        title: 'Consultation',
        text: 'Pre-litigation consultation and opinions.'
      },
      {
        title: 'Documentation',
        text: 'Legal notices in Hindi and English; agreements, affidavits and deeds.'
      },
      {
        title: 'Proceedings',
        text: 'Complaints, trials, petitions and representation before the Debts Recovery Tribunal.'
      }
    ],
    topicsTitle: 'Explore the listed areas.',
    topics: [
      'Criminal Law',
      'Family & Matrimonial Law',
      'Banking & Debt Recovery',
      'Marriage & Matrimonial Services'
    ],
    workTitle: 'The current scope of work.',
    workText: 'Browse the listed areas of work, including the legal aid initiative.',
    workLink: 'Explore our work',
    ctaTitle: 'Find the relevant area of work.',
    ctaText: 'Review the listed matters and services to identify the area that fits your concern.',
    ctaButton: 'View all areas'
  },
  about: {
    title: 'About | Anvitha Legal',
    description: 'Areas of work and the Legal Aid Initiative of A S Godara Foundation Trust.',
    eyebrow: 'About',
    heading: 'Law, documentation and legal aid.',
    intro: 'A clear view of the currently listed work and services.',
    who: {
      title: 'Who we are',
      text: 'Anvitha Legal lists work in criminal, family and matrimonial, civil, banking and debt recovery, and service and education law.',
      name: 'The listed services also include documentation, marriage and matrimonial assistance, and a Legal Aid Initiative of A S Godara Foundation Trust.'
    },
    sections: [
      {
        title: 'Areas of law',
        text: 'Criminal Law; Family & Matrimonial Law; Civil Law; Banking & Debt Recovery; Service & Education Law.'
      },
      {
        title: 'Services',
        text: 'Documentation & Advisory; Legal Aid Initiative; Marriage & Matrimonial Services.'
      }
    ],
    principles: [
      { title: 'Criminal Law', text: 'Complaints, bail, trials, quashing and revision petitions.' },
      {
        title: 'Family & Matrimonial Law',
        text: 'Divorce, maintenance, domestic violence and child custody.'
      },
      {
        title: 'Civil Law',
        text: 'Recovery, defamation, injunction, declaration and property disputes.'
      },
      {
        title: 'Banking & Debt Recovery',
        text: 'DRT representation, borrower defence and SARFAESI matters.'
      },
      {
        title: 'Service & Education Law',
        text: 'Government employee claims and student-rights disputes.'
      }
    ],
    trust: {
      title: 'Legal Aid Initiative',
      text: 'A S Godara Foundation Trust',
      items: [
        'Free or concessional legal guidance for eligible persons',
        "Awareness on citizens' rights and remedies",
        'Assistance with applications to authorities and public offices'
      ]
    }
  },
  help: {
    title: 'Areas of work | Anvitha Legal',
    description: 'The current areas of law and services listed by Anvitha Legal.',
    eyebrow: 'Areas of work',
    heading: 'See the work listed here.',
    intro: 'Explore each area and the matters included in it.'
  },
  work: {
    title: 'Our work | Anvitha Legal',
    description: 'The currently listed areas of work and services.',
    eyebrow: 'Our work',
    heading: 'A clear view of the work listed.',
    intro: 'Each area below has a dedicated page showing the matters listed within it.',
    note: 'Individual client matters and case results are not published in this preview.'
  },
  contact: {
    title: 'Legal aid | Anvitha Legal',
    description: 'Legal Aid Initiative of A S Godara Foundation Trust and documentation services.',
    eyebrow: 'Legal aid initiative',
    heading: 'Guidance and documentation.',
    intro: 'The Legal Aid Initiative and Documentation & Advisory services are listed below.',
    aidTitle: 'Legal Aid Initiative',
    contactPending: 'Direct public contact details have not been provided yet.',
    documentationTitle: 'Documentation & Advisory'
  },
  faq: {
    title: 'Frequently asked questions | Anvitha Legal',
    description: 'Answers based on the currently listed areas of work.',
    eyebrow: 'Questions',
    heading: 'Questions about the listed work.',
    items: [
      {
        q: 'What criminal law work is listed?',
        a: 'Cheque dishonour complaints and defence under Section 138, NI Act; bail and anticipatory bail; filing and contesting criminal complaints; defence in sessions and magistrate trials; quashing and revision petitions.'
      },
      {
        q: 'What is included in the Legal Aid Initiative?',
        a: "Free or concessional legal guidance for eligible persons; awareness on citizens' rights and remedies; assistance with applications to authorities and public offices."
      },
      {
        q: 'What marriage services are listed?',
        a: 'Court marriage and solemnisation assistance; registration of marriage; marriage certificate applications; protection petitions for couples; and related affidavits and documentation.'
      }
    ]
  },
  privacy: {
    title: 'Privacy | Anvitha Legal',
    description: 'Privacy information for the current frontend preview.',
    heading: 'Privacy information',
    intro: 'This frontend preview has no enquiry form, account or document upload.',
    sections: [
      {
        title: 'No enquiry collection',
        text: 'This build does not accept enquiries through a form.'
      },
      { title: 'Fonts', text: 'Fonts are served by this site.' },
      {
        title: 'Analytics and hosting',
        text: 'This build does not configure third-party analytics. The final hosting provider and its technical logs must be documented in a published privacy notice.'
      },
      { title: 'Privacy contact', text: 'A public privacy contact has not been provided yet.' }
    ]
  },
  disclaimer: {
    title: 'Disclaimer | Anvitha Legal',
    description: 'Limits of the information on this website.',
    heading: 'Important information',
    intro:
      'The listed areas of work are general information and do not address the facts of an individual matter.',
    sections: [
      {
        title: 'Individual advice',
        text: 'A qualified professional should review the facts and documents of a specific matter.'
      },
      {
        title: 'No promised result',
        text: 'No outcome is guaranteed by the information on this site.'
      },
      {
        title: 'Preview',
        text: 'Public contact details and an appointment route are not available in this preview.'
      }
    ]
  },
  footerLead: 'Explore the current areas of work.',
  footerAction: 'View all areas',
  footerLegal: 'The details of an individual matter require individual advice.'
};

const hi = {
  ...en,
  langName: 'हिंदी',
  nav: {
    home: 'होम',
    about: 'परिचय',
    'how-we-help': 'कार्य क्षेत्र',
    'our-work': 'हमारा कार्य',
    'get-help': 'कानूनी सहायता',
    faq: 'सवाल-जवाब',
    privacy: 'गोपनीयता',
    disclaimer: 'अस्वीकरण'
  },
  menu: 'मेन्यू',
  switchLanguage: 'English',
  generalNotice:
    'यह कार्य क्षेत्रों की जानकारी है। किसी विशेष मामले के लिए व्यक्तिगत सलाह आवश्यक है।',
  home: {
    ...en.home,
    title: 'कार्य क्षेत्र | अन्विता लीगल',
    description: 'अन्विता लीगल के वर्तमान कार्य क्षेत्र और सेवाएँ।',
    eyebrow: 'कार्य क्षेत्र',
    heading: 'अगला कदम स्पष्ट करें।',
    intro:
      'आपराधिक, पारिवारिक, दीवानी, बैंकिंग, सेवा और शिक्षा कानून के साथ दस्तावेज़, कानूनी सहायता और विवाह सेवाओं के सूचीबद्ध क्षेत्र देखें।',
    primary: 'कार्य क्षेत्र देखें',
    secondary: 'कानूनी सहायता देखें',
    imageCaption: 'कार्य क्षेत्र और सेवाएँ।',
    supportTitle: 'कानून और कानूनी सहायता का कार्य।',
    supportIntro: 'वर्तमान कार्य क्षेत्र और सेवाएँ नीचे देखें।',
    approachTitle: 'सलाह, दस्तावेज़ और कार्यवाही।',
    approachIntro: 'सूचीबद्ध कार्य में परामर्श, दस्तावेज़ तैयार करना और प्रतिनिधित्व शामिल है।',
    topicsTitle: 'सूचीबद्ध क्षेत्र देखें।',
    workTitle: 'वर्तमान कार्य क्षेत्र।',
    workText: 'कानूनी सहायता पहल सहित सूचीबद्ध कार्य क्षेत्र देखें।',
    workLink: 'हमारा कार्य देखें',
    ctaTitle: 'संबंधित कार्य क्षेत्र खोजें।',
    ctaText: 'अपनी समस्या से जुड़े सूचीबद्ध विषय और सेवाएँ देखें।',
    ctaButton: 'सभी क्षेत्र देखें'
  },
  about: {
    ...en.about,
    title: 'परिचय | अन्विता लीगल',
    description: 'कार्य क्षेत्र और ए एस गोदारा फाउंडेशन ट्रस्ट की कानूनी सहायता पहल।',
    eyebrow: 'परिचय',
    heading: 'कानून, दस्तावेज़ और सहायता।',
    intro: 'वर्तमान में सूचीबद्ध कार्य और सेवाओं का परिचय।',
    who: { ...en.about.who, title: 'हम कौन हैं' },
    sections: en.about.sections,
    trust: { ...en.about.trust, title: 'कानूनी सहायता पहल' }
  },
  help: {
    ...en.help,
    title: 'कार्य क्षेत्र | अन्विता लीगल',
    description: 'अन्विता लीगल के सूचीबद्ध कार्य क्षेत्र और सेवाएँ।',
    eyebrow: 'कार्य क्षेत्र',
    heading: 'सूचीबद्ध कार्य देखें।',
    intro: 'हर क्षेत्र और उससे जुड़े विषय देखें।'
  },
  work: {
    ...en.work,
    title: 'हमारा कार्य | अन्विता लीगल',
    description: 'वर्तमान सूचीबद्ध कार्य क्षेत्र और सेवाएँ।',
    eyebrow: 'हमारा कार्य',
    heading: 'कार्य क्षेत्रों का परिचय।',
    intro: 'हर क्षेत्र के पेज पर उससे जुड़े सूचीबद्ध विषय दिए गए हैं।',
    note: 'इस प्रीव्यू में व्यक्तिगत मामलों और उनके परिणामों को प्रकाशित नहीं किया गया है।'
  },
  contact: {
    ...en.contact,
    title: 'कानूनी सहायता | अन्विता लीगल',
    description: 'ए एस गोदारा फाउंडेशन ट्रस्ट की कानूनी सहायता पहल और दस्तावेज़ सेवाएँ।',
    eyebrow: 'कानूनी सहायता पहल',
    heading: 'मार्गदर्शन और दस्तावेज़।',
    intro: 'कानूनी सहायता पहल और दस्तावेज़ सेवाएँ नीचे दी गई हैं।',
    aidTitle: 'कानूनी सहायता पहल',
    contactPending: 'सीधे सार्वजनिक संपर्क विवरण अभी उपलब्ध नहीं कराए गए हैं।',
    documentationTitle: 'दस्तावेज़ और सलाह'
  },
  faq: {
    ...en.faq,
    title: 'सवाल-जवाब | अन्विता लीगल',
    description: 'वर्तमान सूचीबद्ध कार्य क्षेत्र से जुड़े उत्तर।',
    eyebrow: 'सवाल',
    heading: 'सूचीबद्ध कार्य के बारे में सवाल।'
  },
  privacy: {
    ...en.privacy,
    title: 'गोपनीयता | अन्विता लीगल',
    description: 'वर्तमान फ्रंटएंड प्रीव्यू की गोपनीयता जानकारी।',
    heading: 'गोपनीयता जानकारी',
    intro: 'इस फ्रंटएंड प्रीव्यू में अनुरोध फ़ॉर्म, खाता या दस्तावेज़ अपलोड नहीं है।'
  },
  disclaimer: {
    ...en.disclaimer,
    title: 'अस्वीकरण | अन्विता लीगल',
    description: 'इस वेबसाइट पर दी गई जानकारी की सीमाएँ।',
    heading: 'महत्वपूर्ण जानकारी',
    intro:
      'सूचीबद्ध कार्य क्षेत्र सामान्य जानकारी हैं और किसी व्यक्तिगत मामले के तथ्यों का समाधान नहीं करते।'
  },
  footerLead: 'वर्तमान कार्य क्षेत्र देखें।',
  footerAction: 'सभी क्षेत्र देखें',
  footerLegal: 'किसी व्यक्तिगत मामले की जानकारी के लिए व्यक्तिगत सलाह आवश्यक है।'
};

export const copy = { en, hi };
