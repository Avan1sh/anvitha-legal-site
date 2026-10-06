import expertiseOutline from '../content/expertise.json' with { type: 'json' };
import hindiOutline from '../content/expertise.hi.json' with { type: 'json' };
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

const hindiWorkAreas: PracticeItem[] = hindiOutline.map((area) => ({
  ...area,
  group: area.group as PracticeGroup
}));

export function workAreasFor(locale: Locale): PracticeItem[] {
  return locale === 'hi' ? hindiWorkAreas : workAreas;
}

export const practiceGroups: Record<PracticeGroup, PracticeItem[]> = {
  expertise: workAreas.filter((item) => item.group === 'expertise'),
  services: workAreas.filter((item) => item.group === 'services')
};

export function practiceGroupsFor(locale: Locale): Record<PracticeGroup, PracticeItem[]> {
  const areas = workAreasFor(locale);
  return {
    expertise: areas.filter((item) => item.group === 'expertise'),
    services: areas.filter((item) => item.group === 'services')
  };
}

export function localizePractice(item: PracticeItem, locale: Locale): PracticeItem {
  if (locale === 'en') return item;
  const translated = hindiWorkAreas.find((area) => area.slug === item.slug);
  if (!translated || translated.group !== item.group) {
    throw new Error(`Missing Hindi practice translation for ${item.slug}`);
  }
  return translated;
}

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
  return locale === 'hi' ? (path === '/' ? '/hi' : `/hi${path}`) : path;
}
