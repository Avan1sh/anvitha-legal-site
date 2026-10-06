import ScrollReveal from './ScrollReveal';

interface Props {
  eyebrow: string;
  title: string;
  intro: string;
}

export default function SupportHeadingReveal({ eyebrow, title, intro }: Props) {
  return (
    <ScrollReveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{intro}</p>
    </ScrollReveal>
  );
}
