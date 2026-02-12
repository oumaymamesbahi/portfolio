import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { baseMeta } from '~/utils/meta';
import { Fragment } from 'react';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description: 'Contactez-moi via LinkedIn, email, téléphone ou GitHub',
  });
};

const contactMethods = [
  {
    id: 'linkedin',
    icon: 'linkedin',
    label: 'LinkedIn',
    value: 'www.linkedin.com/in/oumayma-mesbahi',
    href: 'https://www.linkedin.com/in/oumayma-mesbahi',
    description: 'Connectons-nous professionnellement',
  },
  {
    id: 'email',
    icon: 'email',
    label: 'Email',
    value: 'oumaymamesbahi75@gmail.com',
    href: 'mailto:oumaymamesbahi75@gmail.com',
    description: 'Envoyez-moi un message',
  },
  {
    id: 'phone',
    icon: 'phone',
    label: 'Téléphone',
    value: '+212 704492151',
    href: 'tel:+212704492151',
    description: 'Appelez-moi directement',
  },
  {
    id: 'github',
    icon: 'github',
    label: 'GitHub',
    value: 'github.com/oumaymamesbahi',
    href: 'https://github.com/oumaymamesbahi',
    description: 'Découvrez mes projets',
  },
];

export const Contact = () => {
  return (
    <Fragment>
      <Section className={styles.contact}>
        {/* Background animé */}
        <div className={styles.backgroundGradient}>
          <div className={styles.gradientOrb} data-orb="1" />
          <div className={styles.gradientOrb} data-orb="2" />
          <div className={styles.gradientOrb} data-orb="3" />
        </div>

        <div className={styles.contactInfo}>
          {/* En-tête avec titre gradient */}
          <div className={styles.header}>
            <Heading className={styles.title} level={3} as="h1">
              <DecoderText text="Restons en Contact" start delay={300} />
            </Heading>
            <Text className={styles.subtitle} size="l" as="p">
              N'hésitez pas à me contacter pour discuter de projets, d'opportunités ou
              simplement pour échanger.
            </Text>
          </div>

          <Divider className={styles.divider} />

          {/* Grille de cartes de contact */}
          <div className={styles.contactGrid}>
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className={styles.contactCard}
                style={{ '--index': index }}
              >
                <div className={styles.cardGlow} />
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      <Button
                        iconOnly
                        className={styles.iconButton}
                        icon={method.icon}
                        href={method.href}
                        aria-label={method.label}
                      />
                    </div>
                    <div className={styles.cardInfo}>
                      <Text className={styles.cardLabel} size="s" weight="medium">
                        {method.label}
                      </Text>
                      <Text className={styles.cardDescription} size="xs">
                        {method.description}
                      </Text>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <Button
                      secondary
                      iconHoverShift
                      className={styles.contactButton}
                      icon="arrow-right"
                      iconEnd
                      href={method.href}
                    >
                      {method.value}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section CTA */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <Heading className={styles.ctaTitle} level={4} as="h2">
                Prêt à collaborer ?
              </Heading>
              <Text className={styles.ctaText} size="l">
                Je suis toujours ouverte à de nouvelles opportunités et collaborations
                passionnantes.
              </Text>
              <Button
                className={styles.primaryCta}
                icon="send"
                href="mailto:oumaymamesbahi75@gmail.com"
              >
                Envoyez un message
              </Button>
            </div>
          </div>
        </div>
        <Footer className={styles.footer} />
      </Section>
    </Fragment>
  );
};