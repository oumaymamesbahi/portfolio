import profileImgLarge from '~/assets/profile-large.jpg';
import profileImgPlaceholder from '~/assets/profile-placeholder.jpg';
import profileImg from '~/assets/profile.jpg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Bonjour" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Je suis Oumayma Mesbahi, élève ingénieure en informatique à l'
      <Link href="https://www.uae.ac.ma">École Nationale des Sciences Appliquées d'Al Hoceima</Link>.
      Je conçois et développe des applications web, desktop et embarquées, avec une forte appétence
      pour les données et l'IA. De la modélisation au déploiement, mes projets m'ont construit une
      vision complète du cycle de vie logiciel.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Une polyvalence que je mets aujourd'hui au service de systèmes d'information évolutifs,
      dans des contextes collaboratifs à dimension internationale. Actuellement stagiaire chez{' '}
      <Link href="https://www.expleogroup.com">Expleo Group</Link> à Tanger, je travaille sur
      l'automatisation intelligente des données et les systèmes décisionnels. N'hésitez pas à me
      contacter pour discuter de nouveaux projets !
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Envoyez-moi un message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  À propos
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                  width={960}
                  height={1280}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Oumayma Mesbahi - Élève ingénieure en informatique"
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

