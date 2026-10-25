import { UnitCurriculum } from '../types/curriculum.ts';
import { createBaccalaureateUnit } from './baccalaureateUnitFactory.ts';
import {
  bacLitSec1Ch2,
  bacLitSec1Ch3,
  bacLitSec1Ch4,
  bacLitSec1Ch5,
  bacLitSec1Ch6,
  bacLitSec2Act1,
  bacLitSec2Act2,
  bacLitSec2Act3,
  bacLitSec2Act4,
  bacLitSec2Act5,
  bacLitSec2Act6,
  bacLitSec3Ch1,
  bacLitSec3Ch2,
  bacLitSec3Ch3,
  bacLitSec3Ch4,
  bacLitSec3Ch5,
  bacLitSec3Ch6
} from './baccalaureateLiterature.ts';

// =================================================================================================
// EGYPTIAN BACCALAUREATE COMPLETE UNITS SUITE (2026/2027 SPECIFICATIONS)
// =================================================================================================

// -------------------------------------------------------------------------------------------------
// GRADE 10 (SECONDARY 1) - UNITS 2 & 3
// -------------------------------------------------------------------------------------------------

export const bacSec1Unit2: UnitCurriculum = createBaccalaureateUnit(
  10,
  'Secondary 1 (Baccalaureate) - الصف الأول الثانوي',
  1,
  2,
  'Civic Leadership & Philanthropic Architecture',
  'القيادة المدنية وصياغة العمل التطوعي المتقدم',
  'Altruism, Non-Governmental Organizations & Structural Community Empowerment',
  'Correlative Conjunctions & Subjunctive Passive Forms',
  'الروابط المزدوجة المتلازمة وصيغة الإلزام في المبني للمجهول',
  'Correlative conjunctions (Not only... but also, Scarcely... when) require parallel syntactic structures and inversion when fronted. Subjunctive passives follow formal resolutions (e.g. It is vital that relief supplies be dispatched).',
  [
    { word: 'philanthropy', meaningAr: 'العمل الخيري المؤسسي والتكافل الإنساني', partOfSpeech: 'noun', def: 'The practice of donating resources to promote the welfare of others.', ex: 'Strategic philanthropy provides sustainable infrastructure rather than temporary handouts.', exAr: 'يوفر العمل الخيري الاستراتيجي بنية تحتية مستدامة بدلاً من المساعدات المؤقتة.', collocation: 'strategic philanthropy' },
    { word: 'altruism', meaningAr: 'الإيثار والتفاني في خدمة المجتمع', partOfSpeech: 'noun', def: 'Disinterested and selfless concern for the well-being of others.', ex: 'Civilian volunteers displayed profound altruism during post-flood recovery operations.', exAr: 'أظهر المتطوعون المدنيون إيثاراً عظيماً خلال عمليات التعافي من السيول.', collocation: 'pure altruism' },
    { word: 'empowerment', meaningAr: 'تمكين الفئات المجتمعية وبناء قدراتها', partOfSpeech: 'noun', def: 'The process of becoming stronger and more confident in controlling one’s life.', ex: 'Microfinance initiatives facilitate the economic empowerment of rural craftswomen.', exAr: 'تسهل مبادرات التمويل متناهي الصغر التمكين الاقتصادي للحرفيات في الريف.', collocation: 'economic empowerment' },
    { word: 'disparities', meaningAr: 'فجوات وتفاوتات اجتماعية واقتصادية', partOfSpeech: 'noun pl.', def: 'Noticeable differences and inequalities between groups.', ex: 'Decentralized healthcare clinics reduce health disparities across governorates.', exAr: 'تقلل العيادات الصحية اللامركزية من الفجوات الصحية بين المحافظات.', collocation: 'social disparities' },
    { word: 'civic', meaningAr: 'مدني ومتعلق بالمواطنة والواجب العام', partOfSpeech: 'adjective', def: 'Relating to the duties or activities of people in relation to their town or society.', ex: 'Civic participation is essential for a flourishing democratic ecosystem.', exAr: 'المشاركة المدنية ضرورية لنمو مجتمع مزدهر وديمقراطي.', collocation: 'civic engagement' },
    { word: 'mobilize', meaningAr: 'يحشد ويستنفر الطاقات والجهود', partOfSpeech: 'verb', def: 'To organize and encourage people to act or work together.', ex: 'Community leaders mobilized emergency logistical convoys within twelve hours.', exAr: 'حشد قادة المجتمع قوافل الإغاثة اللوجستية في غضون اثنتي عشرة ساعة.', collocation: 'mobilize resources' },
    { word: 'equitable', meaningAr: 'عادل ومنصف للجميع', partOfSpeech: 'adjective', def: 'Fair and impartial; dealing justly with all concerned.', ex: 'An equitable distribution of educational technology bridges the digital divide.', exAr: 'يسهم التوزيع العادل لوسائل التعليم التكنولوجي في تضييق الفجوة الرقمية.', collocation: 'equitable access' },
    { word: 'transparency', meaningAr: 'الشفافية والنزاهة الإدارية', partOfSpeech: 'noun', def: 'Operating in such a way that it is easy for others to see what actions are performed.', ex: 'Non-profit governance requires financial transparency and audited accounts.', exAr: 'تتطلب إدارة المنظمات غير الربحية شفافية مالية وحسابات مدققة.', collocation: 'fiscal transparency' },
    { word: 'sustainable', meaningAr: 'مستدام ومحافظ على الموارد مستقبلاً', partOfSpeech: 'adjective', def: 'Able to be maintained at a certain rate without depleting natural or human capital.', ex: 'Sustainable vocational programs equip youth with lifelong market competencies.', exAr: 'تزود البرامج المهنية المستدامة الشباب بكفاءات تدوم مدى الحياة.' },
    { word: 'advocacy', meaningAr: 'الدعوة والدفاع عن الحقوق والقضايا', partOfSpeech: 'noun', def: 'Public support for or recommendation of a particular cause or policy.', ex: 'Legal advocacy organizations safeguard the constitutional rights of marginalized workers.', exAr: 'تحمي منظمات الدعم القانوني الحقوق الدستورية للعمال المهمشين.' },
    { word: 'synergy', meaningAr: 'تآزر وتكامل الطاقات لتحقيق نتائج أكبر', partOfSpeech: 'noun', def: 'The interaction of elements that when combined produce a total effect greater than the sum of parts.', ex: 'Synergy between municipal councils and NGOs accelerated village sanitation projects.', exAr: 'أدى التآزر بين المجالس المحلية والجمعيات الأهلية إلى تسريع مشاريع الصرف بالقرى.' },
    { word: 'solidarity', meaningAr: 'التضامن والتكاتف الجمعي', partOfSpeech: 'noun', def: 'Unity or agreement of feeling or action among individuals with a common interest.', ex: 'National solidarity during economic shocks reinforces social cohesion.', exAr: 'يعزز التضامن الوطني وقت الصدمات الاقتصادية التماسك الاجتماعي.' },
    { word: 'grassroots', meaningAr: 'قاعدي وشعبي نابع من صلب المجتمع', partOfSpeech: 'adjective', def: 'Originating from the most basic level of an organization or community.', ex: 'Grassroots campaigns frequently originate the most enduring social innovations.', exAr: 'غالباً ما تبدع الحملات الشعبية القاعدية أكثر الابتكارات الاجتماعية رسوخاً.' },
    { word: 'governance', meaningAr: 'الحوكمة والإدارة الرشيدة', partOfSpeech: 'noun', def: 'The action or manner of governing a body through ethical systems and oversight.', ex: 'Robust corporate governance prevents mismanagement in philanthropic endowments.', exAr: 'تمنع الحوكمة المؤسسية الرشيدة سوء الإدارة في الأوقاف الخيرية.' },
    { word: 'benevolent', meaningAr: 'خيّر ومحب للإحسان', partOfSpeech: 'adjective', def: 'Well meaning and kindly; serving humanitarian objectives.', ex: 'Benevolent foundations provided emergency scholarships for displaced students.', exAr: 'قدمت المؤسسات الخيرية منحاً دراسية طارئة للطلاب النازحين.' },
    { word: 'rehabilitation', meaningAr: 'إعادة التأهيل والإدماج', partOfSpeech: 'noun', def: 'The action of restoring someone to health or normal life through training.', ex: 'The vocational rehabilitation center reintegrated injured youth into the workforce.', exAr: 'أعاد مركز التأهيل المهني إدماج الشباب المصابين في سوق العمل.' },
    { word: 'endowment', meaningAr: 'وقف مالي خيري مستدام', partOfSpeech: 'noun', def: 'An income-yielding property or fund bequeathed to an institution.', ex: 'Al-Azhar’s historic endowments have financed educational equity for centuries.', exAr: 'مولت أوقاف الأزهر الشريف التاريخية العدالة التعليمية عبر القرون.' },
    { word: 'initiative', meaningAr: 'مبادرة ريادية استباقية', partOfSpeech: 'noun', def: 'An act or strategy intended to resolve a difficulty or improve a situation.', ex: 'The national Decent Life initiative renovates rural social infrastructure.', exAr: 'تطور مبادرة حياة كريمة الوطنية البنية التحتية الاجتماعية في الريف.' },
    { word: 'stakeholder', meaningAr: 'أصحاب المصلحة والأطراف المعنية', partOfSpeech: 'noun', def: 'A person with an interest or concern in something, especially a business or policy.', ex: 'Consulting local community stakeholders ensures developmental projects succeed.', exAr: 'يضمن استشعار آراء أصحاب المصلحة من المجتمع المحلي نجاح المشاريع.' },
    { word: 'catalyst', meaningAr: 'محفز وعامل مساعد للتغيير الإيجابي', partOfSpeech: 'noun', def: 'A person, thing, or event that causes an important change to take place.', ex: 'Digital literacy serves as a catalyst for socio-economic mobility.', exAr: 'تمثل المهارات الرقمية محفزاً حيوياً للارتقاء الاجتماعي والاقتصادي.' }
  ],
  'Institutional Philanthropy and Civic Resilience in Modern Egypt',
  'In an era characterized by global macroeconomic recalibration, civil society organizations (CSOs) constitute an indispensable pillar of civic equilibrium. In Egypt, philanthropic architecture has evolved from unstructured almsgiving toward systemic developmental empowerment. Through public-private partnerships, endowments (Awqaf) and community foundations address structural disparities in healthcare, vocational apprenticeships, and ecological resilience. Under no circumstances should civic engagement be viewed as a substitute for sovereign public services; rather, it functions as a nimble catalyst capable of innovating hyper-localized interventions.',
  'Civic Leadership Symposium: Cairo Operational Center',
  'Eng. Farida (NGO Alliance Director) & Dr. Sherif (Social Policy Researcher)',
  'Farida: "Not only does strategic philanthropy disburse material relief, but it also establishes permanent human capacity."\nSherif: "Scarcely had the community committee launched the solar water desalination initiative when three neighboring hamlets requested replication."\nFarida: "It is imperative that every funded project be evaluated against verified social return on investment metrics."\nSherif: "Indeed. By coupling transparency with youth volunteerism, Egyptian Baccalaureate leaders bridge academic theory with transformative civic action."',
  {
    vocab: [
      { id: 'b_s1_u2_v1', skill: 'Vocabulary', question: 'The term "altruism" is defined in socio-ethical philosophy as __________.', options: ['unselfish concern for the welfare of others', 'mercenary business transactions', 'authoritarian government control', 'passive intellectual indifference'], correctAnswer: 'A', explanation: 'Altruism denotes selfless dedication to the common good.' },
      { id: 'b_s1_u2_v2', skill: 'Vocabulary', question: 'Which lexical pair represents antonyms in social policy?', options: ['disparity vs equity', 'synergy vs cooperation', 'philanthropy vs benevolence', 'catalyst vs motivator'], correctAnswer: 'A', explanation: 'Disparity (inequality) and equity (fairness) are opposing concepts.' },
      { id: 'b_s1_u2_v3', skill: 'Vocabulary', question: 'An income-yielding fund permanently dedicated to educational institutions is a(n) __________.', options: ['endowment', 'deficit', 'embargo', 'conscription'], correctAnswer: 'A', explanation: 'An endowment (Waqf) generates dedicated income for institutional causes.' },
      { id: 'b_s1_u2_v4', skill: 'Vocabulary', question: 'To "mobilize" community resources means to __________.', options: ['marshal and organize them for coordinated action', 'hoard them in secret accounts', 'scatter them haphazardly', 'prohibit their ethical utilization'], correctAnswer: 'A', explanation: 'Mobilizing is gathering and organizing resources for effective deployment.' }
    ],
    grammar: [
      { id: 'b_s1_u2_g1', skill: 'Grammar', question: 'Not only __________ emergency logistical aid, but they also established mobile health clinics.', options: ['did the volunteers distribute', 'the volunteers distributed', 'distributed the volunteers', 'were the volunteers distributing'], correctAnswer: 'A', explanation: 'Inversion after fronted "Not only": Not only + auxiliary did + subject + base verb.' },
      { id: 'b_s1_u2_g2', skill: 'Grammar', question: 'Scarcely had the humanitarian convoy arrived __________ the distribution began.', options: ['when', 'than', 'then', 'that'], correctAnswer: 'A', explanation: 'Scarcely had + S + PP is paired strictly with "when".' },
      { id: 'b_s1_u2_g3', skill: 'Grammar', question: 'The civic board recommended that the annual audit __________ publicly accessible.', options: ['be made', 'is made', 'was made', 'has made'], correctAnswer: 'A', explanation: 'Subjunctive passive: recommended that + subject + be + past participle.' },
      { id: 'b_s1_u2_g4', skill: 'Grammar', question: 'Identify the sentence with correct parallel correlative structure:', options: ['Either we implement sustainable governance or we risk systemic mismanagement.', 'Either we implement sustainable governance or risking mismanagement.', 'Either implementing governance or to risk mismanagement.', 'Either implement governance or mismanagement risks.'], correctAnswer: 'A', explanation: 'Either [clause] or [clause] maintains rigorous syntactic parallelism.' }
    ],
    reading: [
      { id: 'b_s1_u2_r1', skill: 'Reading', question: 'The author asserts that modern Egyptian philanthropy differs from historical charity because it __________.', options: ['prioritizes structural capacity building over unstructured handouts', 'relies exclusively on overseas donations', 'rejects technological innovation in favor of folklore', 'operates without community oversight'], correctAnswer: 'A', explanation: 'The text highlights the evolution from unstructured almsgiving toward systemic empowerment.' },
      { id: 'b_s1_u2_r2', skill: 'Reading', question: 'According to the passage, civic organizations should be understood as __________.', options: ['catalysts for innovation that complement sovereign state infrastructure', 'substitutes intended to dismantle public health ministries', 'profit-driven commercial monopolies', 'temporary entities with no long-term utility'], correctAnswer: 'A', explanation: 'CSOs act as nimble catalysts complementing, rather than replacing, state institutions.' }
    ],
    listening: [
      { id: 'b_s1_u2_l1', skill: 'Listening', question: 'What prompted neighboring hamlets to request replication?', options: ['The evident success of the solar water desalination initiative', 'A directive ordering all villages to shut down wells', 'A promotional commercial on television', 'An economic penalty for non-participation'], correctAnswer: 'A', explanation: 'The solar water desalination model inspired nearby hamlets.' }
    ],
    exam: [
      { id: 'b_s1_u2_e1', skill: 'Vocabulary', question: 'Fiscal transparency is essential in non-governmental organizations to ensure that public donors __________ the integrity of governance.', options: ['trust and verify', 'condemn and litigate', 'disregard and mock', 'undermine and falsify'], correctAnswer: 'A', explanation: 'Transparency inspires public trust and verifiable accountability.' },
      { id: 'b_s1_u2_e2', skill: 'Grammar', question: 'It is vital that emergency relief funds __________ directly to verified beneficiaries.', options: ['be channeled', 'are channeled', 'were channeled', 'have channeled'], correctAnswer: 'A', explanation: 'Subjunctive passive: vital that + subject + be + past participle.' }
    ]
  },
  bacLitSec1Ch2
);

export const bacSec1Unit3: UnitCurriculum = createBaccalaureateUnit(
  10,
  'Secondary 1 (Baccalaureate) - الصف الأول الثانوي',
  1,
  3,
  'Digital Epistemology & Algorithmic Media',
  'نظرية المعرفة الرقمية والإعلام الخوارزمي',
  'Infodemic Containment, Deepfake Forensics & Cognitive Resistance to Disinformation',
  'Inverted Conditionals & Modal Stance in Media Forensics',
  'الجمل الشرطية المقلوبة والتعبير عن الموقف الاستدلالي',
  'Inverted conditionals omit "if" by inverting auxiliary verbs (Were it not for, Had they investigated, Should users encounter). Modal stance indicates epistemic certainty (e.g. must needs be, cannot plausibly be).',
  [
    { word: 'disinformation', meaningAr: 'المعلومات المضللة الكاذبة والموجهة عمداً', partOfSpeech: 'noun', def: 'False information deliberately spread to deceive and manipulate.', ex: 'Coordinated disinformation campaigns distort public perception during crises.', exAr: 'تشوه حملات التضليل المنسقة إدراك الرأي العام خلال الأزمات.', collocation: 'disinformation campaign' },
    { word: 'deepfake', meaningAr: 'التزييف العميق والوسائط المولدة اصطناعياً', partOfSpeech: 'noun', def: 'Synthetic media wherein person likeness is replaced with authentic-looking AI generation.', ex: 'Forensic analysts detected micro-pixel anomalies in the viral deepfake video.', exAr: 'اكتشف محللو الأدلة الجنائية تشوهات بكسلية دقيقة في فيديو التزييف العميق المتداول.', collocation: 'generative deepfake' },
    { word: 'forensics', meaningAr: 'الأدلة الجنائية والتحقيق الرقمي الدقيق', partOfSpeech: 'noun pl.', def: 'Scientific tests or techniques used in the investigation of digital artifacts or crimes.', ex: 'Digital forensics revealed that the audio recording had been synthetically synthesized.', exAr: 'كشف التحقيق الجنائي الرقمي أن التسجيل الصوتي تم تركيبه اصطناعياً.', collocation: 'digital forensics' },
    { word: 'epistemology', meaningAr: 'نظرية المعرفة وتمييز الحقيقة من الزيف', partOfSpeech: 'noun', def: 'The philosophical investigation of knowledge, justification, and belief.', ex: 'Digital epistemology examines how algorithmic curation shapes our perception of truth.', exAr: 'تبحث نظرية المعرفة الرقمية في كيفية تشكيل الخوارزميات لإدراكنا للحقيقة.', collocation: 'digital epistemology' },
    { word: 'algorithm', meaningAr: 'خوارزمية برمجية ذاتية التوجيه', partOfSpeech: 'noun', def: 'A process or set of rules followed in calculations or problem-solving by a computer.', ex: 'Social media algorithms prioritize provocative content to maximize user engagement.', exAr: 'ترتب خوارزميات وسائل التواصل المحتوى المثير لتضخيم تفاعل المستخدمين.', collocation: 'recommendation algorithm' },
    { word: 'provenance', meaningAr: 'المصدر الموثق والمنشأ التاريخي الأصلي', partOfSpeech: 'noun', def: 'The place of origin or earliest known history of something, confirming authenticity.', ex: 'Verifying digital provenance through cryptographic watermarks prevents fraud.', exAr: 'يمنع التحقق من المنشأ الرقمي عبر العلامات المائية المشفرة عمليات التزوير.', collocation: 'digital provenance' },
    { word: 'infodemic', meaningAr: 'وباء المعلومات المغلوطة المتفشي', partOfSpeech: 'noun', def: 'An overabundance of information, both accurate and not, making solutions difficult.', ex: 'Public health authorities battled both the biological pathogen and an online infodemic.', exAr: 'حاربت سلطات الصحة العامة الميكروب البيولوجي ووباء المعلومات المضللة معاً.', collocation: 'global infodemic' },
    { word: 'scrutiny', meaningAr: 'الفحص والتدقيق التمحيصي الصارم', partOfSpeech: 'noun', def: 'Critical, thorough observation or examination.', ex: 'Peer-reviewed studies undergo rigorous editorial scrutiny prior to dissemination.', exAr: 'تخضع الدراسات المحكمة لتدقيق تمحيصي صارم قبل النشر والتداول.', collocation: 'rigorous scrutiny' },
    { word: 'authenticate', meaningAr: 'يوثق ويثبت صحة ومصداقية الشيء', partOfSpeech: 'verb', def: 'Prove or show something to be true, genuine, or valid.', ex: 'Cryptographic hashing authenticates that evidence was not altered in transit.', exAr: 'يثبت التشفير الرقمي بالهاش أن الأدلة لم يتم التلاعب بها أثناء النقل.' },
    { word: 'polarization', meaningAr: 'الاستقطاب والانقسام الفكري الحاد', partOfSpeech: 'noun', def: 'Division into two sharply contrasting groups or sets of opinions.', ex: 'Echo chambers on social platforms intensify civic and political polarization.', exAr: 'تزيد غرف الصدى على المنصات الرقمية من حدة الاستقطاب والانقسام المدني.' },
    { word: 'synthetic', meaningAr: 'اصطناعي ومركب تكنولوجياً', partOfSpeech: 'adjective', def: 'Made by chemical synthesis or artificial digital generation rather than naturally occurring.', ex: 'Synthetic audio cloning can replicate human vocal timbres flawlessly.', exAr: 'يستطيع استنساخ الصوت الاصطناعي تقليد النبرة البشرية بدقة متناهية.' },
    { word: 'lucidity', meaningAr: 'الوضوح العقلي والنقاء الفكري', partOfSpeech: 'noun', def: 'Clarity of expression; the ability to think clearly without confusion.', ex: 'Critical thinkers cultivate mental lucidity amidst information overload.', exAr: 'ينمي المفكرون النقديون الوضوح الذهني وسط طوفان المعلومات الزائد.' },
    { word: 'anomaly', meaningAr: 'خلل أو شذوذ غير طبيعي عن النمط المعتاد', partOfSpeech: 'noun', def: 'Something that deviates from what is standard, normal, or expected.', ex: 'Blinking anomalies in facial video feeds often expose amateur deepfakes.', exAr: 'تكشف اضطرابات حركة رمش العين في مقاطع الوجه مقاطع التزييف العميق البدائية.' },
    { word: 'heuristic', meaningAr: 'قاعدة استدلالية ذهنية سريعة', partOfSpeech: 'adjective', def: 'Enabling someone to discover or learn something for themselves intuitively.', ex: 'Heuristic mental shortcuts can mislead readers into accepting sensational headlines.', exAr: 'قد تخدع القواعد الذهنية الاستدلالية السريعة القراء لقبول العناوين المثيرة.' },
    { word: 'cryptographic', meaningAr: 'تشفيري ورقمي مؤمّن', partOfSpeech: 'adjective', def: 'Relating to the science of coding information securely.', ex: 'Cryptographic ledgers record immutable timestamps for journalistic integrity.', exAr: 'تسجل الدفاتر التشفيرية بصمات زمنية غير قابلة للتغيير لضمان النزاهة الصحفية.' },
    { word: 'debunk', meaningAr: 'يفند ويدحض الشائعات بالأدلة', partOfSpeech: 'verb', def: 'Expose the falseness or hollowness of a myth, idea, or belief.', ex: 'Fact-checking agencies rapidly debunk manipulated disaster photographs.', exAr: 'تفند وكالات التحقق من الحقائق الصور المفبركة للكوارث على الفور.' },
    { word: 'cognitive', meaningAr: 'معرفي وإدراكي عقلي', partOfSpeech: 'adjective', def: 'Relating to mental processes of understanding, learning, and remembering.', ex: 'Cognitive resistance to propaganda requires training in media literacy.', exAr: 'تتطلب المقاومة المعرفية للدعاية التدريب على الثقافة الإعلامية.' },
    { word: 'transcription', meaningAr: 'تفريغ وتوثيق نصي دقيق', partOfSpeech: 'noun', def: 'A written or printed version of speech or other data.', ex: 'The automated transcription matched the witness testimony verbatim.', exAr: 'تطابق التفريغ النصي التلقائي مع شهادة الشاهد حرفياً.' },
    { word: 'manipulation', meaningAr: 'التلاعب والتحوير الخبيث للحقائق', partOfSpeech: 'noun', def: 'The action of manipulating something unfairly or deceptively.', ex: 'Subtle video manipulation alters the perceived emotional state of public figures.', exAr: 'يغير التلاعب الدقيق بالفيديو الحالة الشعورية الظاهرة للشخصيات العامة.' },
    { word: 'vigilance', meaningAr: 'اليقظة والحذر الفكري الدائم', partOfSpeech: 'noun', def: 'The action or state of keeping careful watch for possible danger or falsehood.', ex: 'Civic vigilance is our most potent defense against automated cyber-propaganda.', exAr: 'تمثل اليقظة المدنية أقوى دروعنا الدفاعية في مواجهة الدعاية السيبرانية المؤتمتة.' }
  ],
  'Forensic Detection of Deepfake Disinformation in the AI Era',
  'The contemporary digital ecosystem is perpetually threatened by generative synthetic media. Deepfake algorithms, leveraging deep neural networks and diffusion architectures, fabricate video and audio indistinguishable to the unassisted human eye. When weaponized in electoral cycles or financial markets, synthetic media destabilizes societal consensus. Media forensic science combats this epistemic threat through cryptographic origin tracing and algorithmic artifact detection: analyzing corneal reflections, blood flow micro-pulses, and acoustic spectral anomalies.',
  'Cyber-Epistemology Conference: Smart Village Giza',
  'Dr. Ziad (Digital Forensics Director) & Professor Salma (Media Sociologist)',
  'Ziad: "Had we not deployed automated cryptographic provenance checks, the synthetic banking audio would have triggered panic."\nSalma: "Were citizens to rely purely on intuitive heuristics, disinformation would corrode democratic institutions."\nZiad: "Precisely. Under no circumstances should an unverified video dictate official regulatory response."\nSalma: "Egyptian Baccalaureate students must develop cognitive forensics: querying origin, corroborating sources, and verifying digital provenance."',
  {
    vocab: [
      { id: 'b_s1_u3_v1', skill: 'Vocabulary', question: 'The term "digital provenance" signifies __________.', options: ['the verifiable chronology of custody and original creation of a digital asset', 'the physical price of hardware components', 'the color scheme of a website interface', 'the total download count of an application'], correctAnswer: 'A', explanation: 'Provenance traces origin, custody, and cryptographic authenticity.' },
      { id: 'b_s1_u3_v2', skill: 'Vocabulary', question: 'An "infodemic" describes a situation where __________.', options: ['excessive false and true information makes truth difficult to discern', 'computers are wiped clean of all data simultaneously', 'schools ban all digital screens', 'libraries run out of paper books'], correctAnswer: 'A', explanation: 'An infodemic is an overwhelming flood of mixed accurate and misleading information.' }
    ],
    grammar: [
      { id: 'b_s1_u3_g1', skill: 'Grammar', question: 'Invert for formal register: "If researchers had verified the metadata, they would have exposed the deepfake." -> __________', options: ['Had researchers verified the metadata, they would have exposed the deepfake.', 'Did researchers verify the metadata, they exposed the deepfake.', 'Were researchers verifying metadata, they would expose.', 'Should researchers have verified the metadata, they exposed.'], correctAnswer: 'A', explanation: 'Third conditional inversion: Had + Subject + Past Participle.' },
      { id: 'b_s1_u3_g2', skill: 'Grammar', question: 'Invert second conditional: "If algorithms were to be audited independently, user trust would rise." -> __________', options: ['Were algorithms to be audited independently, user trust would rise.', 'Did algorithms audit independently, trust rose.', 'Had algorithms audited independently, trust had risen.', 'Should algorithms audit independently, trust will rise.'], correctAnswer: 'A', explanation: 'Second conditional inversion with were: Were + Subject + to + verb.' }
    ],
    reading: [
      { id: 'b_s1_u3_r1', skill: 'Reading', question: 'What biological anomalies help forensic experts detect synthetic deepfake faces?', options: ['Corneal reflections and facial blood-flow micro-pulses', 'The subject’s hair color and clothing choice', 'The length of the video file title', 'The language spoken by the subject'], correctAnswer: 'A', explanation: 'Forensic algorithms look for corneal light reflections and subtle blood pulse changes.' }
    ],
    listening: [
      { id: 'b_s1_u3_l1', skill: 'Listening', question: 'What prevented the synthetic audio from triggering a financial panic?', options: ['The immediate deployment of automated cryptographic provenance checks', 'The complete shutdown of the national electrical grid', 'The cancellation of all currency transactions', 'A public holiday announced by authorities'], correctAnswer: 'A', explanation: 'Automated cryptographic checks exposed the fraudulent recording immediately.' }
    ],
    exam: [
      { id: 'b_s1_u3_e1', skill: 'Vocabulary', question: 'To "debunk" a digital rumor is to __________.', options: ['demonstrate its falsehood using verifiable empirical evidence', 'promote it across social media channels', 'translate it into ancient languages', 'save it in an encrypted archive without reading'], correctAnswer: 'A', explanation: 'Debunking is disproving false claims with facts.' },
      { id: 'b_s1_u3_e2', skill: 'Grammar', question: '__________ the viral video, the regulatory council would have sanctioned the platform.', options: ['Had they not audited', 'Did they not audit', 'Were they not auditing', 'If they not audited'], correctAnswer: 'A', explanation: 'Had + subject + not + past participle for negative inverted conditional.' }
    ]
  },
  bacLitSec1Ch3
);

// -------------------------------------------------------------------------------------------------
// GRADE 11 (SECONDARY 2) - UNITS 2 & 3
// -------------------------------------------------------------------------------------------------

export const bacSec2Unit2: UnitCurriculum = createBaccalaureateUnit(
  11,
  'Secondary 2 (Baccalaureate) - الصف الثاني الثانوي',
  1,
  2,
  'Macroeconomic Sustainability & Resource Economics',
  'الاستدامة الاقتصادية الكلية واقتصاد الموارد البديلة',
  'Circular Bioeconomy, Decarbonization Mandates & Multilateral Trade Tariffs',
  'Mixed Conditionals & Participle Clauses in Economic Forecasts',
  'الجمل الشرطية المختلطة والجمل الفعلية الإضافية في التحليل الاقتصادي',
  'Mixed conditionals combine different time frames (e.g. Past cause with Present effect: Had we diversified the energy grid then, we would enjoy thermal stability now). Participle clauses provide concise academic density.',
  [
    { word: 'macroeconomics', meaningAr: 'الاقتصاد الكلي والسياسات النقدية العامة', partOfSpeech: 'noun', def: 'The branch of economics concerned with large-scale or general economic factors.', ex: 'Macroeconomics analyzes inflation, national productivity, and fiscal stability.', exAr: 'يحلل الاقتصاد الكلي التضخم والإنتاجية القومية والاستقرار المالي.', collocation: 'macroeconomic stability' },
    { word: 'circular economy', meaningAr: 'الاقتصاد الدائري القائم على إعادة التدوير', partOfSpeech: 'noun', def: 'An economic model focused on eliminating waste through reuse, repair, and recycling.', ex: 'A circular economy decouples industrial growth from finite resource consumption.', exAr: 'يفصل الاقتصاد الدائري النمو الصناعي عن استنزاف الموارد المحدودة.', collocation: 'circular bioeconomy' },
    { word: 'decarbonization', meaningAr: 'إزالة الكربون وخفض الانبعاثات الصناعية', partOfSpeech: 'noun', def: 'The reduction or removal of carbon dioxide emissions from economic sectors.', ex: 'Industrial decarbonization mandates stimulate investment in green hydrogen production.', exAr: 'تحفز لوائح خفض الانبعاثات الكربونية الاستثمار في إنتاج الهيدروجين الأخضر.', collocation: 'industrial decarbonization' },
    { word: 'amortization', meaningAr: 'إهلاك الديون والأصول الرأسمالية تدريجياً', partOfSpeech: 'noun', def: 'The action or process of gradually writing off the initial cost of an asset or loan.', ex: 'Capital amortization schedules allow solar farms to repay infrastructure debt.', exAr: 'تتيح جداول إهلاك رأس المال لمحطات الطاقة الشمسية سداد قروض البنية التحتية.', collocation: 'loan amortization' },
    { word: 'equilibrium', meaningAr: 'التوازن الاقتصادي بين العرض والطلب', partOfSpeech: 'noun', def: 'A state where economic forces such as supply and demand are balanced.', ex: 'Market equilibrium stabilizes commodity pricing during global shipping disruptions.', exAr: 'يحقق التوازن السوقي استقرار أسعار السلع أثناء اضطرابات الشحن العالمية.', collocation: 'market equilibrium' },
    { word: 'externalities', meaningAr: 'الآثار الجانبية والتكاليف الخارجية غير المباشرة', partOfSpeech: 'noun pl.', def: 'Side effects or consequences of industrial activity affecting external parties.', ex: 'Pollution is a negative externality requiring regulatory carbon tax penalties.', exAr: 'يمثل التلوث تكلفة خارجية سلبية تستوجب فرض ضرائب كربونية رادعة.', collocation: 'negative externalities' },
    { word: 'sovereign debt', meaningAr: 'الدين السيادي الحكومي', partOfSpeech: 'noun', def: 'Bonds and borrowing issued by a national sovereign government in foreign currencies.', ex: 'Debt-for-nature swaps allow developing nations to reduce sovereign debt burdens.', exAr: 'تتيح مبادلة الديون بحماية الطبيعة للدول النامية تخفيف أعباء الدين السيادي.', collocation: 'sovereign debt relief' },
    { word: 'subsidy', meaningAr: 'الدعم المالي المباشر من الدولة', partOfSpeech: 'noun', def: 'A sum of money granted by the state to assist an industry or keep prices low.', ex: 'Phasing out fossil fuel subsidies redirected fiscal liquidity to public schools.', exAr: 'أتاح الإلغاء التدريجي لدعم الوقود توجيه السيولة المالية نحو المدارس الحكومية.' },
    { word: 'tariff', meaningAr: 'التعريفة الجمركية على الواردات', partOfSpeech: 'noun', def: 'A tax or duty to be paid on a particular class of imports or exports.', ex: 'Carbon border tariffs penalize goods produced under unregulated environmental standards.', exAr: 'تعاقب التعريفات الجمركية الكربونية السلع المنتجة بمعايير بيئية متدنية.' },
    { word: 'volatility', meaningAr: 'التقلب والتذبذب السعري الحاد', partOfSpeech: 'noun', def: 'Liability to change rapidly and unpredictably, especially for the worse.', ex: 'Energy market volatility prompted governments to build strategic grain reserves.', exAr: 'دفع تذبذب أسواق الطاقة الحكومات لبناء احتياطيات استراتيجية من الحبوب.' }
  ],
  'The Macroeconomic Paradigm of Industrial Decarbonization',
  'Global economic policy in the 2026/2027 era has transcended the false dichotomy between ecological stewardship and GDP growth. Forward-looking states employ circular economic frameworks to monetize waste streams, capture industrial heat, and subsidize green hydrogen synthesis. Having analyzed historical fossil fuel dependency, economists recognize that unpriced environmental externalities inevitably erode public finances. Debt-for-climate swaps and carbon border adjustment mechanisms incentivize capital reallocation toward regenerative infrastructure.',
  'World Bank & Ministry of International Cooperation Forum: Cairo',
  'Dr. Mona (Macroeconomist) & Paul (Multilateral Development Officer)',
  'Mona: "Had Egypt not constructed the Benban Solar Park five years ago, our electrical grid would suffer severe fuel shocks today."\nPaul: "An astute observation. Having leveraged public-private partnerships, the project demonstrated bankability."\nMona: "Were global central banks to incorporate climate risk into monetary policy, sustainable capital flows would double."\nPaul: "Egyptian Baccalaureate researchers analyzing this data are mastering the quantitative vocabulary of modern multilateral diplomacy."',
  {
    vocab: [
      { id: 'b_s2_u2_v1', skill: 'Vocabulary', question: 'A "circular economy" is fundamentally structured to __________.', options: ['minimize waste through continual reuse, repair, and recycling of materials', 'maximize immediate raw material extraction without conservation', 'prohibit all international industrial manufacturing', 'mandate complete reliance on non-renewable coal'], correctAnswer: 'A', explanation: 'A circular economy decouples growth from virgin resource consumption.' }
    ],
    grammar: [
      { id: 'b_s2_u2_g1', skill: 'Grammar', question: 'Mixed conditional (Past action -> Present consequence): "Had the state invested in solar grids earlier, __________ now."', options: ['we would enjoy energy security', 'we had enjoyed energy security', 'we will enjoy energy security', 'we enjoyed energy security'], correctAnswer: 'A', explanation: 'Had + PP (past condition) with would + base verb (present result).' },
      { id: 'b_s2_u2_g2', skill: 'Grammar', question: 'Identify the participle clause: "__________ by the ministry, the fiscal reform reduced inflation."', options: ['Implemented', 'Implementing', 'To implement', 'Having implementing'], correctAnswer: 'A', explanation: 'Past participle clause: Implemented by the ministry...' }
    ],
    reading: [
      { id: 'b_s2_u2_r1', skill: 'Reading', question: 'How do "carbon border tariffs" function according to the passage?', options: ['They impose duties on imports manufactured under lax environmental standards', 'They abolish all customs taxes between trading partners', 'They subsidize high-polluting domestic coal plants', 'They prohibit the maritime export of agricultural goods'], correctAnswer: 'A', explanation: 'Carbon border taxes penalize carbon-intensive goods from unregulated origins.' }
    ],
    listening: [
      { id: 'b_s2_u2_l1', skill: 'Listening', question: 'What protected Egypt’s electrical grid from contemporary fuel shocks according to Dr. Mona?', options: ['The early construction of the Benban Solar Park', 'A total shutdown of commercial factories', 'The importation of antique steam generators', 'Unregulated fossil fuel drilling in natural reserves'], correctAnswer: 'A', explanation: 'The Benban Solar Park provided renewable diversification protecting against fuel volatility.' }
    ],
    exam: [
      { id: 'b_s2_u2_e1', skill: 'Vocabulary', question: 'An economic "externality" refers to __________.', options: ['an unintended side consequence of production affecting third parties without compensation', 'the total profit earned by foreign corporate shareholders', 'the official currency exchange rate set by central banks', 'the internal salary structure of a manufacturing plant'], correctAnswer: 'A', explanation: 'Externalities are side effects (e.g. pollution) not captured in market price.' },
      { id: 'b_s2_u2_e2', skill: 'Grammar', question: '__________ the economic projections thoroughly, the advisory panel issued its monetary advisory.', options: ['Having scrutinized', 'Scrutinized', 'To scrutinize', 'Scrutinizingly'], correctAnswer: 'A', explanation: 'Perfect participle clause: Having scrutinized... denoting prior completed action.' }
    ]
  },
  bacLitSec2Act2
);

export const bacSec2Unit3: UnitCurriculum = createBaccalaureateUnit(
  11,
  'Secondary 2 (Baccalaureate) - الصف الثاني الثانوي',
  1,
  3,
  'Linguistic Anthropology & Cognitive Semantics',
  'الأنثروبولوجيا اللغوية والدلالات المعرفية',
  'Language Acquisition, Endangered Regional Dialects & Neuro-Linguistic Architecture',
  'Reduced Relative Clauses & Advanced Inverted Subjunctives',
  'الجمل الموصولة المختصرة وصيغ الإلزام الشرطية المقلوبة المتقدمة',
  'Reduced relative clauses replace full clauses with participle phrases (The dialect spoken in Siwa -> The dialect spoken...). Inverted subjunctives elevate academic discourse (e.g. Be that as it may, Suffice it to say, Far be it from me).',
  [
    { word: 'anthropology', meaningAr: 'علم الإنسان والأنثروبولوجيا الثقافية', partOfSpeech: 'noun', def: 'The scientific study of humanity, human behavior, and societies past and present.', ex: 'Linguistic anthropology investigates how grammar structures community worldviews.', exAr: 'تبحث الأنثروبولوجيا اللغوية في كيفية تشكيل القواعد للرؤية الكونية للمجتمعات.', collocation: 'linguistic anthropology' },
    { word: 'semantics', meaningAr: 'علم الدلالة ومعاني الألفاظ والتراكيب', partOfSpeech: 'noun pl.', def: 'The branch of linguistics concerned with meaning.', ex: 'Cognitive semantics demonstrates that metaphor is fundamental to abstract thought.', exAr: 'يثبت علم الدلالة المعرفي أن الاستعارة ركن أساسي في التفكير المجرد.', collocation: 'cognitive semantics' },
    { word: 'endangered', meaningAr: 'مهدد بالاندثار والانقراض', partOfSpeech: 'adjective', def: 'At serious risk of extinction or disappearance.', ex: 'Preserving endangered indigenous dialects protects irreplaceable cultural heritage.', exAr: 'يحمي توثيق اللهجات الأصلية المهددة بالاندثار تراثاً ثقافياً لا يُعوض.', collocation: 'endangered languages' },
    { word: 'vernacular', meaningAr: 'اللغة الدارجة والمحكية محلياً', partOfSpeech: 'noun/adj.', def: 'The language or dialect spoken by the ordinary people in a particular region.', ex: 'Nubian vernaculars preserve ancient lexical roots spanning millennia.', exAr: 'تحفظ اللهجات النوبية المحكية جذوراً لغوية عريقة تمتد لآلاف السنين.', collocation: 'regional vernacular' },
    { word: 'lexicon', meaningAr: 'المعجم اللغوي والمفردات المتاحة', partOfSpeech: 'noun', def: 'The vocabulary of a person, language, or branch of knowledge.', ex: 'Technical advancements continually enrich the contemporary Arabic lexicon.', exAr: 'تثري التطورات التقنية المعجم اللغوي العربي المعاصر باستمرار.', collocation: 'mental lexicon' },
    { word: 'acquisition', meaningAr: 'اكتساب اللغة الفطري والتعلمي', partOfSpeech: 'noun', def: 'The learning or developing of a skill, habit, or language.', ex: 'Early childhood language acquisition occurs through social immersion and neural plasticity.', exAr: 'يحدث اكتساب اللغة في الطفولة المبكرة عبر الانغماس الاجتماعي والمرونة العصبية.', collocation: 'language acquisition' },
    { word: 'syntax', meaningAr: 'علم النحو والتراكيب وبناء الجملة', partOfSpeech: 'noun', def: 'The arrangement of words and phrases to create well-formed sentences in a language.', ex: 'Semitic syntax exhibits intricate morphological derivation and root systems.', exAr: 'تتميز التراكيب النحوية السامية باشتقاق صرفي معقد ونظام جذور فريد.', collocation: 'syntactic hierarchy' },
    { word: 'phonology', meaningAr: 'علم الأصوات والنطق اللغوي', partOfSpeech: 'noun', def: 'The system of relationships among the speech sounds of a language.', ex: 'Comparative phonology analyzes historical consonant shifts across Mediterranean tongues.', exAr: 'يحلل علم الأصوات المقارن التحولات التاريخية للحروف الصامتة في البحر المتوسط.', collocation: 'acoustic phonology' },
    { word: 'discourse', meaningAr: 'الخطاب اللغوي والتداول الفكري', partOfSpeech: 'noun', def: 'Written or spoken communication or debate.', ex: 'Academic discourse requires objectivity, hedging, and structural cohesion.', exAr: 'يتطلب الخطاب الأكاديمي الموضوعية والاحتراز والتماسك البنائي.', collocation: 'rhetorical discourse' },
    { word: 'etymology', meaningAr: 'علم أصول الكلمات وتطورها التاريخي', partOfSpeech: 'noun', def: 'The study of the origin of words and the way in which their meanings have changed.', ex: 'The etymology of scientific terms frequently traces back to Greco-Arab scholasticism.', exAr: 'تعود أصول الكلمات والمصطلحات العلمية غالباً إلى التراث المعرفي الإغريقي العربي.', collocation: 'historical etymology' }
  ],
  'The Cognitive Architecture of Dialectal Diversity in the Nile Valley',
  'Human language is not a static repository of arbitrary codes; it is the living neurological scaffolding of human consciousness. Linguistic anthropologists recognize that grammatical structures shape spatial orientation, chronological perception, and communal identity. In the Nile Valley, the coexistence of Standard Arabic with Nubian, Siwi, and regional Bedouin dialects represents an invaluable evolutionary archive. Preserving linguistic diversity through digital corpora ensures that unique conceptual taxonomies are not extinguished by algorithmic homogenization.',
  'Linguistic Heritage Colloquium: Alexandria Bibliotheca',
  'Professor Nader (Anthropological Linguist) & Dr. Claudia (UNESCO Heritage Commissioner)',
  'Nader: "The Siwi dialect, spoken in the western oases, exhibits spatial prepositions found nowhere else."\nClaudia: "A priceless linguistic relic. Suffice it to say that losing a dialect is equivalent to losing an entire ecosystem."\nNader: "Were we to document these oral traditions with acoustic phonetics, future generations would retain access to ancient cultural cognition."\nClaudia: "Egyptian Baccalaureate linguists are uniquely situated to lead this North African digital documentation initiative."',
  {
    vocab: [
      { id: 'b_s2_u3_v1', skill: 'Vocabulary', question: 'The study of the origin, historical evolution, and changing meaning of words is __________.', options: ['etymology', 'entomology', 'echocardiography', 'epistemology'], correctAnswer: 'A', explanation: 'Etymology is the historical study of word origins.' }
    ],
    grammar: [
      { id: 'b_s2_u3_g1', skill: 'Grammar', question: 'Reduce the relative clause: "The manuscript which was discovered in the desert was authentic." -> __________', options: ['The manuscript discovered in the desert was authentic.', 'The manuscript discovering in the desert was authentic.', 'The manuscript having discover was authentic.', 'The manuscript to discover in the desert was authentic.'], correctAnswer: 'A', explanation: 'Passive relative clause reduces to past participle "discovered".' },
      { id: 'b_s2_u3_g2', skill: 'Grammar', question: 'Identify the formal fixed subjunctive expression: "__________ that the evidence is conclusive."', options: ['Suffice it to say', 'Sufficing it to say', 'It suffices saying', 'Sufficed it to say'], correctAnswer: 'A', explanation: '"Suffice it to say" is a classic frozen subjunctive rhetorical formula.' }
    ],
    reading: [
      { id: 'b_s2_u3_r1', skill: 'Reading', question: 'According to the passage, linguistic anthropologists argue that grammatical structures __________.', options: ['shape spatial orientation, temporal perception, and cultural consciousness', 'are strictly identical across all world languages', 'have zero relationship to human thought', 'should be abolished in favor of binary computer code'], correctAnswer: 'A', explanation: 'Grammatical structures influence human conceptualization of space and time.' }
    ],
    listening: [
      { id: 'b_s2_u3_l1', skill: 'Listening', question: 'Why does Dr. Claudia compare losing a dialect to losing an ecosystem?', options: ['Because each dialect carries unique conceptual knowledge and cultural biodiversity', 'Because dialects produce oxygen like rain forests', 'Because languages are written on tree leaves', 'Because dialects can be sold on commercial commodity exchanges'], correctAnswer: 'A', explanation: 'Language loss destroys irreplaceable human cognitive and cultural biodiversity.' }
    ],
    exam: [
      { id: 'b_s2_u3_e1', skill: 'Vocabulary', question: 'The term "vernacular" refers specifically to __________.', options: ['the native language or colloquial dialect of a specific locality', 'a legal contract ratified by parliament', 'a medical instrument for measuring brainwaves', 'a foreign military command code'], correctAnswer: 'A', explanation: 'Vernacular is indigenous, everyday regional speech.' },
      { id: 'b_s2_u3_e2', skill: 'Grammar', question: 'The dialect __________ in rural hamlets preserves ancient phonetic features.', options: ['spoken', 'speaking', 'was spoken', 'is spoken'], correctAnswer: 'A', explanation: 'Reduced relative clause: (which is) spoken in rural hamlets...' }
    ]
  },
  bacLitSec2Act3
);

// -------------------------------------------------------------------------------------------------
// GRADE 12 (SECONDARY 3) - UNITS 2 & 3
// -------------------------------------------------------------------------------------------------

export const bacSec3Unit2: UnitCurriculum = createBaccalaureateUnit(
  12,
  'Secondary 3 (Baccalaureate Capstone) - الصف الثالث الثانوي',
  1,
  2,
  'Bioethics & Artificial Intelligence Governance',
  'الأخلاقيات الحيوية وحوكمة الذكاء الاصطناعي',
  'Algorithmic Accountability, Genetic Editing Ethics & Digital Human Rights',
  'Advanced Modal Stance & Impersonal Passives in Jurisprudential Drafting',
  'التعبير عن الموقف الاستدلالي المتقدم والمبني للمجهول المنزه عن الفاعل في الصياغة التشريعية',
  'Impersonal passives (It is held that, It is widely acknowledged that, Regulations are deemed to be) establish formal objective distance. Advanced modal stance encodes imperative legal duty (must needs be, shall be obligated).',
  [
    { word: 'bioethics', meaningAr: 'الأخلاقيات الحيوية للبحوث الطبية والوراثية', partOfSpeech: 'noun pl.', def: 'The ethics of medical and biological research and technological applications.', ex: 'International bioethics councils regulate somatic and germline gene-editing trials.', exAr: 'تنظم مجالس الأخلاقيات الحيوية الدولية تجارب تعديل الجينات الجسدية والوراثية.', collocation: 'clinical bioethics' },
    { word: 'governance', meaningAr: 'الحوكمة والأطر الرقابية التشريعية', partOfSpeech: 'noun', def: 'The action or manner of governing, exercising control, or regulating a domain.', ex: 'Algorithmic governance mandates human oversight in autonomous weaponry systems.', exAr: 'تفرض حوكمة الخوارزميات رقابة بشرية على أنظمة الأسلحة ذاتية التشغيل.', collocation: 'algorithmic governance' },
    { word: 'accountability', meaningAr: 'المساءلة القانونية وتحمل المسؤولية', partOfSpeech: 'noun', def: 'The fact or condition of being accountable; responsibility for decisions.', ex: 'Black-box neural networks present a severe challenge to legal accountability.', exAr: 'تمثل الشبكات العصبية غير الشفافة تحدياً كبيراً للمساءلة القانونية.', collocation: 'transparent accountability' },
    { word: 'eugenics', meaningAr: 'تحسين النسل القسري المرفوض أخلاقياً', partOfSpeech: 'noun pl.', def: 'The discredited practice of aiming to improve genetic quality of human populations.', ex: 'Universal bioethical conventions strictly prohibit reproductive eugenics.', exAr: 'تحظر الاتفاقيات الأخلاقية العالمية تحسين النسل الإنجابي التمييزي حظراً تاماً.', collocation: 'reprehensible eugenics' },
    { word: 'germline', meaningAr: 'الخلايا الجرثومية الوراثية الممتدة عبر الأجيال', partOfSpeech: 'noun/adj.', def: 'A series of germ cells each descended from earlier cells in inherited lineage.', ex: 'Germline genome modifications alter the hereditary sequence of future generations.', exAr: 'تغير التعديلات الوراثية على الخلايا الجرثومية التسلسل الجيني للأجيال القادمة.', collocation: 'germline editing' },
    { word: 'transparency', meaningAr: 'الشفافية وقابلية التدقيق البرمجي', partOfSpeech: 'noun', def: 'The condition of being clear, easily scrutinized, and explainable.', ex: 'Algorithmic transparency requires AI vendors to reveal training data provenance.', exAr: 'تتطلب الشفافية الخوارزمية من مطوري الذكاء الاصطناعي كشف مصادر بيانات التدريب.', collocation: 'algorithmic transparency' },
    { word: 'jurisprudence', meaningAr: 'فلسفة القانون والنظرية التشريعية', partOfSpeech: 'noun', def: 'The theory or philosophy of law and judicial interpretation.', ex: 'Emerging AI jurisprudence debates whether autonomous agents possess legal personhood.', exAr: 'تبحث فلسفة قانون الذكاء الاصطناعي فيما إذا كانت النظم المستقلة تملك شخصية اعتبارية.', collocation: 'digital jurisprudence' },
    { word: 'sovereignty', meaningAr: 'السيادة الوطنية الرقمية واستقلال البيانات', partOfSpeech: 'noun', def: 'Supreme power or authority; national independence in technology and data.', ex: 'Data sovereignty laws require citizen health records to reside within domestic servers.', exAr: 'تتطلب قوانين السيادة الرقمية استضافة السجلات الصحية للمواطنين على خوادم محلية.', collocation: 'data sovereignty' },
    { word: 'imperative', meaningAr: 'واجب حتمي وضرورة ملحة لا تقبل التأجيل', partOfSpeech: 'adjective/noun', def: 'Of vital importance; an essential or urgent duty.', ex: 'It is a moral imperative that life-saving therapeutic technologies be globally accessible.', exAr: 'من الواجب الأخلاقي الحتمي إتاحة التقنيات العلاجية المنقذة للحياة لكافة البشر.', collocation: 'moral imperative' },
    { word: 'sanctity', meaningAr: 'قدسية وحرمة الحياة الإنسانية والكرامة', partOfSpeech: 'noun', def: 'The state or quality of being holy, sacred, or of ultimate moral worth.', ex: 'Constitutional law reasserts the inviolable sanctity of human dignity.', exAr: 'يؤكد القانون الدستوري على القدسية والحرمة المطلقة للكرامة الإنسانية.', collocation: 'sanctity of life' }
  ],
  'The Jurisprudential Scaffolding of Autonomous Intelligence and Bioethics',
  'As generative artificial intelligence and CRISPR-Cas9 genome editing intersect, the philosophical architecture of human rights confronts unprecedented existential interrogation. When automated diagnostic algorithms recommend triage decisions, where does liability reside: with the software developer, the medical practitioner, or the autonomous entity itself? It is widely held by legal theorists that algorithmic decision-making must remain subject to human-in-the-loop oversight. In the domain of biotechnology, germline genetic modifications demand universal multilateral covenants preventing eugenic commodification.',
  'International Bioethics Summit: Supreme Constitutional Court of Egypt',
  'Justice Tamer (Constitutional Jurist) & Dr. Maya (Bioethics Commission Chair)',
  'Tamer: "It is acknowledged by all member states that human dignity is inviolable and non-negotiable."\nMaya: "Indeed, Justice Tamer. Autonomous systems must needs be constrained by codified ethical bounds."\nTamer: "Were an algorithmic model to recommend discriminatory medical access, the sovereign state would intervene immediately."\nMaya: "Egyptian Baccalaureate graduates entering legal and biomedical fields must master this synthesized vocabulary to protect digital civil liberties."',
  {
    vocab: [
      { id: 'b_s3_u2_v1', skill: 'Vocabulary', question: 'The ethical study and regulation of biomedical research and genetic engineering is __________.', options: ['bioethics', 'astronomy', 'hydrology', 'paleontology'], correctAnswer: 'A', explanation: 'Bioethics investigates the moral dimensions of medicine and life sciences.' },
      { id: 'b_s3_u2_v2', skill: 'Vocabulary', question: 'Why does "germline" gene editing provoke intense global regulatory debate?', options: ['Because modifications are permanently inherited by all subsequent human generations', 'Because it requires zero laboratory equipment', 'Because it is completely harmless to all living tissue', 'Because it has no medical applications'], correctAnswer: 'A', explanation: 'Germline edits alter the human hereditary lineage irreversibly.' }
    ],
    grammar: [
      { id: 'b_s3_u2_g1', skill: 'Grammar', question: 'Identify the impersonal passive construction:', options: ['It is widely acknowledged that autonomous algorithms require human oversight.', 'Researchers acknowledge that algorithms need human oversight.', 'We are acknowledging the necessity of human oversight.', 'Algorithms need human oversight and we know it.'], correctAnswer: 'A', explanation: '"It is widely acknowledged that..." is standard academic impersonal passive.' },
      { id: 'b_s3_u2_g2', skill: 'Grammar', question: 'What does the modal stance phrase "must needs be" express in legal statutes?', options: ['An inescapable logical and moral necessity', 'A mild, optional suggestion', 'A past hypothetical possibility', 'A doubtful, speculative conjecture'], correctAnswer: 'A', explanation: '"Must needs be" denotes imperative, unavoidable necessity in formal register.' }
    ],
    reading: [
      { id: 'b_s3_u2_r1', skill: 'Reading', question: 'What principle do legal theorists advocate regarding autonomous clinical decisions?', options: ['Human-in-the-loop oversight ensuring ultimate human liability and moral review', 'Absolute immunity for corporate software manufacturers', 'Replacing human physicians with unverified robotic models', 'Prohibiting all computers in hospitals'], correctAnswer: 'A', explanation: 'Human-in-the-loop oversight guarantees accountability and human compassion.' }
    ],
    listening: [
      { id: 'b_s3_u2_l1', skill: 'Listening', question: 'What would trigger immediate sovereign state intervention according to Justice Tamer?', options: ['An algorithmic model recommending discriminatory medical access', 'A software company releasing a minor update', 'A hospital buying new computers', 'A doctor using a digital thermometer'], correctAnswer: 'A', explanation: 'Algorithmic discrimination against patients warrants immediate sovereign intervention.' }
    ],
    exam: [
      { id: 'b_s3_u2_e1', skill: 'Vocabulary', question: 'To guarantee "algorithmic transparency," developers are obligated to __________.', options: ['make their models explainable, auditable, and clear regarding training data', 'keep their code secret from all judicial bodies', 'delete all logs and records after each run', 'charge exorbitant fees for public access'], correctAnswer: 'A', explanation: 'Algorithmic transparency demands explainability and verifiable data provenance.' },
      { id: 'b_s3_u2_e2', skill: 'Grammar', question: 'It __________ that constitutional rights transcend all technological disruptions.', options: ['is held', 'holds', 'is holding', 'held'], correctAnswer: 'A', explanation: 'Impersonal passive formula: It is held that...' }
    ]
  },
  bacLitSec3Ch2
);

export const bacSec3Unit3: UnitCurriculum = createBaccalaureateUnit(
  12,
  'Secondary 3 (Baccalaureate Capstone) - الصف الثالث الثانوي',
  1,
  3,
  'Higher Level Capstone Simulation & Thesis Defense',
  'محاكاة مشروع التخرج رفيع المستوى والدفاع عن الأطروحة',
  'Empirical Research Defense, Discursive Rhetoric & Higher-Order Synthesis',
  'Rhetorical Discourse Markers & Cohesive Academic Connectors',
  'روابط الخطاب البلاغي وأدوات التماسك والربط الأكاديمي المتقدمة',
  'Sophisticated discourse markers (e.g. Notwithstanding the foregoing, By way of corollary, In contradistinction to, Pro tanto) provide rigorous logical coherence for academic dissertation defense.',
  [
    { word: 'capstone', meaningAr: 'مشروع التخرج الأكاديمي الشامل المتوج للدراسة', partOfSpeech: 'noun', def: 'A crowning achievement, final culminating project or academic paper.', ex: 'The senior Baccalaureate capstone requires defense before a university faculty jury.', exAr: 'يتطلب مشروع التخرج لشهادة البكالوريا الدفاع أمام لجنة تحكيم جامعية.', collocation: 'capstone project' },
    { word: 'dissertation', meaningAr: 'أطروحة بحثية أكاديمية متعمقة', partOfSpeech: 'noun', def: 'A long essay on a particular subject, especially written for a university degree.', ex: 'His dissertation investigated the macroeconomic implications of green hydrogen.', exAr: 'بحثت أطروحته التداعيات الاقتصادية الكلية للهيدروجين الأخضر.', collocation: 'doctoral dissertation' },
    { word: 'synthesis', meaningAr: 'التركيب والجمع التكاملي بين النظريات', partOfSpeech: 'noun', def: 'The combination of ideas to form a theory or whole.', ex: 'Critical thinking culminates in the creative synthesis of opposing viewpoints.', exAr: 'تتوج مهارات التفكير النقدي في التركيب الإبداعي بين وجهات النظر المتباينة.', collocation: 'analytical synthesis' },
    { word: 'defense', meaningAr: 'الدفاع الشفهي العلني عن الأطروحة البحثية', partOfSpeech: 'noun', def: 'The oral presentation and justification of an academic research thesis before an examining board.', ex: 'During her thesis defense, she systematically refuted opposing methodologies.', exAr: 'خلال دفاعها عن أطروحتها، فندت المناهج البحثية المعارضة بشكل منهجي.', collocation: 'oral thesis defense' },
    { word: 'rigor', meaningAr: 'الدقة والصرامة المنهجية العلمية', partOfSpeech: 'noun', def: 'The quality of being extremely thorough, exhaustive, or accurate.', ex: 'Empirical research demands quantitative rigor and peer-reviewed methodology.', exAr: 'يتطلب البحث التجريبي صرامة كمية ومنهجية محكمة.', collocation: 'academic rigor' },
    { word: 'corollary', meaningAr: 'نتيجة منطقية تابعة ولازمة للبرهان', partOfSpeech: 'noun', def: 'A proposition that follows from one already proved; a natural consequence.', ex: 'A corollary of technological literacy is enhanced civic participation.', exAr: 'تعد المشاركة المدنية الفعالة نتيجة منطقية لازمة لاكتساب الثقافة التكنولوجية.', collocation: 'natural corollary' },
    { word: 'methodology', meaningAr: 'المنهجية العلمية المتبعة في البحث', partOfSpeech: 'noun', def: 'A system of methods used in a particular area of study or activity.', ex: 'The double-blind methodology eliminated experimenter bias completely.', exAr: 'قضت المنهجية مزدوجة التعمية على انحياز الباحثين تماماً.', collocation: 'empirical methodology' },
    { word: 'concession', meaningAr: 'التسليم الجزئي برأي الخصم للرد عليه', partOfSpeech: 'noun', def: 'The act of conceding or yielding, especially an argumentative point before rebuttal.', ex: 'Making a rhetorical concession strengthens an author’s eventual counter-argument.', exAr: 'يقوي التسليم الجزئي بحجة الخصم الموقف التفنيدي النهائي للكاتب.', collocation: 'rhetorical concession' },
    { word: 'exemplar', meaningAr: 'النموذج المثالي المحتذى به', partOfSpeech: 'noun', def: 'A person or thing serving as a typical example or excellent model.', ex: 'Her capstone presentation was cited by the examination board as an academic exemplar.', exAr: 'أشادت لجنة التحكيم بعرضها لمشروع التخرج كنموذج أكاديمي يحتذى به.', collocation: 'scholarly exemplar' },
    { word: 'rebuttal', meaningAr: 'الدحض والتفنيد العلمي للحجج المعارضة', partOfSpeech: 'noun', def: 'A refutation or contradiction with evidence in debate.', ex: 'His point-by-point rebuttal dismantled the critic’s speculative claims.', exAr: 'فند رده العلمي المفصل الادعاءات الظنية للناقد نقطة بنقطة.', collocation: 'cogent rebuttal' }
  ],
  'The Architecture of Academic Thesis Defense: Synthesizing Rigor and Rhetoric',
  'The High-Stakes Egyptian Baccalaureate Capstone represents the culmination of secondary scholarly formation. Rather than replicating received textbook axioms, candidates formulate an original hypothesis, substantiate it with unimpeachable empirical telemetry, and defend their conclusions against faculty cross-examination. Mastery of formal discursive rhetoric—deploying concessions, qualification markers, and synthesis—enables scholars to withstand adversarial critique while advancing human knowledge.',
  'Senior Baccalaureate Capstone Defense Jury: New Capital University',
  'Dean Hisham (Jury Chairman) & Maryam (Baccalaureate Senior Candidate)',
  'Dean Hisham: "Candidate Maryam, your dissertation asserts that decentralized water desalinators outperform centralized plants. How do you respond to the corollary critique regarding capital expenditure?"\nMaryam: "Notwithstanding the initial capital outlay, our discounted cash-flow telemetry proves that localized distribution yields net fiscal returns within five operational cycles."\nDean Hisham: "A remarkably cogent rebuttal. Your methodological rigor exemplifies the highest ideals of the Egyptian Baccalaureate track."',
  {
    vocab: [
      { id: 'b_s3_u3_v1', skill: 'Vocabulary', question: 'An academic "capstone" in senior secondary education represents __________.', options: ['the culminating multifaceted research project demonstrating mastery of curriculum competencies', 'a physical hat worn during sports tournaments', 'a temporary disciplinary suspension', 'a handwritten receipt for tuition payment'], correctAnswer: 'A', explanation: 'A capstone is the final comprehensive research and defense project.' },
      { id: 'b_s3_u3_v2', skill: 'Vocabulary', question: 'In formal argumentation, a "rebuttal" is __________.', options: ['evidence-based refutation of an opponent’s counter-claim', 'an unconditional surrender in debate', 'a comedic theatrical joke', 'an apology for participating in the symposium'], correctAnswer: 'A', explanation: 'A rebuttal is structured refutation with evidence.' }
    ],
    grammar: [
      { id: 'b_s3_u3_g1', skill: 'Grammar', question: 'Choose the most sophisticated connector for concession and contrast: "__________ the initial expenditure was high, the project achieved net solvency."', options: ['Notwithstanding the fact that', 'Because of', 'In order that', 'Consequently that'], correctAnswer: 'A', explanation: '"Notwithstanding the fact that..." expresses elevated academic concession.' },
      { id: 'b_s3_u3_g2', skill: 'Grammar', question: 'Which discourse marker signals a logical following result or natural consequence?', options: ['By way of corollary', 'On the contrary', 'In stark opposition', 'Under no circumstances'], correctAnswer: 'A', explanation: '"By way of corollary" introduces a natural, logical consequence of a proven truth.' }
    ],
    reading: [
      { id: 'b_s3_u3_r1', skill: 'Reading', question: 'What distinguishes the Baccalaureate Capstone from traditional rote examinations?', options: ['Formulating original hypotheses, defending them with empirical data against live faculty critique', 'Memorizing multiple choice answer keys verbatim', 'Copying textbook chapters onto paper', 'Taking exams without study'], correctAnswer: 'A', explanation: 'Original hypothesis generation and viva defense constitute true capstone research.' }
    ],
    listening: [
      { id: 'b_s3_u3_l1', skill: 'Listening', question: 'How did Maryam defend her decentralized water desalinator proposal against the capital cost critique?', options: ['By citing discounted cash-flow telemetry proving net returns within five cycles', 'By stating she did not care about monetary cost', 'By proposing to cancel the water project altogether', 'By asking the jury to pay the bill themselves'], correctAnswer: 'A', explanation: 'Maryam cited empirical cash-flow data showing returns within five operational cycles.' }
    ],
    exam: [
      { id: 'b_s3_u3_e1', skill: 'Vocabulary', question: 'Scientific "rigor" demands that experimental trials __________.', options: ['be exhaustive, quantitatively precise, and replicable by independent peers', 'rely on unverified intuition', 'remain unpublished and secret', 'ignore anomalous findings'], correctAnswer: 'A', explanation: 'Scientific rigor requires exhaustive, transparent, replicable methods.' },
      { id: 'b_s3_u3_e2', skill: 'Grammar', question: '__________ demonstrated empirical validity, the research was accepted for publication.', options: ['Having', 'Have', 'To have', 'Had'], correctAnswer: 'A', explanation: 'Perfect participle clause: Having demonstrated...' }
    ]
  },
  bacLitSec3Ch3
);


// -------------------------------------------------------------------------------------------------
// GRADE 10 (SECONDARY 1) - UNITS 4, 5, 6
// -------------------------------------------------------------------------------------------------

export const bacSec1Unit4: UnitCurriculum = createBaccalaureateUnit(
  10,
  'Secondary 1 (Baccalaureate) - الصف الأول الثانوي',
  1,
  4,
  'Renewable Agritech & Desert Reclamation',
  'الاستصلاح الزراعي الصحراوي والتقنيات الحيوية الحديثة',
  'Arid-Zone Agronomy, Subterranean Aquifer Management & Precision Irrigation',
  'Future in the Past & Advanced Modals of Deduction',
  'المستقبل في الماضي وأفعال الاستنتاج المتقدمة (Deduction)',
  'Future in the past (was/were to, was/were going to, would) expresses past intentions and prophecies. Advanced modals of deduction (must have + PP, cannot have + PP) calibrate epistemic certainty in scientific investigations.',
  [
    { word: 'reclamation', meaningAr: 'استصلاح الأراضي الصحراوية والبور', partOfSpeech: 'noun', def: 'The act of returning something to a former, better state suitable for cultivation.', ex: 'Desert reclamation projects in Toshka convert hyper-arid tracts into fertile grain fields.', exAr: 'تحول مشاريع استصلاح الصحراء في توشكى الأراضي شديدة الجفاف إلى حقول قمح خصبة.', collocation: 'desert reclamation' },
    { word: 'aquifer', meaningAr: 'خزان المياه الجوفية الطبيعي', partOfSpeech: 'noun', def: 'A body of permeable rock that can contain or transmit groundwater.', ex: 'The Nubian Sandstone Aquifer represents the world’s largest fossil water reservoir.', exAr: 'يمثل خزان الحجر الرملي النوبي الجوفي أكبر مخزون مائي أحفوري في العالم.', collocation: 'fossil aquifer' },
    { word: 'hydroponics', meaningAr: 'الزراعة المائية بدون تربة', partOfSpeech: 'noun pl.', def: 'The process of growing plants in sand, gravel, or liquid, with added nutrients but without soil.', ex: 'Closed-loop hydroponics conserves up to ninety percent of conventional irrigation water.', exAr: 'توفر الزراعة المائية ذات الحلقة المغلقة ما يصل إلى 90% من مياه الري التقليدية.', collocation: 'commercial hydroponics' },
    { word: 'salinity', meaningAr: 'ملوحة التربة أو المياه الجوفية', partOfSpeech: 'noun', def: 'The concentration of dissolved salts in water or soil.', ex: 'Halophytic bio-engineered crops flourish despite high soil salinity.', exAr: 'تزدهر المحاصيل المعدلة جينياً المقاومة للملوحة رغم ارتفاع نسبة الأملاح بالتربة.', collocation: 'soil salinity' },
    { word: 'desalination', meaningAr: 'تحلية مياه البحر المالحة', partOfSpeech: 'noun', def: 'The process of removing salt from seawater to make it potable or fit for irrigation.', ex: 'Solar-powered desalination plants along the Mediterranean provide sustainable freshwater.', exAr: 'توفر محطات التحلية بالطاقة الشمسية على البحر المتوسط مياهاً عذبة مستدامة.', collocation: 'solar desalination' },
    { word: 'arable', meaningAr: 'صالح للزراعة والإنتاج المحصولي', partOfSpeech: 'adjective', def: 'Used or suitable for growing crops.', ex: 'Expanding arable acreage is a central objective of Egypt’s food security doctrine.', exAr: 'يمثل التوسع في المساحات الصالحة للزراعة هدفاً محورياً لعقيدة الأمن الغذائي المصري.', collocation: 'arable land' },
    { word: 'drip irrigation', meaningAr: 'الري الموضعي بالتنقيط عالي الكفاءة', partOfSpeech: 'noun', def: 'A system of crop irrigation involving controlled delivery of water directly to roots.', ex: 'Subsurface drip irrigation eliminates evaporative water loss during peak heat.', exAr: 'يقضي الري بالتنقيط تحت السطحي على فقدان المياه بالتبخر أثناء ذروة القيظ.', collocation: 'precision drip irrigation' },
    { word: 'photovoltaic', meaningAr: 'كهروضوئي ناتج عن تحويل ضوء الشمس', partOfSpeech: 'adjective', def: 'Relating to the production of electric current at the junction of two substances exposed to light.', ex: 'Photovoltaic pumping stations extract subterranean water autonomously.', exAr: 'تستخرج محطات الرفع الكهروضوئية المياه الجوفية بالطاقة الشمسية ذاتياً.', collocation: 'photovoltaic array' },
    { word: 'cultivar', meaningAr: 'سلالة محصولية مستنبطة وراثياً', partOfSpeech: 'noun', def: 'A plant variety that has been produced in cultivation by selective breeding.', ex: 'Agronomists developed drought-resilient wheat cultivars for the New Valley.', exAr: 'استنبط علماء الهندسة الزراعية سلالات قمح مقاومة للجفاف للوادي الجديد.', collocation: 'drought-resistant cultivar' },
    { word: 'sustainability', meaningAr: 'الاستدامة والحفاظ على الموارد للأجيال', partOfSpeech: 'noun', def: 'The ability to be maintained at a certain rate or level without depleting natural assets.', ex: 'Balancing extraction rates with natural aquifer recharge preserves long-term sustainability.', exAr: 'يضمن توازن معدلات السحب مع التغذية الطبيعية للخزان الجوفي الاستدامة المستقبلية.', collocation: 'ecological sustainability' }
  ],
  'Precision Agronomy and the Greening of the Egyptian Desert',
  'In response to twenty-first-century demographic pressures and hydrologic realities, Egypt has undertaken the most audacious desert reclamation initiatives in Mediterranean history. The New Delta project and Toshka Lakes agricultural corridors deploy autonomous telemetry, subterranean drip grids, and soil moisture sensors. Agronomists projected that these arid frontiers would transform Egypt into a net grain exporter. Analyzing satellite soil data, hydrologists conclude that the ancient Nubian aquifer must have received massive pluvial recharge during the Holocene epoch, providing the subterranean foundation for contemporary reclamation.',
  'Arid Lands Agronomy Conference: Toshka Agricultural Station',
  'Dr. Magdi (Hydrologist) & Dr. Rania (Agritech Engineer)',
  'Magdi: "The subterranean telemetry proved that the aquifer was to sustain fifty years of cultivation without recharge."\nRania: "Our drone-mounted multispectral cameras must have detected the localized nitrogen deficit days before physical leaf discoloration."\nMagdi: "Had the ministry not transitioned toward solar-driven drip networks, water evaporation would have crippled the project."\nRania: "Egyptian Baccalaureate researchers analyzing this agrotech data represent the vanguard of global desert farming leadership."',
  {
    vocab: [
      { id: 'b_s1_u4_v1', skill: 'Vocabulary', question: 'An underground geological layer capable of storing and yielding water is termed a(n) __________.', options: ['aquifer', 'glacier', 'estuary', 'volcano'], correctAnswer: 'A', explanation: 'An aquifer is an underground permeable rock reservoir holding groundwater.' },
      { id: 'b_s1_u4_v2', skill: 'Vocabulary', question: 'Closed-loop "hydroponics" enables crop cultivation __________.', options: ['in nutrient-rich water solutions without natural soil', 'exclusively in frozen tundra ice', 'using toxic industrial wastewater', 'only in deep subterranean coal mines'], correctAnswer: 'A', explanation: 'Hydroponics cultivates crops in water with mineral nutrients without soil.' }
    ],
    grammar: [
      { id: 'b_s1_u4_g1', skill: 'Grammar', question: 'Future in the past: "The researchers knew that the solar pumping grid __________ the entire oasis by dusk."', options: ['would irrigate', 'will irrigate', 'is irrigating', 'irrigates'], correctAnswer: 'A', explanation: 'Future in the past uses "would + base verb" following past main verb "knew".' },
      { id: 'b_s1_u4_g2', skill: 'Grammar', question: 'Deduction: "The ancient riverbeds show massive silt deposits; pluvial rivers __________ across this desert thousands of years ago."', options: ['must have flowed', 'should flow', 'cannot have flowed', 'must flow'], correctAnswer: 'A', explanation: 'Past deduction with high certainty: must have + past participle.' }
    ],
    reading: [
      { id: 'b_s1_u4_r1', skill: 'Reading', question: 'According to the passage, what technological interventions optimize water utilization in the New Delta?', options: ['Autonomous telemetry, subterranean drip grids, and soil moisture sensors', 'Unregulated open canal flooding during midday', 'Importing diesel generators from overseas', 'Banning all drone surveillance over fields'], correctAnswer: 'A', explanation: 'Sensors, telemetry, and subsurface drip grids prevent water loss.' }
    ],
    listening: [
      { id: 'b_s1_u4_l1', skill: 'Listening', question: 'What enabled engineers to detect nitrogen deficits before leaves changed color?', options: ['Drone-mounted multispectral cameras', 'Traditional visual inspection with a magnifying glass', 'Waiting for crops to wither completely', 'Asking local tourists on the highway'], correctAnswer: 'A', explanation: 'Multispectral drone imagery detects cellular plant distress before discoloration.' }
    ],
    exam: [
      { id: 'b_s1_u4_e1', skill: 'Vocabulary', question: 'Land that is suitable for plowing and the cultivation of seasonal crops is described as __________.', options: ['arable', 'desolate', 'sterile', 'marshy'], correctAnswer: 'A', explanation: 'Arable land is fertile ground capable of being cultivated.' },
      { id: 'b_s1_u4_e2', skill: 'Grammar', question: 'The agronomists were confident that the newly bioengineered wheat __________ in high-salinity soils.', options: ['would thrive', 'will thrive', 'is thriving', 'has thrived'], correctAnswer: 'A', explanation: 'Future in the past: "would thrive" expresses prediction viewed from the past.' }
    ]
  },
  bacLitSec1Ch4
);

export const bacSec1Unit5: UnitCurriculum = createBaccalaureateUnit(
  10,
  'Secondary 1 (Baccalaureate) - الصف الأول الثانوي',
  1,
  5,
  'Suez Maritime Logistics & Global Trade Corridors',
  'طريق الحرير البحري واللوجستيات العالمية بقناة السويس',
  'Supranational Supply Chains, Geostrategic Chokepoints & Port Automation',
  'Wh-Adverbials & Fronted Prepositional Inversions',
  'ظروف الوصل (Wh-Adverbials) والتقديم والتأخير مع أشباه الجمل الظرفية (Inversion)',
  'Fronted prepositional phrases (Under the desert sands lay..., At the mouth of the canal anchored...) trigger full subject-verb inversion. Wh-adverbials (whereby, wherein, whither) generate precise, formal legal-maritime register.',
  [
    { word: 'chokepoint', meaningAr: 'مضيق وممر ملاحي استراتيجي حرج', partOfSpeech: 'noun', def: 'A narrow strategic passage, such as a strait, that can be easily congested or blocked.', ex: 'The Suez Canal remains the planet’s premier maritime chokepoint connecting Asia and Europe.', exAr: 'تظل قناة السويس أهم مضيق ملاحي كوكبي يربط بين آسيا وأوروبا.', collocation: 'maritime chokepoint' },
    { word: 'logistics', meaningAr: 'الخدمات اللوجستية وسلاسل الإمداد والتوريد', partOfSpeech: 'noun pl.', def: 'The detailed organization and implementation of a complex operation involving supply movement.', ex: 'Port Said’s integrated logistics hub accelerates container transshipment seamlessly.', exAr: 'يسرع المركز اللوجستي المتكامل ببورسعيد عمليات إعادة شحن الحاويات بسلاسة.', collocation: 'global logistics' },
    { word: 'transshipment', meaningAr: 'مسافنة وإعادة شحن البضائع بين السفن', partOfSpeech: 'noun', def: 'The shipment of goods or containers to an intermediate destination, then to another.', ex: 'East Port Said ranks among the premier transshipment hubs in the Mediterranean.', exAr: 'يصنف ميناء شرق بورسعيد ضمن كبرى محطات المسافنة وإعادة الشحن بالمتوسط.', collocation: 'container transshipment' },
    { word: 'bottleneck', meaningAr: 'عنق زجاجة وتكدس يعيق الحركة', partOfSpeech: 'noun', def: 'A point of congestion in a system that stops or delays progress.', ex: 'The dual-channel expansion of the Suez Canal eliminated waiting bottlenecks completely.', exAr: 'قضى مشروع ازدواج المجرى الملاحي لقناة السويس على اختناقات الانتظار تماماً.', collocation: 'traffic bottleneck' },
    { word: 'infrastructure', meaningAr: 'البنية التحتية والأساسية للدولة', partOfSpeech: 'noun', def: 'The basic physical and organizational structures needed for the operation of a society or enterprise.', ex: 'Investment in quayside gantry cranes modernized Egyptian port infrastructure.', exAr: 'أحدث الاستثمار في أوناش الأرصفة العملاقة نقلة نوعية في بنية الموانئ المصرية.', collocation: 'maritime infrastructure' },
    { word: 'bunkering', meaningAr: 'تزويد السفن بالوقود والخدمات البحرية', partOfSpeech: 'noun', def: 'The supplying of fuel and provisions for use by ships, including green methanol.', ex: 'Suez Canal green bunkering terminals refuel carbon-neutral container vessels.', exAr: 'تزود محطات تموين السفن الخضراء بالقناة سفن الحاويات بوقود الميثانول النظيف.', collocation: 'green bunkering' },
    { word: 'corridor', meaningAr: 'ممر تجاري ولوجستي دولي', partOfSpeech: 'noun', def: 'A designated geographical route linking major commercial economic nodes.', ex: 'The Suez Economic Corridor integrates industrial manufacturing with maritime export.', exAr: 'يدمج الممر الاقتصادي لقناة السويس التصنيع بالإنتاج والتصدير البحري.', collocation: 'economic corridor' },
    { word: 'navigability', meaningAr: 'صلاحية المجرى المائي للملاحة الآمنة', partOfSpeech: 'noun', def: 'The condition of a waterway being wide, deep, and clear enough to be traveled by ships.', ex: 'Continuous dredging maintains the navigability of the waterway for megaships.', exAr: 'يحافظ التكريك المستمر على صلاحية المجرى المائي للملاحة لسفن الحاويات العملاقة.', collocation: 'waterway navigability' },
    { word: 'contingency', meaningAr: 'خطة طوارئ واستعداد للأزمات غير المتوقعة', partOfSpeech: 'noun', def: 'A future event or circumstance which is possible but cannot be predicted with certainty.', ex: 'Maritime authorities formulated robust contingency plans for severe dust storms.', exAr: 'صاغت الهيئة البحرية خطط طوارئ حازمة لمواجهة العواصف الترابية الشديدة.', collocation: 'contingency planning' },
    { word: 'intermodal', meaningAr: 'متعدد الوسائط (بحري، سككي، بري)', partOfSpeech: 'adjective', def: 'Involving two or more different modes of transport in conveying goods.', ex: 'The high-speed electric railway establishes an intermodal bridge between Red and Mediterranean Seas.', exAr: 'يرسخ القطار الكهربائي السريع جسراً متعدد الوسائط بين البحرين الأحمر والمتوسط.', collocation: 'intermodal freight' }
  ],
  'Geostrategic Predominance of the Suez Maritime Arteries',
  'Handling upwards of twelve percent of total global merchandise trade and nearly thirty percent of global container traffic, the Suez Canal represents the quintessential artery of contemporary international capitalism. With the completion of the dual-lane bypass and the development of the SCZONE (Suez Canal Economic Zone), Egypt has pivoted from a passive toll-collection canal to an active global value-addition hub. At the northern and southern roadsteads anchor ultra-large container vessels awaiting transit, while along the banks hum automated intermodal freight terminals.',
  'World Maritime Logistics Forum: Ismailia Naval Headquarters',
  'Admiral Mostafa (Maritime Operations Chief) & Elena (Global Supply Chain Analyst)',
  'Mostafa: "At the southern entrance anchored twenty-two dual-fuel megaships this morning."\nElena: "A testament to your operational efficiency. The agreement creates an intermodal framework whereby transit times are halved."\nMostafa: "Were global routing to divert around the Cape of Good Hope, carbon emissions would increase by thousands of tons per voyage."\nElena: "Egyptian Baccalaureate researchers mastering these logistical equations are analyzing the geopolitical arteries of world peace."',
  {
    vocab: [
      { id: 'b_s1_u5_v1', skill: 'Vocabulary', question: 'A narrow, strategic geographical passage whose obstruction can halt global shipping is termed a __________.', options: ['chokepoint', 'plateau', 'prairie', 'glacier'], correctAnswer: 'A', explanation: 'A maritime chokepoint is a narrow strategic strait of vital global importance.' },
      { id: 'b_s1_u5_v2', skill: 'Vocabulary', question: 'The process of transferring shipping containers between sea vessels at an intermediate port is called __________.', options: ['transshipment', 'quarantine', 'insurrection', 'conscription'], correctAnswer: 'A', explanation: 'Transshipment is offloading cargo from one vessel to reload onto another.' }
    ],
    grammar: [
      { id: 'b_s1_u5_g1', skill: 'Grammar', question: 'Fronted prepositional inversion: "At the entrance of the canal __________."', options: ['anchored the enormous container vessel', 'the enormous container vessel anchored', 'did anchor the vessel', 'anchoring the vessel was'], correctAnswer: 'A', explanation: 'Prepositional phrase + main verb (anchored) + subject (the vessel).' },
      { id: 'b_s1_u5_g2', skill: 'Grammar', question: 'Choose the formal connective adverbial meaning "by which" or "according to which": "They established a treaty __________ maritime security is preserved."', options: ['whereby', 'whither', 'wherefore', 'whereinsoever'], correctAnswer: 'A', explanation: '"Whereby" means "by which" or "through which" in formal legal/logistical prose.' }
    ],
    reading: [
      { id: 'b_s1_u5_r1', skill: 'Reading', question: 'How has Egypt transformed its role regarding the Suez Canal according to the passage?', options: ['From a passive toll-collector into an active value-addition and intermodal manufacturing hub', 'By closing the canal to foreign container vessels permanently', 'By converting the canal into an agricultural freshwater canal', 'By selling the waterway to private transport corporations'], correctAnswer: 'A', explanation: 'Egypt transitioned toward value addition and intermodal industrial manufacturing.' }
    ],
    listening: [
      { id: 'b_s1_u5_l1', skill: 'Listening', question: 'What would occur if global shipping diverted around the Cape of Good Hope instead of using Suez?', options: ['Carbon emissions and voyage duration would escalate dramatically', 'Global shipping costs would immediately drop to zero', 'Container vessels would arrive three weeks earlier', 'All maritime traffic would cease worldwide'], correctAnswer: 'A', explanation: 'Diverting around Africa increases transit time and releases thousands of extra tons of carbon.' }
    ],
    exam: [
      { id: 'b_s1_u5_e1', skill: 'Vocabulary', question: 'The refueling of commercial marine vessels with clean alternative fuels like green methanol is termed __________.', options: ['bunkering', 'dredging', 'piloting', 'quarrying'], correctAnswer: 'A', explanation: 'Bunkering is supplying fuel and provisions to maritime ships.' },
      { id: 'b_s1_u5_e2', skill: 'Grammar', question: 'Across the turquoise waters of the Gulf __________ the convoy of LNG tankers.', options: ['sailed', 'did sail', 'sailing was', 'were sailed'], correctAnswer: 'A', explanation: 'Fronted prepositional phrase triggers full inversion: Prepositional phrase + verb (sailed) + subject.' }
    ]
  },
  bacLitSec1Ch5
);

export const bacSec1Unit6: UnitCurriculum = createBaccalaureateUnit(
  10,
  'Secondary 1 (Baccalaureate) - الصف الأول الثانوي',
  1,
  6,
  'Archaeological Digital Forensics & Monumental Stewardship',
  'التوثيق الرقمي للتراث والآثار المصرية والريادة المتحفية',
  'Non-Destructive Sensing, Photogrammetry, Muon Tomography & Museum Curation',
  'Ellipsis, Substitution & Dummy "It" Structures in Scholarly Analysis',
  'الحذف والتعويض (Ellipsis & Substitution) وهياكل الفاعل الشكلي (Dummy "It")',
  'Ellipsis and substitution (do so, one/ones, neither) condense formal text without crude repetition. Dummy "It" (It is imperative that, It occurs to scholars that) introduces objective distancing in academic archaeological forensics.',
  [
    { word: 'tomography', meaningAr: 'التصوير المقطعي الإشعاعي غير الجراحي', partOfSpeech: 'noun', def: 'A technique for displaying a representation of a cross-section through a human body or solid object using X-rays or cosmic rays.', ex: 'Cosmic-ray muon tomography revealed an undiscovered corridor within the Great Pyramid.', exAr: 'كشف التصوير المقطعي بجزيئات الميون الكونية عن ممر غير مكتشف داخل الهرم الأكبر.', collocation: 'muon tomography' },
    { word: 'photogrammetry', meaningAr: 'المسح التصويري ثلاثي الأبعاد بالأشعة', partOfSpeech: 'noun', def: 'The use of photography in surveying and mapping to ascertain measurements and construct 3D models.', ex: 'High-resolution photogrammetry generates millimeter-accurate digital twins of pharaonic reliefs.', exAr: 'ينشئ المسح التصويري فائق الدقة توائم رقمية دقيقة بالمليمتر للنقوش الفرعونية.', collocation: 'aerial photogrammetry' },
    { word: 'curation', meaningAr: 'الإشراف المتحفي والفرز والتوثيق التراثي', partOfSpeech: 'noun', def: 'The action or process of selecting, organizing, and looking after the items in a collection or exhibition.', ex: 'The Grand Egyptian Museum exemplifies state-of-the-art archaeological curation and storytelling.', exAr: 'يجسد المتحف المصري الكبير أحدث معايير الإشراف المتحفي وسرد التاريخ.', collocation: 'museum curation' },
    { word: 'provenance', meaningAr: 'المنشأ التاريخي وتوثيق ملكية الأثر', partOfSpeech: 'noun', def: 'The place of origin or earliest known history of an artifact, proving authenticity and legal title.', ex: 'Stringent repatriation protocols require unimpeachable archaeological provenance.', exAr: 'تتطلب بروتوكولات استرداد الآثار إثبات المنشأ الأثري التاريخي بصفة قاطعة.', collocation: 'archaeological provenance' },
    { word: 'repatriation', meaningAr: 'استرداد وإعادة الآثار المهربة إلى الوطن', partOfSpeech: 'noun', def: 'The return of cultural property or historical artifacts to their country of origin.', ex: 'Egypt has successfully secured the repatriation of thousands of smuggled antiquities.', exAr: 'نجحت مصر في استرداد آلاف القطع الأثرية التاريخية المهربة إلى الخارج.', collocation: 'antiquities repatriation' },
    { word: 'stratigraphy', meaningAr: 'علم طبقات الأرض والتسلسل الرسوبي الأثري', partOfSpeech: 'noun', def: 'The analysis of the order and position of archaeological strata to determine chronological age.', ex: 'Careful documentation of trench stratigraphy dates pottery fragments with pinpoint accuracy.', exAr: 'يحدد التوثيق الدقيق لطبقات الحفر عمر شظايا الفخار بدقة متناهية.', collocation: 'archaeological stratigraphy' },
    { word: 'non-destructive', meaningAr: 'غير إتلافي ويحافظ على سلامة الأثر', partOfSpeech: 'adjective', def: 'Analysis techniques that do not cause damage or alter the physical substance under testing.', ex: 'Non-destructive spectroscopic scanning preserves fragile papyrus fibers intact.', exAr: 'يحافظ الفحص الطيفي غير الإتلافي على ألياف البرديات الهشة دون أدنى مساس.', collocation: 'non-destructive testing' },
    { word: 'monumental', meaningAr: 'صرحي، عظيم الشأن وخالد في التاريخ', partOfSpeech: 'adjective', def: 'Great in importance, extent, or size; monumental historical significance.', ex: 'The Karnak Hypostyle Hall stands as a monumental triumph of ancient architectural engineering.', exAr: 'يقف بهو الأعمدة بالكرنك كصرح خالد وهندسي فريد في العمارة القديمة.', collocation: 'monumental architecture' },
    { word: 'epigraphy', meaningAr: 'علم قراءة ودراسة النقوش والخطوط القديمة', partOfSpeech: 'noun', def: 'The study and interpretation of ancient inscriptions on stone, metal, or pottery.', ex: 'Epigraphers deciphered the royal cartouches inscribed upon the limestone stela.', exAr: 'فكك علماء النقوش الخراطيش الملكية المنقوشة على اللوحة الجيرية.', collocation: 'pharaonic epigraphy' },
    { word: 'stewardship', meaningAr: 'الأمانة والرعاية المسؤولة لحفظ التراث', partOfSpeech: 'noun', def: 'The responsible ethical overseeing and protection of precious collective cultural heritage.', ex: 'Global cultural stewardship dictates that looted heritage be restored to its rightful guardians.', exAr: 'تفرض الأمانة التراثية العالمية إعادة الآثار المنهوبة إلى أوطانها وحراسها الشرعيين.', collocation: 'cultural stewardship' }
  ],
  'Non-Invasive Diagnostics and the Digital Renaissance of Egyptology',
  'The discipline of Egyptology in the 2026/2027 academic era has undergone a radical paradigm shift from invasive pickaxe excavations toward non-destructive digital forensics. At the Grand Egyptian Museum (GEM) and the Saqqara Necropolis, scientists deploy ground-penetrating radar, infrared thermography, and cosmic-ray muon sensors. It is widely acknowledged that uncovering the mysteries of antiquity must never come at the expense of monumental integrity. By creating holographic "digital twins," conservators can simulate environmental decay models, test restoration resins virtually, and guarantee that treasures endure for millennia.',
  'Grand Egyptian Museum Conservation Colloquium: Giza Plateau',
  'Dr. Khaled (Senior Archaeometrician) & Dr. Beatrice (Louvre Digital Heritage Director)',
  'Khaled: "It occurred to our team that traditional chemical solvents might degrade the polychrome pigment, so we did not use them; instead, we deployed laser ablation."\nBeatrice: "An exquisite conservation protocol. If one conservator advocates for physical intervention, another recommends digital preservation; we prefer the latter."\nKhaled: "Indeed. It is imperative that cultural heritage remain protected from both climate disruption and illicit trafficking."\nBeatrice: "Egyptian Baccalaureate scholars analyzing these archaeometric scans are synthesizing chemistry, history, and international cultural jurisprudence."',
  {
    vocab: [
      { id: 'b_s1_u6_v1', skill: 'Vocabulary', question: 'The technique of visualizing the interior of solid monuments using naturally occurring cosmic rays is called __________.', options: ['muon tomography', 'radiocarbon dating', 'satellite photogrammetry', 'underwater sonar'], correctAnswer: 'A', explanation: 'Cosmic-ray muon tomography visualizes solid monument voids non-destructively.' },
      { id: 'b_s1_u6_v2', skill: 'Vocabulary', question: 'The official return of stolen or illegally exported cultural artifacts to their country of origin is termed __________.', options: ['repatriation', 'conscription', 'annexation', 'subjugation'], correctAnswer: 'A', explanation: 'Repatriation is the lawful return of cultural property to its rightful homeland.' }
    ],
    grammar: [
      { id: 'b_s1_u6_g1', skill: 'Grammar', question: 'Identify the sentence deploying substitution with "do so":', options: ['The museum intended to scan the tomb with radar, and they did so yesterday.', 'The museum scanned the tomb and the tomb was scanned.', 'They scanned the tomb because scanning is good.', 'Scanning the tomb was done by scanning.'], correctAnswer: 'A', explanation: '"Did so" replaces the verb phrase "scan the tomb with radar" without repetition.' },
      { id: 'b_s1_u6_g2', skill: 'Grammar', question: 'Deploying dummy "It": "__________ that ancient builders possessed advanced celestial alignment knowledge."', options: ['It is widely accepted', 'There is widely accepted', 'What is widely accepted', 'That is widely accepted'], correctAnswer: 'A', explanation: '"It is widely accepted that..." utilizes dummy "It" as anticipatory formal subject.' }
    ],
    reading: [
      { id: 'b_s1_u6_r1', skill: 'Reading', question: 'Why does modern archaeology prioritize non-destructive digital diagnostics over traditional physical excavation?', options: ['To investigate monuments and artifacts without causing structural damage or chemical degradation', 'Because digital computers are cheaper than metal shovels', 'Because ancient monuments have no physical substance left', 'To conceal historical discoveries from the public eye'], correctAnswer: 'A', explanation: 'Non-destructive methods preserve monumental integrity while unlocking interior data.' }
    ],
    listening: [
      { id: 'b_s1_u6_l1', skill: 'Listening', question: 'Why did Dr. Khaled’s team choose laser ablation instead of chemical solvents on the polychrome pigment?', options: ['Because chemical solvents threatened to degrade the delicate ancient pigment', 'Because the laboratory ran out of water', 'Because chemical solvents are illegal in all museums', 'Because laser machines require zero electricity'], correctAnswer: 'A', explanation: 'Solvents risked degrading pigments, making non-contact laser cleaning the safer protocol.' }
    ],
    exam: [
      { id: 'b_s1_u6_e1', skill: 'Vocabulary', question: 'The documented historical chain of ownership confirming that an antiquity was legally excavated is its __________.', options: ['provenance', 'epidemiology', 'stratosphere', 'vernacular'], correctAnswer: 'A', explanation: 'Provenance is the verified legal and historical chain of custody.' },
      { id: 'b_s1_u6_e2', skill: 'Grammar', question: 'Some scholars opted for physical restoration, but our committee chose not to __________.', options: ['do so', 'do it so', 'make so', 'have so'], correctAnswer: 'A', explanation: 'Elliptical substitution with "do so" avoiding crude verb repetition.' }
    ]
  },
  bacLitSec1Ch6
);

// -------------------------------------------------------------------------------------------------
// GRADE 11 (SECONDARY 2) - UNITS 4, 5, 6
// -------------------------------------------------------------------------------------------------

export const bacSec2Unit4: UnitCurriculum = createBaccalaureateUnit(
  11,
  'Secondary 2 (Baccalaureate) - الصف الثاني الثانوي',
  1,
  4,
  'Bio-Cybernetics & Neural Interfaces',
  'السيبرانية الحيوية والواجهات العصبية التفاعلية',
  'Neuro-Prosthetics, Brain-Computer Interfaces (BCI) & Synaptic Plasticity',
  'Inverted Conditionals (Should / Were / Had) & Parallel Comparative Clauses',
  'الجمل الشرطية المقلوبة وصيغ المقارنة المتوازية (The more..., the more...)',
  'Inverted conditionals (Should you encounter, Were the neural interface to malfunction, Had researchers calibrated) elevate formal academic tone. Parallel comparatives (The more complex the neural network, the greater the ethical responsibility) structure rigorous dialectical arguments.',
  [
    { word: 'cybernetics', meaningAr: 'علم التحكم والاتصال الآلي والحيوي', partOfSpeech: 'noun pl.', def: 'The science of communications and automatic control systems in machines and living things.', ex: 'Bio-cybernetics bridges neurobiology with electromechanical computing.', exAr: 'تربط السيبرانية الحيوية بين علم الأعصاب والأنظمة الحاسوبية الكهروميكانيكية.', collocation: 'applied cybernetics' },
    { word: 'synaptic', meaningAr: 'مشتبك عصبي متعلق بنقل الإشارات العصبية', partOfSpeech: 'adjective', def: 'Relating to a synapse or synapses between nerve cells.', ex: 'Neural implants stimulate synaptic pathways to restore motor function in paraplegic patients.', exAr: 'تحفز الغرسات العصبية المسارات المشبكية لاستعادة الحركة لدى المصابين بالشلل.', collocation: 'synaptic transmission' },
    { word: 'prosthetic', meaningAr: 'تعويضي أو اصطناعي وظيفي', partOfSpeech: 'adjective/noun', def: 'An artificial body part, such as a limb, heart, or implant.', ex: 'Bionic prosthetic limbs equipped with haptic feedback replicate natural tactile sensation.', exAr: 'تتيح الأطراف التعويضية البيونية المزودة بحساسات لمسية محاكاة الشعور الطبيعي.', collocation: 'bionic prosthetic' },
    { word: 'plasticity', meaningAr: 'المرونة العصبية وقدرة الدماغ على التكيف', partOfSpeech: 'noun', def: 'The adaptability of an organism or neurological structure to changes in its environment.', ex: 'Cortical plasticity allows the human brain to rewire sensory inputs around traumatic damage.', exAr: 'تتيح المرونة العصبية للقشرة الدماغية إعادة توجيه الإشارات حول المناطق المصابة.', collocation: 'neuroplasticity' },
    { word: 'telemetry', meaningAr: 'القياس والرصد اللاسلكي للبيانات العصبية', partOfSpeech: 'noun', def: 'The process of recording and transmitting the readings of an instrument wirelessly.', ex: 'Implanted telemetry buoys transmit real-time neural firing patterns to external decoders.', exAr: 'ترسل أجهزة القياس اللاسلكية المزروعة أنماط الإشارات العصبية لفك تشفيرها لحظياً.', collocation: 'neural telemetry' },
    { word: 'invasive', meaningAr: 'تداخلي جراحي يخترق الأنسجة', partOfSpeech: 'adjective', def: 'Involving the introduction of instruments into the body or incision through the skin.', ex: 'Non-invasive electroencephalogram headsets eliminate the clinical risks of open surgery.', exAr: 'تقضي أجهزة تخطيط الدماغ غير التداخلية على مخاطر الجراحات المفتوحة.', collocation: 'non-invasive interface' },
    { word: 'decoding', meaningAr: 'فك التشفير وقراءة الإشارات الذهنية', partOfSpeech: 'noun', def: 'The process of translating neural signals into algorithmic machine commands.', ex: 'Advanced algorithmic decoding enables paralyzed individuals to articulate speech onto screens.', exAr: 'يمكّن فك التشفير الخوارزمي المتقدم المرضى المصابين بالشلل من تحويل أفكارهم لنصوص.', collocation: 'neural decoding' },
    { word: 'bioethics', meaningAr: 'الأخلاقيات الحيوية وحماية الخصوصية العصبية', partOfSpeech: 'noun pl.', def: 'The moral implications of biological and neurological technologies.', ex: 'Neurorights advocates demand statutory protection against unauthorized neural surveillance.', exAr: 'يطالب دعاة الحقوق العصبية بحماية تشريعية صارمة ضد التلصص على الإشارات الذهنية.', collocation: 'neuro-bioethics' },
    { word: 'latency', meaningAr: 'زمن الانتقال والاستجابة والتأخير الزمني', partOfSpeech: 'noun', def: 'The delay before a transfer of data begins following an instruction for its transfer.', ex: 'Ultra-low latency broadband enables instantaneous brain-controlled bionic movement.', exAr: 'تتيح شبكات الاتصال فائقة السرعة منخفضة التأخير استجابة حركية فورية للأطراف.', collocation: 'low-latency processing' },
    { word: 'bandwidth', meaningAr: 'السعة الترددية لنقل البيانات', partOfSpeech: 'noun', def: 'The capacity for data transfer of an electronic communications system.', ex: 'High-bandwidth neural interfaces capture thousands of simultaneous neuron spikes.', exAr: 'تلتقط الواجهات العصبية ذات النطاق الترددي العريض آلاف الإشارات العصبية في وقت واحد.', collocation: 'neural bandwidth' }
  ],
  'The Convergence of Neurobiology and Machine Agency',
  'Brain-computer interfaces (BCIs) represent the frontier where organic consciousness coalesces with digital computation. By intercepting cortical action potentials via microelectrode arrays, researchers translate neuromuscular intentionality directly into robotic actuation. Were an interface to achieve bidirectionality—delivering haptic sensations back to the brain while decoding commands—the boundary between the biological self and synthetic tools would dissolve. The more intimate these neuro-technologies become, the more urgently societies must codify statutory "neurorights" protecting cognitive privacy.',
  'International BCI & Neurotechnology Symposium: Cairo University',
  'Dr. Tamer (Neurosurgeon) & Dr. Caroline (Cyberneticist)',
  'Tamer: "Should the electrode array shift by a mere hundred microns, synaptic decoding fidelity drops precipitously."\nCaroline: "Precisely. The more sophisticated our neural filters become, the more accurately we reconstruct intentional motor patterns."\nTamer: "Had we not established clinical bioethics oversight from the project’s inception, neural data commercialization would have run rampant."\nCaroline: "Egyptian Baccalaureate students synthesizing this neuro-computational research are pioneering the ethical architecture of transhuman interfaces."',
  {
    vocab: [
      { id: 'b_s2_u4_v1', skill: 'Vocabulary', question: 'The biological capacity of the human nervous system to reorganize its pathways after injury is __________.', options: ['neuroplasticity', 'sedimentation', 'epigraphy', 'falsifiability'], correctAnswer: 'A', explanation: 'Neuroplasticity is the brain’s ability to adapt and rewire synaptic connections.' },
      { id: 'b_s2_u4_v2', skill: 'Vocabulary', question: 'What distinguishes a "non-invasive" neural interface from an invasive implant?', options: ['It records brainwaves from the surface of the scalp without surgical incision', 'It requires drilling through the skull into cortical matter', 'It replaces the patient’s entire brain with a supercomputer', 'It can only be used on non-living tissue'], correctAnswer: 'A', explanation: 'Non-invasive interfaces record scalp EEG without penetrating skin or skull.' }
    ],
    grammar: [
      { id: 'b_s2_u4_g1', skill: 'Grammar', question: 'Inverted first conditional: "__________ any complications arise during the trial, the surgical protocol will pause."', options: ['Should', 'Were', 'Had', 'Would'], correctAnswer: 'A', explanation: 'Inversion for type 1 conditionals uses "Should + Subject + Base Verb".' },
      { id: 'b_s2_u4_g2', skill: 'Grammar', question: 'Parallel comparative structure: "The more complex the neural interface, __________ the necessity for bioethical governance."', options: ['the greater', 'greater is', 'the greatest', 'more great'], correctAnswer: 'A', explanation: 'Parallel comparative formula: "The + comparative..., the + comparative..."' }
    ],
    reading: [
      { id: 'b_s2_u4_r1', skill: 'Reading', question: 'Why do ethicists advocate for the statutory recognition of "neurorights"?', options: ['To safeguard cognitive privacy and prevent the unauthorized exploitation of brainwave data', 'To ban all medical prosthetics from hospitals', 'To ensure that computers pay taxes', 'To force every citizen to undergo mandatory neural implantation'], correctAnswer: 'A', explanation: 'Neurorights protect the sanctity and privacy of human mental processes.' }
    ],
    listening: [
      { id: 'b_s2_u4_l1', skill: 'Listening', question: 'What happens if the implanted electrode array shifts by even a tiny fraction according to Dr. Tamer?', options: ['Synaptic decoding fidelity declines drastically', 'The computer explodes immediately', 'The patient forgets their native language', 'The battery life increases ten times'], correctAnswer: 'A', explanation: 'Micron-level shifts disrupt the accuracy of neural signal decoding.' }
    ],
    exam: [
      { id: 'b_s2_u4_e1', skill: 'Vocabulary', question: 'The delay between an initiated thought and the physical movement of a bionic limb is known as __________.', options: ['latency', 'provenance', 'chokepoint', 'reclamation'], correctAnswer: 'A', explanation: 'Latency measures data transfer and computational delay.' },
      { id: 'b_s2_u4_e2', skill: 'Grammar', question: '__________ the implant to malfunction, the safety failsafe would isolate the circuitry automatically.', options: ['Were', 'Should', 'Had', 'Did'], correctAnswer: 'A', explanation: 'Inverted second conditional: Were + Subject + to + verb.' }
    ]
  },
  bacLitSec2Act4
);

export const bacSec2Unit5: UnitCurriculum = createBaccalaureateUnit(
  11,
  'Secondary 2 (Baccalaureate) - الصف الثاني الثانوي',
  1,
  5,
  'Orbital Governance & Extraterrestrial Jurisprudence',
  'معاهدات الفضاء الخارجي والسيادة المدارية وحوكمة الموارد الكونية',
  'The Outer Space Treaty, Space Debris Remediation, Planetary Commons & Satellite Megaconstellations',
  'Concessive Adverbials & Cohesive Transition Devices in International Treaties',
  'أدوات الربط الاستدراكية والتنازلية (Concessive Adverbials) في المعاهدات الدولية',
  'Concessive markers (Albeit, Be that as it may, Notwithstanding that, Inasmuch as) establish legal precision and balanced multilateral qualification in formal treaty drafting.',
  [
    { word: 'jurisprudence', meaningAr: 'فلسفة القانون والتشريع الفضائي الدولي', partOfSpeech: 'noun', def: 'The theoretical philosophy and science of law applied to supranational domains.', ex: 'Space jurisprudence interrogates whether asteroid mining constitutes sovereign appropriation.', exAr: 'تبحث فلسفة قانون الفضاء فيما إذا كان تعدين الكويكبات يمثل استحواذاً سيادياً.', collocation: 'extraterrestrial jurisprudence' },
    { word: 'debris', meaningAr: 'حطام ونفايات الأقمار الصناعية الفضائية', partOfSpeech: 'noun [uncountable]', def: 'Scattered fragments, typically of something wrecked or destroyed in orbit.', ex: 'Defunct satellites and rocket stages create hazardous orbital debris threatening the space station.', exAr: 'تشكل الأقمار المعطلة حطاماً مدارياً خطيراً يهدد محطة الفضاء الدولية.', collocation: 'orbital debris' },
    { word: 'constellation', meaningAr: 'كوكبة وسرب أقمار صناعية متكاملة', partOfSpeech: 'noun', def: 'A group of artificial satellites working together as a coordinated system.', ex: 'Low-Earth orbit satellite constellations provide ubiquitous broadband internet across deserts.', exAr: 'توفر كوكبات الأقمار الصناعية في المدار المنخفض إنترنت فائق السرعة عبر الصحارى.', collocation: 'satellite constellation' },
    { word: 'remediation', meaningAr: 'المعالجة البيئية وإزالة المخلفات', partOfSpeech: 'noun', def: 'The action of remedying something, in particular of reversing or stopping environmental damage.', ex: 'Active debris remediation deploying magnetic harpoons clears congested orbital altitudes.', exAr: 'تسهم المعالجة الفضائية النشطة باستخدام خطاطيف مغناطيسية في تطهير المدارات المزدحمة.', collocation: 'debris remediation' },
    { word: 'commons', meaningAr: 'المشاعات العالمية المشتركة للبشرية جمعاء', partOfSpeech: 'noun pl.', def: 'Cultural and natural resources accessible to all members of a society, held in common.', ex: 'The 1967 Outer Space Treaty designates celestial bodies as the province of all mankind.', exAr: 'تصنف معاهدة الفضاء الخارجي لعام 1967 الأجرام السماوية كمشاعات مشتركة للإنسانية.', collocation: 'global commons' },
    { word: 'sovereignty', meaningAr: 'السيادة والاستقلال السياسي والقانوني', partOfSpeech: 'noun', def: 'Supreme power or authority; the state of being independent and free from external control.', ex: 'No sovereign nation may claim territorial sovereignty over the Moon or planetary surfaces.', exAr: 'لا يجوز لأي دولة سيادية ادعاء السيادة الإقليمية على القمر أو أسطح الكواكب.', collocation: 'sovereign appropriation' },
    { word: 'kessler syndrome', meaningAr: 'متلازمة كيسلر (سلسلة التصادمات الفضائية الكارثية)', partOfSpeech: 'noun', def: 'A scenario where orbital debris density creates a self-sustaining cascade of collisions.', ex: 'Preventing the Kessler syndrome requires enforceable international de-orbiting mandates.', exAr: 'يتطلب منع متلازمة كيسلر فرض لوائح دولية ملزمة لإخراج الأقمار من المدار عند انتهاء خدمتها.', collocation: 'cascade effect' },
    { word: 'payload', meaningAr: 'حمولة الصاروخ والمركبة الفضائية المفيدة', partOfSpeech: 'noun', def: 'The cargo, equipment, or passengers carried by a spacecraft or launch vehicle.', ex: 'The Egyptian satellite payload includes advanced hyperspectral climate-monitoring cameras.', exAr: 'تتضمن حمولة القمر الصناعي المصري كاميرات طيفية متطورة لرصد التغيرات المناخية.', collocation: 'scientific payload' },
    { word: 'multilateral', meaningAr: 'متعدد الأطراف والدول الموقعة', partOfSpeech: 'adjective', def: 'Agreed upon or participated in by three or more parties, especially the governments of different countries.', ex: 'Multilateral space accords prevent the militarization of low-Earth orbital space.', exAr: 'تمنع الاتفاقيات الفضائية متعددة الأطراف عسكرة المدارات الفضائية القريبة من الأرض.', collocation: 'multilateral treaty' },
    { word: 'telecommunication', meaningAr: 'الاتصالات السلكية واللاسلكية الفضائية', partOfSpeech: 'noun', def: 'Communication over a distance by cable, telegraph, telephone, or broadcasting.', ex: 'EgyptSat telecommunication platforms guarantee strategic connectivity during natural disasters.', exAr: 'تضمن منصات الاتصالات عبر الأقمار الصناعية المصرية استمرار الربط أثناء الكوارث.', collocation: 'telecommunication array' }
  ],
  'The Tragedy of the Orbital Commons: Regulating Near-Earth Space',
  'Low Earth Orbit (LEO) is rapidly devolving from an infinite scientific frontier into a congested, finite planetary resource. With thousands of commercial megaconstellation satellites launched annually, the probability of catastrophic orbital collisions escalating into the Kessler syndrome rises exponentially. The 1967 Outer Space Treaty affirms that space constitutes the "province of all mankind," prohibiting sovereign annexation. Be that as it may, commercial asteroid mining and orbital slot hoarding challenge these historic legal baselines, necessitating a modernized extraterrestrial regulatory regime.',
  'United Nations Committee on the Peaceful Uses of Outer Space (COPUOS) Session',
  'Ambassador Sameh (Space Law Delegate) & Dr. Vance (Astrophysicist)',
  'Sameh: "Notwithstanding that private aerospace firms innovate rapidly, sovereign states retain ultimate liability under international law."\nVance: "Indeed, Ambassador. Albeit commercial satellites expand internet connectivity, their light pollution obstructs astronomical observations."\nSameh: "Be that as it may, Egypt’s Space Agency insists that space situational awareness telemetry be shared multilaterally."\nVance: "Egyptian Baccalaureate students synthesizing this orbital jurisprudence are mastering the celestial diplomacy of the twenty-first century."',
  {
    vocab: [
      { id: 'b_s2_u5_v1', skill: 'Vocabulary', question: 'The runaway cascade of collisions between orbital fragments rendering near-Earth space unusable is known as __________.', options: ['the Kessler syndrome', 'the Doppler effect', 'the greenhouse effect', 'the Coriolis force'], correctAnswer: 'A', explanation: 'The Kessler syndrome describes cascading orbital debris collisions.' },
      { id: 'b_s2_u5_v2', skill: 'Vocabulary', question: 'Under the 1967 Outer Space Treaty, celestial bodies such as the Moon are defined as __________.', options: ['the common province and heritage of all humankind', 'the private property of the first nation to land', 'commercial real estate for mining corporations', 'military testing bases for sovereign armies'], correctAnswer: 'A', explanation: 'The Outer Space Treaty classifies celestial bodies as the common heritage of all mankind.' }
    ],
    grammar: [
      { id: 'b_s2_u5_g1', skill: 'Grammar', question: 'Choose the sophisticated concessive conjunction meaning "although": "The satellite was launched successfully, __________ with minor solar panel delays."', options: ['albeit', 'because', 'despite of', 'in order to'], correctAnswer: 'A', explanation: '"Albeit" introduces a concessive qualification concisely.' },
      { id: 'b_s2_u5_g2', skill: 'Grammar', question: 'Which discourse marker signals formal concession while maintaining the validity of the main argument?', options: ['Be that as it may', 'For instance', 'In the first place', 'To sum up'], correctAnswer: 'A', explanation: '"Be that as it may" acknowledges a preceding point while asserting the core thesis.' }
    ],
    reading: [
      { id: 'b_s2_u5_r1', skill: 'Reading', question: 'According to the passage, why is Low Earth Orbit now considered a "finite resource"?', options: ['Because satellite congestion and orbital debris drastically increase collision hazards', 'Because oxygen is running out in space', 'Because satellites fall down after three hours', 'Because gravity stops working when too many satellites launch'], correctAnswer: 'A', explanation: 'Congestion and debris risk rendering orbital highways unusable.' }
    ],
    listening: [
      { id: 'b_s2_u5_l1', skill: 'Listening', question: 'What unintended drawback of commercial satellite megaconstellations was highlighted by Dr. Vance?', options: ['Light pollution interfering with astronomical research', 'They cause rainstorms on Earth', 'They block international phone calls', 'They turn the sky green at night'], correctAnswer: 'A', explanation: 'Reflective satellites create light pollution disrupting deep-space telescope observations.' }
    ],
    exam: [
      { id: 'b_s2_u5_e1', skill: 'Vocabulary', question: 'The physical instruments and scientific cameras carried aboard an exploratory spacecraft constitute its __________.', options: ['payload', 'chokepoint', 'stratigraphy', 'reclamation'], correctAnswer: 'A', explanation: 'The payload represents the functional cargo carried by a spacecraft.' },
      { id: 'b_s2_u5_e2', skill: 'Grammar', question: '__________ the legal ambiguities in space law, multilateral consensus remains the only barrier against orbital warfare.', options: ['Notwithstanding', 'Because', 'Although that', 'In order that'], correctAnswer: 'A', explanation: '"Notwithstanding" functions as an elevated formal preposition of concession.' }
    ]
  },
  bacLitSec2Act5
);

export const bacSec2Unit6: UnitCurriculum = createBaccalaureateUnit(
  11,
  'Secondary 2 (Baccalaureate) - الصف الثاني الثانوي',
  1,
  6,
  'Comparative Rhetoric & Critical Discourse Analysis',
  'البلاغة المقارنة وتحليل الخطاب السياسي والإعلامي',
  'Rhetorical Devices (Anaphora, Chiasmus, Litotes), Ethos/Pathos/Logos & Ideological Demystification',
  'Cleft Clauses with "All that", "The thing that", and Prepositional Clefts',
  'الجمل المجزأة للتأكيد البلاغي (Cleft Sentences with All / What / Prepositions)',
  'Cleft structures with "All that", "The thing that", and fronted prepositional phrases (It was on the basis of evidence that...) isolate specific arguments for intense rhetorical and communicative emphasis.',
  [
    { word: 'rhetoric', meaningAr: 'علم البلاغة وفن الإقناع والتأثير الكلامي', partOfSpeech: 'noun', def: 'The art of effective or persuasive speaking or writing, especially the exploitation of figures of speech.', ex: 'Classical political rhetoric integrates ethos (credibility), pathos (emotion), and logos (logic).', exAr: 'تجمع البلاغة السياسية الكلاسيكية بين المصداقية والعاطفة والبرهان المنطقي.', collocation: 'persuasive rhetoric' },
    { word: 'anaphora', meaningAr: 'التكرار البلاغي للفظ في بدايات الجمل المتعاقبة', partOfSpeech: 'noun', def: 'The repetition of a word or phrase at the beginning of successive clauses.', ex: 'Martin Luther King Jr.’s speech deployed soaring anaphora with "I have a dream."', exAr: 'وظف مارتن لوثر كينغ التكرار البلاغي الملحمي بعبارة "لدي حلم".', collocation: 'poetic anaphora' },
    { word: 'chiasmus', meaningAr: 'التقاطع البلاغي وعكس ترتيب الكلمات في شطري الجملة', partOfSpeech: 'noun', def: 'A rhetorical or literary figure in which words or concepts are repeated in reverse order.', ex: 'Kennedy’s famous chiasmus challenged citizens: "Ask not what your country can do for you..."', exAr: 'طرح كينيدي تقاطعاً بلاغياً شهيراً: "لا تسأل عما يمكن لوطنك أن يفعله لك..."', collocation: 'rhetorical chiasmus' },
    { word: 'litotes', meaningAr: 'التوكيد بنفي الضد والاحتراس البلاغي', partOfSpeech: 'noun', def: 'Ironical understatement in which an affirmative is expressed by the negative of its contrary.', ex: 'Describing an extraordinary scientific discovery as "no small achievement" is classic litotes.', exAr: 'وصف الاكتشاف العلمي المذهل بأنه "ليس إنجازاً صغيراً" يعد توكيداً بنفي الضد.', collocation: 'masterful litotes' },
    { word: 'demystification', meaningAr: 'إزالة الغموض وتعرية الزيف الفكري والأيديولوجي', partOfSpeech: 'noun', def: 'The act of making something clearer and easier to understand by removing false mystery.', ex: 'Critical discourse analysis undertakes the demystification of subtle media propaganda.', exAr: 'يتولى التحليل النقدي للخطاب إزالة الغموض وتعرية الدعاية الإعلامية المبطنة.', collocation: 'ideological demystification' },
    { word: 'subversion', meaningAr: 'التقويض والتفكيك النقدي للمفاهيم السائدة', partOfSpeech: 'noun', def: 'The undermining of the power and authority of an established system or institution.', ex: 'Satirical political literature operates through the subtle subversion of authoritarian dogma.', exAr: 'يعمل الأدب السياسي الساخر عبر التقويض والتفكيك المبطن للاستبداد الفكري.', collocation: 'ironic subversion' },
    { word: 'cohesion', meaningAr: 'التماسك والترابط البنائي للنص والخطاب', partOfSpeech: 'noun', def: 'The grammatical and lexical linking within a text or sentence that holds it together.', ex: 'Logical transition markers ensure argumentative cohesion across academic chapters.', exAr: 'تضمن روابط الانتقال المنطقية التماسك النصي عبر فصول البحث الأكاديمي.', collocation: 'argumentative cohesion' },
    { word: 'fallacy', meaningAr: 'المغالطة المنطقية والخلل الاستدلالي في الحجة', partOfSpeech: 'noun', def: 'A mistaken belief, especially one based on unsound argument or deceptive logic.', ex: 'The ad hominem fallacy attacks an opponent’s character rather than refuting their argument.', exAr: 'تهاجم مغالطة الشخصنة شخص الخصم بدلاً من تفنيد حجته وبراهينه.', collocation: 'logical fallacy' },
    { word: 'hegemony', meaningAr: 'الهيمنة والسيطرة الثقافية والسياسية الفكرية', partOfSpeech: 'noun', def: 'Leadership or dominance, especially by one country or social group over others.', ex: 'Cultural hegemony is maintained when dominant narratives are accepted as natural common sense.', exAr: 'تتحقق الهيمنة الثقافية حين تصبح الروايات السائدة مقبولة كبديهيات فطرية.', collocation: 'cultural hegemony' },
    { word: 'demarcation', meaningAr: 'ترسيم وتحديد الحدود الفاصلة بدقة', partOfSpeech: 'noun', def: 'The action of fixing the boundary or limits of something distinct.', ex: 'The demarcation between objective empirical reporting and editorial persuasion must be clear.', exAr: 'يجب أن يكون خط الترسيم بين التقرير الإخباري الموضوعي والمقال الترويجي واضحاً.', collocation: 'clear demarcation' }
  ],
  'Discourse, Power, and the Anatomy of Public Persuasion',
  'Language is neither an innocent conduit of neutral facts nor a transparent window into reality; it is an apparatus of social power. In Critical Discourse Analysis (CDA), scholars deconstruct how syntactic choices—such as the passive voice, nominalisation, and lexical framing—can conceal human responsibility or manufacture political consent. It was through the strategic deployment of chiasmus and parallel antithesis that classical statesmen galvanized democratic republics. The thing that distinguishes authentic democratic deliberation from totalitarian propaganda is the open contestation of premises.',
  'Institute of Diplomatic Studies & Political Linguistics Forum: Cairo',
  'Dr. Nabil (Discourse Analyst) & Professor Evelyn (Rhetoric Historian)',
  'Nabil: "All that the editorial did was substitute active agency with abstract nominalisations to obscure liability."\nEvelyn: "A classic strategy of linguistic obfuscation. It is through rigorous critical literacy that citizens demystify persuasive texts."\nNabil: "The thing that impressed the adjudicators was the candidate’s seamless deconstruction of false logical fallacies."\nEvelyn: "Egyptian Baccalaureate scholars mastering comparative rhetoric acquire the analytical tools to defend democratic institutions against algorithmic deception."',
  {
    vocab: [
      { id: 'b_s2_u6_v1', skill: 'Vocabulary', question: 'The rhetorical device involving the repetition of words in reverse grammatical order is __________.', options: ['chiasmus', 'anaphora', 'hyperbole', 'personification'], correctAnswer: 'A', explanation: 'Chiasmus repeats concepts in inverted parallel order (A-B-B-A).' },
      { id: 'b_s2_u6_v2', skill: 'Vocabulary', question: 'An "ad hominem" fallacy occurs in public debate when an interlocutor __________.', options: ['attacks the personal character of an opponent instead of addressing the substantive argument', 'cites verifiable empirical data from peer-reviewed journals', 'concedes an argumentative premise with intellectual humility', 'uses proper mathematical calculations in economic analysis'], correctAnswer: 'A', explanation: 'Ad hominem attacks the person rather than the validity of their argument.' }
    ],
    grammar: [
      { id: 'b_s2_u6_g1', skill: 'Grammar', question: 'Cleft sentence with "All that": "Convert for emphasis: He only wanted to reveal the truth." -> __________', options: ['All that he wanted to do was reveal the truth.', 'What he wanted all was revealing truth.', 'It was all that he wanted revealing the truth.', 'The thing was all that he wanted to reveal.'], correctAnswer: 'A', explanation: '"All that + subject + verb + was + base verb" creates a focus cleft.' },
      { id: 'b_s2_u6_g2', skill: 'Grammar', question: 'Cleft sentence with "The thing that": "__________ astonished the audience was her surgical deconstruction of the propaganda."', options: ['The thing that', 'What that', 'All which', 'Which thing'], correctAnswer: 'A', explanation: '"The thing that + verb + was..." isolates and emphasizes the subject clause.' }
    ],
    reading: [
      { id: 'b_s2_u6_r1', skill: 'Reading', question: 'What is the primary objective of Critical Discourse Analysis (CDA) according to the passage?', options: ['To investigate how grammatical choices conceal agency and manufacture political consent', 'To teach students how to memorize foreign grammar rules without questioning', 'To ban all rhetorical speeches from television broadcasts', 'To translate ancient Greek poetry into modern internet slang'], correctAnswer: 'A', explanation: 'CDA uncovers how linguistic and syntactic framing construct and maintain power.' }
    ],
    listening: [
      { id: 'b_s2_u6_l1', skill: 'Listening', question: 'How did the editorial mentioned by Dr. Nabil obscure liability?', options: ['By substituting active agency with abstract nominalisations', 'By printing the newspaper in invisible ink', 'By deleting the entire front page of the paper', 'By interviewing five foreign ambassadors'], correctAnswer: 'A', explanation: 'Nominalisation turns actions into nouns, omitting who performed the action.' }
    ],
    exam: [
      { id: 'b_s2_u6_e1', skill: 'Vocabulary', question: 'Describing an immense tragedy as "rather unfortunate" is a quintessential example of __________.', options: ['litotes', 'chiasmus', 'anaphora', 'apostrophe'], correctAnswer: 'A', explanation: 'Litotes is deliberate understatement by using negative or restrained phrasing.' },
      { id: 'b_s2_u6_e2', skill: 'Grammar', question: 'It was __________ the basis of empirical data that the thesis committee reached its verdict.', options: ['on', 'in', 'at', 'with'], correctAnswer: 'A', explanation: 'Prepositional cleft formula: "It was on the basis of... that..."' }
    ]
  },
  bacLitSec2Act6
);

// -------------------------------------------------------------------------------------------------
// GRADE 12 (SECONDARY 3) - UNITS 4, 5, 6
// -------------------------------------------------------------------------------------------------

export const bacSec3Unit4: UnitCurriculum = createBaccalaureateUnit(
  12,
  'Secondary 3 (Baccalaureate Capstone) - الصف الثالث الثانوي',
  1,
  4,
  'Transboundary Riparian Geopolitics & Water Jurisprudence',
  'الأمن المائي العالمي والجيوسياسة النهرية وفقه القانون الدولي للمياه',
  'Equitable Utilization, The No-Harm Rule, Hydrological Sovereignty & Multi-State Basins',
  'Complex Gerundial/Participial Stances & Impersonal Causatives in Treaties',
  'صيغ المصدر واسم الفاعل المعقدة وصيغ السببية القانونية المنزهة عن الفاعل (Causatives)',
  'Impersonal causatives (having had the flow rates monitored, to have covenants verified) combine with complex participial stances to establish rigorous, dispute-proof international legal instruments.',
  [
    { word: 'riparian', meaningAr: 'مشاطئ، واقع على ضفة نهر دولي مشترك', partOfSpeech: 'adjective', def: 'Relating to or situated on the banks of a river or international waterway.', ex: 'Riparian nation-states are bound by the customary international law of shared watercourses.', exAr: 'تلتزم الدول المشاطئة للأنهار الدولية بقواعد القانون الدولي للمجاري المائية المشتركة.', collocation: 'riparian state' },
    { word: 'utilization', meaningAr: 'الاستخدام والانتفاع العادل والمنصف', partOfSpeech: 'noun', def: 'The action of making practical and effective use of something.', ex: 'The 1997 UN Watercourses Convention codifies the principle of equitable and reasonable utilization.', exAr: 'تقنن اتفاقية الأمم المتحدة لعام 1997 مبدأ الانتفاع المنصف والمعقول بالمياه.', collocation: 'equitable utilization' },
    { word: 'hegemony', meaningAr: 'الهيمنة المائية ومحاولات الاستئثار الأحادي', partOfSpeech: 'noun', def: 'Leadership or dominance, especially hydro-hegemony in transboundary river basins.', ex: 'Customary water jurisprudence rejects unilateral hydro-hegemony over international rivers.', exAr: 'يرفض فقه القانون الدولي للمياه الهيمنة المائية الأحادية على الأنهار الدولية.', collocation: 'hydro-hegemony' },
    { word: 'aquifer', meaningAr: 'خزان المياه الجوفية العابر للحدود', partOfSpeech: 'noun', def: 'A body of permeable rock that can contain or transmit groundwater across political borders.', ex: 'Transboundary aquifers require joint intergovernmental commissions to prevent over-abstraction.', exAr: 'تتطلب الخزانات الجوفية العابرة للحدود لجاناً حكومية مشتركة لمنع السحب الجائر.', collocation: 'transboundary aquifer' },
    { word: 'arbitration', meaningAr: 'التحكيم القضائي الدولي الملزم لفض النزاعات', partOfSpeech: 'noun', def: 'The settlement of a dispute by an impartial, legally designated international tribunal.', ex: 'The treaty stipulates binding arbitration in the event of persistent hydrologic disagreement.', exAr: 'تنص الاتفاقية على التحكيم القضائي الملزم في حال استمرار النزاع الهيدرولوجي.', collocation: 'binding arbitration' },
    { word: 'adjudication', meaningAr: 'الفصل القضائي وإصدار الأحكام الملزمة', partOfSpeech: 'noun', def: 'A formal judgment or decision delivered in a legal court or dispute forum.', ex: 'The International Court of Justice delivered landmark adjudications regarding riparian rights.', exAr: 'أصدرت محكمة العدل الدولية أحكاماً تاريخية بشأن الحقوق المائية للدول المشاطئة.', collocation: 'judicial adjudication' },
    { word: 'telemetry', meaningAr: 'القياس والرصد الهيدرولوجي التلقائي للأنهار', partOfSpeech: 'noun', def: 'Automatic transmission of river discharge and reservoir volume data in real time.', ex: 'Joint satellite telemetry stations guarantee transparent sharing of dam filling rates.', exAr: 'تضمن محطات الرصد بالأقمار الصناعية مشاركة شفافة لمعدلات ملء السدود لحظياً.', collocation: 'hydrological telemetry' },
    { word: 'sovereignty', meaningAr: 'السيادة الوطنية المقيدة بالواجبات الدولية', partOfSpeech: 'noun', def: 'Supreme power or authority bounded by the customary no-harm obligation.', ex: 'Territorial sovereignty cannot be invoked to inflict significant harm upon downstream nations.', exAr: 'لا يجوز التذرع بالسيادة الإقليمية لإلحاق ضرر جسيم بدول المصب وحرمانها من المياه.', collocation: 'limited sovereignty' },
    { word: 'contingency', meaningAr: 'خطة إدارة الجفاف والأزمات الهيدرولوجية الطارئة', partOfSpeech: 'noun', def: 'A provision for an unforeseen prolonged drought or climate anomaly.', ex: 'Drought contingency protocols mandate coordinated reservoir releases during dry hydrological cycles.', exAr: 'تفرض بروتوكولات طوارئ الجفاف تصريفاً منسقاً للمياه أثناء الدورات الهيدرولوجية الجافة.', collocation: 'drought contingency' },
    { word: 'unilateral', meaningAr: 'أحادي الجانب دون اتفاق وتنسيق مشترك', partOfSpeech: 'adjective', def: 'Performed by or affecting only one person, group, or country involved in a situation.', ex: 'Unilateral dam operations without prior impact assessments breach international customary law.', exAr: 'يمثل تشغيل السدود بشكل أحادي دون دراسات أثر مسبقة انتهاكاً للقانون الدولي العرفي.', collocation: 'unilateral action' }
  ],
  'The Jurisprudential Equilibrium of International Transboundary Rivers',
  'Transboundary river basins encompass nearly half the earth’s land surface and support over forty percent of the global population. In international water law, the doctrine of absolute territorial sovereignty (the Harmon Doctrine) has been universally extinguished, superseded by the twin customary principles of "equitable and reasonable utilization" and the "obligation not to cause significant harm." Downstream survival cannot be held hostage to upstream unilateral infrastructural diktats. Binding multilateral covenants, incorporating real-time telemetry and mandatory judicial arbitration, constitute the sole barrier against twenty-first-century hydrologic conflict.',
  'Ministry of Foreign Affairs & Water Resources Institute Briefing: Cairo',
  'Ambassador Tarek (Senior Riparian Negotiator) & Dr. Hoda (Hydrological Modeler)',
  'Tarek: "Having had our historical riparian rights authenticated by archival treaties, our legal stance remains unimpeachable."\nHoda: "The satellite telemetry confirmed that upstream impoundment during dry cycles causes quantifiable downstream harm."\nTarek: "It is an established norm of international jurisprudence that upstream riparian states cannot act unilaterally."\nHoda: "Egyptian Baccalaureate scholars analyzing these treaties are mastering the legal instruments safeguarding the lifeblood of the Nile."',
  {
    vocab: [
      { id: 'b_s3_u4_v1', skill: 'Vocabulary', question: 'The international legal principle prohibiting an upstream nation from inflicting severe injury upon downstream nations is the __________.', options: ['no-harm rule', 'Harmon doctrine', 'Monroe doctrine', 'Kessler principle'], correctAnswer: 'A', explanation: 'The "no-harm rule" is customary international law protecting downstream states.' },
      { id: 'b_s3_u4_v2', skill: 'Vocabulary', question: 'Nation-states situated along the course of a shared international river are described as __________ states.', options: ['riparian', 'orbital', 'halophytic', 'prepositional'], correctAnswer: 'A', explanation: 'Riparian describes entities situated on the banks of a river or watercourse.' }
    ],
    grammar: [
      { id: 'b_s3_u4_g1', skill: 'Grammar', question: 'Impersonal causative: "The international commission insisted on __________ every month."', options: ['having the reservoir discharge levels monitored', 'to have monitored the discharge levels', 'having monitored them discharge levels', 'have the discharge monitoring'], correctAnswer: 'A', explanation: 'Causative structure: have + object (discharge levels) + past participle (monitored).' },
      { id: 'b_s3_u4_g2', skill: 'Grammar', question: 'Complex participial clause: "__________ by independent hydrologists, the environmental impact assessment was submitted to the ICJ."', options: ['Having been corroborated', 'Corroborating having been', 'To have corroborated', 'Corroborated being'], correctAnswer: 'A', explanation: 'Perfect passive participle clause: Having been corroborated by...' }
    ],
    reading: [
      { id: 'b_s3_u4_r1', skill: 'Reading', question: 'What doctrine has been universally extinguished in modern international water law according to the text?', options: ['Absolute territorial sovereignty (the Harmon Doctrine)', 'The obligation not to cause significant harm', 'The principle of equitable utilization', 'The requirement for peaceful arbitration'], correctAnswer: 'A', explanation: 'The Harmon Doctrine (absolute sovereignty) has been extinguished in water law.' }
    ],
    listening: [
      { id: 'b_s3_u4_l1', skill: 'Listening', question: 'What does satellite telemetry confirm regarding upstream impoundment during dry cycles?', options: ['It causes quantifiable downstream harm and deficits', 'It increases rainfall across the desert immediately', 'It cools ocean surface temperatures worldwide', 'It has zero effect on downstream agriculture'], correctAnswer: 'A', explanation: 'Telemetry provides empirical evidence of quantifiable downstream harm during dry cycles.' }
    ],
    exam: [
      { id: 'b_s3_u4_e1', skill: 'Vocabulary', question: 'A formal decision or legally binding judgment delivered by an international court is an __________.', options: ['adjudication', 'anaphora', 'infodemic', 'aquifer'], correctAnswer: 'A', explanation: 'Adjudication is the legal pronouncing of a verdict or decree by a judicial court.' },
      { id: 'b_s3_u4_e2', skill: 'Grammar', question: 'The diplomatic delegation succeeded in having the multilateral accord __________ unanimously.', options: ['ratified', 'ratifying', 'to ratify', 'ratifies'], correctAnswer: 'A', explanation: 'Causative structure: have + object (the multilateral accord) + past participle (ratified).' }
    ]
  },
  bacLitSec3Ch4
);

export const bacSec3Unit5: UnitCurriculum = createBaccalaureateUnit(
  12,
  'Secondary 3 (Baccalaureate Capstone) - الصف الثالث الثانوي',
  1,
  5,
  'Cognitive Neuro-Ethics & Synthetic Mind Governance',
  'أخلاقيات الأعصاب وحوكمة العقول الاصطناعية الواعية',
  'Sentience Demarcation, Neural Surveillance, Algorithmic Consciousness & The Human-Machine Moral Frontier',
  'Subjunctive Mandates in International Treaties & Epistemic Hierarchy',
  'صيغ الإلزام والطلب (Subjunctive) في التشريعات والمعاهدات وتراتبية اليقين المعرفي',
  'Subjunctive structures (mandate that autonomous models be audited, require that neural datasets remain private) enforce absolute legislative and statutory compliance in high-stakes technological jurisprudence.',
  [
    { word: 'sentience', meaningAr: 'الإحساس والقدرة على الشعور والوعي الذاتي', partOfSpeech: 'noun', def: 'The capacity to experience feelings and sensations; subjective consciousness.', ex: 'Philosophers interrogate whether large multimodal models can achieve genuine synthetic sentience.', exAr: 'يبحث الفلاسفة فيما إذا كانت النماذج اللغوية العملاقة قادرة على تحقيق إحساس ووعي اصطناعي حقيقي.', collocation: 'artificial sentience' },
    { word: 'neuro-ethics', meaningAr: 'أخلاقيات علم الأعصاب وحماية حرمة الدماغ', partOfSpeech: 'noun pl.', def: 'The interdisciplinary study of the ethical, legal, and social implications of neuroscience.', ex: 'Neuro-ethics establishes strict protocols against commercial mining of subconscious thoughts.', exAr: 'ترسي أخلاقيات الأعصاب ضوابط صارمة تمنع استغلال الأفكار اللاواعية تجارياً.', collocation: 'applied neuro-ethics' },
    { word: 'subconscious', meaningAr: 'اللاوعي والعقل الباطن الإنساني', partOfSpeech: 'noun/adj.', def: 'Concerning the part of the mind of which one is not fully aware but which influences actions.', ex: 'Subliminal neuro-marketing algorithms attempt to manipulate subconscious consumer impulses.', exAr: 'تحاول خوارزميات التسويق العصبي التسلل للتأثير على دوافع الشراء في العقل الباطن.', collocation: 'subconscious impulse' },
    { word: 'autonomy', meaningAr: 'الاستقلالية والحرية الإرادية الذاتية', partOfSpeech: 'noun', def: 'The capacity of a rational individual to make an informed, un-coerced decision.', ex: 'Preserving cognitive autonomy requires statutory barriers against algorithmic behavioral steering.', exAr: 'تتطلب حماية الاستقلالية الإدراكية حواجز قانونية لمنع التوجيه الخوارزمي للسلوك.', collocation: 'cognitive autonomy' },
    { word: 'surveillance', meaningAr: 'المراقبة والتلصص الرقمي والاستخباراتي', partOfSpeech: 'noun', def: 'Close observation, especially of a suspected person or population group.', ex: 'Biometric neural surveillance in workplaces infringes constitutional privacy protections.', exAr: 'تنتهك المراقبة العصبية البيومترية في أماكن العمل الحماية الدستورية للخصوصية.', collocation: 'neural surveillance' },
    { word: 'epistemic', meaningAr: 'معرفي وإدراكي متعلق بأصول المعرفة', partOfSpeech: 'adjective', def: 'Relating to knowledge or to the degree of its validation.', ex: 'AI-generated hallucinations undermine the epistemic integrity of scientific literature.', exAr: 'تقوض هلوسات الذكاء الاصطناعي النزاهة المعرفية للأبحاث والأدبيات العلمية.', collocation: 'epistemic integrity' },
    { word: 'delineation', meaningAr: 'توصيف وتحديد الفروق الدقيقة بوضوح', partOfSpeech: 'noun', def: 'The action of describing or portraying something precisely.', ex: 'A rigorous statutory delineation separates clinical neuro-therapies from cognitive enhancement.', exAr: 'يفصل التحديد التشريعي الدقيق بين العلاج العصبي الطبي والتحسين التعزيزي للقدرات.', collocation: 'statutory delineation' },
    { word: 'anthropomorphic', meaningAr: 'إسقاط الصفات البشرية على الآلات والجماد', partOfSpeech: 'adjective', def: 'Attributing human characteristics, emotions, or intentions to non-human entities.', ex: 'Anthropomorphic projections deceive gullible users into believing chatbots experience love.', exAr: 'تخدع الإسقاطات البشرية المستخدمين وتوهمهم بأن روبوتات المحادثة تختبر الحب الحقيقي.', collocation: 'anthropomorphic projection' },
    { word: 'inviolable', meaningAr: 'مقدس ومحصن ضد أي انتهاك أو مساس', partOfSpeech: 'adjective', def: 'Never to be broken, infringed, or dishonored.', ex: 'The Universal Declaration of Human Rights affirms that mental privacy is inviolable.', exAr: 'يؤكد الإعلان العالمي لحقوق الإنسان أن الخصوصية الذهنية حق مقدس غير قابل للانتهاك.', collocation: 'inviolable dignity' },
    { word: 'commodification', meaningAr: 'تسليع وتحويل القيم والبيانات الإنسانية لسلع', partOfSpeech: 'noun', def: 'The transformation of goods, services, ideas, or people into commodities or objects of trade.', ex: 'The commercial commodification of raw brainwave data must be criminalized.', exAr: 'يجب تجريم التسليع التجاري لبيانات الموجات الدماغية الخام الصادرة عن البشر.', collocation: 'commercial commodification' }
  ],
  'The Frontier of Synthetic Consciousness and Mental Sovereignty',
  'As foundation models display emergent reasoning and neuromorphic computing architectures emulate synaptic firing, the border between biological cognition and synthetic computation grows philosophically porous. International jurisprudence confronts a dual moral mandate. On one hand, statutory law must mandate that corporate technology entities not commodify human neural telemetry, preserving the inviolable sanctuary of mental privacy. On the other hand, should an autonomous artificial architecture ever manifest verifiable sentience, the philosophical community must resolve whether synthetic entities possess moral patienthood.',
  'World Summit on AI Ethics and Cognitive Rights: Supreme Council of Culture, Cairo',
  'Justice Adel (Constitutional Judge) & Dr. Soraya (Cognitive Philosopher)',
  'Adel: "Our ministerial draft mandates that citizen neural telemetry remain strictly sovereign and non-transferable."\nSoraya: "An essential barrier. The law must insist that no algorithm steer human voting decisions subliminally."\nAdel: "Were a tech conglomerate to monetize brainwave patterns, the constitutional court would invalidate its license."\nSoraya: "Egyptian Baccalaureate graduates mastering neuro-ethics are formulating the digital bills of rights for the next century."',
  {
    vocab: [
      { id: 'b_s3_u5_v1', skill: 'Vocabulary', question: 'The subjective capacity to experience sensations and feelings as a conscious entity is __________.', options: ['sentience', 'salinity', 'stratigraphy', 'bunkering'], correctAnswer: 'A', explanation: 'Sentience denotes the capacity for conscious, subjective feeling.' },
      { id: 'b_s3_u5_v2', skill: 'Vocabulary', question: 'Attributing genuine human emotions and empathy to an artificial chatbot is an example of __________.', options: ['anthropomorphic projection', 'empirical falsification', 'muon tomography', 'chiasmus'], correctAnswer: 'A', explanation: 'Anthropomorphism attributes human emotional traits to non-human systems.' }
    ],
    grammar: [
      { id: 'b_s3_u5_g1', skill: 'Grammar', question: 'Formal statutory subjunctive: "The council mandates that every AI architecture __________ for discriminatory bias prior to release."', options: ['be audited', 'is audited', 'was audited', 'has audited'], correctAnswer: 'A', explanation: 'Mandates that + subject + be + past participle (subjunctive).' },
      { id: 'b_s3_u5_g2', skill: 'Grammar', question: 'Subjunctive in treaty resolutions: "It is essential that human oversight __________ at every level of autonomous decision-making."', options: ['remain', 'remains', 'remained', 'is remaining'], correctAnswer: 'A', explanation: 'Essential that + subject + base verb (remain).' }
    ],
    reading: [
      { id: 'b_s3_u5_r1', skill: 'Reading', question: 'According to the passage, what dual challenge does modern cognitive jurisprudence confront?', options: ['Protecting human mental privacy while determining the moral status of emerging synthetic intelligence', 'Eliminating all computer networks in hospitals', 'Forcing all citizens to wear neural tracking devices', 'Replacing human judges with automated binary software'], correctAnswer: 'A', explanation: 'The text highlights protecting mental privacy and evaluating synthetic sentience.' }
    ],
    listening: [
      { id: 'b_s3_u5_l1', skill: 'Listening', question: 'What would trigger immediate revocation of a corporate license according to Justice Adel?', options: ['Commercial monetization of human brainwave patterns without consent', 'Releasing a software bug that slows down computers', 'Hiring foreign programmers for software development', 'Writing a public blog post about artificial intelligence'], correctAnswer: 'A', explanation: 'Commercial exploitation of private neural telemetry breaches constitutional law.' }
    ],
    exam: [
      { id: 'b_s3_u5_e1', skill: 'Vocabulary', question: 'The principle that an individual’s internal thought processes are completely free from external technological manipulation is __________.', options: ['cognitive autonomy', 'transshipment', 'litotes', 'reclamation'], correctAnswer: 'A', explanation: 'Cognitive autonomy guarantees self-determination free from coercive interference.' },
      { id: 'b_s3_u5_e2', skill: 'Grammar', question: 'The international protocol recommends that all synthetic datasets __________ by neutral observers.', options: ['be verified', 'are verified', 'will verify', 'verified'], correctAnswer: 'A', explanation: 'Subjunctive passive: recommends that + subject + be + past participle.' }
    ]
  },
  bacLitSec3Ch5
);

export const bacSec3Unit6: UnitCurriculum = createBaccalaureateUnit(
  12,
  'Secondary 3 (Baccalaureate Capstone) - الصف الثالث الثانوي',
  1,
  6,
  'Senior Capstone Dissertation Defense & Viva Simulation',
  'مشروع التخرج رفيع المستوى والمناقشة الشفهية العلنية لشهادة إتمام البكالوريا',
  'Oral Defense Viva Voce, Thesis Substantiveness, Academic Integrity & Methodological Triangulation',
  'Advanced Academic Metadiscourse & Argumentative Cohesion',
  'أدوات الخطاب الما ورائي الأكاديمي (Metadiscourse) والتماسك والربط الحجاجي الرفيع',
  'Academic metadiscourse markers (To contextualize our findings, Pro tanto, In contraposition to, By way of synthesis) establish supreme intellectual authority and rhetorical elegance during oral viva voce examinations.',
  [
    { word: 'dissertation', meaningAr: 'أطروحة بحثية أكاديمية متعمقة موثقة بالأدلة', partOfSpeech: 'noun', def: 'A long essay on a particular subject, especially written as a requirement for an advanced academic diploma.', ex: 'Her Baccalaureate capstone dissertation presented an econometric model for green hydrogen export.', exAr: 'قدمت أطروحتها لشهادة البكالوريا نموذجاً اقتصادياً قياسياً لتصدير الهيدروجين الأخضر.', collocation: 'capstone dissertation' },
    { word: 'viva voce', meaningAr: 'المناقشة الشفهية العلنية للأطروحة أمام لجنة المحكمين', partOfSpeech: 'noun [Latin]', def: 'An oral examination, typically for an advanced academic degree, defending a thesis.', ex: 'The senior candidate defended her methodological assumptions during a grueling two-hour viva voce.', exAr: 'دافعت الباحثة عن فرضياتها المنهجية خلال مناقشة شفهية علنية استمرت ساعتين.', collocation: 'oral viva voce' },
    { word: 'triangulation', meaningAr: 'التثليث المنهجي ومقاطعة البيانات لتأكيد صدقها', partOfSpeech: 'noun', def: 'The application of multiple methodologies or data sources in the study of the same phenomenon.', ex: 'Methodological triangulation incorporating satellite data, soil samples, and surveys confirmed the thesis.', exAr: 'أكد التثليث المنهجي للبيانات الفضائية وعينات التربة والاستبيانات صحة الفرضية.', collocation: 'methodological triangulation' },
    { word: 'substantiveness', meaningAr: 'الأصالة والرصانة والعمق الأكاديمي الحقيقي', partOfSpeech: 'noun', def: 'The quality of having solid, meaningful basis in reality, truth, or intellectual weight.', ex: 'The academic jury praised the intellectual substantiveness and empirical rigor of the findings.', exAr: 'أشادت لجنة التحكيم بالعمق والرصانة الأكاديمية والصرامة التجريبية للنتائج.', collocation: 'intellectual substantiveness' },
    { word: 'demarcation', meaningAr: 'تحديد وتوضيح الحدود الفاصلة بدقة تامة', partOfSpeech: 'noun', def: 'The establishing of distinct limits or boundaries separating concepts.', ex: 'The candidate maintained a lucid demarcation between verifiable empirical data and theoretical conjecture.', exAr: 'حافظت الباحثة على تحديد فاصل ودقيق بين الحقائق التجريبية المؤكدة والتخمين النظري.', collocation: 'methodological demarcation' },
    { word: 'cross-examination', meaningAr: 'المساءلة والاستجواب والتدقيق النقدي الصارم', partOfSpeech: 'noun', def: 'The rigorous questioning of a witness or candidate by the opposing party or examining board.', ex: 'Under relentless faculty cross-examination, she justified her statistical sample size with poise.', exAr: 'تحت المساءلة النقدية الصارمة للمحكمين، بررت الباحثة حجم عينتها الإحصائية بثبات وثقة.', collocation: 'faculty cross-examination' },
    { word: 'corroboration', meaningAr: 'التعزيز والتأكيد بأدلة دامغة قاطعة', partOfSpeech: 'noun', def: 'Evidence that confirms or supports a statement, theory, or finding.', ex: 'Independent laboratory replication provided definitive corroboration for the discovery.', exAr: 'قدمت إعادة التجربة في معامل مستقلة تأكيداً قاطعاً لصحة الاكتشاف.', collocation: 'empirical corroboration' },
    { word: 'metadiscourse', meaningAr: 'ما وراء الخطاب وتوجيه القارئ لفهم هيكل النص', partOfSpeech: 'noun', def: 'Language used by an author to guide the receiver in interpreting the surrounding text.', ex: 'Skillful metadiscourse clarifies the author’s stance and structures the logical progression of ideas.', exAr: 'توضح أدوات ما وراء الخطاب موقف الكاتب وترتب التدرج المنطقي للأفكار في ذهن القارئ.', collocation: 'academic metadiscourse' },
    { word: 'refutation', meaningAr: 'الدحض والتفنيد العلمي للحجج المعارضة', partOfSpeech: 'noun', def: 'The action of proving a statement or theory to be wrong or false.', ex: 'Her systematic refutation of rival economic theories demonstrated mastery of the literature.', exAr: 'برهن تفنيدها المنهجي للنظريات الاقتصادية المنافسة على إحاطتها التامة بالأدبيات.', collocation: 'irrefutable refutation' },
    { word: 'synthesis', meaningAr: 'التركيب والجمع التكاملي المبتكر بين النظريات', partOfSpeech: 'noun', def: 'The combination of ideas or data to form an original, integrated theory or conclusion.', ex: 'The dissertation culminated in an innovative synthesis bridging ecology with macroeconomic finance.', exAr: 'توجت الأطروحة بتركيب مبتكر يربط علوم البيئة بتمويل الاقتصاد الكلي.', collocation: 'creative synthesis' }
  ],
  'The Masterclass of Oral Dissertation Defense: Intellectual Fortitude at the Capstone Summit',
  'The Capstone Viva Voce examination represents the definitive rite of passage for the Egyptian Baccalaureate Diploma. Moving beyond passive memorization, candidates stand before an interdisciplinary faculty tribunal to justify their original research hypotheses. Success demands methodological triangulation, rigorous quantification, and rhetorical poise. By deploying advanced metadiscourse markers—signaling concessions, framing scope, and synthesizing counter-arguments—candidates embody the highest ideals of Egyptian scholarly excellence, ready to assume leadership roles in global scientific institutions.',
  'Egyptian Baccalaureate Grand Academic Convocation: New Administrative Capital',
  'Dean Mostafa (Chair of Examining Board) & Omar (Senior Baccalaureate Candidate)',
  'Mostafa: "Candidate Omar, in your capstone dissertation you assert that decentralized desalinators outperform centralized facilities. How do you address the counter-claim regarding capital expenditure?"\nOmar: "To contextualize our findings, while the initial capital outlay is indeed elevated, our twenty-year discounted cash-flow models prove that localized distribution yields net economic solvency by operational cycle four."\nMostafa: "An impeccably structured rebuttal. Your methodological triangulation and poise represent the pinnacle of Egyptian Baccalaureate scholarship."',
  {
    vocab: [
      { id: 'b_s3_u6_v1', skill: 'Vocabulary', question: 'The oral defense of an academic dissertation before an examining board is known as a(n) __________.', options: ['viva voce', 'apotheosis', 'chiasmus', 'chokepoint'], correctAnswer: 'A', explanation: 'Viva voce is the oral defense of a dissertation or research thesis.' },
      { id: 'b_s3_u6_v2', skill: 'Vocabulary', question: 'The research practice of cross-referencing multiple data sources to validate findings is __________.', options: ['methodological triangulation', 'anthropomorphic projection', 'unilateral annexation', 'subsurface drip irrigation'], correctAnswer: 'A', explanation: 'Triangulation cross-checks findings across multiple independent data methods.' }
    ],
    grammar: [
      { id: 'b_s3_u6_g1', skill: 'Grammar', question: 'Which academic metadiscourse phrase gracefully signals an authorial transition to contextual scope?', options: ['To contextualize our findings, it is vital to note...', 'Look at this right now because...', 'As I talk more and more...', 'I will say something else now...'], correctAnswer: 'A', explanation: '"To contextualize our findings..." exemplifies elevated academic metadiscourse.' },
      { id: 'b_s3_u6_g2', skill: 'Grammar', question: 'Choose the Latin legal/academic term meaning "to that extent" or "insofar as": "The evidence corroborates the thesis, __________."', options: ['pro tanto', 'ad hominem', 'sub rosa', 'in camera'], correctAnswer: 'A', explanation: '"Pro tanto" means "to that extent / so far" in formal scholarly register.' }
    ],
    reading: [
      { id: 'b_s3_u6_r1', skill: 'Reading', question: 'What distinguishes the Capstone Viva Voce from standard multiple-choice examinations?', options: ['Candidates orally defend an original empirical hypothesis against faculty cross-examination', 'Candidates write spelling lists on a blackboard', 'Candidates are given the answers before the exam starts', 'Candidates are forbidden from speaking any words aloud'], correctAnswer: 'A', explanation: 'The viva voce requires defending original empirical methodology under cross-examination.' }
    ],
    listening: [
      { id: 'b_s3_u6_l1', skill: 'Listening', question: 'How did Omar defend his decentralized water desalinator proposal against the capital cost critique?', options: ['By citing twenty-year discounted cash-flow models showing solvency by cycle four', 'By claiming that money does not matter in science', 'By asking the university to purchase the equipment for him', 'By withdrawing his thesis from the committee'], correctAnswer: 'A', explanation: 'Omar provided empirical cash-flow projections demonstrating economic solvency.' }
    ],
    exam: [
      { id: 'b_s3_u6_e1', skill: 'Vocabulary', question: 'The quality of research possessing genuine intellectual weight, depth, and practical reality is its __________.', options: ['substantiveness', 'salinity', 'litotes', 'chiasmus'], correctAnswer: 'A', explanation: 'Substantiveness denotes solid reality, meaningful basis, and intellectual weight.' },
      { id: 'b_s3_u6_e2', skill: 'Grammar', question: '__________ by independent laboratory trials, the candidate’s nanotech thesis was accepted with honors.', options: ['Having been corroborated', 'Corroborating having been', 'Having corroborate', 'To corroborate'], correctAnswer: 'A', explanation: 'Perfect passive participle: Having been corroborated by...' }
    ]
  },
  bacLitSec3Ch6
);
