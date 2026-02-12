import { baseMeta } from '~/utils/meta';

export function meta() {
  return baseMeta({
    title: 'Mes Certificats',
    description:
      'Mes certifications professionnelles en développement logiciel, intelligence artificielle et technologies.',
  });
}

export { Certificats as default } from './certificats';

