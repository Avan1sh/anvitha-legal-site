type DisclaimerLanguage = {
  title: string;
  intro: string;
  clauses: { label: string; text: string }[];
};

export const entryDisclaimer: Record<'en' | 'hi', DisclaimerLanguage> = {
  en: {
    title: 'DISCLAIMER',
    intro:
      'The Bar Council of India does not permit advocates to solicit work or advertise. By clicking “I Agree”, you acknowledge and confirm that:',
    clauses: [
      {
        label: '(a)',
        text: 'you are seeking information about Anvitha Legal, a legal awareness and aid initiative of A S Godara Foundation Trust, of your own accord and there has been no advertisement, personal communication, solicitation, invitation or inducement of any sort from us or any of our members or associates;'
      },
      {
        label: '(b)',
        text: 'the information on this website is provided for general awareness only and does not constitute legal advice;'
      },
      {
        label: '(c)',
        text: 'no advocate client relationship is created by accessing this website or by communicating with us through it; and'
      },
      {
        label: '(d)',
        text: 'Anvitha Legal and A S Godara Foundation Trust are not liable for any consequence of any action taken by you relying on the material or information on this website.'
      }
    ]
  },
  hi: {
    title: 'अस्वीकरण (डिस्क्लेमर)',
    intro:
      'भारतीय विधिज्ञ परिषद (बार काउंसिल ऑफ इंडिया) अधिवक्ताओं को विज्ञापन अथवा कार्य याचना की अनुमति नहीं देती। “मैं सहमत हूँ” पर क्लिक करके आप यह स्वीकार करते हैं कि —',
    clauses: [
      {
        label: '(क)',
        text: 'आप अपनी स्वेच्छा से अन्विता लीगल (ए एस गोदारा फाउंडेशन ट्रस्ट की एक विधिक पहल) के बारे में जानकारी प्राप्त कर रहे हैं तथा हमारी ओर से किसी प्रकार का विज्ञापन, याचना अथवा प्रलोभन नहीं दिया गया है;'
      },
      {
        label: '(ख)',
        text: 'इस वेबसाइट पर उपलब्ध जानकारी केवल सामान्य जागरूकता हेतु है और यह विधिक परामर्श नहीं है;'
      },
      {
        label: '(ग)',
        text: 'इस वेबसाइट के उपयोग अथवा इसके माध्यम से संपर्क करने से कोई अधिवक्ता–मुवक्किल संबंध स्थापित नहीं होता; तथा'
      },
      {
        label: '(घ)',
        text: 'इस वेबसाइट की सामग्री पर निर्भर होकर की गई किसी भी कार्रवाई के परिणाम के लिए अन्विता लीगल एवं ए एस गोदारा फाउंडेशन ट्रस्ट उत्तरदायी नहीं होंगे।'
      }
    ]
  }
};
