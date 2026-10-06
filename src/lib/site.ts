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
  if (page === 'home') return locale === 'hi' ? '/hi' : '/';
  return `${locale === 'hi' ? '/hi' : ''}/${page}`;
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
    intro: 'This frontend preview has no active enquiry form, account or document upload.',
    sections: [
      {
        title: 'No enquiry collection',
        text: 'This build does not accept enquiries through the preview form.'
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
        text: 'Public contact details and appointment submissions are not available in this preview.'
      }
    ]
  },
  footerLead: 'Explore the current areas of work.',
  footerAction: 'View all areas',
  footerLegal: 'The details of an individual matter require individual advice.'
};

const hi: typeof en = {
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
  initiative: 'कानूनी सहायता पहल — ए एस गोदारा फाउंडेशन ट्रस्ट',
  generalNotice:
    'यह केवल कार्य क्षेत्रों की जानकारी है। किसी विशेष मामले के लिए व्यक्तिगत सलाह आवश्यक है।',
  home: {
    title: 'कार्य क्षेत्र | अन्विता लीगल',
    description:
      'आपराधिक, पारिवारिक, दीवानी, बैंकिंग, सेवा और शिक्षा कानून के साथ दस्तावेज़, कानूनी सहायता और विवाह सेवाएँ।',
    eyebrow: 'कार्य क्षेत्र',
    heading: 'अगले कदम से पहले स्थिति को समझें।',
    intro:
      'आपराधिक, पारिवारिक और दीवानी कानून, बैंकिंग और ऋण वसूली, सेवा और शिक्षा कानून, दस्तावेज़ीकरण, कानूनी सहायता तथा विवाह सेवाओं के सूचीबद्ध कार्य देखें।',
    primary: 'कार्य क्षेत्र देखें',
    secondary: 'कानूनी सहायता पहल देखें',
    imageCaption: 'कार्य क्षेत्र और सेवाएँ।',
    supportTitle: 'कानून और कानूनी सहायता के क्षेत्र।',
    supportIntro: 'वर्तमान कार्य क्षेत्र और सेवाएँ देखें।',
    services: [
      {
        number: '01',
        title: 'आपराधिक कानून',
        text: 'चेक अनादरण, जमानत, शिकायतें, मुकदमे, कार्यवाही रद्द कराने और पुनरीक्षण की याचिकाएँ।'
      },
      {
        number: '02',
        title: 'पारिवारिक और वैवाहिक कानून',
        text: 'तलाक, भरण-पोषण, घरेलू हिंसा, बच्चों की अभिरक्षा और न्यायिक पृथक्करण।'
      },
      {
        number: '03',
        title: 'दस्तावेज़ीकरण और कानूनी सलाह',
        text: 'कानूनी नोटिस, न्यायालयी दस्तावेज़, समझौते और मुकदमे से पहले कानूनी राय।'
      },
      {
        number: '04',
        title: 'कानूनी सहायता पहल',
        text: 'पात्र व्यक्तियों को निःशुल्क या रियायती कानूनी मार्गदर्शन और आवेदनों में सहायता।'
      }
    ],
    approachTitle: 'सलाह, दस्तावेज़ और कार्यवाही।',
    approachIntro: 'सूचीबद्ध कार्य में परामर्श, दस्तावेज़ तैयार करना और प्रतिनिधित्व शामिल है।',
    steps: [
      { title: 'परामर्श', text: 'मुकदमे से पहले परामर्श और कानूनी राय।' },
      {
        title: 'दस्तावेज़ीकरण',
        text: 'हिंदी और अंग्रेज़ी में कानूनी नोटिस; समझौते, शपथपत्र और विलेख।'
      },
      {
        title: 'कार्यवाही',
        text: 'शिकायतें, मुकदमे, याचिकाएँ और ऋण वसूली अधिकरण के समक्ष प्रतिनिधित्व।'
      }
    ],
    topicsTitle: 'सूचीबद्ध कार्य क्षेत्र देखें।',
    topics: [
      'आपराधिक कानून',
      'पारिवारिक और वैवाहिक कानून',
      'बैंकिंग और ऋण वसूली',
      'विवाह और वैवाहिक सेवाएँ'
    ],
    workTitle: 'वर्तमान कार्य क्षेत्र।',
    workText: 'कानूनी सहायता पहल सहित सूचीबद्ध कार्य क्षेत्र देखें।',
    workLink: 'हमारा कार्य देखें',
    ctaTitle: 'संबंधित कार्य क्षेत्र खोजें।',
    ctaText: 'अपनी समस्या से जुड़े सूचीबद्ध विषय और सेवाएँ देखें।',
    ctaButton: 'सभी क्षेत्र देखें'
  },
  about: {
    title: 'परिचय | अन्विता लीगल',
    description: 'कार्य क्षेत्र और ए एस गोदारा फाउंडेशन ट्रस्ट की कानूनी सहायता पहल।',
    eyebrow: 'परिचय',
    heading: 'कानून, दस्तावेज़ और कानूनी सहायता।',
    intro: 'वर्तमान में सूचीबद्ध कार्य और सेवाओं का परिचय।',
    who: {
      title: 'हम कौन हैं',
      text: 'अन्विता लीगल में आपराधिक, पारिवारिक और वैवाहिक, दीवानी, बैंकिंग और ऋण वसूली तथा सेवा और शिक्षा कानून के कार्य सूचीबद्ध हैं।',
      name: 'सूचीबद्ध सेवाओं में दस्तावेज़ीकरण, विवाह और वैवाहिक सहायता तथा ए एस गोदारा फाउंडेशन ट्रस्ट की कानूनी सहायता पहल भी शामिल हैं।'
    },
    sections: [
      {
        title: 'कानून के क्षेत्र',
        text: 'आपराधिक कानून; पारिवारिक और वैवाहिक कानून; दीवानी कानून; बैंकिंग और ऋण वसूली; सेवा और शिक्षा कानून।'
      },
      {
        title: 'सेवाएँ',
        text: 'दस्तावेज़ीकरण और कानूनी सलाह; कानूनी सहायता पहल; विवाह और वैवाहिक सेवाएँ।'
      }
    ],
    principles: [
      {
        title: 'आपराधिक कानून',
        text: 'शिकायतें, जमानत, मुकदमे, कार्यवाही रद्द कराने और पुनरीक्षण की याचिकाएँ।'
      },
      {
        title: 'पारिवारिक और वैवाहिक कानून',
        text: 'तलाक, भरण-पोषण, घरेलू हिंसा और बच्चों की अभिरक्षा।'
      },
      {
        title: 'दीवानी कानून',
        text: 'वसूली, मानहानि, निषेधाज्ञा, घोषणा और संपत्ति विवाद।'
      },
      {
        title: 'बैंकिंग और ऋण वसूली',
        text: 'ऋण वसूली अधिकरण में प्रतिनिधित्व, उधारकर्ता का बचाव और SARFAESI से जुड़े मामले।'
      },
      {
        title: 'सेवा और शिक्षा कानून',
        text: 'सरकारी कर्मचारियों के दावे और छात्रों के अधिकारों से जुड़े विवाद।'
      }
    ],
    trust: {
      title: 'कानूनी सहायता पहल',
      text: 'ए एस गोदारा फाउंडेशन ट्रस्ट',
      items: [
        'पात्र व्यक्तियों को निःशुल्क या रियायती कानूनी मार्गदर्शन',
        'नागरिकों के अधिकारों और उपलब्ध कानूनी उपायों के बारे में जागरूकता',
        'अधिकारियों और सार्वजनिक कार्यालयों को दिए जाने वाले आवेदनों में सहायता'
      ]
    }
  },
  help: {
    title: 'कार्य क्षेत्र | अन्विता लीगल',
    description: 'अन्विता लीगल के वर्तमान कानूनी कार्य क्षेत्र और सेवाएँ।',
    eyebrow: 'कार्य क्षेत्र',
    heading: 'यहाँ सूचीबद्ध कार्य देखें।',
    intro: 'हर कार्य क्षेत्र और उसमें शामिल विषय देखें।'
  },
  work: {
    title: 'हमारा कार्य | अन्विता लीगल',
    description: 'वर्तमान में सूचीबद्ध कार्य क्षेत्र और सेवाएँ।',
    eyebrow: 'हमारा कार्य',
    heading: 'सूचीबद्ध कार्य का स्पष्ट परिचय।',
    intro: 'नीचे दिए गए हर क्षेत्र के अलग पेज पर उसमें शामिल विषय सूचीबद्ध हैं।',
    note: 'इस पूर्वावलोकन में व्यक्तिगत मुवक्किलों के मामले और उनके परिणाम प्रकाशित नहीं किए गए हैं।'
  },
  contact: {
    title: 'कानूनी सहायता | अन्विता लीगल',
    description: 'ए एस गोदारा फाउंडेशन ट्रस्ट की कानूनी सहायता पहल और दस्तावेज़ सेवाएँ।',
    eyebrow: 'कानूनी सहायता पहल',
    heading: 'मार्गदर्शन और दस्तावेज़ीकरण।',
    intro: 'कानूनी सहायता पहल और दस्तावेज़ीकरण तथा सलाह सेवाएँ नीचे सूचीबद्ध हैं।',
    aidTitle: 'कानूनी सहायता पहल',
    contactPending: 'सीधे सार्वजनिक संपर्क विवरण अभी उपलब्ध नहीं कराए गए हैं।',
    documentationTitle: 'दस्तावेज़ीकरण और कानूनी सलाह'
  },
  faq: {
    title: 'अक्सर पूछे जाने वाले सवाल | अन्विता लीगल',
    description: 'वर्तमान में सूचीबद्ध कार्य क्षेत्रों पर आधारित उत्तर।',
    eyebrow: 'सवाल',
    heading: 'सूचीबद्ध कार्य के बारे में सवाल।',
    items: [
      {
        q: 'कौन-से आपराधिक कानून संबंधी कार्य सूचीबद्ध हैं?',
        a: 'परक्राम्य लिखत अधिनियम की धारा 138 के तहत चेक अनादरण की शिकायतें और बचाव; जमानत और अग्रिम जमानत; आपराधिक शिकायतें दाखिल करना और उनका विरोध करना; सत्र और मजिस्ट्रेट न्यायालयों में मुकदमों में बचाव; कार्यवाही रद्द कराने और पुनरीक्षण की याचिकाएँ।'
      },
      {
        q: 'कानूनी सहायता पहल में क्या शामिल है?',
        a: 'पात्र व्यक्तियों को निःशुल्क या रियायती कानूनी मार्गदर्शन; नागरिकों के अधिकारों और उपलब्ध कानूनी उपायों के बारे में जागरूकता; अधिकारियों और सार्वजनिक कार्यालयों को दिए जाने वाले आवेदनों में सहायता।'
      },
      {
        q: 'कौन-सी विवाह संबंधी सेवाएँ सूचीबद्ध हैं?',
        a: 'कोर्ट मैरिज और विवाह संपन्न कराने में सहायता; विवाह पंजीकरण; विवाह प्रमाणपत्र के आवेदन; युगलों के लिए संरक्षण याचिकाएँ; और संबंधित शपथपत्र तथा दस्तावेज़।'
      }
    ]
  },
  privacy: {
    title: 'गोपनीयता | अन्विता लीगल',
    description: 'वर्तमान फ्रंटएंड पूर्वावलोकन की गोपनीयता जानकारी।',
    heading: 'गोपनीयता जानकारी',
    intro:
      'इस फ्रंटएंड पूर्वावलोकन में सक्रिय पूछताछ फ़ॉर्म, खाता या दस्तावेज़ अपलोड की सुविधा नहीं है।',
    sections: [
      {
        title: 'पूछताछ की जानकारी एकत्र नहीं की जाती',
        text: 'यह संस्करण पूर्वावलोकन फ़ॉर्म से पूछताछ स्वीकार नहीं करता।'
      },
      { title: 'फ़ॉन्ट', text: 'फ़ॉन्ट इसी वेबसाइट से उपलब्ध कराए जाते हैं।' },
      {
        title: 'विश्लेषण और होस्टिंग',
        text: 'इस संस्करण में तृतीय-पक्ष विश्लेषण की व्यवस्था नहीं की गई है। अंतिम होस्टिंग प्रदाता और उसके तकनीकी लॉग का विवरण प्रकाशित गोपनीयता सूचना में दिया जाना चाहिए।'
      },
      {
        title: 'गोपनीयता संपर्क',
        text: 'सार्वजनिक गोपनीयता संपर्क विवरण अभी उपलब्ध नहीं कराया गया है।'
      }
    ]
  },
  disclaimer: {
    title: 'अस्वीकरण | अन्विता लीगल',
    description: 'इस वेबसाइट पर दी गई जानकारी की सीमाएँ।',
    heading: 'महत्वपूर्ण जानकारी',
    intro:
      'सूचीबद्ध कार्य क्षेत्र सामान्य जानकारी हैं और किसी व्यक्तिगत मामले के तथ्यों पर सलाह नहीं देते।',
    sections: [
      {
        title: 'व्यक्तिगत सलाह',
        text: 'किसी विशेष मामले के तथ्यों और दस्तावेज़ों की समीक्षा योग्य पेशेवर से करानी चाहिए।'
      },
      {
        title: 'परिणाम का वादा नहीं',
        text: 'इस वेबसाइट की जानकारी किसी परिणाम की गारंटी नहीं देती।'
      },
      {
        title: 'पूर्वावलोकन',
        text: 'इस पूर्वावलोकन में सार्वजनिक संपर्क विवरण और अपॉइंटमेंट अनुरोध भेजने की सुविधा उपलब्ध नहीं है।'
      }
    ]
  },
  footerLead: 'वर्तमान कार्य क्षेत्र देखें।',
  footerAction: 'सभी क्षेत्र देखें',
  footerLegal: 'किसी व्यक्तिगत मामले के लिए व्यक्तिगत सलाह आवश्यक है।'
};
export const copy = { en, hi };
