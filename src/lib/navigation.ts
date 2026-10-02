import type { Locale } from './site';

export type PracticeGroup = 'expertise' | 'services';

export interface PracticeItem {
  slug: string;
  title: string;
}

export const practiceGroups: Record<PracticeGroup, PracticeItem[]> = {
  expertise: [
    { slug: 'divorce-lawyer', title: 'Divorce Lawyer' },
    { slug: 'domestic-violence-lawyer', title: 'Domestic Violence Lawyer' },
    { slug: 'matrimonial-lawyer', title: 'Matrimonial Lawyer' },
    { slug: 'family-disputes-lawyer', title: 'Family Disputes Lawyer' },
    { slug: 'bail-matters-lawyer', title: 'Bail Matters Lawyer' },
    { slug: 'cheque-bounce-lawyer', title: 'Cheque Bounce Lawyer' },
    { slug: 'civil-lawyer', title: 'Civil Lawyer' },
    { slug: 'criminal-lawyer', title: 'Criminal Lawyer' },
    { slug: 'supreme-court-lawyer', title: 'Supreme Court Lawyer' },
    { slug: 'corporate-lawyer', title: 'Corporate Lawyer' }
  ],
  services: [
    { slug: 'child-custody-lawyer', title: 'Child Custody Lawyer' },
    { slug: 'legal-documentation', title: 'Legal Documentation' },
    { slug: 'debt-recovery-tribunal-lawyer', title: 'Debt Recovery Tribunal Lawyer' },
    { slug: 'property-lawyer', title: 'Property Lawyer' },
    { slug: 'delhi-high-court-lawyer', title: 'Delhi High Court Lawyer' },
    { slug: 'cat-service-matters-lawyer', title: 'CAT Service Matters Lawyer' },
    { slug: 'rera-matters', title: 'RERA Matters' },
    { slug: 'consumer-disputes-lawyer', title: 'Consumer Disputes Lawyer' },
    { slug: 'cyber-law-cases-lawyer', title: 'Cyber Law Cases Lawyer' },
    { slug: 'court-marriage-registration', title: 'Court Marriage Registration' }
  ]
};

export const headerLabels = {
  en: {
    expertise: 'Our expertise',
    services: 'Our services',
    contact: 'Contact us',
    appointment: 'Book an appointment'
  },
  hi: {
    expertise: 'हमारी विशेषज्ञता',
    services: 'हमारी सेवाएँ',
    contact: 'संपर्क करें',
    appointment: 'अपॉइंटमेंट बुक करें'
  }
} as const;

export function practicePath(group: PracticeGroup, slug: string): string {
  return `/${group}/${slug}`;
}

export function localizedPath(path: string, locale: Locale): string {
  return locale === 'hi' ? (path === '/' ? '/hi/' : `/hi${path}`) : path;
}
