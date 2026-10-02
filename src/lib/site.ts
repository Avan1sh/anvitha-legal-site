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
  legalAidPhone: '15100',
  emergencyPhone: '112',
  legalAidUrl: 'https://nalsa.gov.in/',
  // Public office details have not been verified with the client.
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  serviceCity: null as string | null
};

export const copy = {
  en: {
    langName: 'English',
    nav: {
      home: 'Home',
      about: 'About',
      'how-we-help': 'How we help',
      'our-work': 'Our work',
      'get-help': 'Get help',
      faq: 'FAQs',
      privacy: 'Privacy',
      disclaimer: 'Disclaimer'
    },
    menu: 'Menu',
    switchLanguage: 'हिंदी',
    initiative: 'A legal awareness initiative of A S Godara Foundation Trust',
    generalNotice:
      'General information only. No advocate–client relationship is created by using this site.',
    home: {
      title: 'Legal awareness and aid | Anvitha Legal',
      description:
        'Understand your options, prepare your next step, and find a route to legal aid with Anvitha Legal.',
      eyebrow: 'When the path is unclear',
      heading: 'Find clarity before your next step.',
      intro:
        'Legal problems can feel overwhelming when you do not know where to begin. Anvitha Legal helps people understand their rights, prepare basic documents, and reach appropriate legal help.',
      primary: 'See how we help',
      secondary: 'Find a way forward',
      imageCaption: 'A clearer path starts with the right information.',
      supportTitle: 'Help that begins with understanding.',
      supportIntro:
        'We focus on explaining the route ahead, so you can decide what to do with confidence.',
      services: [
        {
          number: '01',
          title: 'Legal awareness',
          text: 'Plain-language guides and community learning about everyday rights and remedies.'
        },
        {
          number: '02',
          title: 'Guidance and direction',
          text: 'Information about available forums, authorities, and likely next steps.'
        },
        {
          number: '03',
          title: 'Documentation support',
          text: 'Help understanding applications, complaints, representations, and RTI requests.'
        },
        {
          number: '04',
          title: 'Access to legal aid',
          text: 'Support in approaching Legal Services Authorities and independent enrolled advocates where needed.'
        }
      ],
      approachTitle: 'A process centred on your choice.',
      approachIntro:
        'Every situation is different. The first useful step is often to identify the issue and the right place to take it.',
      steps: [
        {
          title: 'Name the concern',
          text: 'Make a brief note of the issue and where it happened.'
        },
        {
          title: 'Understand the route',
          text: 'Learn which authority, procedure, or document may be relevant.'
        },
        {
          title: 'Choose your next step',
          text: 'Decide whether to approach legal aid, an authority, or an independent advocate.'
        }
      ],
      topicsTitle: 'Everyday issues, explained simply.',
      topics: [
        'Family and safety',
        'Property and civil matters',
        'Consumer concerns',
        'Work and welfare'
      ],
      workTitle: 'Work rooted in access.',
      workText:
        'Awareness, guidance, and connection to the right help form the centre of this initiative. The Our Work page explains how those efforts are organised.',
      workLink: 'Explore our work',
      ctaTitle: 'Not sure where to begin?',
      ctaText:
        'Start with the kind of concern you have. If your matter is urgent, use the official emergency or legal-aid routes.',
      ctaButton: 'Find help'
    },
    about: {
      title: 'About us | Anvitha Legal',
      description:
        'Learn about Anvitha Legal, its mission and values, and A S Godara Foundation Trust.',
      eyebrow: 'Our purpose',
      heading: 'A more understandable path to justice.',
      intro: 'Legal awareness, honest guidance, and a fair chance for every person to be heard.',
      who: {
        title: 'Who we are',
        text: 'Anvitha Legal is a legal help initiative of A S Godara Foundation Trust, a public charitable trust registered at Charkhi Dadri, Haryana on 22.02.2024. The Trust works for social welfare, and Anvitha Legal is its commitment to making the justice system more understandable and accessible to ordinary people.',
        // The Trust should confirm this name interpretation before indexing the site.
        name: 'The name “Anvitha” reflects our belief that justice must be connected to people’s real lives — not distant, intimidating or reserved for those who can afford it.'
      },
      sections: [
        {
          title: 'Our mission',
          text: 'To spread legal awareness, guide people through legal processes with honesty and compassion, and help ensure that no one is denied justice because of poverty, lack of information or social disadvantage.'
        },
        {
          title: 'Our vision',
          text: 'A society where every person knows their rights, trusts the process, and has a fair chance to be heard.'
        }
      ],
      principles: [
        {
          title: 'Integrity',
          text: 'We give honest information, even when it is not what someone hopes to hear.'
        },
        {
          title: 'Dignity',
          text: 'Every person is treated with respect, regardless of background.'
        },
        { title: 'Confidentiality', text: 'What you share with us is handled with care.' },
        {
          title: 'Accessibility',
          text: 'Simple language, reachable people, no unnecessary barriers.'
        },
        {
          title: 'Independence',
          text: 'We work in the interest of the person seeking help, not for any commercial gain.'
        }
      ],
      trust: {
        title: 'About A S Godara Foundation Trust',
        text: 'A S Godara Foundation Trust works for social welfare. Anvitha Legal is one way the Trust seeks to make legal information and processes more understandable and accessible to ordinary people.',
        // The supplied e-stamp certificate and GRN are not a verified deed registration number.
        registrationTitle: 'Registration details',
        placeLabel: 'Registered at',
        place: 'Charkhi Dadri, Haryana',
        dateLabel: 'Date of registration',
        date: '22.02.2024'
      }
    },
    help: {
      title: 'How we help | Anvitha Legal',
      description:
        'Explore the types of legal awareness, guidance, documentation support, and legal-aid access offered by Anvitha Legal.',
      eyebrow: 'The right place to begin',
      heading: 'Understand the issue. Find the route.',
      intro:
        'Our work is organised around the questions people bring, from family and property concerns to consumer issues and access to public services.',
      sections: [
        {
          title: 'Family and safety',
          text: 'General information on family processes, maintenance, domestic violence protections, and routes to appropriate help.'
        },
        {
          title: 'Police and criminal process',
          text: 'Awareness about complaints, FIRs, rights during investigation, and where to seek qualified representation.'
        },
        {
          title: 'Property and civil matters',
          text: 'Direction on common disputes involving property, inheritance, tenancy, agreements, and recovery.'
        },
        {
          title: 'Consumer and money concerns',
          text: 'Information about consumer complaints, goods and services, banking issues, and available forums.'
        },
        {
          title: 'Work and public benefits',
          text: 'Guidance on wages, employment concerns, pensions, and applications to public authorities.'
        },
        {
          title: 'Documents and applications',
          text: 'Support in understanding complaints, representations, RTI requests, and other basic paperwork.'
        }
      ]
    },
    work: {
      title: 'Our work | Anvitha Legal',
      description:
        'How Anvitha Legal approaches legal awareness, guidance, documentation, and access to legal aid.',
      eyebrow: 'Our work in practice',
      heading: 'Making the first step easier to take.',
      intro:
        'The initiative focuses on useful information and a route to the right support. These are the kinds of work described in our founding brief; individual programmes and results will be added only when records and permissions are verified.',
      sections: [
        {
          title: 'Legal literacy',
          text: 'Plain-language explanations and awareness programmes intended to help people recognise rights, remedies, and important documents.'
        },
        {
          title: 'A clearer route',
          text: 'Helping people identify a relevant authority, service, procedure, or legal-aid channel before they take action.'
        },
        {
          title: 'Practical documentation',
          text: 'Assistance with basic applications, representations, complaints, and requests that often form the first step.'
        },
        {
          title: 'Connections to help',
          text: 'Helping eligible people approach Legal Services Authorities and others find an independent qualified advocate.'
        }
      ],
      note: 'We do not publish identifiable client matters, case outcomes, testimonials, or programme statistics without verification and appropriate review.'
    },
    contact: {
      title: 'Get help | Anvitha Legal',
      description:
        'Find official emergency and legal-aid routes and learn how to contact Anvitha Legal when verified details are available.',
      eyebrow: 'Start here',
      heading: 'Find the right place to begin.',
      intro:
        'If you need urgent help, use the official routes below. Direct contact details for this initiative will be added when they are verified.',
      urgentTitle: 'If your situation is urgent',
      urgentText:
        'For an immediate threat or emergency in India, call 112. For free legal-aid assistance, NALSA lists its helpline as 15100.',
      contactPending: 'The initiative’s direct public contact details are being confirmed.',
      prepareTitle: 'Before you seek help',
      prepareItems: [
        'Note the issue and the district where it happened.',
        'Make a short timeline of important dates.',
        'Keep relevant documents ready for a qualified adviser.'
      ],
      prepareNote: 'Do not send personal documents or detailed evidence through this preview.'
    },
    faq: {
      title: 'Frequently asked questions | Anvitha Legal',
      description:
        'Answers to common questions about Anvitha Legal, legal aid, court representation, and using this website.',
      eyebrow: 'Common questions',
      heading: 'A little more clarity.',
      items: [
        {
          q: 'Is Anvitha Legal a law firm?',
          a: 'No. The supplied brief describes it as a not-for-profit legal awareness and aid initiative of A S Godara Foundation Trust. It does not itself appear in court.'
        },
        {
          q: 'Will you represent me in court?',
          a: 'Court representation is done by enrolled advocates. We aim to help people understand legal-aid routes and how to approach an independent advocate where needed.'
        },
        {
          q: 'Does using this site create an advocate–client relationship?',
          a: 'No. Reading this site does not create an advocate–client relationship.'
        },
        {
          q: 'Can anyone guarantee the result of a legal matter?',
          a: 'No. Outcomes depend on the facts, evidence, applicable law, and the decision of the relevant authority or court.'
        }
      ]
    },
    privacy: {
      title: 'Privacy | Anvitha Legal',
      description: 'How this website approaches personal information in its current preview state.',
      heading: 'Privacy information',
      intro:
        'This frontend preview does not accept enquiries or collect details through a form. Its production privacy notice must be reviewed before launch.',
      sections: [
        {
          title: 'No enquiry collection',
          text: 'There is no form, account, document upload, or application database in this build.'
        },
        {
          title: 'External links and fonts',
          text: 'Fonts are served by this site. Official help links open external services with their own privacy practices.'
        },
        {
          title: 'Analytics and hosting',
          text: 'This build does not configure third-party analytics. The final hosting provider and its technical logs must be documented in the published privacy notice.'
        },
        {
          title: 'Privacy contact',
          text: 'A verified privacy contact will be added before public launch.'
        }
      ]
    },
    disclaimer: {
      title: 'Disclaimer | Anvitha Legal',
      description: 'Important limits of the information published on this website.',
      heading: 'Important information',
      intro:
        'This website is for general legal awareness. It is not a substitute for advice from a qualified advocate about the facts of your matter.',
      sections: [
        {
          title: 'No representation through this site',
          text: 'Browsing this website does not create an advocate–client relationship. Court appearances are made only by enrolled advocates.'
        },
        {
          title: 'No promised outcome',
          text: 'No result is guaranteed. Laws and procedures can change, and urgent deadlines need prompt advice from an appropriate professional or authority.'
        },
        {
          title: 'Independent decisions',
          text: 'You remain responsible for decisions about your matter. If you need representation, contact a qualified advocate or the relevant Legal Services Authority.'
        }
      ]
    },
    footerLead: 'Clarity is a meaningful first step.',
    footerAction: 'Find your route',
    footerLegal:
      'General legal awareness only. No advocate–client relationship is created through this website.'
  },
  hi: {
    langName: 'हिंदी',
    nav: {
      home: 'होम',
      about: 'परिचय',
      'how-we-help': 'हम कैसे मदद करते हैं',
      'our-work': 'हमारा कार्य',
      'get-help': 'सहायता पाएँ',
      faq: 'सवाल-जवाब',
      privacy: 'गोपनीयता',
      disclaimer: 'अस्वीकरण'
    },
    menu: 'मेनू',
    switchLanguage: 'English',
    initiative: 'ए एस गोदारा फाउंडेशन ट्रस्ट की विधिक जागरूकता पहल',
    generalNotice:
      'यह केवल सामान्य जानकारी है। इस वेबसाइट के उपयोग से अधिवक्ता–मुवक्किल संबंध नहीं बनता।',
    home: {
      title: 'विधिक जागरूकता और सहायता | अन्विता लीगल',
      description:
        'अन्विता लीगल के साथ अपने विकल्प समझें, अगला कदम तय करें और विधिक सहायता का रास्ता खोजें।',
      eyebrow: 'जब रास्ता स्पष्ट न हो',
      heading: 'अगला कदम समझकर उठाएँ।',
      intro:
        'कानूनी समस्या में शुरुआत कहाँ से करें, यह समझना कठिन हो सकता है। अन्विता लीगल अधिकारों की सामान्य जानकारी, बुनियादी दस्तावेज़ों को समझने और उचित सहायता तक पहुँचने में मदद करती है।',
      primary: 'हमारी सहायता देखें',
      secondary: 'अगला रास्ता खोजें',
      imageCaption: 'सही जानकारी से रास्ता स्पष्ट होता है।',
      supportTitle: 'मदद की शुरुआत समझ से होती है।',
      supportIntro:
        'हम उपलब्ध रास्तों को सरल भाषा में समझाने पर ध्यान देते हैं, ताकि आप सोच-समझकर निर्णय ले सकें।',
      services: [
        {
          number: '01',
          title: 'विधिक जागरूकता',
          text: 'दैनिक अधिकारों और उपायों पर सरल जानकारी और सामुदायिक कार्यक्रम।'
        },
        {
          number: '02',
          title: 'मार्गदर्शन',
          text: 'संबंधित मंच, प्राधिकरण और संभावित अगले कदम की सामान्य जानकारी।'
        },
        {
          number: '03',
          title: 'दस्तावेज़ सहायता',
          text: 'आवेदन, शिकायत, अभ्यावेदन और आरटीआई अनुरोध समझने में मदद।'
        },
        {
          number: '04',
          title: 'विधिक सहायता तक पहुँच',
          text: 'ज़रूरत के अनुसार विधिक सेवा प्राधिकरण या स्वतंत्र नामांकित अधिवक्ता तक पहुँचने का मार्ग।'
        }
      ],
      approachTitle: 'निर्णय आपका, रास्ता समझने में साथ हमारा।',
      approachIntro:
        'हर स्थिति अलग होती है। सबसे पहले समस्या और उससे जुड़े सही मंच को पहचानना उपयोगी होता है।',
      steps: [
        {
          title: 'समस्या पहचानें',
          text: 'समस्या और उसके स्थान का संक्षिप्त नोट बना लें।'
        },
        {
          title: 'रास्ता समझें',
          text: 'जानें कि कौन सा प्राधिकरण, प्रक्रिया या दस्तावेज़ प्रासंगिक हो सकता है।'
        },
        {
          title: 'अगला कदम चुनें',
          text: 'विधिक सहायता, संबंधित विभाग या स्वतंत्र अधिवक्ता से संपर्क का निर्णय लें।'
        }
      ],
      topicsTitle: 'रोज़मर्रा के मुद्दे, सरल भाषा में।',
      topics: ['परिवार और सुरक्षा', 'संपत्ति और दीवानी मामले', 'उपभोक्ता मुद्दे', 'काम और कल्याण'],
      workTitle: 'हमारे काम का आधार है पहुँच।',
      workText:
        'जागरूकता, मार्गदर्शन और उचित सहायता तक पहुँच इस पहल के केंद्र में हैं। हमारा कार्य पृष्ठ इन प्रयासों का स्वरूप बताता है।',
      workLink: 'हमारा कार्य देखें',
      ctaTitle: 'समझ नहीं आ रहा कहाँ से शुरू करें?',
      ctaText:
        'पहले अपनी समस्या का प्रकार पहचानें। मामला अत्यावश्यक हो तो आधिकारिक आपातकालीन या विधिक सहायता सेवा का उपयोग करें।',
      ctaButton: 'सहायता का रास्ता देखें'
    },
    about: {
      title: 'अन्विता लीगल का परिचय',
      description:
        'अन्विता लीगल, उसके उद्देश्य और मूल्यों तथा ए एस गोदारा फाउंडेशन ट्रस्ट के बारे में जानें।',
      eyebrow: 'हमारा उद्देश्य',
      heading: 'न्याय तक पहुँच का रास्ता समझने योग्य हो।',
      intro: 'कानूनी जागरूकता, ईमानदार मार्गदर्शन और हर व्यक्ति को अपनी बात रखने का उचित अवसर।',
      who: {
        title: 'हम कौन हैं',
        text: 'अन्विता लीगल, ए एस गोदारा फाउंडेशन ट्रस्ट की कानूनी सहायता पहल है। यह सार्वजनिक धर्मार्थ ट्रस्ट 22.02.2024 को चरखी दादरी, हरियाणा में पंजीकृत हुआ। ट्रस्ट सामाजिक कल्याण के लिए काम करता है और अन्विता लीगल न्याय व्यवस्था को आम लोगों के लिए अधिक समझने योग्य और सुलभ बनाने की उसकी प्रतिबद्धता है।',
        name: '“अन्विता” नाम हमारे इस विश्वास को दर्शाता है कि न्याय लोगों के वास्तविक जीवन से जुड़ा होना चाहिए — दूर, डराने वाला या केवल उन लोगों के लिए नहीं जो उसका खर्च उठा सकते हैं।'
      },
      sections: [
        {
          title: 'हमारा उद्देश्य',
          text: 'कानूनी जागरूकता फैलाना, ईमानदारी और संवेदना के साथ लोगों को कानूनी प्रक्रियाओं में मार्गदर्शन देना और यह सुनिश्चित करने में मदद करना कि गरीबी, जानकारी की कमी या सामाजिक वंचना के कारण किसी को न्याय से वंचित न होना पड़े।'
        },
        {
          title: 'हमारी परिकल्पना',
          text: 'ऐसा समाज जहाँ हर व्यक्ति अपने अधिकार जानता हो, प्रक्रिया पर विश्वास करता हो और उसे अपनी बात रखने का उचित अवसर मिले।'
        }
      ],
      principles: [
        {
          title: 'ईमानदारी',
          text: 'हम सच और स्पष्ट जानकारी देते हैं, भले ही वह किसी की आशा के अनुरूप न हो।'
        },
        {
          title: 'गरिमा',
          text: 'हर व्यक्ति के साथ उसकी पृष्ठभूमि की परवाह किए बिना सम्मान से व्यवहार किया जाता है।'
        },
        { title: 'गोपनीयता', text: 'आप हमसे जो साझा करते हैं, उसे सावधानी से संभाला जाता है।' },
        { title: 'सुलभता', text: 'सरल भाषा, पहुँच में रहने वाले लोग और अनावश्यक बाधाएँ नहीं।' },
        {
          title: 'स्वतंत्रता',
          text: 'हम सहायता चाहने वाले व्यक्ति के हित में काम करते हैं, किसी व्यावसायिक लाभ के लिए नहीं।'
        }
      ],
      trust: {
        title: 'ए एस गोदारा फाउंडेशन ट्रस्ट के बारे में',
        text: 'ए एस गोदारा फाउंडेशन ट्रस्ट सामाजिक कल्याण के लिए काम करता है। अन्विता लीगल के माध्यम से ट्रस्ट कानूनी जानकारी और प्रक्रियाओं को आम लोगों के लिए अधिक समझने योग्य और सुलभ बनाने का प्रयास करता है।',
        registrationTitle: 'पंजीकरण विवरण',
        placeLabel: 'पंजीकरण स्थान',
        place: 'चरखी दादरी, हरियाणा',
        dateLabel: 'पंजीकरण तिथि',
        date: '22.02.2024'
      }
    },
    help: {
      title: 'हम कैसे मदद करते हैं | अन्विता लीगल',
      description:
        'विधिक जागरूकता, मार्गदर्शन, दस्तावेज़ सहायता और विधिक सहायता तक पहुँच के बारे में जानें।',
      eyebrow: 'शुरुआत का सही स्थान',
      heading: 'मुद्दा समझें। रास्ता पहचानें।',
      intro:
        'परिवार, संपत्ति, उपभोक्ता मामलों और सार्वजनिक सेवाओं सहित विभिन्न प्रश्नों के लिए हम सामान्य जानकारी और सही दिशा पर ध्यान देते हैं।',
      sections: [
        {
          title: 'परिवार और सुरक्षा',
          text: 'पारिवारिक प्रक्रियाओं, भरण-पोषण, घरेलू हिंसा से संरक्षण और उचित सहायता तक पहुँच की सामान्य जानकारी।'
        },
        {
          title: 'पुलिस और आपराधिक प्रक्रिया',
          text: 'शिकायत, एफआईआर, जाँच के दौरान अधिकार और योग्य प्रतिनिधित्व पाने के रास्तों की जानकारी।'
        },
        {
          title: 'संपत्ति और दीवानी मामले',
          text: 'संपत्ति, उत्तराधिकार, किरायेदारी, समझौते और वसूली से जुड़े सामान्य विवादों की दिशा।'
        },
        {
          title: 'उपभोक्ता और धन संबंधी मुद्दे',
          text: 'वस्तुओं, सेवाओं, बैंकिंग समस्याओं और उपलब्ध उपभोक्ता मंचों की जानकारी।'
        },
        {
          title: 'काम और सार्वजनिक लाभ',
          text: 'वेतन, रोज़गार संबंधी चिंताओं, पेंशन और सरकारी विभागों को आवेदन के बारे में मार्गदर्शन।'
        },
        {
          title: 'दस्तावेज़ और आवेदन',
          text: 'शिकायत, अभ्यावेदन, आरटीआई अनुरोध और बुनियादी दस्तावेज़ों को समझने में सहायता।'
        }
      ]
    },
    work: {
      title: 'हमारा कार्य | अन्विता लीगल',
      description:
        'अन्विता लीगल के विधिक जागरूकता, मार्गदर्शन और विधिक सहायता तक पहुँच के कार्य को समझें।',
      eyebrow: 'काम का स्वरूप',
      heading: 'पहला कदम थोड़ा आसान बने।',
      intro:
        'यह पहल उपयोगी जानकारी और उचित सहायता तक पहुँच पर केंद्रित है। यहाँ परिचय में बताए गए कार्य का स्वरूप दिया गया है। व्यक्तिगत कार्यक्रम और परिणाम उनके रिकॉर्ड तथा अनुमति की पुष्टि के बाद ही जोड़े जाएँगे।',
      sections: [
        {
          title: 'विधिक साक्षरता',
          text: 'अधिकार, उपाय और आवश्यक दस्तावेज़ समझने में मदद करने वाली सरल जानकारी और जागरूकता गतिविधियाँ।'
        },
        {
          title: 'स्पष्ट दिशा',
          text: 'कदम उठाने से पहले संबंधित प्राधिकरण, सेवा, प्रक्रिया या विधिक सहायता का रास्ता पहचानना।'
        },
        {
          title: 'दस्तावेज़ सहयोग',
          text: 'आवेदन, अभ्यावेदन, शिकायत और शुरुआती अनुरोधों को समझने में सहायता।'
        },
        {
          title: 'सहायता से जोड़ना',
          text: 'पात्र लोगों को विधिक सेवा प्राधिकरण तक और अन्य लोगों को स्वतंत्र योग्य अधिवक्ता तक पहुँचने का मार्ग बताना।'
        }
      ],
      note: 'पहचान योग्य मुवक्किल संबंधी जानकारी, मामलों के परिणाम, प्रशंसापत्र या कार्यक्रमों के आँकड़े सत्यापन और उचित समीक्षा के बिना प्रकाशित नहीं किए जाते।'
    },
    contact: {
      title: 'सहायता पाएँ | अन्विता लीगल',
      description: 'आधिकारिक आपातकालीन और विधिक सहायता सेवाओं के बारे में जानें।',
      eyebrow: 'यहाँ से शुरू करें',
      heading: 'सही शुरुआत का रास्ता खोजें।',
      intro:
        'तत्काल सहायता चाहिए तो नीचे दिए आधिकारिक माध्यमों का उपयोग करें। इस पहल के सीधे संपर्क विवरण पुष्टि होने पर जोड़े जाएँगे।',
      urgentTitle: 'स्थिति अत्यावश्यक हो तो',
      urgentText:
        'भारत में तत्काल खतरे या आपातस्थिति के लिए 112 पर कॉल करें। नालसा विधिक सहायता हेल्पलाइन 15100 बताता है।',
      contactPending: 'इस पहल के सीधे सार्वजनिक संपर्क विवरण की पुष्टि की जा रही है।',
      prepareTitle: 'सहायता लेने से पहले',
      prepareItems: [
        'समस्या और संबंधित जिले का संक्षिप्त नोट बना लें।',
        'महत्वपूर्ण तारीखों का क्रम लिख लें।',
        'योग्य सलाहकार के लिए संबंधित दस्तावेज़ तैयार रखें।'
      ],
      prepareNote: 'इस प्रीव्यू पर निजी दस्तावेज़ या विस्तृत साक्ष्य न भेजें।'
    },
    faq: {
      title: 'अक्सर पूछे जाने वाले सवाल | अन्विता लीगल',
      description:
        'अन्विता लीगल, विधिक सहायता और इस वेबसाइट के उपयोग से जुड़े सामान्य सवालों के जवाब।',
      eyebrow: 'सामान्य प्रश्न',
      heading: 'कुछ और स्पष्टता।',
      items: [
        {
          q: 'क्या अन्विता लीगल लॉ फर्म है?',
          a: 'नहीं। उपलब्ध परिचय इसे ए एस गोदारा फाउंडेशन ट्रस्ट की गैर-लाभकारी विधिक जागरूकता और सहायता पहल बताता है। यह स्वयं अदालत में पेश नहीं होती।'
        },
        {
          q: 'क्या आप अदालत में मेरा प्रतिनिधित्व करेंगे?',
          a: 'अदालत में प्रतिनिधित्व नामांकित अधिवक्ता करते हैं। हमारा उद्देश्य विधिक सहायता के रास्ते और आवश्यकता पड़ने पर स्वतंत्र अधिवक्ता तक पहुँच समझाना है।'
        },
        {
          q: 'क्या वेबसाइट के उपयोग से अधिवक्ता–मुवक्किल संबंध बनता है?',
          a: 'नहीं। यह वेबसाइट पढ़ने से ऐसा संबंध नहीं बनता।'
        },
        {
          q: 'क्या किसी कानूनी मामले के परिणाम की गारंटी हो सकती है?',
          a: 'नहीं। परिणाम तथ्यों, साक्ष्य, लागू कानून और संबंधित प्राधिकरण या अदालत के निर्णय पर निर्भर करता है।'
        }
      ]
    },
    privacy: {
      title: 'गोपनीयता | अन्विता लीगल',
      description: 'वर्तमान प्रीव्यू में यह वेबसाइट व्यक्तिगत जानकारी से कैसे संबंधित है।',
      heading: 'गोपनीयता जानकारी',
      intro:
        'इस फ्रंटएंड प्रीव्यू पर अनुरोध स्वीकार नहीं किए जाते और कोई फ़ॉर्म व्यक्तिगत जानकारी नहीं लेता। प्रकाशन से पहले गोपनीयता सूचना की समीक्षा आवश्यक है।',
      sections: [
        {
          title: 'अनुरोध की जानकारी नहीं ली जाती',
          text: 'इस संस्करण में कोई फ़ॉर्म, खाता, दस्तावेज़ अपलोड या आवेदन डेटाबेस नहीं है।'
        },
        {
          title: 'बाहरी लिंक और फ़ॉन्ट',
          text: 'फ़ॉन्ट इसी वेबसाइट से लोड होते हैं। आधिकारिक सहायता लिंक बाहरी सेवाओं पर जाते हैं, जिनकी अपनी गोपनीयता व्यवस्था है।'
        },
        {
          title: 'विश्लेषण और होस्टिंग',
          text: 'इस संस्करण में तृतीय-पक्ष विश्लेषण सेवा नहीं जोड़ी गई है। अंतिम होस्टिंग सेवा और उसके तकनीकी लॉग का विवरण प्रकाशित सूचना में देना होगा।'
        },
        {
          title: 'गोपनीयता संपर्क',
          text: 'सार्वजनिक प्रकाशन से पहले सत्यापित गोपनीयता संपर्क जोड़ा जाएगा।'
        }
      ]
    },
    disclaimer: {
      title: 'अस्वीकरण | अन्विता लीगल',
      description: 'इस वेबसाइट पर दी गई जानकारी की महत्वपूर्ण सीमाएँ।',
      heading: 'महत्वपूर्ण जानकारी',
      intro:
        'यह वेबसाइट सामान्य विधिक जागरूकता के लिए है। यह आपके मामले के तथ्यों पर योग्य अधिवक्ता की सलाह का विकल्प नहीं है।',
      sections: [
        {
          title: 'वेबसाइट से प्रतिनिधित्व नहीं',
          text: 'वेबसाइट देखने से अधिवक्ता–मुवक्किल संबंध नहीं बनता। अदालत में केवल नामांकित अधिवक्ता पेश होते हैं।'
        },
        {
          title: 'परिणाम की गारंटी नहीं',
          text: 'किसी परिणाम की गारंटी नहीं दी जाती। कानून और प्रक्रियाएँ बदल सकती हैं; समय-सीमा वाले मामलों में तुरंत उचित सलाह लें।'
        },
        {
          title: 'निर्णय आपका',
          text: 'अपने मामले के निर्णय आप स्वयं लेते हैं। प्रतिनिधित्व चाहिए तो योग्य अधिवक्ता या संबंधित विधिक सेवा प्राधिकरण से संपर्क करें।'
        }
      ]
    },
    footerLead: 'स्पष्टता एक सार्थक पहला कदम है।',
    footerAction: 'सहायता का रास्ता देखें',
    footerLegal: 'केवल सामान्य विधिक जागरूकता। इस वेबसाइट से अधिवक्ता–मुवक्किल संबंध नहीं बनता।'
  }
} as const;
