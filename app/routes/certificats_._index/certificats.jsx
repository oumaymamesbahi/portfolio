import alxCert from '~/assets/alx.png';
import linkedinCert from '~/assets/linkedin.png';
import nasaCert from '~/assets/nasa.png';
import oracleCert from '~/assets/oracle.png';
import riceCert from '~/assets/rice.png';
import simpliCert from '~/assets/simpli.png';
import { DecoderText } from '~/components/decoder-text';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useState } from 'react';
import styles from './certificats.module.css';

const certificates = [
  { name: 'Rice University', image: riceCert },
  { name: 'SimpliLearn', image: simpliCert },
  { name: 'LinkedIn Learning', image: linkedinCert },
  { name: 'Oracle', image: oracleCert },
  { name: 'ALX Africa', image: alxCert },
  { name: 'NASA', image: nasaCert },
];

export function Certificats() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <article className={styles.certificatsGallery}>
      <Section className={styles.content}>
        <header className={styles.header}>
          <Heading className={styles.heading} level={2} as="h1">
            <DecoderText text="Mes Certificats" />
          </Heading>
          <Barcode className={styles.barcode} />
        </header>
        <div className={styles.grid}>
          {certificates.map((cert, index) => (
            <div
              key={cert.name}
              className={styles.certificateCard}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ '--index': index }}
            >
              <div className={styles.certificateImageWrapper}>
                <img
                  src={cert.image}
                  alt={cert.name}
                  className={styles.certificateImage}
                />
              </div>
              <Text className={styles.certificateName} size="l" as="p">
                {cert.name}
              </Text>
            </div>
          ))}
        </div>
      </Section>
      <Footer />
    </article>
  );
}

function Barcode({ className }) {
  return (
    <svg
      className={className}
      width="153"
      height="20"
      fill="currentColor"
      viewBox="0 0 153 20"
    >
      <path
        fillOpacity=".6"
        d="M0 0h3v20H0zM7 0h1v20H7zM11 0h1v20h-1zM15 0h3v20h-3zM22 0h1v20h-1zM26 0h2v20h-2zM33 0h1v20h-1zM37 0h2v20h-2zM41 0h3v20h-3zM48 0h1v20h-1zM52 0h3v20h-3zM59 0h1v20h-1zM63 0h2v20h-2zM70 0h1v20h-1zM74 0h1v20h-1zM78 0h3v20h-3zM85 0h2v20h-2zM89 0h3v20h-3zM96 0h1v20h-1zM100 0h2v20h-2zM107 0h1v20h-1zM111 0h3v20h-3zM118 0h1v20h-1zM122 0h2v20h-2zM129 0h1v20h-1zM133 0h3v20h-3zM140 0h1v20h-1zM144 0h2v20h-2zM150 0h3v20h-3z"
      />
    </svg>
  );
}

