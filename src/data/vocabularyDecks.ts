import { VocabularyItem } from '../types.ts';

export interface VocabularyDeck {
  unitId: number;
  unitTitle: string;
  unitTitleAr: string;
  theme: string;
  items: VocabularyItem[];
}

export const VOCABULARY_DECKS: VocabularyDeck[] = [
  {
    unitId: 1,
    unitTitle: "Egypt's Heritage",
    unitTitleAr: "تراث مصر الحضاري",
    theme: "Heritage & Civilization",
    items: [
      { id: 'v1_1', english: 'Civilization', arabic: 'حضارة', unit: 1, example: 'Ancient Egyptian civilization is world famous.' },
      { id: 'v1_2', english: 'Preserve', arabic: 'يحفظ / يصون', unit: 1, example: 'We must preserve historic monuments.' },
      { id: 'v1_3', english: 'Restore', arabic: 'يرمم / يعيد لأصله', unit: 1, example: 'Experts restore ancient temples carefully.' },
      { id: 'v1_4', english: 'Identity', arabic: 'هوية وطنية', unit: 1, example: 'Language is essential for our national identity.' },
      { id: 'v1_5', english: 'Monuments', arabic: 'آثار / معالم', unit: 1, example: 'Luxor contains one third of the world monuments.' },
      { id: 'v1_6', english: 'Excavation', arabic: 'حفر / تنقيب', unit: 1, example: 'Archaeologists discovered tombs during excavation.' },
      { id: 'v1_7', english: 'Heritage', arabic: 'تراث ثقافي', unit: 1, example: 'World Heritage sites must be protected.' },
      { id: 'v1_8', english: 'Hieroglyphs', arabic: 'كتابة هيروغليفية', unit: 1, example: 'Champollion deciphered ancient hieroglyphs.' },
    ],
  },
  {
    unitId: 2,
    unitTitle: 'Supporting the Community',
    unitTitleAr: 'دعم المجتمع والعمل التطوعي',
    theme: 'Community & Charity',
    items: [
      { id: 'v2_1', english: 'Volunteer', arabic: 'يتطوع / متطوع', unit: 2, example: 'Many students volunteer at the local hospital.' },
      { id: 'v2_2', english: 'Donate', arabic: 'يتبرع بالمال أو الدم', unit: 2, example: 'Generous citizens donate blood regularly.' },
      { id: 'v2_3', english: 'Charity', arabic: 'جمعية خيرية', unit: 2, example: 'The charity feeds thousands of families.' },
      { id: 'v2_4', english: 'Community', arabic: 'مجتمع محلي', unit: 2, example: 'Our community works together to clean parks.' },
      { id: 'v2_5', english: 'Sustainable', arabic: 'مستدام / صديق للبيئة', unit: 2, example: 'Solar energy provides a sustainable power source.' },
      { id: 'v2_6', english: 'Conservation', arabic: 'حماية الطبيعة', unit: 2, example: 'Wildlife conservation is vital for biodiversity.' },
      { id: 'v2_7', english: 'Benefit', arabic: 'يستفيد / فائدة', unit: 2, example: 'Students benefit from interactive quizzes.' },
      { id: 'v2_8', english: 'Generosity', arabic: 'كرم / سخاء', unit: 2, example: 'Egyptian people are renowned for their generosity.' },
    ],
  },
  {
    unitId: 3,
    unitTitle: 'Improving Lives',
    unitTitleAr: 'تحسين حياة الناس والعدالة',
    theme: 'Hardship & Dickensian Themes',
    items: [
      { id: 'v3_1', english: 'Merchant', arabic: 'تاجر', unit: 3, example: 'The merchant imported textiles from abroad.' },
      { id: 'v3_2', english: 'Debt', arabic: 'دَين مالي', unit: 3, example: 'He struggled for years to pay off his debt.' },
      { id: 'v3_3', english: 'Misery', arabic: 'بؤس / شقاء', unit: 3, example: 'The poor lived in severe misery in Victorian London.' },
      { id: 'v3_4', english: 'Prison', arabic: 'سجن', unit: 3, example: 'Dickens’ father was sent to a debtors prison.' },
      { id: 'v3_5', english: 'Earn a living', arabic: 'يكسب قوت يومه', unit: 3, example: 'He worked day and night to earn a decent living.' },
      { id: 'v3_6', english: 'Hardship', arabic: 'صعوبة / مشقة', unit: 3, example: 'They overcame every hardship with resilience.' },
      { id: 'v3_7', english: 'Poverty', arabic: 'فقر', unit: 3, example: 'Education is the ultimate weapon against poverty.' },
      { id: 'v3_8', english: 'Workhouse', arabic: 'دار إيواء الفقراء', unit: 3, example: 'Oliver Twist grew up in a harsh workhouse.' },
    ],
  },
  {
    unitId: 4,
    unitTitle: 'Making Friends',
    unitTitleAr: 'تكوين الصداقات والمشاعر',
    theme: 'Friendship & Empathy',
    items: [
      { id: 'v4_1', english: 'Bullying', arabic: 'تنمر', unit: 4, example: 'Schools must take strict action against bullying.' },
      { id: 'v4_2', english: 'Connection', arabic: 'صلة / رابط قوي', unit: 4, example: 'True friends build a deep emotional connection.' },
      { id: 'v4_3', english: 'Advice', arabic: 'نصيحة', unit: 4, example: 'Mr. Mohammad gave us valuable exam advice.' },
      { id: 'v4_4', english: 'Empathy', arabic: 'تعاطف / تفهم مشاعر الآخرين', unit: 4, example: 'Empathy helps us resolve conflicts peacefully.' },
      { id: 'v4_5', english: 'Stress', arabic: 'ضغط عصبي / توتر', unit: 4, example: 'Regular revision reduces pre-exam stress.' },
      { id: 'v4_6', english: 'Trustworthy', arabic: 'جدير بالثقة / أمين', unit: 4, example: 'A trustworthy classmate keeps your secrets safe.' },
      { id: 'v4_7', english: 'Lonely', arabic: 'شاعراً بالوحدة', unit: 4, example: 'New students often feel lonely on their first day.' },
      { id: 'v4_8', english: 'Encourage', arabic: 'يشجع ويدعم', unit: 4, example: 'Good teachers encourage students to excel.' },
    ],
  },
  {
    unitId: 5,
    unitTitle: 'Being Safe Online',
    unitTitleAr: 'الأمان الرقمي والإنترنت',
    theme: 'Cybersecurity & Privacy',
    items: [
      { id: 'v5_1', english: 'Hacker', arabic: 'مخترق إلكتروني', unit: 5, example: 'The hacker tried to steal account credentials.' },
      { id: 'v5_2', english: 'Phishing scam', arabic: 'احتيال إلكتروني مضلل', unit: 5, example: 'Never click on links in a phishing scam email.' },
      { id: 'v5_3', english: 'Cyber attack', arabic: 'هجوم سيبراني', unit: 5, example: 'Firewalls protect against sudden cyber attacks.' },
      { id: 'v5_4', english: 'Privacy', arabic: 'خصوصية البيانات', unit: 5, example: 'Keep your personal privacy settings updated.' },
      { id: 'v5_5', english: 'Password', arabic: 'كلمة مرور سرية', unit: 5, example: 'Use strong passwords with numbers and symbols.' },
      { id: 'v5_6', english: 'Suspicious', arabic: 'مريب / مشبوه', unit: 5, example: 'Do not download suspicious unknown files.' },
      { id: 'v5_7', english: 'Malware', arabic: 'برمجيات خبيثة', unit: 5, example: 'Antivirus software cleans malware from PCs.' },
      { id: 'v5_8', english: 'Antivirus', arabic: 'مضاد فيروسات', unit: 5, example: 'Always keep your antivirus scanner active.' },
    ],
  },
  {
    unitId: 6,
    unitTitle: 'Learning from Literature',
    unitTitleAr: 'الأدب والشعر والنقد',
    theme: 'Poetry & Literary Appreciation',
    items: [
      { id: 'v6_1', english: 'Metaphor', arabic: 'استعارة مكنية', unit: 6, example: 'The poet used a brilliant metaphor in verse one.' },
      { id: 'v6_2', english: 'Rhythm', arabic: 'إيقاع ونغم شعري', unit: 6, example: 'The rhythm of the poem sounds like ocean waves.' },
      { id: 'v6_3', english: 'Moral', arabic: 'مغزى / درس أخلاقي', unit: 6, example: 'Every classic fable teaches a profound moral.' },
      { id: 'v6_4', english: 'Poetry', arabic: 'شعر / قصائد', unit: 6, example: 'English poetry enriches creative imagination.' },
      { id: 'v6_5', english: 'Verse', arabic: 'بيت شعري', unit: 6, example: 'Recite the second verse with proper intonation.' },
      { id: 'v6_6', english: 'Theme', arabic: 'فكرة رئيسية / موضوع', unit: 6, example: 'Friendship is the recurring theme of the novel.' },
      { id: 'v6_7', english: 'Rhyme', arabic: 'قافية متجانسة', unit: 6, example: 'The words cat and bat rhyme perfectly.' },
      { id: 'v6_8', english: 'Dramatic', arabic: 'درامي ومثير', unit: 6, example: 'The story reached a dramatic turning point.' },
    ],
  },
];
