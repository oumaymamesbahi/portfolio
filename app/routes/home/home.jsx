import audiospectraTextureLarge from '~/assets/audiospectra-app-large.jpg';
import audiospectraTexturePlaceholder from '~/assets/audiospectra-app-placeholder.jpg';
import audiospectraTexture from '~/assets/audiospectra-app.jpg';
import eservicesTextureLarge from '~/assets/eservices-dashboard-large.jpg';
import eservicesTexturePlaceholder from '~/assets/eservices-dashboard-placeholder.jpg';
import eservicesTexture from '~/assets/eservices-dashboard.jpg';
import loganalyzerTextureLarge from '~/assets/loganalyzer-large.jpg';
import loganalyzerTexturePlaceholder from '~/assets/loganalyzer-placeholder.jpg';
import loganalyzerTexture from '~/assets/loganalyzer.jpg';
import nuloanTexture2Large from '~/assets/nuloan-dashboard-large.jpg';
import nuloanTexture2Placeholder from '~/assets/nuloan-dashboard-placeholder.jpg';
import nuloanTexture2 from '~/assets/nuloan-dashboard.jpg';
import nuloanTextureLarge from '~/assets/nuloan-login-large.jpg';
import nuloanTexturePlaceholder from '~/assets/nuloan-login-placeholder.jpg';
import nuloanTexture from '~/assets/nuloan-login.jpg';
import rideshareTexture2Large from '~/assets/rideshare-trips-large.jpg';
import rideshareTexture2Placeholder from '~/assets/rideshare-trips-placeholder.jpg';
import rideshareTexture2 from '~/assets/rideshare-trips.jpg';
import rideshareTextureLarge from '~/assets/rideshare-welcome-large.jpg';
import rideshareTexturePlaceholder from '~/assets/rideshare-welcome-placeholder.jpg';
import rideshareTexture from '~/assets/rideshare-welcome.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="AudioSpectra - Application web"
        description="Application web full-stack permettant d'identifier et de classifier en temps réel les sons environnementaux grâce au deep learning, en utilisant les embeddings PANNs CNN14, la fusion d'ensembles (MLP, XGBoost, Transformer) et le stack FastAPI/Next.js/React"
        buttonText="Voir sur GitHub"
        buttonLink="https://github.com/oumaymamesbahi/AudioSpectra.git"
        model={{
          type: 'laptop',
          alt: 'AudioSpectra - Touchez pour éveiller l\'IA',
          textures: [
            {
              srcSet: `${audiospectraTexture} 1280w, ${audiospectraTextureLarge} 2560w`,
              placeholder: audiospectraTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="RideShare - Application de Covoiturage"
        description="Application de covoiturage en C++ avec interface Qt et intégration d'une API pour le matching intelligent des trajets pour optimiser la mobilité partagée via des itinéraires personnalisés en temps réel"
        buttonText="Voir le projet"
        buttonLink="https://github.com/oumaymamesbahi/CarPooling"
        model={{
          type: 'phone',
          alt: 'Écran d\'accueil RideShare',
          textures: [
            {
              srcSet: `${rideshareTexture} 375w, ${rideshareTextureLarge} 750w`,
              placeholder: rideshareTexturePlaceholder,
            },
            {
              srcSet: `${rideshareTexture2} 375w, ${rideshareTexture2Large} 750w`,
              placeholder: rideshareTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Eservices - Application Web de Gestion Pédagogique"
        description="Système de gestion d'affectations pédagogiques en PHP/MySQL avec authentification sécurisée, RBAC (Contrôle d'accès basé sur les rôles), automatisation des assignations et reporting dynamique"
        buttonText="Voir le projet"
        buttonLink="https://github.com/oumaymamesbahi/Administrative-Management-System"
        model={{
          type: 'laptop',
          alt: 'Tableau de bord coordinateur dans Eservices',
          textures: [
            {
              srcSet: `${eservicesTexture} 800w, ${eservicesTextureLarge} 1920w`,
              placeholder: eservicesTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="LogAnalyzer - Application de Bureau"
        description="Plateforme Java d'Analyse intelligente des journaux système basée sur les outils Big Data (ELK) en temps réel avec détection d'anomalies par machine learning, intégration Elasticsearch/Logstash/Kafka, interface 3D JavaFX et supervision de la sécurité"
        buttonText="Voir le projet"
        buttonLink="https://github.com/Salmaa-chiboub/LogAnalyzerJava.git"
        model={{
          type: 'laptop',
          alt: 'Command Center dans LogAnalyzer',
          textures: [
            {
              srcSet: `${loganalyzerTexture} 800w, ${loganalyzerTextureLarge} 1920w`,
              placeholder: loganalyzerTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-5"
        alternate
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        title="NULOAN - Application de Bureau"
        description="Application de gestion de crédits bancaires en C avec interface GTK et authentification à deux facteurs 2FA via API cloud"
        buttonText="Voir le projet"
        buttonLink="https://github.com/oumaymamesbahi/cr-dit-bancaire.git"
        model={{
          type: 'phone',
          alt: 'Écran de connexion NULOAN',
          textures: [
            {
              srcSet: `${nuloanTexture} 375w, ${nuloanTextureLarge} 750w`,
              placeholder: nuloanTexturePlaceholder,
            },
            {
              srcSet: `${nuloanTexture2} 375w, ${nuloanTexture2Large} 750w`,
              placeholder: nuloanTexture2Placeholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
