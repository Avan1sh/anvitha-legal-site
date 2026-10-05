import expertiseOutline from '../content/expertise.json' with { type: 'json' };
import type { Locale } from './site';

export type PracticeGroup = 'expertise' | 'services';

export interface PracticeItem {
  slug: string;
  title: string;
  group: PracticeGroup;
  items: string[];
}

export const workAreas: PracticeItem[] = expertiseOutline.map((area) => ({
  ...area,
  group: area.group as PracticeGroup
}));

export const practiceGroups: Record<PracticeGroup, PracticeItem[]> = {
  expertise: workAreas.filter((item) => item.group === 'expertise'),
  services: workAreas.filter((item) => item.group === 'services')
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
