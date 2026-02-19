// Surah Al-Mulk (67) - 30 verses for 30-day challenge
// Each day = one verse
// German translation by Abu Rida Muhammad ibn Ahmad ibn Rassoul

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
    german: "Segensreich ist Derjenige, in Dessen Hand die Herrschaft ist, und Er hat Macht über alle Dinge.",
    transliteration: "Tabārakal-ladhī biyadihil-mulku wa huwa ʿalā kulli shayʾin qadīr"
  },
  {
    dayIndex: 2,
    surahNumber: 67,
    ayahNumber: 2,
    arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ",
    german: "Der den Tod und das Leben erschaffen hat, um euch zu prüfen, wer von euch die besten Taten vollbringt. Und Er ist der Erhabene, der Allvergebende.",
    transliteration: "Alladhī khalaqal-mawta wal-ḥayāta liyabluwakum ayyukum aḥsanu ʿamalā, wa huwal-ʿazīzul-ghafūr"
  },
  {
    dayIndex: 3,
    surahNumber: 67,
    ayahNumber: 3,
    arabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ",
    german: "Der sieben Himmel in Schichten erschaffen hat. Du siehst in der Schöpfung des Allerbarmers keine Unstimmigkeit. So wende den Blick zurück: Siehst du irgendeinen Mangel?",
    transliteration: "Alladhī khalaqa sabʿa samāwātin ṭibāqā, mā tarā fī khalqir-raḥmāni min tafāwut, farjiʿil-baṣara hal tarā min fuṭūr"
  },
  {
    dayIndex: 4,
    surahNumber: 67,
    ayahNumber: 4,
    arabic: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ",
    german: "Dann wende den Blick zweimal zurück; der Blick wird zu dir zurückkehren, ermüdet und erschöpft.",
    transliteration: "Thummarjiʿil-baṣara karratayni yanqalib ilayka al-baṣaru khāsiʾan wa huwa ḥasīr"
  },
  {
    dayIndex: 5,
    surahNumber: 67,
    ayahNumber: 5,
    arabic: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ",
    german: "Und wahrlich, Wir haben den untersten Himmel mit Leuchten geschmückt und haben sie zu Wurfgeschossen gegen die Satane gemacht. Und für sie haben Wir die Strafe der Flamme bereitet.",
    transliteration: "Wa laqad zayyannās-samāʾad-dunyā bimaṣābīḥa wa jaʿalnāhā rujūman lish-shayāṭīn, wa aʿtadnā lahum ʿadhābas-saʿīr"
  },
  {
    dayIndex: 6,
    surahNumber: 67,
    ayahNumber: 6,
    arabic: "وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ الْمَصِيرُ",
    german: "Und für diejenigen, die ihren Herrn verleugnen, ist die Strafe der Hölle bestimmt. Und welch schlimmer Ausgang!",
    transliteration: "Wa lilladhīna kafarū birabbihim ʿadhābu jahannama wa biʾsal-maṣīr"
  },
  {
    dayIndex: 7,
    surahNumber: 67,
    ayahNumber: 7,
    arabic: "إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ",
    german: "Wenn sie hineingeworfen werden, hören sie von ihr ein Aufheulen, während sie brodelt.",
    transliteration: "Idhā ulqū fīhā samiʿū lahā shahīqan wa hiya tafūr"
  },
  {
    dayIndex: 8,
    surahNumber: 67,
    ayahNumber: 8,
    arabic: "تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ ۖ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ",
    german: "Es fehlt wenig, dass sie vor Wut birst. Sooft eine Schar hineingeworfen wird, fragen sie ihre Wärter: \"Ist kein Warner zu euch gekommen?\"",
    transliteration: "Takādu tamayyazu minal-ghayẓ, kullamā ulqiya fīhā fawjun saʾalahum khazanatuhā alam yaʾtikum nadhīr"
  },
  {
    dayIndex: 9,
    surahNumber: 67,
    ayahNumber: 9,
    arabic: "قَالُوا بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ اللَّهُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ كَبِيرٍ",
    german: "Sie werden sagen: \"Ja doch, es kam ein Warner zu uns, aber wir haben ihn der Lüge bezichtigt und gesagt: 'Allah hat nichts herabgesandt. Ihr befindet euch nur in einem großen Irrtum.'\"",
    transliteration: "Qālū balā qad jāʾanā nadhīrun fakadhdhabnā wa qulnā mā nazzala Allāhu min shayʾin in antum illā fī ḍalālin kabīr"
  },
  {
    dayIndex: 10,
    surahNumber: 67,
    ayahNumber: 10,
    arabic: "وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ",
    german: "Und sie werden sagen: \"Hätten wir nur zugehört oder unseren Verstand gebraucht, wären wir nicht unter den Bewohnern der Flamme.\"",
    transliteration: "Wa qālū law kunnā nasmaʿu aw naʿqilu mā kunnā fī aṣḥābis-saʿīr"
  },
  {
    dayIndex: 11,
    surahNumber: 67,
    ayahNumber: 11,
    arabic: "فَاعْتَرَفُوا بِذَنبِهِمْ فَسُحْقًا لِّأَصْحَابِ السَّعِيرِ",
    german: "So bekennen sie ihre Sünden. Darum: Hinweg mit den Bewohnern der Flamme!",
    transliteration: "Faʿtarafū bidhanbihim fasuḥqan li-aṣḥābis-saʿīr"
  },
  {
    dayIndex: 12,
    surahNumber: 67,
    ayahNumber: 12,
    arabic: "إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ",
    german: "Wahrlich, diejenigen, die ihren Herrn im Verborgenen fürchten, für sie ist Vergebung und großer Lohn bestimmt.",
    transliteration: "Innal-ladhīna yakhshawna rabbahum bil-ghaybi lahum maghfiratun wa ajrun kabīr"
  },
  {
    dayIndex: 13,
    surahNumber: 67,
    ayahNumber: 13,
    arabic: "وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ ۖ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ",
    german: "Und ob ihr eure Worte verbergt oder sie kundtut: Er weiß über das Innerste der Herzen Bescheid.",
    transliteration: "Wa asirrū qawlakum awijharū bih, innahu ʿalīmun bidhātis-ṣudūr"
  },
  {
    dayIndex: 14,
    surahNumber: 67,
    ayahNumber: 14,
    arabic: "أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ",
    german: "Sollte Der, Der erschaffen hat, es nicht wissen? Und Er ist der Feinfühlige, der Allkundige.",
    transliteration: "Alā yaʿlamu man khalaqa wa huwal-laṭīful-khabīr"
  },
  {
    dayIndex: 15,
    surahNumber: 67,
    ayahNumber: 15,
    arabic: "هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ ۖ وَإِلَيْهِ النُّشُورُ",
    german: "Er ist es, Der euch die Erde gefügig gemacht hat; so wandert auf ihren Wegen und esst von Seiner Versorgung. Und zu Ihm führt die Auferstehung.",
    transliteration: "Huwal-ladhī jaʿala lakumul-arḍa dhalūlan famshū fī manākibihā wa kulū min rizqih, wa ilayhin-nushūr"
  },
  {
    dayIndex: 16,
    surahNumber: 67,
    ayahNumber: 16,
    arabic: "أَأَمِنتُم مَّن فِي السَّمَاءِ أَن يَخْسِفَ بِكُمُ الْأَرْضَ فَإِذَا هِيَ تَمُورُ",
    german: "Seid ihr sicher, dass Der, Der im Himmel ist, die Erde nicht mit euch versinken lässt, wenn sie plötzlich schwankt?",
    transliteration: "A-amintum man fis-samāʾi an yakhsifa bikumul-arḍa fa-idhā hiya tamūr"
  },
  {
    dayIndex: 17,
    surahNumber: 67,
    ayahNumber: 17,
    arabic: "أَمْ أَمِنتُم مَّن فِي السَّمَاءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ",
    german: "Oder seid ihr sicher, dass Der, Der im Himmel ist, keinen Sandsturm über euch schickt? Dann werdet ihr wissen, wie Meine Warnung ist!",
    transliteration: "Am amintum man fis-samāʾi an yursila ʿalaykum ḥāṣiban fasataʿlamūna kayfa nadhīr"
  },
  {
    dayIndex: 18,
    surahNumber: 67,
    ayahNumber: 18,
    arabic: "وَلَقَدْ كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ",
    german: "Und diejenigen vor ihnen haben auch geleugnet. Und wie war dann Meine Vergeltung!",
    transliteration: "Wa laqad kadhdhaba alladhīna min qablihim fakayfa kāna nakīr"
  },
  {
    dayIndex: 19,
    surahNumber: 67,
    ayahNumber: 19,
    arabic: "أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ ۚ إِنَّهُ بِكُلِّ شَيْءٍ بَصِيرٌ",
    german: "Haben sie nicht die Vögel über sich gesehen, wie sie ihre Flügel ausbreiten und sie einziehen? Nur der Allerbarmer hält sie. Wahrlich, Er sieht alle Dinge.",
    transliteration: "Awalam yaraw ilat-ṭayri fawqahum ṣāffātin wa yaqbiḍna mā yumsikuhunna illar-raḥmān, innahu bikulli shayʾin baṣīr"
  },
  {
    dayIndex: 20,
    surahNumber: 67,
    ayahNumber: 20,
    arabic: "أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ الرَّحْمَٰنِ ۚ إِنِ الْكَافِرُونَ إِلَّا فِي غُرُورٍ",
    german: "Oder wer ist es, der als Heer euch helfen soll außer dem Allerbarmer? Die Ungläubigen sind nur in Selbsttäuschung befangen.",
    transliteration: "Amman hādhal-ladhī huwa jundun lakum yanṣurukum min dūnir-raḥmān, inil-kāfirūna illā fī ghurūr"
  },
  {
    dayIndex: 21,
    surahNumber: 67,
    ayahNumber: 21,
    arabic: "أَمَّنْ هَٰذَا الَّذِي يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُ ۚ بَل لَّجُّوا فِي عُتُوٍّ وَنُفُورٍ",
    german: "Oder wer ist es, der euch versorgen wird, wenn Er Seine Versorgung zurückhält? Aber nein, sie verharren in Trotz und Abneigung.",
    transliteration: "Amman hādhal-ladhī yarzuqukum in amsaka rizqah, bal lajjū fī ʿutuwwin wa nufūr"
  },
  {
    dayIndex: 22,
    surahNumber: 67,
    ayahNumber: 22,
    arabic: "أَفَمَن يَمْشِي مُكِبًّا عَلَىٰ وَجْهِهِ أَهْدَىٰ أَمَّن يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
    german: "Ist nun der, der mit gesenktem Gesicht dahingeht, besser geleitet oder der, der aufrecht auf einem geraden Weg wandelt?",
    transliteration: "Afaman yamshī mukibban ʿalā wajhihī ahdā amman yamshī sawiyyan ʿalā ṣirāṭin mustaqīm"
  },
  {
    dayIndex: 23,
    surahNumber: 67,
    ayahNumber: 23,
    arabic: "قُلْ هُوَ الَّذِي أَنشَأَكُمْ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ ۖ قَلِيلًا مَّا تَشْكُرُونَ",
    german: "Sprich: \"Er ist es, Der euch erschaffen und euch Gehör, Augenlicht und Herzen gegeben hat. Wie wenig dankt ihr!\"",
    transliteration: "Qul huwal-ladhī anshaʾakum wa jaʿala lakumus-samʿa wal-abṣāra wal-afʾidah, qalīlan mā tashkurūn"
  },
  {
    dayIndex: 24,
    surahNumber: 67,
    ayahNumber: 24,
    arabic: "قُلْ هُوَ الَّذِي ذَرَأَكُمْ فِي الْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ",
    german: "Sprich: \"Er ist es, Der euch auf der Erde vermehrt hat, und zu Ihm werdet ihr versammelt werden.\"",
    transliteration: "Qul huwal-ladhī dharaʾakum fil-arḍi wa ilayhi tuḥsharūn"
  },
  {
    dayIndex: 25,
    surahNumber: 67,
    ayahNumber: 25,
    arabic: "وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ",
    german: "Und sie sagen: \"Wann wird diese Verheißung erfüllt, wenn ihr wahrhaftig seid?\"",
    transliteration: "Wa yaqūlūna matā hādhal-waʿdu in kuntum ṣādiqīn"
  },
  {
    dayIndex: 26,
    surahNumber: 67,
    ayahNumber: 26,
    arabic: "قُلْ إِنَّمَا الْعِلْمُ عِندَ اللَّهِ وَإِنَّمَا أَنَا نَذِيرٌ مُّبِينٌ",
    german: "Sprich: \"Das Wissen ist allein bei Allah, und ich bin nur ein deutlicher Warner.\"",
    transliteration: "Qul innamal-ʿilmu ʿinda Allāhi wa innamā anā nadhīrun mubīn"
  },
  {
    dayIndex: 27,
    surahNumber: 67,
    ayahNumber: 27,
    arabic: "فَلَمَّا رَأَوْهُ زُلْفَةً سِيئَتْ وُجُوهُ الَّذِينَ كَفَرُوا وَقِيلَ هَٰذَا الَّذِي كُنتُم بِهِ تَدَّعُونَ",
    german: "Doch wenn sie es nahe sehen, werden die Gesichter derer, die ungläubig waren, betrübt sein. Und es wird gesagt werden: \"Dies ist es, was ihr herbeizurufen pflegtet.\"",
    transliteration: "Falammā raʾawhu zulfatan sīʾat wujūhul-ladhīna kafarū wa qīla hādhal-ladhī kuntum bihī taddaʿūn"
  },
  {
    dayIndex: 28,
    surahNumber: 67,
    ayahNumber: 28,
    arabic: "قُلْ أَرَأَيْتُمْ إِنْ أَهْلَكَنِيَ اللَّهُ وَمَن مَّعِيَ أَوْ رَحِمَنَا فَمَن يُجِيرُ الْكَافِرِينَ مِنْ عَذَابٍ أَلِيمٍ",
    german: "Sprich: \"Sagt mir, ob Allah mich und diejenigen, die mit mir sind, vernichtet oder Sich unser erbarmt – wer wird die Ungläubigen vor einer schmerzhaften Strafe schützen?\"",
    transliteration: "Qul araʾaytum in ahlakaniya Allāhu wa man maʿiya aw raḥimanā faman yujīrul-kāfirīna min ʿadhābin alīm"
  },
  {
    dayIndex: 29,
    surahNumber: 67,
    ayahNumber: 29,
    arabic: "قُلْ هُوَ الرَّحْمَٰنُ آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ",
    german: "Sprich: \"Er ist der Allerbarmer. An Ihn glauben wir, und auf Ihn vertrauen wir. Ihr werdet bald erfahren, wer sich in einem offenkundigen Irrtum befindet.\"",
    transliteration: "Qul huwar-raḥmānu āmannā bihī wa ʿalayhi tawakkalnā fasataʿlamūna man huwa fī ḍalālin mubīn"
  },
  {
    dayIndex: 30,
    surahNumber: 67,
    ayahNumber: 30,
    arabic: "قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ",
    german: "Sprich: \"Sagt mir, wenn euer Wasser versickert, wer bringt euch dann fließendes Wasser?\"",
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
