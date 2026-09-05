/* =============== SUPABASE CONFIGURATION =============== */
const SUPABASE_URL = 'https://qkauaicionthtpmsmizo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYXVhaWNpb250aHRwbXNtaXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NjAyMTYsImV4cCI6MjA3NzAzNjIxNn0.hjdcRjohuYK3_HaW7qMoLFqENC6iSeaCs7kdYOMQZ1g';

/* =============== TRANSLATIONS =============== */
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.players': 'Players',
        'nav.reports': 'Reports',
        'nav.success': 'Success Stories',
        'nav.recruit': 'Recruit Now',
        'nav.news': 'News',
        'nav.faq': 'FAQ',
        'nav.contact': 'Contact',
        'nav.login': 'Log In',
        'nav.signup': 'Sign Up',
        // Hero
        'hero.title': 'The Premier Gateway to Africa\'s Next Basketball Stars.',
        'hero.description': 'Verified scouting reports and curated game film on emerging African talent – built for coaches who refuse to miss the next big recruit.',
        'hero.cta': 'Get Scouting Access Now',
        'hero.secondary': 'Learn More',
        // Trust
        'trust.title': 'TRUSTED BY COACHES WORLDWIDE',
        'trust.fiba': 'FIBA LICENSED',
        'trust.elite': 'ELITE ACADEMY',
        'trust.pro': 'PRO SCOUT NETWORK',
        // About
        'about.title': 'Who We Are',
        'about.description1': 'Meta Africa Sports is on a mission to bring you the best of African basketball by connecting local talent to international programs through a premium scouting platform. We strive to bridge the information gap between under-discovered players and the teams that need them.',
        'about.description2': 'Founded by FIBA licensed agents and seasoned scouts, we provide the verified data and high-quality film necessary for recruiters to make confident decisions about Africa\'s emerging stars.',
        // Challenge / Problem-Solution
        'challenge.title': 'The African Talent Challenge',
        'challenge.problem1': 'Scouting trips are expensive, logistically complex, and high-risk.',
        'challenge.problem2': 'Reliable, verified data on international prospects is nearly impossible to find.',
        'challenge.problem3': 'Elite talent remains hidden in remote villages due to a lack of professional spotlight.',
        'challenge.solution1': '<strong>Verified Scouting:</strong> Every player is evaluated on-ground by certified international scouts.',
        'challenge.solution2': '<strong>Curated Film:</strong> Save hours with skill-focused HD film clips instead of raw mixtapes.',
        'challenge.solution3': '<strong>Pan-African Reach:</strong> Tap into dozens of countries through one central, elite database.',
        // Features
        'features.title': 'Built for Serious Decision-Makers',
        'features.reports.title': 'Verified Scouting Reports',
        'features.reports.description': 'In-depth evaluations by FIBA-certified scouts. Get skill breakdowns, measurables, and role projections calibrated to international standards.',
        'features.film.title': 'Curated Game Film',
        'features.film.description': 'HD highlights curated from full games. No music videos—just pure basketball sequences that validate the scout\'s assessment.',
        'features.database.title': 'Pan-African Database',
        'features.database.description': 'Discover the next star from Nigeria to Senegal to Angola. We uncover the prospects before they hit the major circuits.',
        // Prospects
        'prospects.title': 'Top Prospects',
        'prospects.subtitle': 'Our highest-rated basketball prospects',
        'prospects.viewReport': 'View Profile',
        'prospects.seeAll': 'See All Players',
        'prospects.available': 'Available',
        'prospects.placed': 'Placed',
        // News
        'news.title': 'Latest News & Updates',
        'news.readMore': 'Read More',
        'news.viewAll': 'View All News',
        // Success
        'success.title': 'From African Courts to Global Stages',
        'success.playersPlaced': 'Players Placed',
        'success.countriesCovered': 'Countries Covered',
        'success.scholarships': 'In Scholarships',
        'success.testimonial': '"Meta Africa Sports is the resource I wish I had years ago. It\'s like having expert eyes on the ground in every African hotspot. The scouting reports are spot on and save us weeks of travel."',
        // Institutions
        'institutions.kicker': 'Recruiting Network',
        'institutions.title': 'Where Our Talent Has Been Seen, Recruited, or Placed',
        'institutions.description': 'Meta Africa Sports connects emerging African basketball talent with respected schools, academies, junior colleges, military institutes, and NCAA programs across the United States and beyond.',
        // Gallery
        'gallery.title': 'Eyes on the Ground',
        // CTA
        'cta.title': 'Feedback & Partnerships',
        'cta.description': 'We are always looking to expand our network. Reach out to us for partnership inquiries or to share your feedback on our mission.',
        'cta.button': 'Send Us An Email',
        // Privacy
        'privacy.title': 'Privacy Policy',
        'privacy.description1': 'At Meta Africa Sports, your privacy is paramount. We handle all scouting data and personal information with the highest level of security and in compliance with international data protection standards. We only share verified scouting information with authorized recruiters and partners to facilitate talent discovery.',
        'privacy.description2': 'Our platform ensures that player data is protected and used strictly for professional recruitment purposes.',
        // Footer
        'footer.description': 'Bridging the gap between Africa\'s emerging basketball talent and the global stage.',
        'footer.platform': 'Platform',
        'footer.playerDatabase': 'Player Database',
        'footer.scoutingReports': 'Scouting Reports',
        'footer.successStories': 'Success Stories',
        'footer.company': 'Company',
        'footer.aboutUs': 'About Us',
        'footer.contact': 'Contact',
        'footer.privacyPolicy': 'Privacy Policy',
        'footer.faq': 'FAQ',
        'footer.followUs': 'Follow Us',
        'footer.copyright': '© 2025 Meta Africa Sports. All rights reserved. FIBA Licensed Agent.',
        // FAQ
        'faq.title': 'Recruitment Process FAQ',
        'faq.intro': 'This page is for recruiters, coaches, and families. It outlines how international recruitment (Africa to the US) and recruitment within the US work, step by step.',
        'faq.internationalTitle': 'International: Africa to US',
        'faq.withinUSTitle': 'Within the US',
        'faq.int.phase1Title': '1. Documents and eligibility',
        'faq.int.phase1Intro': 'The player and family gather identity and academic documents.',
        'faq.int.phase2Title': '2. School placement',
        'faq.int.phase2Intro': 'The recruiter or program helps secure a US school placement; the school will later issue the I-20 (Certificate of Eligibility for F-1 student status).',
        'faq.int.phase3Title': '3. Visa process',
        'faq.int.phase3Intro': 'After the school issues the I-20, the student completes the visa application and interview.',
        'faq.int.phase4Title': '4. Travel',
        'faq.int.phase4Intro': 'Once the visa is approved, the student books travel and can enter the US up to 30 days before the program start.',
        'faq.int.termI20Label': 'I-20:',
        'faq.int.termI20': 'Certificate of Eligibility for F-1 student status; issued by the US school after admission.',
        'faq.int.termSevisLabel': 'SEVIS fee:',
        'faq.int.termSevis': 'I-901 fee paid to the US government (e.g. $350 for F-1); required before the visa interview.',
        'faq.int.termDs160Label': 'DS-160:',
        'faq.int.termDs160': 'Online nonimmigrant visa application form; must be completed and the confirmation page printed before the interview.',
        'faq.int.documentsHeading': 'Documents to bring to the visa interview',
        'faq.int.docPassport': 'Valid passport',
        'faq.int.docI20': 'I-20 form',
        'faq.int.docDs160': 'DS-160 confirmation page',
        'faq.int.docSevis': 'SEVIS fee receipt',
        'faq.int.docFinancial': 'Proof of financial support',
        'faq.int.docAdmission': 'Admission letter',
        'faq.int.docTranscripts': 'Academic transcripts',
        'faq.int.timingHeading': 'Timing and rules',
        'faq.int.ncaaHeading': 'For NCAA student-athletes',
        'faq.us.intro': 'For players already in the United States, transfer eligibility is managed between the current school, the new school, and the guardian.',
        'faq.us.expectHeading': 'What to expect',
        'faq.int.step1': 'Birth certificate',
        'faq.int.step2': 'National certificate',
        'faq.int.step3': 'Passport and medical',
        'faq.int.step4': 'School application (information provided by recruiters)',
        'faq.int.step5': 'School approval',
        'faq.int.step6': 'Financial check of parents',
        'faq.int.step7': 'Issue the I-20',
        'faq.int.step8': 'Visa application',
        'faq.int.step9': 'Schedule visa appointment',
        'faq.int.step10': 'Interview preparation',
        'faq.int.step11': 'Visa interview',
        'faq.int.step12': 'Approval or denial',
        'faq.int.step13': 'Book flight',
        'faq.int.step14': 'Arrival in the US',
        'faq.int.tipsTitle': 'Good to know',
        'faq.int.sevis': 'Pay the SEVIS I-901 fee (e.g. $350 for F-1) at least 3 business days before the visa interview; payment is required before the interview.',
        'faq.int.ds160': 'Complete the DS-160 nonimmigrant visa application online and pay the visa (MRV) application fee before scheduling your appointment. Print your confirmation page.',
        'faq.int.documentsAtInterview': 'Documents to bring to the visa interview: valid passport, I-20, DS-160 confirmation, SEVIS fee receipt, proof of financial support, admission letter, and academic transcripts.',
        'faq.int.entryRule': 'The student may enter the US up to 30 days before the program start date. The F-1 visa can be issued up to 365 days before the program begins.',
        'faq.int.ncaaNote': 'For NCAA eligibility: international student-athletes should register with the NCAA Eligibility Center and submit certified academic documents (e.g. proof of graduation, transcripts from year 9 onward in native language plus certified English translations) from the school\'s official email—not from students or recruiters.',
        'faq.us.step1': 'Establish contact with guardian',
        'faq.us.step2': 'Agreement of transfer',
        'faq.us.step3': 'Send transfer document',
        'faq.us.step4': 'Sign document',
        'faq.us.stateNote': 'Transfer eligibility is governed by state associations (e.g. CIF, IHSA, VHSL, UHSAA). Review typically takes 4–6 weeks. Have documentation of residence and, if relevant, court orders for custody changes ready.'
    },
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.features': 'Fonctionnalités',
        'nav.players': 'Joueurs',
        'nav.reports': 'Rapports',
        'nav.success': 'Réussites',
        'nav.join': 'S\'inscrire',
        'nav.recruit': 'Recruter',
        'nav.news': 'Actualités',
        'nav.faq': 'FAQ',
        'nav.contact': 'Contact',
        'nav.login': 'Connexion',
        'nav.signup': 'S\'inscrire',
        // Hero
        'hero.title': 'La Passerelle Vers les Futures Stars du Basketball Africain.',
        'hero.description': 'Rapports de scouting vérifiés et films de jeu sélectionnés sur les talents africains émergents – conçus pour les entraîneurs qui refusent de rater la prochaine grande recrue.',
        'hero.cta': 'Accéder au Scouting',
        'hero.ctaRecruiter': 'Recruter des Talents',
        'hero.ctaPlayer': 'Être Scouté',
        'hero.secondary': 'En Savoir Plus',
        // Trust
        'trust.title': 'LA CONFIANCE DES ENTRAÎNEURS DU MONDE ENTIER',
        'trust.fiba': 'LICENCE FIBA',
        'trust.elite': 'ACADÉMIE ÉLITE',
        'trust.pro': 'RÉSEAU PRO SCOUT',
        // About
        'about.title': 'Qui Sommes-Nous',
        'about.description1': 'Meta Africa Sports a pour mission de vous apporter le meilleur du basketball africain en connectant les talents locaux aux programmes internationaux via une plateforme de scouting premium. Nous nous efforçons de combler le fossé informationnel entre les joueurs sous-découverts et les équipes qui en ont besoin.',
        'about.description2': 'Fondé par des agents licenciés FIBA et des scouts expérimentés, nous fournissons les données vérifiées et les films de haute qualité nécessaires aux recruteurs pour prendre des décisions éclairées sur les stars émergentes d\'Afrique.',
        // Challenge / Problem-Solution
        'challenge.title': 'Le Défi du Talent Africain',
        'challenge.problem1': 'Les voyages de scouting sont coûteux, logistiquement complexes et risqués.',
        'challenge.problem2': 'Les données fiables et vérifiées sur les prospects internationaux sont presque impossibles à trouver.',
        'challenge.problem3': 'Les talents d\'élite restent cachés dans des villages reculés par manque de visibilité professionnelle.',
        'challenge.solution1': '<strong>Scouting Vérifié:</strong> Chaque joueur est évalué sur le terrain par des scouts internationaux certifiés.',
        'challenge.solution2': '<strong>Film Sélectionné:</strong> Économisez des heures avec des clips HD axés sur les compétences plutôt que des mixtapes brutes.',
        'challenge.solution3': '<strong>Portée Panafricaine:</strong> Accédez à des dizaines de pays via une base de données centrale et élite.',
        // Features
        'features.title': 'Conçu pour les Décideurs Sérieux',
        'features.reports.title': 'Rapports de Scouting Vérifiés',
        'features.reports.description': 'Évaluations approfondies par des scouts certifiés FIBA. Obtenez des analyses de compétences, des mesures et des projections de rôle calibrées aux normes internationales.',
        'features.film.title': 'Film de Jeu Sélectionné',
        'features.film.description': 'Highlights HD sélectionnés à partir de matchs complets. Pas de clips musicaux—juste des séquences de basketball pures qui valident l\'évaluation du scout.',
        'features.database.title': 'Base de Données Panafricaine',
        'features.database.description': 'Découvrez la prochaine star du Nigeria au Sénégal en passant par l\'Angola. Nous découvrons les prospects avant qu\'ils n\'atteignent les grands circuits.',
        // Prospects
        'prospects.title': 'Meilleurs Espoirs',
        'prospects.subtitle': 'Nos prospects les mieux notés',
        'prospects.viewReport': 'Voir le Profil',
        'prospects.seeAll': 'Voir Tous les Joueurs',
        'prospects.available': 'Disponible',
        'prospects.placed': 'Placé',
        // News
        'news.title': 'Dernières Actualités',
        'news.readMore': 'Lire Plus',
        'news.viewAll': 'Voir Toutes les Actualités',
        // Success
        'success.title': 'Des Terrains Africains aux Scènes Mondiales',
        'success.playersPlaced': 'Joueurs Placés',
        'success.countriesCovered': 'Pays Couverts',
        'success.scholarships': 'En Bourses',
        'success.testimonial': '"Meta Africa Sports est la ressource que j\'aurais aimé avoir il y a des années. C\'est comme avoir des yeux experts sur le terrain dans chaque hotspot africain. Les rapports de scouting sont précis et nous font économiser des semaines de voyage."',
        // Institutions
        'institutions.kicker': 'Réseau de recrutement',
        'institutions.title': 'Où nos talents ont été vus, recrutés ou placés',
        'institutions.description': 'Meta Africa Sports met en relation les talents émergents du basketball africain avec des écoles, académies, junior colleges, instituts militaires et programmes NCAA reconnus aux États-Unis et au-delà.',
        // Gallery
        'gallery.title': 'Des Yeux sur le Terrain',
        // CTA
        'cta.title': 'Commentaires & Partenariats',
        'cta.description': 'Nous cherchons toujours à élargir notre réseau de joueurs et de recruteurs. Contactez-nous pour des demandes de partenariat ou pour partager vos commentaires sur notre mission.',
        'cta.button': 'Envoyez-nous un Email',
        // Privacy
        'privacy.title': 'Politique de Confidentialité',
        'privacy.description1': 'Chez Meta Africa Sports, votre vie privée est primordiale. Nous traitons toutes les données de scouting et les informations personnelles avec le plus haut niveau de sécurité et en conformité avec les normes internationales de protection des données. Nous ne partageons les informations de scouting vérifiées qu\'avec des recruteurs et partenaires autorisés pour faciliter la découverte de talents.',
        'privacy.description2': 'Notre plateforme garantit que les données des joueurs sont protégées et utilisées strictement à des fins de recrutement professionnel.',
        // Footer
        'footer.description': 'Combler le fossé entre les talents émergents du basketball africain et la scène mondiale.',
        'footer.platform': 'Plateforme',
        'footer.playerDatabase': 'Base de Données Joueurs',
        'footer.scoutingReports': 'Rapports de Scouting',
        'footer.successStories': 'Histoires de Réussite',
        'footer.company': 'Entreprise',
        'footer.aboutUs': 'À Propos',
        'footer.contact': 'Contact',
        'footer.privacyPolicy': 'Politique de Confidentialité',
        'footer.faq': 'FAQ',
        'footer.followUs': 'Suivez-nous',
        'footer.copyright': '© 2025 Meta Africa Sports. Tous droits réservés. Agent Licencié FIBA.',
        // FAQ
        'faq.title': 'FAQ Processus de Recrutement',
        'faq.intro': 'Cette page s\'adresse aux recruteurs, entraîneurs et familles. Elle décrit étape par étape le recrutement international (Afrique vers États-Unis) et le recrutement aux États-Unis.',
        'faq.internationalTitle': 'International : Afrique vers États-Unis',
        'faq.withinUSTitle': 'Aux États-Unis',
        'faq.int.phase1Title': '1. Documents et éligibilité',
        'faq.int.phase1Intro': 'Le joueur et la famille rassemblent les documents d\'identité et académiques.',
        'faq.int.phase2Title': '2. Placement scolaire',
        'faq.int.phase2Intro': 'Le recruteur ou le programme aide à obtenir une place dans une école américaine ; l\'école délivrera ensuite le I-20 (Certificat d\'éligibilité au statut étudiant F-1).',
        'faq.int.phase3Title': '3. Processus de visa',
        'faq.int.phase3Intro': 'Après l\'émission du I-20 par l\'école, l\'étudiant complète la demande de visa et passe l\'entretien.',
        'faq.int.phase4Title': '4. Voyage',
        'faq.int.phase4Intro': 'Une fois le visa approuvé, l\'étudiant réserve le voyage et peut entrer aux États-Unis jusqu\'à 30 jours avant le début du programme.',
        'faq.int.termI20Label': 'I-20 :',
        'faq.int.termI20': 'Certificat d\'éligibilité au statut étudiant F-1 ; délivré par l\'école américaine après l\'admission.',
        'faq.int.termSevisLabel': 'Frais SEVIS :',
        'faq.int.termSevis': 'Frais I-901 payés au gouvernement américain (p. ex. 350 $ pour F-1) ; obligatoires avant l\'entretien de visa.',
        'faq.int.termDs160Label': 'DS-160 :',
        'faq.int.termDs160': 'Formulaire de demande de visa en ligne ; doit être rempli et la page de confirmation imprimée avant l\'entretien.',
        'faq.int.documentsHeading': 'Documents à apporter à l\'entretien de visa',
        'faq.int.docPassport': 'Passeport valide',
        'faq.int.docI20': 'Formulaire I-20',
        'faq.int.docDs160': 'Page de confirmation DS-160',
        'faq.int.docSevis': 'Reçu des frais SEVIS',
        'faq.int.docFinancial': 'Preuve de soutien financier',
        'faq.int.docAdmission': 'Lettre d\'admission',
        'faq.int.docTranscripts': 'Relevés de notes',
        'faq.int.timingHeading': 'Délais et règles',
        'faq.int.ncaaHeading': 'Pour les athlètes-étudiants NCAA',
        'faq.us.intro': 'Pour les joueurs déjà aux États-Unis, l\'éligibilité au transfert est gérée entre l\'école actuelle, la nouvelle école et le tuteur.',
        'faq.us.expectHeading': 'À quoi s\'attendre',
        'faq.int.step1': 'Acte de naissance',
        'faq.int.step2': 'Certificat national',
        'faq.int.step3': 'Passeport et examen médical',
        'faq.int.step4': 'Candidature scolaire (informations fournies par les recruteurs)',
        'faq.int.step5': 'Approbation de l\'école',
        'faq.int.step6': 'Vérification financière des parents',
        'faq.int.step7': 'Émission du I-20',
        'faq.int.step8': 'Demande de visa',
        'faq.int.step9': 'Prise de rendez-vous pour le visa',
        'faq.int.step10': 'Préparation à l\'entretien',
        'faq.int.step11': 'Entretien pour le visa',
        'faq.int.step12': 'Approbation ou refus',
        'faq.int.step13': 'Réservation du vol',
        'faq.int.step14': 'Arrivée aux États-Unis',
        'faq.int.tipsTitle': 'À savoir',
        'faq.int.sevis': 'Payer les frais SEVIS I-901 (p. ex. 350 $ pour F-1) au moins 3 jours ouvrables avant l\'entretien ; le paiement est obligatoire avant l\'entretien.',
        'faq.int.ds160': 'Remplir la demande de visa DS-160 en ligne et payer les frais de demande de visa (MRV) avant de prendre rendez-vous. Imprimer la page de confirmation.',
        'faq.int.documentsAtInterview': 'Documents à apporter à l\'entretien : passeport valide, I-20, confirmation DS-160, reçu des frais SEVIS, preuve de soutien financier, lettre d\'admission et relevés de notes.',
        'faq.int.entryRule': 'L\'étudiant peut entrer aux États-Unis jusqu\'à 30 jours avant le début du programme. Le visa F-1 peut être délivré jusqu\'à 365 jours avant le début du programme.',
        'faq.int.ncaaNote': 'Pour l\'éligibilité NCAA : les athlètes-étudiants internationaux doivent s\'inscrire au NCAA Eligibility Center et soumettre les documents académiques certifiés (p. ex. preuve de diplôme, relevés à partir de la 9e année dans la langue d\'origine plus traductions anglaises certifiées) depuis l\'email officiel de l\'école—pas par les étudiants ou recruteurs.',
        'faq.us.step1': 'Établir le contact avec le tuteur',
        'faq.us.step2': 'Accord de transfert',
        'faq.us.step3': 'Envoi du document de transfert',
        'faq.us.step4': 'Signature du document',
        'faq.us.stateNote': 'L\'éligibilité au transfert est régie par les associations d\'État (p. ex. CIF, IHSA, VHSL, UHSAA). L\'examen prend généralement 4 à 6 semaines. Ayez à disposition la documentation de résidence et, le cas échéant, les décisions de justice pour les changements de garde.'
    },
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.features': 'Características',
        'nav.players': 'Jugadores',
        'nav.reports': 'Informes',
        'nav.success': 'Éxitos',
        'nav.join': 'Unirse',
        'nav.recruit': 'Reclutar',
        'nav.news': 'Noticias',
        'nav.faq': 'FAQ',
        'nav.contact': 'Contacto',
        'nav.login': 'Iniciar Sesión',
        'nav.signup': 'Registrarse',
        // Hero
        'hero.title': 'La Puerta de Entrada a las Próximas Estrellas del Baloncesto Africano.',
        'hero.description': 'Informes de scouting verificados y películas de juego seleccionadas sobre el talento africano emergente – diseñados para entrenadores que se niegan a perderse el próximo gran recluta.',
        'hero.cta': 'Acceder al Scouting',
        'hero.ctaRecruiter': 'Reclutar Talento',
        'hero.ctaPlayer': 'Ser Reclutado',
        'hero.secondary': 'Saber Más',
        // Trust
        'trust.title': 'CONFIANZA DE ENTRENADORES DE TODO EL MUNDO',
        'trust.fiba': 'LICENCIA FIBA',
        'trust.elite': 'ACADEMIA ÉLITE',
        'trust.pro': 'RED PRO SCOUT',
        // About
        'about.title': 'Quiénes Somos',
        'about.description1': 'Meta Africa Sports tiene la misión de traerte lo mejor del baloncesto africano conectando el talento local con programas internacionales a través de una plataforma de scouting premium. Nos esforzamos por cerrar la brecha informativa entre jugadores subdescubiertos y los equipos que los necesitan.',
        'about.description2': 'Fundado por agentes licenciados de FIBA y scouts experimentados, proporcionamos los datos verificados y las películas de alta calidad necesarias para que los reclutadores tomen decisiones informadas sobre las estrellas emergentes de África.',
        // Challenge / Problem-Solution
        'challenge.title': 'El Desafío del Talento Africano',
        'challenge.problem1': 'Los viajes de scouting son caros, logísticamente complejos y de alto riesgo.',
        'challenge.problem2': 'Los datos confiables y verificados sobre prospectos internacionales son casi imposibles de encontrar.',
        'challenge.problem3': 'El talento de élite permanece oculto en aldeas remotas debido a la falta de visibilidad profesional.',
        'challenge.solution1': '<strong>Scouting Verificado:</strong> Cada jugador es evaluado en el terreno por scouts internacionales certificados.',
        'challenge.solution2': '<strong>Película Seleccionada:</strong> Ahorra horas con clips HD enfocados en habilidades en lugar de mixtapes sin editar.',
        'challenge.solution3': '<strong>Alcance Panafricano:</strong> Accede a docenas de países a través de una base de datos central y de élite.',
        // Features
        'features.title': 'Diseñado para Tomadores de Decisiones Serios',
        'features.reports.title': 'Informes de Scouting Verificados',
        'features.reports.description': 'Evaluaciones en profundidad por scouts certificados por FIBA. Obtén desgloses de habilidades, medidas y proyecciones de rol calibradas a estándares internacionales.',
        'features.film.title': 'Película de Juego Seleccionada',
        'features.film.description': 'Destacados HD seleccionados de partidos completos. Sin videos musicales—solo secuencias de baloncesto puras que validan la evaluación del scout.',
        'features.database.title': 'Base de Datos Panafricana',
        'features.database.description': 'Descubre la próxima estrella desde Nigeria hasta Senegal y Angola. Descubrimos los prospectos antes de que lleguen a los grandes circuitos.',
        // Prospects
        'prospects.title': 'Mejores Prospectos',
        'prospects.subtitle': 'Nuestros prospectos mejor calificados',
        'prospects.viewReport': 'Ver Perfil',
        'prospects.seeAll': 'Ver Todos los Jugadores',
        'prospects.available': 'Disponible',
        'prospects.placed': 'Colocado',
        // News
        'news.title': 'Últimas Noticias',
        'news.readMore': 'Leer Más',
        'news.viewAll': 'Ver Todas las Noticias',
        // Success
        'success.title': 'De Canchas Africanas a Escenarios Globales',
        'success.playersPlaced': 'Jugadores Colocados',
        'success.countriesCovered': 'Países Cubiertos',
        'success.scholarships': 'En Becas',
        'success.testimonial': '"Meta Africa Sports es el recurso que desearía haber tenido hace años. Es como tener ojos expertos en el terreno en cada punto caliente africano. Los informes de scouting son precisos y nos ahorran semanas de viaje."',
        // Institutions
        'institutions.kicker': 'Red de reclutamiento',
        'institutions.title': 'Donde nuestro talento ha sido visto, reclutado o colocado',
        'institutions.description': 'Meta Africa Sports conecta el talento emergente del baloncesto africano con escuelas, academias, junior colleges, institutos militares y programas NCAA respetados en Estados Unidos y más allá.',
        // Gallery
        'gallery.title': 'Ojos en el Terreno',
        // CTA
        'cta.title': 'Comentarios y Asociaciones',
        'cta.description': 'Siempre estamos buscando expandir nuestra red de jugadores y reclutadores. Contáctanos para consultas de asociación o para compartir tus comentarios sobre nuestra misión.',
        'cta.button': 'Envíanos un Email',
        // Privacy
        'privacy.title': 'Política de Privacidad',
        'privacy.description1': 'En Meta Africa Sports, tu privacidad es primordial. Manejamos todos los datos de scouting e información personal con el más alto nivel de seguridad y en cumplimiento con los estándares internacionales de protección de datos. Solo compartimos información de scouting verificada con reclutadores y socios autorizados para facilitar el descubrimiento de talentos.',
        'privacy.description2': 'Nuestra plataforma garantiza que los datos de los jugadores estén protegidos y se utilicen estrictamente para fines de reclutamiento profesional.',
        // Footer
        'footer.description': 'Cerrando la brecha entre el talento emergente del baloncesto africano y el escenario global.',
        'footer.platform': 'Plataforma',
        'footer.playerDatabase': 'Base de Datos de Jugadores',
        'footer.scoutingReports': 'Informes de Scouting',
        'footer.successStories': 'Historias de Éxito',
        'footer.company': 'Empresa',
        'footer.aboutUs': 'Sobre Nosotros',
        'footer.contact': 'Contacto',
        'footer.privacyPolicy': 'Política de Privacidad',
        'footer.faq': 'FAQ',
        'footer.followUs': 'Síguenos',
        'footer.copyright': '© 2025 Meta Africa Sports. Todos los derechos reservados. Agente Licenciado FIBA.',
        // FAQ
        'faq.title': 'FAQ Proceso de Reclutamiento',
        'faq.intro': 'Esta página es para reclutadores, entrenadores y familias. Describe paso a paso el reclutamiento internacional (África a EE. UU.) y el reclutamiento dentro de EE. UU.',
        'faq.internationalTitle': 'Internacional: África a EE. UU.',
        'faq.withinUSTitle': 'Dentro de EE. UU.',
        'faq.int.phase1Title': '1. Documentos y elegibilidad',
        'faq.int.phase1Intro': 'El jugador y la familia reúnen documentos de identidad y académicos.',
        'faq.int.phase2Title': '2. Colocación escolar',
        'faq.int.phase2Intro': 'El reclutador o el programa ayuda a conseguir una plaza en una escuela en EE. UU.; la escuela emitirá después el I-20 (Certificado de Elegibilidad para estatus de estudiante F-1).',
        'faq.int.phase3Title': '3. Proceso de visa',
        'faq.int.phase3Intro': 'Después de que la escuela emita el I-20, el estudiante completa la solicitud de visa y la entrevista.',
        'faq.int.phase4Title': '4. Viaje',
        'faq.int.phase4Intro': 'Una vez aprobada la visa, el estudiante reserva el viaje y puede entrar a EE. UU. hasta 30 días antes del inicio del programa.',
        'faq.int.termI20Label': 'I-20:',
        'faq.int.termI20': 'Certificado de Elegibilidad para estatus de estudiante F-1; emitido por la escuela en EE. UU. tras la admisión.',
        'faq.int.termSevisLabel': 'Tarifa SEVIS:',
        'faq.int.termSevis': 'Tarifa I-901 pagada al gobierno de EE. UU. (p. ej. $350 para F-1); obligatoria antes de la entrevista de visa.',
        'faq.int.termDs160Label': 'DS-160:',
        'faq.int.termDs160': 'Formulario de solicitud de visa en línea; debe completarse e imprimirse la página de confirmación antes de la entrevista.',
        'faq.int.documentsHeading': 'Documentos para la entrevista de visa',
        'faq.int.docPassport': 'Pasaporte válido',
        'faq.int.docI20': 'Formulario I-20',
        'faq.int.docDs160': 'Página de confirmación DS-160',
        'faq.int.docSevis': 'Recibo de tarifa SEVIS',
        'faq.int.docFinancial': 'Prueba de apoyo financiero',
        'faq.int.docAdmission': 'Carta de admisión',
        'faq.int.docTranscripts': 'Transcripciones académicas',
        'faq.int.timingHeading': 'Plazos y reglas',
        'faq.int.ncaaHeading': 'Para atletas-estudiantes NCAA',
        'faq.us.intro': 'Para jugadores que ya están en Estados Unidos, la elegibilidad de transferencia se gestiona entre la escuela actual, la nueva escuela y el tutor.',
        'faq.us.expectHeading': 'Qué esperar',
        'faq.int.step1': 'Partida de nacimiento',
        'faq.int.step2': 'Certificado nacional',
        'faq.int.step3': 'Pasaporte y examen médico',
        'faq.int.step4': 'Solicitud escolar (información proporcionada por reclutadores)',
        'faq.int.step5': 'Aprobación de la escuela',
        'faq.int.step6': 'Verificación financiera de los padres',
        'faq.int.step7': 'Emisión del I-20',
        'faq.int.step8': 'Solicitud de visa',
        'faq.int.step9': 'Programar cita para la visa',
        'faq.int.step10': 'Preparación para la entrevista',
        'faq.int.step11': 'Entrevista de visa',
        'faq.int.step12': 'Aprobación o denegación',
        'faq.int.step13': 'Reservar vuelo',
        'faq.int.step14': 'Llegada a EE. UU.',
        'faq.int.tipsTitle': 'Buena información',
        'faq.int.sevis': 'Pagar la tarifa SEVIS I-901 (p. ej. $350 para F-1) al menos 3 días hábiles antes de la entrevista; el pago es obligatorio antes de la entrevista.',
        'faq.int.ds160': 'Completar la solicitud de visa DS-160 en línea y pagar la tarifa de solicitud de visa (MRV) antes de programar la cita. Imprimir la página de confirmación.',
        'faq.int.documentsAtInterview': 'Documentos para la entrevista: pasaporte válido, I-20, confirmación DS-160, recibo de tarifa SEVIS, prueba de apoyo financiero, carta de admisión y transcripciones académicas.',
        'faq.int.entryRule': 'El estudiante puede entrar a EE. UU. hasta 30 días antes del inicio del programa. La visa F-1 puede emitirse hasta 365 días antes del inicio del programa.',
        'faq.int.ncaaNote': 'Para elegibilidad NCAA: los atletas-estudiantes internacionales deben registrarse en el NCAA Eligibility Center y enviar documentos académicos certificados (p. ej. prueba de graduación, transcripciones desde año 9 en idioma nativo más traducciones al inglés certificadas) desde el correo oficial de la escuela—no de estudiantes ni reclutadores.',
        'faq.us.step1': 'Establecer contacto con el tutor',
        'faq.us.step2': 'Acuerdo de transferencia',
        'faq.us.step3': 'Enviar documento de transferencia',
        'faq.us.step4': 'Firmar documento',
        'faq.us.stateNote': 'La elegibilidad de transferencia la rigen las asociaciones estatales (p. ej. CIF, IHSA, VHSL, UHSAA). La revisión suele tardar 4–6 semanas. Ten a mano la documentación de residencia y, si aplica, las órdenes judiciales por cambios de custodia.'
    }
};

/* =============== LANGUAGE SWITCHING =============== */
let currentLang = localStorage.getItem('mas-lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('mas-lang', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    // Update language selector button text
    const langBtn = document.getElementById('lang-dropdown-btn');
    if (langBtn) {
        const langCode = langBtn.querySelector('.lang-code');
        if (langCode) langCode.textContent = lang.toUpperCase();
        // Update flag emoji
        const langFlag = langBtn.querySelector('.lang-flag');
        if (langFlag) {
            const flags = { en: '🇺🇸', fr: '🇫🇷', es: '🇪🇸' };
            langFlag.textContent = flags[lang] || '🇺🇸';
        }
    }
    
    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.lang === lang) {
            opt.classList.add('active');
        }
    });
    
    // Reload dynamic content with new language
    fetchLatestNews();
    fetchTop3Players();
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    
    // Language dropdown toggle
    const langBtn = document.getElementById('lang-dropdown-btn');
    const langDropdownContainer = document.querySelector('.lang-dropdown');
    
    if (langBtn && langDropdownContainer) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdownContainer.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langDropdownContainer.classList.remove('open');
        });
        
        // Language option click
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                setLanguage(opt.dataset.lang);
                langDropdownContainer.classList.remove('open');
            });
        });
    }
});

/* =============== HELPER: Convert markdown bold to HTML =============== */
function formatMarkdownText(text) {
    if (!text) return '';
    // Convert **text** to <strong>text</strong>
    return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/* =============== FETCH LATEST NEWS =============== */
async function fetchLatestNews() {
    const container = document.getElementById('news-container');
    if (!container) return;
    
    try {
        // Query news table, ordered by created_at
        const response = await fetch(`${SUPABASE_URL}/rest/v1/news?select=*&is_published=eq.true&order=created_at.desc&limit=3`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Supabase error:', errorData);
            throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
        }
        
        const news = await response.json();
        
        if (news.length === 0) {
            container.innerHTML = '<p class="text-center py-10 text-neutral-500">No news available at this time.</p>';
            return;
        }
        
        container.innerHTML = news.map(article => {
            // Use created_at instead of published_at
            const date = new Date(article.created_at || Date.now()).toLocaleDateString(currentLang === 'en' ? 'en-US' : currentLang === 'fr' ? 'fr-FR' : 'es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Get localized title and summary (not excerpt)
            const title = currentLang === 'es' ? (article.title_es || article.title || '') 
                        : currentLang === 'fr' ? (article.title_fr || article.title || '') 
                        : (article.title || '');
            const rawSummary = currentLang === 'es' ? (article.summary_es || article.summary || '') 
                             : currentLang === 'fr' ? (article.summary_fr || article.summary || '') 
                             : (article.summary || '');
            // Convert markdown bold (**text**) to HTML <strong>
            const summary = formatMarkdownText(rawSummary);
            
            const readMoreText = (translations[currentLang] && translations[currentLang]['news.readMore']) || 'Read More';
            
            const imagePos = article.image_position;
            const objectPositionStyle = imagePos ? `object-position: ${imagePos.x}% ${imagePos.y}%;` : '';
            
            // Render tags
            const tags = article.tags || [];
            const tagsHtml = tags.length > 0 
                ? `<div class="news-tags">
                    ${tags.map(tag => `<span class="news-tag">${tag}</span>`).join('')}
                   </div>`
                : '';
            
            return `
                <article class="news-card">
                    <div class="news-img-container">
                        ${article.image_url ? `<img src="${article.image_url}" alt="${title.replace(/"/g, '&quot;')}" class="news-img" style="${objectPositionStyle}">` : '<i class="ri-newspaper-line" style="font-size: 3rem; color: var(--text-color-light);"></i>'}
                    </div>
                    <div class="news-data">
                        ${tagsHtml}
                        <span class="news-date">${date}</span>
                        <h3 class="news-title">${title}</h3>
                        <p class="news-summary">${summary}</p>
                        <a href="https://app.metaafricasports.com/${currentLang}/news/${article.id}" class="news-link" data-i18n="news.readMore">
                            ${readMoreText}
                        </a>
                    </div>
                </article>
            `;
        }).join('');
        
    } catch (error) {
        console.error('News fetch error:', error);
        container.innerHTML = '<p class="text-center py-10 text-neutral-500">Could not load news at this time.</p>';
    }
}

/* =============== FETCH TOP 3 RANKED PLAYERS =============== */
async function fetchTop3Players() {
    const container = document.getElementById('prospects-container');
    if (!container) return;
    
    try {
        // Fetch top 3 players by rating (highest rated, published players only, excluding pro level)
        const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*&is_published=eq.true&player_level=neq.pro&rating=not.is.null&order=rating.desc&limit=3`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch players');
        
        const players = await response.json();
        
        if (players.length === 0) {
            container.innerHTML = '<p class="text-center py-10 text-neutral-500">No players available at this time.</p>';
            return;
        }
        
        container.innerHTML = players.map((player, index) => {
            const statusClass = player.status === 'Placed' ? 'badge-placed' : 'badge-available';
            const statusKey = player.status === 'Placed' ? 'prospects.placed' : 'prospects.available';
            const statusText = translations[currentLang][statusKey];
            
            // Convert 0-100 rating to 0-5 stars with half-star support
            const ratingValue = (player.rating || 0) / 20;
            const fullStars = Math.floor(ratingValue);
            const hasHalfStar = (ratingValue - fullStars) >= 0.25 && (ratingValue - fullStars) < 0.75;
            const extraFullStar = (ratingValue - fullStars) >= 0.75 ? 1 : 0;
            
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars + extraFullStar) {
                    starsHtml += '<i class="ri-star-fill"></i>';
                } else if (i === fullStars + extraFullStar + 1 && hasHalfStar) {
                    starsHtml += '<i class="ri-star-half-fill"></i>';
                } else {
                    starsHtml += '<i class="ri-star-line"></i>';
                }
            }
            
            return `
                <article class="prospect-card">
                    <div class="prospect-img-container">
                        <span class="prospect-badge ${statusClass}" data-i18n="${statusKey}">${statusText}</span>
                        ${player.profile_picture 
                            ? `<img src="${player.profile_picture}" alt="${player.first_name} ${player.last_name}" class="prospect-img">`
                            : `<div class="prospect-img-placeholder flex items-center justify-center bg-neutral-100 h-full">
                                 <i class="ri-user-line text-6xl text-neutral-300" style="font-size: 5rem; color: #eee; display: flex; align-items: center; justify-content: center; height: 100%;"></i>
                               </div>`
                        }
                    </div>
                    <div class="prospect-data">
                        <h3 class="prospect-name">${player.first_name} ${player.last_name}</h3>
                        <p class="prospect-meta">${player.position_primary || ''} ${player.height_cm ? '| ' + player.height_cm + 'cm' : ''} ${player.country ? '| ' + player.country : ''}</p>
                        <div class="prospect-rating">${starsHtml}</div>
                        <div class="prospect-stats">
                            <span>${player.class_year || ''}</span>
                        </div>
                        <a href="https://app.metaafricasports.com/${currentLang}/p/${player.id}" target="_blank" class="btn btn-primary btn-small" data-i18n="prospects.viewReport">
                            ${translations[currentLang]['prospects.viewReport']}
                        </a>
                    </div>
                </article>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Players fetch error:', error);
        container.innerHTML = '<p class="text-center py-10 text-neutral-500">Could not load players at this time. Check back later!</p>';
    }
}

/* =============== MOBILE MENU =============== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* =============== REMOVE MENU MOBILE =============== */
const navLink = document.querySelectorAll('.nav-link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* =============== SCROLL REVEAL ANIMATION =============== */
// Simple reveal on scroll implementation
const revealElements = document.querySelectorAll('.section, .feature-card, .stat-item')

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        
        if (top < triggerBottom) {
            el.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load

/* =============== STICKY HEADER =============== */
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)
