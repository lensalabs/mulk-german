// Surah Al-Mulk (67) - 30 verses for 30-day challenge
// Each day = one verse
// German translation: Bubenheim/Elyas

export interface Verse {
  dayIndex: number;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  german: string;
  transliteration: string;
}

export const MULK_VERSES: Verse[] = [
  {
    dayIndex: 1,
    surahNumber: 67,
    ayahNumber: 1,
    arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    german: "Segensreich ist Derjenige, in Dessen Hand die Herrschaft ist, und Er hat zu allem die Macht.",
    transliteration: "Tabārakal-ladhī biyadihil-mulku wa huwa ʿalā kulli shayʾin qadīr"
  },
  {
    dayIndex: 2,
    surahNumber: 67,
    ayahNumber: 2,
    arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ",
    german: "(Er,) Der den Tod und das Leben erschaffen hat, um euch zu prüfen, wer von euch die besten Taten begeht. Und Er ist der Allmächtige und Allvergebende.",
    transliteration: "Alladhī khalaqal-mawta wal-ḥayāta liyabluwakum ayyukum aḥsanu ʿamalā, wa huwal-ʿazīzul-ghafūr"
  },
  {
    dayIndex: 3,
    surahNumber: 67,
    ayahNumber: 3,
    arabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ",
    german: "(Er,) Der sieben Himmel in Schichten erschaffen hat. Du kannst in der Schöpfung des Allerbarmers keine Unstimmigkeit sehen. Wende den Blick zurück: Siehst du irgendeinen Riss?",
    transliteration: "Alladhī khalaqa sabʿa samāwātin ṭibāqā, mā tarā fī khalqir-raḥmāni min tafāwut, farjiʿil-baṣara hal tarā min fuṭūr"
  },
  {
    dayIndex: 4,
    surahNumber: 67,
    ayahNumber: 4,
    arabic: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ",
    german: "Hierauf wende den Blick wiederholt zurück. Der Blick wird zu dir erfolglos und ermüdet zurückkehren.",
    transliteration: "Thummarjiʿil-baṣara karratayni yanqalib ilayka al-baṣaru khāsiʾan wa huwa ḥasīr"
  },
  {
    dayIndex: 5,
    surahNumber: 67,
    ayahNumber: 5,
    arabic: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ",
    german: "Wir haben ja den untersten Himmel mit Lampen geschmückt und haben sie zu Wurfgeschossen gegen die Satane gemacht. Und bereitet haben Wir für sie die Strafe der Feuerglut.",
    transliteration: "Wa laqad zayyannās-samāʾad-dunyā bimaṣābīḥa wa jaʿalnāhā rujūman lish-shayāṭīn, wa aʿtadnā lahum ʿadhābas-saʿīr"
  },
  {
    dayIndex: 6,
    surahNumber: 67,
    ayahNumber: 6,
    arabic: "وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ الْمَصِيرُ",
    german: "Und für diejenigen, die ihren Herrn verleugnen, wird es die Strafe der Hölle geben – Loss, welch schlimmer Ausgang!",
    transliteration: "Wa lilladhīna kafarū birabbihim ʿadhābu jahannama wa biʾsal-maṣīr"
  },
  {
    dayIndex: 7,
    surahNumber: 67,
    ayahNumber: 7,
    arabic: "إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ",
    german: "Wenn sie hineingeworfen werden, hören sie von ihr stoßweises Aufheulen, während sie brodelt.",
    transliteration: "Idhā ulqū fīhā samiʿū lahā shahīqan wa hiya tafūr"
  },
  {
    dayIndex: 8,
    surahNumber: 67,
    ayahNumber: 8,
    arabic: "تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ ۖ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ",
    german: "Beinahe würde sie vor Grimm bersten. Jedesmal, wenn eine Schar hineingeworfen wird, fragen sie ihre Wärter: \"Ist zu euch denn kein Warner gekommen?\"",
    transliteration: "Takādu tamayyazu minal-ghayẓ, kullamā ulqiya fīhā fawjun saʾalahum khazanatuhā alam yaʾtikum nadhīr"
  },
  {
    dayIndex: 9,
    surahNumber: 67,
    ayahNumber: 9,
    arabic: "قَالُوا بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ اللَّهُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ كَبِيرٍ",
    german: "Sie sagen: \"Ja doch, zu uns ist bereits ein Warner gekommen; aber wir haben (ihn) der Lüge bezichtigt und gesagt: 'Allah hat nichts offenbart; ihr befindet euch nur in großem Irrtum.'\"",
    transliteration: "Qālū balā qad jāʾanā nadhīrun fakadhdhabnā wa qulnā mā nazzala Allāhu min shayʾin in antum illā fī ḍalālin kabīr"
  },
  {
    dayIndex: 10,
    surahNumber: 67,
    ayahNumber: 10,
    arabic: "وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ",
    german: "Und sie sagen: \"Wenn wir nur gehört oder begriffen hätten, wären wir nicht unter den Insassen der Feuerglut.\"",
    transliteration: "Wa qālū law kunnā nasmaʿu aw naʿqilu mā kunnā fī aṣḥābis-saʿīr"
  },
  {
    dayIndex: 11,
    surahNumber: 67,
    ayahNumber: 11,
    arabic: "فَاعْتَرَفُوا بِذَنبِهِمْ فَسُحْقًا لِّأَصْحَابِ السَّعِيرِ",
    german: "So bekennen sie ihre Sünde. Weit weg darum mit den Insassen der Feuerglut!",
    transliteration: "Faʿtarafū bidhanbihim fasuḥqan li-aṣḥābis-saʿīr"
  },
  {
    dayIndex: 12,
    surahNumber: 67,
    ayahNumber: 12,
    arabic: "إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ",
    german: "Gewiss, diejenigen, die ihren Herrn im Verborgenen fürchten, für sie wird es Vergebung und großen Lohn geben.",
    transliteration: "Innal-ladhīna yakhshawna rabbahum bil-ghaybi lahum maghfiratun wa ajrun kabīr"
  },
  {
    dayIndex: 13,
    surahNumber: 67,
    ayahNumber: 13,
    arabic: "وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ ۖ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ",
    german: "Und haltet eure Worte geheim oder verkündet sie, Er weiß über das Innerste der Brüste Bescheid.",
    transliteration: "Wa asirrū qawlakum awijharū bih, innahu ʿalīmun bidhātis-ṣudūr"
  },
  {
    dayIndex: 14,
    surahNumber: 67,
    ayahNumber: 14,
    arabic: "أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ",
    german: "Sollte denn Derjenige, Der erschaffen hat, nicht Bescheid wissen? Er ist der Feinfühlige und Allkundige.",
    transliteration: "Alā yaʿlamu man khalaqa wa huwal-laṭīful-khabīr"
  },
  {
    dayIndex: 15,
    surahNumber: 67,
    ayahNumber: 15,
    arabic: "هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ ۖ وَإِلَيْهِ النُّشُورُ",
    german: "Er ist es, Der euch die Erde fügsam gemacht hat. So geht auf ihren Schultern umher und esst von dem, womit Er euch versorgt. Und zu Ihm wird die Auferstehung sein.",
    transliteration: "Huwal-ladhī jaʿala lakumul-arḍa dhalūlan famshū fī manākibihā wa kulū min rizqih, wa ilayhin-nushūr"
  },
  {
    dayIndex: 16,
    surahNumber: 67,
    ayahNumber: 16,
    arabic: "أَأَمِنتُم مَّن فِي السَّمَاءِ أَن يَخْسِفَ بِكُمُ الْأَرْضَ فَإِذَا هِيَ تَمُورُ",
    german: "Seid ihr denn sicher, dass Der, Der im Himmel ist, nicht die Erde mit euch versinken lässt, während sie hin und her schwankt?",
    transliteration: "A-amintum man fis-samāʾi an yakhsifa bikumul-arḍa fa-idhā hiya tamūr"
  },
  {
    dayIndex: 17,
    surahNumber: 67,
    ayahNumber: 17,
    arabic: "أَمْ أَمِنتُم مَّن فِي السَّمَاءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ",
    german: "Oder seid ihr sicher, dass Der, Der im Himmel ist, nicht einen Steinregen gegen euch sendet? Dann werdet ihr wissen, wie Meine Warnung ist.",
    transliteration: "Am amintum man fis-samāʾi an yursila ʿalaykum ḥāṣiban fasataʿlamūna kayfa nadhīr"
  },
  {
    dayIndex: 18,
    surahNumber: 67,
    ayahNumber: 18,
    arabic: "وَلَقَدْ كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ",
    german: "Bereits diejenigen vor ihnen haben (ihre Gesandten) der Lüge bezichtigt. Wie war da Meine Missbilligung!",
    transliteration: "Wa laqad kadhdhaba alladhīna min qablihim fakayfa kāna nakīr"
  },
  {
    dayIndex: 19,
    surahNumber: 67,
    ayahNumber: 19,
    arabic: "أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ ۚ إِنَّهُ بِكُلِّ شَيْءٍ بَصِيرٌ",
    german: "Haben sie nicht zu den Vögeln über ihnen gesehen, wie sie (ihre Flügel) ausbreiten und einziehen? Nur der Allerbarmer hält sie. Gewiss, Er sieht alles.",
    transliteration: "Awalam yaraw ilat-ṭayri fawqahum ṣāffātin wa yaqbiḍna mā yumsikuhunna illar-raḥmān, innahu bikulli shayʾin baṣīr"
  },
  {
    dayIndex: 20,
    surahNumber: 67,
    ayahNumber: 20,
    arabic: "أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ الرَّحْمَٰنِ ۚ إِنِ الْكَافِرُونَ إِلَّا فِي غُرُورٍ",
    german: "Wer ist es denn, der für euch eine Heerschar wäre, die euch helfen könnte, außer dem Allerbarmer? Die Ungläubigen befinden sich nur in Täuschung.",
    transliteration: "Amman hādhal-ladhī huwa jundun lakum yanṣurukum min dūnir-raḥmān, inil-kāfirūna illā fī ghurūr"
  },
  {
    dayIndex: 21,
    surahNumber: 67,
    ayahNumber: 21,
    arabic: "أَمَّنْ هَٰذَا الَّذِي يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُ ۚ بَل لَّجُّوا فِي عُتُوٍّ وَنُفُورٍ",
    german: "Wer ist es denn, der euch versorgen könnte, wenn Er Seine Versorgung zurückhält? Aber nein! Sie verharren in Widersetzlichkeit und Abneigung.",
    transliteration: "Amman hādhal-ladhī yarzuqukum in amsaka rizqah, bal lajjū fī ʿutuwwin wa nufūr"
  },
  {
    dayIndex: 22,
    surahNumber: 67,
    ayahNumber: 22,
    arabic: "أَفَمَن يَمْشِي مُكِبًّا عَلَىٰ وَجْهِهِ أَهْدَىٰ أَمَّن يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
    german: "Ist denn einer, der mit dem Gesicht zu Boden geneigt geht, besser rechtgeleitet, oder einer, der aufrecht auf einem geraden Weg geht?",
    transliteration: "Afaman yamshī mukibban ʿalā wajhihī ahdā amman yamshī sawiyyan ʿalā ṣirāṭin mustaqīm"
  },
  {
    dayIndex: 23,
    surahNumber: 67,
    ayahNumber: 23,
    arabic: "قُلْ هُوَ الَّذِي أَنشَأَكُمْ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ ۖ قَلِيلًا مَّا تَشْكُرُونَ",
    german: "Sag: Er ist es, Der euch hat entstehen lassen und euch Gehör, Augenlicht und Herzen gemacht hat. Wie wenig ihr dankbar seid!",
    transliteration: "Qul huwal-ladhī anshaʾakum wa jaʿala lakumus-samʿa wal-abṣāra wal-afʾidah, qalīlan mā tashkurūn"
  },
  {
    dayIndex: 24,
    surahNumber: 67,
    ayahNumber: 24,
    arabic: "قُلْ هُوَ الَّذِي ذَرَأَكُمْ فِي الْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ",
    german: "Sag: Er ist es, Der euch auf der Erde vermehrt hat, und zu Ihm werdet ihr versammelt werden.",
    transliteration: "Qul huwal-ladhī dharaʾakum fil-arḍi wa ilayhi tuḥsharūn"
  },
  {
    dayIndex: 25,
    surahNumber: 67,
    ayahNumber: 25,
    arabic: "وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ",
    german: "Und sie sagen: \"Wann wird dieses Versprechen (eingelöst werden), wenn ihr wahrhaftig seid?\"",
    transliteration: "Wa yaqūlūna matā hādhal-waʿdu in kuntum ṣādiqīn"
  },
  {
    dayIndex: 26,
    surahNumber: 67,
    ayahNumber: 26,
    arabic: "قُلْ إِنَّمَا الْعِلْمُ عِندَ اللَّهِ وَإِنَّمَا أَنَا نَذِيرٌ مُّبِينٌ",
    german: "Sag: Das Wissen ist nur bei Allah, und ich bin nur ein deutlicher Warner.",
    transliteration: "Qul innamal-ʿilmu ʿinda Allāhi wa innamā anā nadhīrun mubīn"
  },
  {
    dayIndex: 27,
    surahNumber: 67,
    ayahNumber: 27,
    arabic: "فَلَمَّا رَأَوْهُ زُلْفَةً سِيئَتْ وُجُوهُ الَّذِينَ كَفَرُوا وَقِيلَ هَٰذَا الَّذِي كُنتُم بِهِ تَدَّعُونَ",
    german: "Wenn sie es dann nahe sehen, werden die Gesichter derjenigen, die ungläubig sind, entstellt, und es wird gesagt werden: \"Das ist es, was ihr stets herbeigerufen habt.\"",
    transliteration: "Falammā raʾawhu zulfatan sīʾat wujūhul-ladhīna kafarū wa qīla hādhal-ladhī kuntum bihī taddaʿūn"
  },
  {
    dayIndex: 28,
    surahNumber: 67,
    ayahNumber: 28,
    arabic: "قُلْ أَرَأَيْتُمْ إِنْ أَهْلَكَنِيَ اللَّهُ وَمَن مَّعِيَ أَوْ رَحِمَنَا فَمَن يُجِيرُ الْكَافِرِينَ مِنْ عَذَابٍ أَلِيمٍ",
    german: "Sag: Was meint ihr, ob Allah mich und diejenigen, die mit mir sind, verderben lässt oder ob Er Sich unser erbarmt, wer könnte die Ungläubigen vor schmerzhafter Strafe schützen?",
    transliteration: "Qul araʾaytum in ahlakaniya Allāhu wa man maʿiya aw raḥimanā faman yujīrul-kāfirīna min ʿadhābin alīm"
  },
  {
    dayIndex: 29,
    surahNumber: 67,
    ayahNumber: 29,
    arabic: "قُلْ هُوَ الرَّحْمَٰنُ آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ",
    german: "Sag: Er ist der Allerbarmer. An Ihn glauben wir, und auf Ihn verlassen wir uns. Ihr werdet noch erfahren, wer es ist, der sich in deutlichem Irrtum befindet.",
    transliteration: "Qul huwar-raḥmānu āmannā bihī wa ʿalayhi tawakkalnā fasataʿlamūna man huwa fī ḍalālin mubīn"
  },
  {
    dayIndex: 30,
    surahNumber: 67,
    ayahNumber: 30,
    arabic: "قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ",
    german: "Sag: Was meint ihr, wenn euer Wasser versickert wäre, wer könnte euch da fließendes Wasser bringen?",
    transliteration: "Qul araʾaytum in aṣbaḥa māʾukum ghawran faman yaʾtīkum bimāʾin maʿīn"
  }
];

// Surah info
export const SURAH_INFO = {
  number: 67,
  name: 'Al-Mulk',
  arabicName: 'الملك',
  meaning: 'Die Herrschaft',
  verses: 30,
  revelation: 'Mekka'
};

// Helper function to get verse by day
export function getVerseByDay(dayIndex: number): Verse | undefined {
  return MULK_VERSES.find(v => v.dayIndex === dayIndex);
}

// Legacy export for compatibility
export const mulkVerses = MULK_VERSES;
