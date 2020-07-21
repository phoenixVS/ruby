exports('play_table', (params, done) => {
  // Convert odds
  /* const modifyBets = (od) => {
    const ODDS_TYPE = window.conf.CUSTOMER_CONFIG.ODDS_TYPE;
    // fraction
    if (ODDS_TYPE == '1') {
      return od;
    }
    // decimal
    if (ODDS_TYPE == '2') {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2);
    }
    // American
    if (ODDS_TYPE == '3') {
      const nums = od.split('/');
      let bet = (nums[0] / nums[1] + 1).toFixed(2);
      if (Number(bet) >= 2) {
        return `+${((Number(bet) - 1) * 100).toFixed(0)}`;
      } else {
        return `-${((100) / (Number(bet) - 1)).toFixed(0)}`;
      }
    }
  }; */
  const countries = [
    { "id": 4, "name": "أفغانستان", "alpha2": "af", "alpha3": "afg" },
    { "id": 8, "name": "ألبانيا", "alpha2": "al", "alpha3": "alb" },
    { "id": 12, "name": "الجزائر", "alpha2": "dz", "alpha3": "dza" },
    { "id": 20, "name": "أندورا", "alpha2": "ad", "alpha3": "and" },
    { "id": 24, "name": "أنغولا", "alpha2": "ao", "alpha3": "ago" },
    { "id": 28, "name": "أنتيغوا وباربودا", "alpha2": "ag", "alpha3": "atg" },
    { "id": 32, "name": "الأرجنتين", "alpha2": "ar", "alpha3": "arg" },
    { "id": 51, "name": "أرمينيا", "alpha2": "am", "alpha3": "arm" },
    { "id": 36, "name": "أستراليا", "alpha2": "au", "alpha3": "aus" },
    { "id": 40, "name": "النمسا", "alpha2": "at", "alpha3": "aut" },
    { "id": 31, "name": "أذربيجان", "alpha2": "az", "alpha3": "aze" },
    { "id": 44, "name": "باهاماس", "alpha2": "bs", "alpha3": "bhs" },
    { "id": 48, "name": "البحرين", "alpha2": "bh", "alpha3": "bhr" },
    { "id": 50, "name": "بنغلاديش", "alpha2": "bd", "alpha3": "bgd" },
    { "id": 52, "name": "باربادوس", "alpha2": "bb", "alpha3": "brb" },
    { "id": 112, "name": "روسيا البيضاء", "alpha2": "by", "alpha3": "blr" },
    { "id": 56, "name": "بلجيكا", "alpha2": "be", "alpha3": "bel" },
    { "id": 84, "name": "بليز", "alpha2": "bz", "alpha3": "blz" },
    { "id": 204, "name": "بنين", "alpha2": "bj", "alpha3": "ben" },
    { "id": 64, "name": "بوتان", "alpha2": "bt", "alpha3": "btn" },
    { "id": 68, "name": "بوليفيا", "alpha2": "bo", "alpha3": "bol" },
    { "id": 70, "name": "البوسنة والهرسك", "alpha2": "ba", "alpha3": "bih" },
    { "id": 72, "name": "بوتسوانا", "alpha2": "bw", "alpha3": "bwa" },
    { "id": 76, "name": "البرازيل", "alpha2": "br", "alpha3": "bra" },
    { "id": 96, "name": "بروناي", "alpha2": "bn", "alpha3": "brn" },
    { "id": 100, "name": "بلغاريا", "alpha2": "bg", "alpha3": "bgr" },
    { "id": 854, "name": "بوركينا فاسو", "alpha2": "bf", "alpha3": "bfa" },
    { "id": 108, "name": "بوروندي", "alpha2": "bi", "alpha3": "bdi" },
    { "id": 116, "name": "كمبوديا", "alpha2": "kh", "alpha3": "khm" },
    { "id": 120, "name": "الكاميرون", "alpha2": "cm", "alpha3": "cmr" },
    { "id": 124, "name": "كندا", "alpha2": "ca", "alpha3": "can" },
    { "id": 132, "name": "الرأس الأخضر", "alpha2": "cv", "alpha3": "cpv" },
    {
      "id": 140,
      "name": "جمهورية أفريقيا الوسطى",
      "alpha2": "cf",
      "alpha3": "caf"
    },
    { "id": 148, "name": "تشاد", "alpha2": "td", "alpha3": "tcd" },
    { "id": 152, "name": "تشيلي", "alpha2": "cl", "alpha3": "chl" },
    { "id": 156, "name": "الصين", "alpha2": "cn", "alpha3": "chn" },
    { "id": 170, "name": "كولومبيا", "alpha2": "co", "alpha3": "col" },
    { "id": 174, "name": "جزر القمر", "alpha2": "km", "alpha3": "com" },
    { "id": 178, "name": "جمهورية الكونغو", "alpha2": "cg", "alpha3": "cog" },
    {
      "id": 180,
      "name": "جمهورية الكونغو الديمقراطية",
      "alpha2": "cd",
      "alpha3": "cod"
    },
    { "id": 188, "name": "كوستاريكا", "alpha2": "cr", "alpha3": "cri" },
    { "id": 384, "name": "ساحل العاج", "alpha2": "ci", "alpha3": "civ" },
    { "id": 191, "name": "كرواتيا", "alpha2": "hr", "alpha3": "hrv" },
    { "id": 192, "name": "كوبا", "alpha2": "cu", "alpha3": "cub" },
    { "id": 196, "name": "قبرص", "alpha2": "cy", "alpha3": "cyp" },
    { "id": 203, "name": "جمهورية التشيك", "alpha2": "cz", "alpha3": "cze" },
    { "id": 208, "name": "الدنمارك", "alpha2": "dk", "alpha3": "dnk" },
    { "id": 262, "name": "جيبوتي", "alpha2": "dj", "alpha3": "dji" },
    { "id": 212, "name": "دومينيكا", "alpha2": "dm", "alpha3": "dma" },
    { "id": 214, "name": "جمهورية الدومينيكان", "alpha2": "do", "alpha3": "dom" },
    { "id": 218, "name": "الإكوادور", "alpha2": "ec", "alpha3": "ecu" },
    { "id": 818, "name": "مصر", "alpha2": "eg", "alpha3": "egy" },
    { "id": 222, "name": "السلفادور", "alpha2": "sv", "alpha3": "slv" },
    { "id": 226, "name": "غينيا الاستوائية", "alpha2": "gq", "alpha3": "gnq" },
    { "id": 232, "name": "إريتريا", "alpha2": "er", "alpha3": "eri" },
    { "id": 233, "name": "إستونيا", "alpha2": "ee", "alpha3": "est" },
    { "id": 231, "name": "إثيوبيا", "alpha2": "et", "alpha3": "eth" },
    { "id": 242, "name": "فيجي", "alpha2": "fj", "alpha3": "fji" },
    { "id": 246, "name": "فنلندا", "alpha2": "fi", "alpha3": "fin" },
    { "id": 250, "name": "فرنسا", "alpha2": "fr", "alpha3": "fra" },
    { "id": 266, "name": "الغابون", "alpha2": "ga", "alpha3": "gab" },
    { "id": 270, "name": "غامبيا", "alpha2": "gm", "alpha3": "gmb" },
    { "id": 268, "name": "جورجيا", "alpha2": "ge", "alpha3": "geo" },
    { "id": 276, "name": "ألمانيا", "alpha2": "de", "alpha3": "deu" },
    { "id": 288, "name": "غانا", "alpha2": "gh", "alpha3": "gha" },
    { "id": 300, "name": "اليونان", "alpha2": "gr", "alpha3": "grc" },
    { "id": 308, "name": "غرينادا", "alpha2": "gd", "alpha3": "grd" },
    { "id": 320, "name": "غواتيمالا", "alpha2": "gt", "alpha3": "gtm" },
    { "id": 324, "name": "غينيا", "alpha2": "gn", "alpha3": "gin" },
    { "id": 624, "name": "غينيا بيساو", "alpha2": "gw", "alpha3": "gnb" },
    { "id": 328, "name": "غيانا", "alpha2": "gy", "alpha3": "guy" },
    { "id": 332, "name": "هايتي", "alpha2": "ht", "alpha3": "hti" },
    { "id": 340, "name": "هندوراس", "alpha2": "hn", "alpha3": "hnd" },
    { "id": 348, "name": "المجر", "alpha2": "hu", "alpha3": "hun" },
    { "id": 352, "name": "آيسلندا", "alpha2": "is", "alpha3": "isl" },
    { "id": 356, "name": "الهند", "alpha2": "in", "alpha3": "ind" },
    { "id": 360, "name": "إندونيسيا", "alpha2": "id", "alpha3": "idn" },
    { "id": 364, "name": "إيران", "alpha2": "ir", "alpha3": "irn" },
    { "id": 368, "name": "العراق", "alpha2": "iq", "alpha3": "irq" },
    { "id": 372, "name": "أيرلندا", "alpha2": "ie", "alpha3": "irl" },
    { "id": 376, "name": "إسرائيل", "alpha2": "il", "alpha3": "isr" },
    { "id": 380, "name": "إيطاليا", "alpha2": "it", "alpha3": "ita" },
    { "id": 388, "name": "جامايكا", "alpha2": "jm", "alpha3": "jam" },
    { "id": 392, "name": "اليابان", "alpha2": "jp", "alpha3": "jpn" },
    { "id": 400, "name": "الأردن", "alpha2": "jo", "alpha3": "jor" },
    { "id": 398, "name": "كازاخستان", "alpha2": "kz", "alpha3": "kaz" },
    { "id": 404, "name": "كينيا", "alpha2": "ke", "alpha3": "ken" },
    { "id": 296, "name": "كيريباتي", "alpha2": "ki", "alpha3": "kir" },
    { "id": 408, "name": "كوريا الشمالية", "alpha2": "kp", "alpha3": "prk" },
    { "id": 410, "name": "كوريا الجنوبية", "alpha2": "kr", "alpha3": "kor" },
    { "id": 414, "name": "الكويت", "alpha2": "kw", "alpha3": "kwt" },
    { "id": 417, "name": "قيرغيزستان", "alpha2": "kg", "alpha3": "kgz" },
    { "id": 418, "name": "لاوس", "alpha2": "la", "alpha3": "lao" },
    { "id": 428, "name": "لاتفيا", "alpha2": "lv", "alpha3": "lva" },
    { "id": 422, "name": "لبنان", "alpha2": "lb", "alpha3": "lbn" },
    { "id": 426, "name": "ليسوتو", "alpha2": "ls", "alpha3": "lso" },
    { "id": 430, "name": "ليبيريا", "alpha2": "lr", "alpha3": "lbr" },
    { "id": 434, "name": "ليبيا", "alpha2": "ly", "alpha3": "lby" },
    { "id": 438, "name": "ليختنشتاين", "alpha2": "li", "alpha3": "lie" },
    { "id": 440, "name": "ليتوانيا", "alpha2": "lt", "alpha3": "ltu" },
    { "id": 442, "name": "لوكسمبورغ", "alpha2": "lu", "alpha3": "lux" },
    { "id": 807, "name": "مقدونيا", "alpha2": "mk", "alpha3": "mkd" },
    { "id": 450, "name": "مدغشقر", "alpha2": "mg", "alpha3": "mdg" },
    { "id": 454, "name": "مالاوي", "alpha2": "mw", "alpha3": "mwi" },
    { "id": 458, "name": "ماليزيا", "alpha2": "my", "alpha3": "mys" },
    { "id": 462, "name": "جزر المالديف", "alpha2": "mv", "alpha3": "mdv" },
    { "id": 466, "name": "مالي", "alpha2": "ml", "alpha3": "mli" },
    { "id": 470, "name": "مالطا", "alpha2": "mt", "alpha3": "mlt" },
    { "id": 584, "name": "جزر مارشال", "alpha2": "mh", "alpha3": "mhl" },
    { "id": 478, "name": "موريتانيا", "alpha2": "mr", "alpha3": "mrt" },
    { "id": 480, "name": "موريشيوس", "alpha2": "mu", "alpha3": "mus" },
    { "id": 484, "name": "المكسيك", "alpha2": "mx", "alpha3": "mex" },
    {
      "id": 583,
      "name": "ولايات ميكرونيسيا المتحدة",
      "alpha2": "fm",
      "alpha3": "fsm"
    },
    { "id": 504, "name": "المغرب", "alpha2": "ma", "alpha3": "mar" },
    { "id": 498, "name": "مولدوفا", "alpha2": "md", "alpha3": "mda" },
    { "id": 492, "name": "موناكو", "alpha2": "mc", "alpha3": "mco" },
    { "id": 496, "name": "منغوليا", "alpha2": "mn", "alpha3": "mng" },
    { "id": 499, "name": "الجبل الأسود", "alpha2": "me", "alpha3": "mne" },
    { "id": 508, "name": "موزمبيق", "alpha2": "mz", "alpha3": "moz" },
    { "id": 104, "name": "ميانمار", "alpha2": "mm", "alpha3": "mmr" },
    { "id": 516, "name": "ناميبيا", "alpha2": "na", "alpha3": "nam" },
    { "id": 520, "name": "ناورو", "alpha2": "nr", "alpha3": "nru" },
    { "id": 524, "name": "نيبال", "alpha2": "np", "alpha3": "npl" },
    { "id": 528, "name": "هولندا", "alpha2": "nl", "alpha3": "nld" },
    { "id": 554, "name": "نيوزيلندا", "alpha2": "nz", "alpha3": "nzl" },
    { "id": 558, "name": "نيكاراغوا", "alpha2": "ni", "alpha3": "nic" },
    { "id": 562, "name": "النيجر", "alpha2": "ne", "alpha3": "ner" },
    { "id": 566, "name": "نيجيريا", "alpha2": "ng", "alpha3": "nga" },
    { "id": 578, "name": "النرويج", "alpha2": "no", "alpha3": "nor" },
    { "id": 512, "name": "عمان", "alpha2": "om", "alpha3": "omn" },
    { "id": 586, "name": "باكستان", "alpha2": "pk", "alpha3": "pak" },
    { "id": 585, "name": "بالاو", "alpha2": "pw", "alpha3": "plw" },
    { "id": 591, "name": "بنما", "alpha2": "pa", "alpha3": "pan" },
    { "id": 598, "name": "بابوا غينيا الجديدة", "alpha2": "pg", "alpha3": "png" },
    { "id": 600, "name": "باراغواي", "alpha2": "py", "alpha3": "pry" },
    { "id": 604, "name": "بيرو", "alpha2": "pe", "alpha3": "per" },
    { "id": 608, "name": "الفلبين", "alpha2": "ph", "alpha3": "phl" },
    { "id": 616, "name": "بولندا", "alpha2": "pl", "alpha3": "pol" },
    { "id": 620, "name": "البرتغال", "alpha2": "pt", "alpha3": "prt" },
    { "id": 634, "name": "قطر", "alpha2": "qa", "alpha3": "qat" },
    { "id": 642, "name": "رومانيا", "alpha2": "ro", "alpha3": "rou" },
    { "id": 643, "name": "روسيا", "alpha2": "ru", "alpha3": "rus" },
    { "id": 646, "name": "رواندا", "alpha2": "rw", "alpha3": "rwa" },
    { "id": 659, "name": "سانت كيتس ونيفيس", "alpha2": "kn", "alpha3": "kna" },
    { "id": 662, "name": "سانت لوسيا", "alpha2": "lc", "alpha3": "lca" },
    {
      "id": 670,
      "name": "سانت فينسنت والغرينادين",
      "alpha2": "vc",
      "alpha3": "vct"
    },
    { "id": 882, "name": "ساموا", "alpha2": "ws", "alpha3": "wsm" },
    { "id": 674, "name": "سان مارينو", "alpha2": "sm", "alpha3": "smr" },
    { "id": 678, "name": "ساو تومي وبرينسيب", "alpha2": "st", "alpha3": "stp" },
    { "id": 682, "name": "السعودية", "alpha2": "sa", "alpha3": "sau" },
    { "id": 686, "name": "السنغال", "alpha2": "sn", "alpha3": "sen" },
    { "id": 688, "name": "صربيا", "alpha2": "rs", "alpha3": "srb" },
    { "id": 690, "name": "سيشل", "alpha2": "sc", "alpha3": "syc" },
    { "id": 694, "name": "سيراليون", "alpha2": "sl", "alpha3": "sle" },
    { "id": 702, "name": "سنغافورة", "alpha2": "sg", "alpha3": "sgp" },
    { "id": 703, "name": "سلوفاكيا", "alpha2": "sk", "alpha3": "svk" },
    { "id": 705, "name": "سلوفينيا", "alpha2": "si", "alpha3": "svn" },
    { "id": 90, "name": "جزر سليمان", "alpha2": "sb", "alpha3": "slb" },
    { "id": 706, "name": "الصومال", "alpha2": "so", "alpha3": "som" },
    { "id": 710, "name": "جنوب أفريقيا", "alpha2": "za", "alpha3": "zaf" },
    { "id": 728, "name": "جنوب السودان", "alpha2": "ss", "alpha3": "ssd" },
    { "id": 724, "name": "إسبانيا", "alpha2": "es", "alpha3": "esp" },
    { "id": 144, "name": "سريلانكا", "alpha2": "lk", "alpha3": "lka" },
    { "id": 729, "name": "السودان", "alpha2": "sd", "alpha3": "sdn" },
    { "id": 740, "name": "سورينام", "alpha2": "sr", "alpha3": "sur" },
    { "id": 748, "name": "إسواتيني", "alpha2": "sz", "alpha3": "swz" },
    { "id": 752, "name": "السويد", "alpha2": "se", "alpha3": "swe" },
    { "id": 756, "name": "سويسرا", "alpha2": "ch", "alpha3": "che" },
    { "id": 760, "name": "سوريا", "alpha2": "sy", "alpha3": "syr" },
    { "id": 762, "name": "طاجيكستان", "alpha2": "tj", "alpha3": "tjk" },
    { "id": 834, "name": "تنزانيا", "alpha2": "tz", "alpha3": "tza" },
    { "id": 764, "name": "تايلاند", "alpha2": "th", "alpha3": "tha" },
    { "id": 626, "name": "تيمور الشرقية", "alpha2": "tl", "alpha3": "tls" },
    { "id": 768, "name": "توغو", "alpha2": "tg", "alpha3": "tgo" },
    { "id": 776, "name": "تونغا", "alpha2": "to", "alpha3": "ton" },
    { "id": 780, "name": "ترينيداد وتوباغو", "alpha2": "tt", "alpha3": "tto" },
    { "id": 788, "name": "تونس", "alpha2": "tn", "alpha3": "tun" },
    { "id": 792, "name": "تركيا", "alpha2": "tr", "alpha3": "tur" },
    { "id": 795, "name": "تركمانستان", "alpha2": "tm", "alpha3": "tkm" },
    { "id": 798, "name": "توفالو", "alpha2": "tv", "alpha3": "tuv" },
    { "id": 800, "name": "أوغندا", "alpha2": "ug", "alpha3": "uga" },
    { "id": 804, "name": "أوكرانيا", "alpha2": "ua", "alpha3": "ukr" },
    {
      "id": 784,
      "name": "الإمارات العربية المتحدة",
      "alpha2": "ae",
      "alpha3": "are"
    },
    { "id": 826, "name": "المملكة المتحدة", "alpha2": "gb", "alpha3": "gbr" },
    { "id": 840, "name": "الولايات المتحدة", "alpha2": "us", "alpha3": "usa" },
    { "id": 858, "name": "الأوروغواي", "alpha2": "uy", "alpha3": "ury" },
    { "id": 860, "name": "أوزبكستان", "alpha2": "uz", "alpha3": "uzb" },
    { "id": 548, "name": "فانواتو", "alpha2": "vu", "alpha3": "vut" },
    { "id": 862, "name": "فنزويلا", "alpha2": "ve", "alpha3": "ven" },
    { "id": 704, "name": "فيتنام", "alpha2": "vn", "alpha3": "vnm" },
    { "id": 887, "name": "اليمن", "alpha2": "ye", "alpha3": "yem" },
    { "id": 894, "name": "زامبيا", "alpha2": "zm", "alpha3": "zmb" },
    { "id": 716, "name": "زيمبابوي", "alpha2": "zw", "alpha3": "zwe" }
  ]

  const fromAlpha3ToAlpha2 = (a3) => {
    let flagName = 'int'
    if (a3 === undefined) {
      return flagName
    }
    countries.forEach(c => {
      if (c.alpha3 === a3.toLowerCase())
        flagName = c.alpha2
    })
    return flagName
  }

  const modifyBets = (bet, type = '1') => {
    bet = bet.toString()
    if (bet) {
      switch (type) {
        case '1':
          return transformBetAsDecimal(bet)
        case '2':
          return transformBetAsFraction(bet)
        case '3':
          return transformBetAsAmerican(bet)
        default:
          return transformBetAsDecimal(bet)
      }
    }
    return ''
  }
  //.
  function transformBetAsFraction(bet) {

    if (bet.includes('/')) {
      const btArr = bet.split('/')
      const res = (btArr[0] / btArr[1] + 1).toFixed(2)
      return res
    }

    if (bet.includes('+') || bet.includes('-')) {
      return bet.includes('+')
        ? positiveAmericanBets(bet)
        : negativeAmericanBets(bet)
    }

    return Number(bet).toFixed(2)
  }
  // --/--
  function transformBetAsDecimal(bet) {

    if (bet.includes('.')) {
      return decimalToFraction(bet)
    }

    if (bet.includes('+') || bet.includes('-')) {
      const fractionBet = bet.includes('+')
        ? positiveAmericanBets(bet)
        : negativeAmericanBets(bet)
      return decimalToFraction(fractionBet)
    }

    return bet
  }
  //+-
  function transformBetAsAmerican(bet) {

    if (bet.includes('/')) {
      const fractionBet = transformBetAsFraction(bet)
      return fromFractionToAmerican(fractionBet)
    }

    if (bet.includes('.')) {
      return fromFractionToAmerican(bet)
    }

    return bet
  }

  function fromFractionToAmerican(bet) {
    if (Number(bet) >= 2) {
      return `+${((Number(bet) - 1) * 100).toFixed(0)}`
    } else {
      return `-${(100 / (Number(bet) - 1)).toFixed(0)}`
    }
  }

  function positiveAmericanBets(bet) {
    const newStr = bet.replace('+', '')
    return (Number(newStr) / 100 + 1).toFixed(2)
  }

  function negativeAmericanBets(bet) {
    const newStr = bet.replace('-', '')
    return (100 / Number(newStr) + 1).toFixed(2)
  }

  function gcd(a, b) {
    return b ? gcd(b, a % b) : a
  }

  function decimalToFraction(_decimal) {
    let top = _decimal.toString().replace(/\d+[.]/, '')
    const bottom = Math.pow(10, top.length)

    if (_decimal > 1) {
      top = +top + Math.floor(_decimal) * bottom
    }

    const x = gcd(top, bottom)
    return `${top / x + '/' + bottom / x}`
  }


  insertHtmlModules({}, () => {
    let curID = params.sportId;

    if (curID === undefined) {
      ID = parseInt(window.inplay[0].id);
    }
    else {
      ID = curID;
    }
    // renderTable(window.inplay, ID);
    renderInplay(window.inplay, ID);

    function createTimerInplay(tm, ts) {
      let tm_, ts_;

      if (tm < 10) {
        tm_ = '0' + tm;
      } else {
        tm_ = tm;
      }

      if (ts < 10) {
        ts_ = '0' + ts;
      } else {
        ts_ = ts;
      }

      return tm_ + ':' + ts_;
    }

    function startTimerInplay() {
      let timers = $('.timer-el');
      for (let i = 0; i < timers.length; i++) {
        let tmr = $(timers[i]);
        tmr.data("tmrmin", tElMin(tmr));
        tmr.data("tmrsec", tElsec(tmr));
      }
      let interval = setInterval(function () {
        for (let i = 0; i < timers.length; i++) {
          let tmr = $(timers[i]);
          if ($(timers[i]).data("dc") == 1) {

            if ($(timers[i]).data("tt") == 0) {
              //$(timers[i]).text("Break");
              //$(timers[i]).data("tm", $(timers[i]).data("tm") + 15);
              $(timers[i]).text($(timers[i]).data("tm") + ':' + $(timers[i]).data("ts"));
            } else {
              /*
              let tm_ = parseInt(tmr.data("tmrmin"));
              let ts_ = parseInt(tmr.data("tmrsec"));
              if (ts_ == 59) {
                tm_ = tm_ + 1;
                ts_ = 0;
              } else {
                ts_ = ts_ + 1;
              }

              $(timers[i]).text(createTimerInplay(tm_, ts_));
              tmr.data("tmrmin", tm_);
              tmr.data("tmrsec", ts_);
              */
              let etu = tmr.data("tu").toString();
              let etm = tmr.data("tm").toString();
              let ets = tmr.data("ts").toString();
              let years = etu.substring(0, 4);
              let month = etu.substring(4, 6);
              let day = etu.substring(6, 8);
              let hours = etu.substring(8, 10);
              let minute = etu.substring(10, 12);
              let second = etu.substring(12, 14);
              let date = years + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
              let ts = new Date(date).getTime() / 1000;
              let tn = new Date().getTime() / 1000;
              let offset = new Date().getTimezoneOffset();
              let dt = Math.floor(tn - ts + etm * 60 + ets - Math.abs(offset) * 60);
              let min = Math.floor(dt / 60);
              let sec = dt - min * 60;
              if (sec == 59) {
                min = min + 1;
                sec = 0;
              } else {
                sec = sec + 1;
              }
              if (min < 10) min = '0' + min;
              if (sec < 10) sec = '0' + sec;
              //let timer = min + ':' + sec;
              tmr.text(min + ":" + sec);
            }
          } else {
            $(timers[i]).text(" ");
          }
        }
      }, 1000);
      window.inplay_interval = interval;
    }

    function tElMin(t) {
      let tu_time = new Date(t.data("tu")).getTime();
      let now = new Date().getTime();
      let dat_diff = Math.round(now - tu_time);
      //let dat_diff = Math.ceil(Math.abs(tu_time.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

      let dat_tm = millisToMinutes(dat_diff);
      let dat_ts = millisToSeconds(dat_diff);

      let tm = parseInt(t.data("tm"));
      let ts = parseInt(t.data("ts"));

      return parseInt(dat_tm) + tm;
    }

    function tElsec(t) {
      let tu_time = new Date(t.data("tu")).getTime();
      let now = new Date().getTime();
      let dat_diff = Math.round(now - tu_time);

      let dat_tm = millisToMinutes(dat_diff);
      let dat_ts = millisToSeconds(dat_diff);

      let tm = parseInt(t.data("tm"));
      let ts = parseInt(t.data("ts"));

      return parseInt(dat_ts) + ts;
    }
    function millisToMinutes(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes /*+ ":" + (seconds < 10 ? '0' : '') + seconds;*/;
    }
    function millisToSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return (seconds < 10 ? '0' : '') + seconds;
    }


    /* function renderTable(data, ID) {
      // Clean coef_table
      if ($(`[data-id=coef_table]:not(.pb-child)`).html().length > 0) {
        $(`[data-id=coef_table]:not(.pb-child)`).empty();
      }
      // Clean play-table
      $(`[data-id="play-table"]`).empty();
      const tableRenderer = new Promise((resolve, reject) => {
        data.forEach(sport => {
          let type = false;
          if (parseInt(sport.ID) == ID) {
            for (let i = 0; i < sport.CT.length; i++) {
              if (sport.CT[i].EV[0].MA.length === 0) {
                drawCompet(sport.CT[i].NA, ID == 1 ? true : false);
              }
              else {
                if (typeof sport.CT[0].EV[0].MA[0] == 'undefined') {
                  continue;
                }
                if (typeof sport.CT[0].EV[0].MA[0].PA[2] === 'undefined' || sport.CT[0].EV[0].MA[0].PA[2] == null) {
                  drawCompet(sport.CT[i].NA, false);
                }
                else {
                  drawCompet(sport.CT[i].NA, true);
                }
              }
              for (let j = 0; j < sport.CT[i].EV.length; j++) {
                // Check if bets' coeficients exist
                if (sport.CT[i].EV[j].MA.length == 0 || typeof (sport.CT[i].EV[j].MA[0]) == 'undefined') {
                  drawEvent(sport.CT[i].EV[j], ID == 1 ? true : false, ID);
                  continue;
                }
                // Check if bets' coeficients for draw exist
                if (typeof sport.CT[0].EV[0].MA[0].PA[2] === 'undefined' || sport.CT[0].EV[0].MA[0].PA[2] == null) {
                  type = false;
                  drawEvent(sport.CT[i].EV[j], type, ID);
                }
                else {
                  type = true;
                  drawEvent(sport.CT[i].EV[j], type, ID);
                }
              }
            }
            resolve();
          }
        });
      });
      tableRenderer
        .then((response) => {
          // Handle opening of game section
          $(`[data-id=event]`).on('click', (event) => {
            let id = $(event.target).data('gameId');
            let curURL = window.location.href;
            // Start preloader
            const preloader = $('#page-preloader');
            preloader.removeClass('done').addClass('opaci');
            //if filter is active - remove it from hash
            if ((window.location.hash.split('/')[1] == 'sport') || (window.location.hash.split('/')[1] == 'inplay')) {
              window.location.hash = '';
              window.location.hash += `/event/${id}`;
            }
            else {
              if (curURL.includes('#')) {
                window.location.href += `/event/${id}`;
              }
              else {
                window.location.href += `#/event/${id}`;
              }
            }
          });
          // Preloader finishes
          const preloader = $('#page-preloader');
          $('#page-preloader').append(`
          <div class="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
          `);
          preloader.children('img').remove();
          preloader.addClass('done');
          preloader.removeClass('opaci');
          preloader.data(`status`, 'done').attr('data-status', 'done');

          window.translate();

          loadJsModules({
            betslip_link: { loadCSS: true, loadLanguage: false }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      startTimerInplay();
    } */


    async function renderInplay(data, ID) {
      // Clean coef_table
      if ($(`[data-id=coef_table]:not(.pb-child)`).html().length > 0) {
        $(`[data-id=coef_table]:not(.pb-child)`).empty();
      }
      // Clean play-table
      $(`[data-id="play-table"]`).empty();
      window.currentView = null
      window.currentView = await data.find(sport => sport.id === Number(ID))
      console.log(`currentView NAME BEFORE`, window.currentView.name);
      const tableRenderer = new Promise((resolve, reject) => {
        const url = 'https://bestline.bet/api2/?key=inplay-league&leagueId=';
        const getEvents = new Promise((resolve, reject) => {
          const leagues = []
          try {
            window.currentView.categories.forEach((category, i) => {
              category.leagues.forEach((league, j) => {
                window.currentView.categories[i].leagues[j].iconCode = category.iconCode     // flag aplha3 for leagues
                leagues.push(fetch(url + league.id))
              })
            })
            Promise.all(leagues)
              .then(responses => {
                const data = responses.map(async response => {
                  const body = await response.json()
                  return body
                })
                return data;
              })
              .then(async data => {
                await Promise.all(data).then(responses => {
                  window.currentView.categories.forEach(category => {
                    category.leagues.forEach(league => {
                      league.events = responses.find(response => {
                        return response.events[0].leagueId == league.id
                      })?.events ?? []
                    })
                  })
                })
              })
              .then(() => {
                console.log(`resolved`);
                resolve()
              })
          } catch (e) {
            $(`[data-id="play-table"]`).append(`<div class="row [ info ]">Sorry, no leagues and events are accessible</div>`)
            resolve()
            console.log(`Error in ID:` + league.id + ', named ' + league.name);
          }
        })

        getEvents.then(() => {
          loadJsModules({
            live: { loadCSS: false, loadLanguage: false },
          })
          console.log(`currentView NAME`, window.currentView.name);
          window.currentView.categories.forEach(category => {
            category.leagues.forEach(league => {
              if (league.events) {
                console.log(`render`, league);
                drawCompet(league.name, league.iconCode, ID)
                league.events.forEach(event => {
                  drawEventNew(event, event.sportId)
                })
              }
            })
          })
          resolve();

        })


        /*  data.forEach(sport => {
           let type = false;
           if (parseInt(sport.ID) == ID) {
             for (let i = 0; i < sport.CT.length; i++) {
               if (sport.CT[i].EV[0].MA.length === 0) {
                 drawCompet(sport.CT[i].NA, ID == 1 ? true : false);
               }
               else {
                 if (typeof sport.CT[0].EV[0].MA[0] == 'undefined') {
                   continue;
                 }
                 if (typeof sport.CT[0].EV[0].MA[0].PA[2] === 'undefined' || sport.CT[0].EV[0].MA[0].PA[2] == null) {
                   drawCompet(sport.CT[i].NA, false);
                 }
                 else {
                   drawCompet(sport.CT[i].NA, true);
                 }
               }
               for (let j = 0; j < sport.CT[i].EV.length; j++) {
                 // Check if bets' coeficients exist
                 if (sport.CT[i].EV[j].MA.length == 0 || typeof (sport.CT[i].EV[j].MA[0]) == 'undefined') {
                   drawEvent(sport.CT[i].EV[j], ID == 1 ? true : false, ID);
                   continue;
                 }
                 // Check if bets' coeficients for draw exist
                 if (typeof sport.CT[0].EV[0].MA[0].PA[2] === 'undefined' || sport.CT[0].EV[0].MA[0].PA[2] == null) {
                   type = false;
                   drawEvent(sport.CT[i].EV[j], type, ID);
                 }
                 else {
                   type = true;
                   drawEvent(sport.CT[i].EV[j], type, ID);
                 }
               }
             }
             resolve();
           }
         }); */
      });
      tableRenderer
        .then(() => {
          // Handle opening of game section
          $(`[data-id=event]`).on('click', (event) => {
            let id = $(event.target).data('gameId');
            let curURL = window.location.href;
            // Start preloader
            const preloader = $('#page-preloader');
            preloader.removeClass('done').addClass('opaci');
            //if filter is active - remove it from hash
            if ((window.location.hash.split('/')[1] == 'sport') || (window.location.hash.split('/')[1] == 'inplay')) {
              window.location.hash = '';
              window.location.hash += `/event/${id}`;
            }
            else {
              if (curURL.includes('#')) {
                window.location.href += `/event/${id}`;
              }
              else {
                window.location.href += `#/event/${id}`;
              }
            }
          });
          // Preloader finishes
          const preloader = $('#page-preloader');
          /* $('#page-preloader').append(`
          <div class="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
          `); */
          preloader.children('img').remove();
          preloader.addClass('done');
          preloader.removeClass('opaci');
          preloader.data(`status`, 'done').attr('data-status', 'done');

          window.translate();

          loadJsModules({
            betslip_link: { loadCSS: true, loadLanguage: false }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // startTimerInplay();
    }

    function drawEvent(ev, type, ID) {
      let XP = ev.XP;
      $(`[data-id="play-table"]`).append(`
                    <div class="row">
                    <div class="cell" data-game-id="${ev.ID}" data-id="event">
                      <div data-game-id="${ev.ID}" data-class="play-link" data-game-id="${ev.ID}" class="[ play-link ]">
                          <div data-game-id="${ev.ID}" class="team home">
                            <p class="font m-white ellipsis" data-game-id="${ev.ID}">${typeof ev.NA.split(' v ')[1] !== 'undefined' ? ev.NA.split(' v ')[0] : ev.NA.split(' vs ')[0]}</p>
                            ${ev.SS == '' ? '' : `<div class="team-score" data-game-id="${ev.ID}"></div>`}
                          </div>
                          <div data-game-id="${ev.ID}" class="team away">
                           ${typeof ev.NA.split(' v ')[1] == 'undefined' && typeof ev.NA.split(' v ')[1] == 'undefined' && typeof ev.NA.split(' vs ')[1] == 'undefined' ? '' : `<p data-game-id="${ev.ID}" class="font m-white ellipsis">${typeof ev.NA.split(' v ')[1] !== 'undefined' ? ev.NA.split(' v ')[1] : ev.NA.split(' vs ')[1]}</p>`}
                            ${ev.SS == '' ? '' : `<div class="team-score" data-game-id="${ev.ID}"></div>`}
                          </div>
                          <div data-game-id="${ev.ID}" class="[ metadata-wrapper ] text-right">
                            ${ev.TU == '' ? `` : `<p data-find="timer" data-timer="${ev.FI}" data-game-id="${ev.ID}" data-tu="${ev.TU}" data-tm="${ev.TM}" data-ts="${ev.TS}" data-dc="${ev.DC}" class="font m-white timer-el"></p>`}
                            <div class="marketCount " data-game-id="${ev.ID}">${ev.LM}</div>
                            <!--<div class="sport-icon play" data-game-id="${ev.ID}"></div>-->
                          </div>
                        </div>
                      </div>
                    </div>`);
      // if (typeof XP !== 'undefined' && ev.ID != 1) {
      //   if (typeof XP.split(',')[1] !== 'undefined') {
      //     let counter = 0;
      //     ev.XP.split(',').map((item) => {
      //       counter++;
      //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //       `);
      //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
      //       `);
      //     });
      //   }
      //   else {
      //     let counter = 0;
      //     ev.SS.split(',').map((item) => {
      //       counter++;
      //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //       `);
      //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
      //       `);
      //     });
      //   }
      // }
      // else {
      //   let counter = 0;
      //   ev.SS.split(',').map((item) => {
      //     counter++;
      //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //       <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //     `);
      //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //     <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
      //   `);
      //   });
      // }
      // if (typeof XP !== 'undefined') {
      //   if (ev.PI.split(',')[0] == '1')
      //     $(`div[data-game-id="${ev.ID}"] .team.home p`).addClass('bowler');
      //   if (ev.PI.split(',')[1] == '1')
      //     $(`div[data-game-id="${ev.ID}"] .team.away p`).addClass('bowler');
      //   $(`div[data-game-id="${ev.ID}"] .timer-el`).remove();
      //   if (typeof XP.split(',')[1] !== 'undefined') {
      //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //       <span class="point">${ev.SS.split('-')[0]}
      //     `);
      //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //       <span class="point">${ev.SS.split('-')[1]}
      //     `);
      //   }
      //   else {
      //     if (XP !== '') {
      //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //       <span class="point">${XP.split('-')[0]}
      //     `);
      //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //       <span class="point">${XP.split('-')[1]}
      //     `);
      //     }
      //   }
      // }

      // if just 1 score:
      if (typeof XP !== 'undefined') {
        if (XP !== '') {
          ev.SS.split(',').map((item, idx, arr) => {
            if (idx == arr.length - 1) {
              $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
        <span class="point">${item.split('-')[0]}
      `);
              $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
        <span class="point">${item.split('-')[1]}
      `);
            }
          });
        }
      } else {
        if (typeof ev.SS.split('-')[1] !== 'undefined') {
          $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
            <span class="point">${ev.SS.split('-')[0]}
          `);
          $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
            <span class="point">${ev.SS.split('-')[1]}
          `);
        }
      }
      if (ev.MA.length > 0 && (typeof ev.MA !== 'undefined' && ev.MA[0].SU != '1')) {
        if (type) {
          if (ev.MA[0].NA != "Fulltime Result") {
            $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="right-container" style="width: 100%; height: 100%">

            <div class="bets-container" style="width: 100%; height: 65%; display: flex;">
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div> 
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div> 
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[2].BS}" data-FI="${ev.MA[0].PA[2].FI}" data-HA="${ev.MA[0].PA[2].HA}" data-HD="${ev.MA[0].PA[2].HD}" data-ID="${ev.MA[0].PA[2].ID}" data-IT="${ev.MA[0].PA[2].IT}" data-NA="${ev.MA[0].PA[2].NA}" data-OD="${ev.MA[0].PA[2].OD}" data-OR="${ev.MA[0].PA[2].OR}" data-SU="${ev.MA[0].PA[2].SU}" class="button coefficient ${ev.MA[0].PA[2].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[2].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[2].OD)}</button> 
            </div>
            </div>

            <div class="result-container" data-id="event" data-game-id="${ev.ID}" style="width: 100%; height: 35%; background-color: #343341; display: flex;
            justify-content: center;
            align-items: center; border-top: 1px solid rgb(51, 32, 43);">
            <p class="font m-white ellipsis" data-game-id="${ev.ID}" style="font-size: 13px;">${ev.MA[0].NA}</p>
            </div>

            </div>
          `);
          } else {
            $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div> 
            <div class="cell"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div> 
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[2].BS}" data-FI="${ev.MA[0].PA[2].FI}" data-HA="${ev.MA[0].PA[2].HA}" data-HD="${ev.MA[0].PA[2].HD}" data-ID="${ev.MA[0].PA[2].ID}" data-IT="${ev.MA[0].PA[2].IT}" data-NA="${ev.MA[0].PA[2].NA}" data-OD="${ev.MA[0].PA[2].OD}" data-OR="${ev.MA[0].PA[2].OR}" data-SU="${ev.MA[0].PA[2].SU}" class="button coefficient ${ev.MA[0].PA[2].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[2].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[2].OD)}</button> 
            </div>
          `);
          }
        }
        else {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" style="min-width: 24%; max-width: 24%;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div>
          `);
        }
      }
      else {
        if (type) {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div> 
            <div class="cell"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div> 
            <div class="cell">
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div>
          `);
        }
        else {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" style="min-width: 24%; max-width: 24%;">
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button>
            </div>
          `);
        }
      }
    }

    function drawEventNew(ev, type) {
      const ODDS_TYPE = '2'
      $(`[data-id="play-table"]`).append(`
                    <div class="row">
                    <div class="cell" data-game-id="${ev.id}" data-id="event">
                      <div data-game-id="${ev.id}" data-class="play-link" data-game-id="${ev.id}" class="[ play-link ]">
                          <div data-game-id="${ev.id}" class="team home">
                            <p class="font m-white ellipsis" data-game-id="${ev.id}">${ev.competitors && ev.competitors[0].name || ev.name}</p>
                            ${ev.SS == '' ? '' : `<div class="team-score" data-game-id="${ev.id}"></div>`}
                          </div>
                          <div data-game-id="${ev.ID}" class="team away">
                           ${ev.competitors && ev.competitors[1] ? `<p data-game-id="${ev.id}" class="font m-white ellipsis">${ev.competitors && ev.competitors[1].name}</p>` : ''}
                            ${ev.SS == '' ? '' : `<div class="team-score" data-game-id="${ev.id}"></div>`}
                          </div>
                          <div data-game-id="${ev.id}" class="[ metadata-wrapper ] text-right">
                            ${true ? '' : `${ev.TU == '' ? `` : `<p data-find="timer" data-timer="${ev.FI}" data-game-id="${ev.id}" data-tu="${ev.TU}" data-tm="${ev.TM}" data-ts="${ev.TS}" data-dc="${ev.DC}" class="font m-white timer-el"></p>`}`}
                            <div class="marketCount " data-game-id="${ev.id}">${ev.totalOddsCount}</div>
                            <!--<div class="sport-icon play" data-game-id="${ev.id}"></div>-->
                          </div>
                        </div>
                      </div>
                    </div>`);
      // if (typeof XP !== 'undefined' && ev.ID != 1) {
      //   if (typeof XP.split(',')[1] !== 'undefined') {
      //     let counter = 0;
      //     ev.XP.split(',').map((item) => {
      //       counter++;
      //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //       `);
      //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
      //       `);
      //     });
      //   }
      //   else {
      //     let counter = 0;
      //     ev.SS.split(',').map((item) => {
      //       counter++;
      //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //       `);
      //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //         <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
      //       `);
      //     });
      //   }
      // }
      // else {
      //   let counter = 0;
      //   ev.SS.split(',').map((item) => {
      //     counter++;
      //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //       <span data-game-id="${ev.ID}" class="point">${item.split('-')[0]}
      //     `);
      //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //     <span data-game-id="${ev.ID}" class="point">${item.split('-')[1]}
      //   `);
      //   });
      // }
      // if (typeof XP !== 'undefined') {
      //   if (ev.PI.split(',')[0] == '1')
      //     $(`div[data-game-id="${ev.ID}"] .team.home p`).addClass('bowler');
      //   if (ev.PI.split(',')[1] == '1')
      //     $(`div[data-game-id="${ev.ID}"] .team.away p`).addClass('bowler');
      //   $(`div[data-game-id="${ev.ID}"] .timer-el`).remove();
      //   if (typeof XP.split(',')[1] !== 'undefined') {
      //     $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //       <span class="point">${ev.SS.split('-')[0]}
      //     `);
      //     $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //       <span class="point">${ev.SS.split('-')[1]}
      //     `);
      //   }
      //   else {
      //     if (XP !== '') {
      //       $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
      //       <span class="point">${XP.split('-')[0]}
      //     `);
      //       $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
      //       <span class="point">${XP.split('-')[1]}
      //     `);
      //     }
      //   }
      // }

      // if just 1 score:
      /* if (typeof XP !== 'undefined') {
        if (XP !== '') {
          ev.SS.split(',').map((item, idx, arr) => {
            if (idx == arr.length - 1) {
              $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
        <span class="point">${item.split('-')[0]}
      `);
              $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
        <span class="point">${item.split('-')[1]}
      `);
            }
          });
        }
      } else {
        if (typeof ev.SS.split('-')[1] !== 'undefined') {
          $(`div[data-game-id="${ev.ID}"] .home .team-score`).append(`
            <span class="point">${ev.SS.split('-')[0]}
          `);
          $(`div[data-game-id="${ev.ID}"] .away .team-score`).append(`
            <span class="point">${ev.SS.split('-')[1]}
          `);
        }
      } */
      if (ev.odds?.length > 0) {
        const fulltime = ev.odds.find(odd => odd.id === 1 || odd.id === 175)
        if (fulltime) {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" ${type !== 1 ? `style="min-width: 24%; max-width: 24%;"` : ''}>
              <button 
                data-eventNA="${ev.name}" 
                data-cl="${ID}" 
                data-marketNA="${fulltime.name}" 
                data-FI="${ev.id}" 
                data-ID="${fulltime.id}" 
                data-NA="${fulltime.outcomes[0].outcome}" 
                data-OD="${modifyBets(fulltime.outcomes[0].oddValue, ODDS_TYPE)}" 
                data-SU="${fulltime.outcomes[0].status}" 
                class="button coefficient ${fulltime.outcomes[0].oddValue == '1.00' ? 'disabled' : ''}">
                  ${fulltime.outcomes[0].oddValue == '1.00' ? '<span class="fa fa-lock lock"></span>' : modifyBets(fulltime.outcomes[0].oddValue, ODDS_TYPE)}
              </button> 
            </div> 
            <div class="cell" ${type !== 1 ? `style="min-width: 24%; max-width: 24%;"` : ''}> 
            <button 
              data-eventNA="${ev.name}" 
              data-cl="${ID}" 
              data-marketNA="${fulltime.name}" 
              data-FI="${ev.id}" 
              data-ID="${fulltime.id}" 
              data-NA="${fulltime.outcomes[1].outcome}" 
              data-OD="${modifyBets(fulltime.outcomes[1].oddValue, ODDS_TYPE)}" 
              data-SU="${fulltime.outcomes[1].status}" 
              class="button coefficient ${fulltime.outcomes[1].oddValue == '1.00' ? 'disabled' : ''}">
                ${fulltime.outcomes[1].oddValue == '1.00' ? '<span class="fa fa-lock lock"></span>' : modifyBets(fulltime.outcomes[1].oddValue, ODDS_TYPE)}
            </button> 
            </div>
            ${type === 1
              ? `<div class="cell">
            <button 
              data-eventNA="${ev.name}" 
              data-cl="${ID}" 
              data-marketNA="${fulltime.name}" 
              data-FI="${ev.id}" 
              data-ID="${fulltime.id}" 
              data-NA="${fulltime.outcomes[2].name}" 
              data-OD="${modifyBets(fulltime.outcomes[2].oddValue, ODDS_TYPE)}" 
              data-SU="${fulltime.outcomes[2].status}" 
              class="button coefficient ${fulltime.outcomes[2].oddValue == '1.00' ? 'disabled' : ''}">
                ${fulltime.outcomes[2].oddValue == '1.00' ? '<span class="fa fa-lock lock"></span>' : modifyBets(fulltime.outcomes[2].oddValue, ODDS_TYPE)}
            </button>
            </div>` : ''}
          `);
        }
      }
      else {
        if (type === 1) {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell">
              <button data-eventNA="${ev.name}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div> 
            <div class="cell"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div> 
            <div class="cell">
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div>
          `);
        }
        else {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" style="min-width: 24%; max-width: 24%;">
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button>
            </div>
          `);
        }
      }
      /* 
        if (type) {
          if (ev.MA[0].NA != "Fulltime Result") {
            $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="right-container" style="width: 100%; height: 100%">
     
            <div class="bets-container" style="width: 100%; height: 65%; display: flex;">
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div> 
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div> 
            <div class="cell" style="display: table-cell;min-width: 33.33333%;max-width: 33.33333%;display: flex;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[2].BS}" data-FI="${ev.MA[0].PA[2].FI}" data-HA="${ev.MA[0].PA[2].HA}" data-HD="${ev.MA[0].PA[2].HD}" data-ID="${ev.MA[0].PA[2].ID}" data-IT="${ev.MA[0].PA[2].IT}" data-NA="${ev.MA[0].PA[2].NA}" data-OD="${ev.MA[0].PA[2].OD}" data-OR="${ev.MA[0].PA[2].OR}" data-SU="${ev.MA[0].PA[2].SU}" class="button coefficient ${ev.MA[0].PA[2].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[2].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[2].OD)}</button> 
            </div>
            </div>
     
            <div class="result-container" data-id="event" data-game-id="${ev.ID}" style="width: 100%; height: 35%; background-color: #343341; display: flex;
            justify-content: center;
            align-items: center; border-top: 1px solid rgb(51, 32, 43);">
            <p class="font m-white ellipsis" data-game-id="${ev.ID}" style="font-size: 13px;">${ev.MA[0].NA}</p>
            </div>
     
            </div>
          `);
          } else {
            $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div> 
            <div class="cell"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div> 
            <div class="cell">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[2].BS}" data-FI="${ev.MA[0].PA[2].FI}" data-HA="${ev.MA[0].PA[2].HA}" data-HD="${ev.MA[0].PA[2].HD}" data-ID="${ev.MA[0].PA[2].ID}" data-IT="${ev.MA[0].PA[2].IT}" data-NA="${ev.MA[0].PA[2].NA}" data-OD="${ev.MA[0].PA[2].OD}" data-OR="${ev.MA[0].PA[2].OR}" data-SU="${ev.MA[0].PA[2].SU}" class="button coefficient ${ev.MA[0].PA[2].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[2].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[2].OD)}</button> 
            </div>
          `);
          }
        }
        else {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" style="min-width: 24%; max-width: 24%;">
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[0].BS}" data-FI="${ev.MA[0].PA[0].FI}" data-HA="${ev.MA[0].PA[0].HA}" data-HD="${ev.MA[0].PA[0].HD}" data-ID="${ev.MA[0].PA[0].ID}" data-IT="${ev.MA[0].PA[0].IT}" data-NA="${ev.MA[0].PA[0].NA}" data-OD="${ev.MA[0].PA[0].OD}" data-OR="${ev.MA[0].PA[0].OR}" data-SU="${ev.MA[0].PA[0].SU}" class="button coefficient ${ev.MA[0].PA[0].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[0].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[0].OD)}</button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
              <button data-eventNA="${ev.NA}" data-cl="${ID}" data-marketNA="${ev.MA[0].NA}" data-BS="${ev.MA[0].PA[1].BS}" data-FI="${ev.MA[0].PA[1].FI}" data-HA="${ev.MA[0].PA[1].HA}" data-HD="${ev.MA[0].PA[1].HD}" data-ID="${ev.MA[0].PA[1].ID}" data-IT="${ev.MA[0].PA[1].IT}" data-NA="${ev.MA[0].PA[1].NA}" data-OD="${ev.MA[0].PA[1].OD}" data-OR="${ev.MA[0].PA[1].OR}" data-SU="${ev.MA[0].PA[1].SU}" class="button coefficient ${ev.MA[0].PA[1].OD == '0/0' ? 'disabled' : ''}">${ev.MA[0].PA[1].OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(ev.MA[0].PA[1].OD)}</button>
            </div>
          `);
        }
      }
      else {
        if (type) {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell">
              <button data-eventNA="${ev.name}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div> 
            <div class="cell"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div> 
            <div class="cell">
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div>
          `);
        }
        else {
          $(`[data-id="play-table"]`).children('.row:last-child').append(`
            <div class="cell" style="min-width: 24%; max-width: 24%;">
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button> 
            </div>
            
            <div class="cell" style="min-width: 24%; max-width: 24%;"> 
            <button data-eventNA="${ev.NA}" data-cl="${ID}" class="button coefficient disabled"><span class="fa fa-lock lock"></span></button>
            </div>
          `);
      } */
    }

    function drawCompet(ctName, alpha3, type) {
      $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
          <div class="cell">
            <img 
              class="country-flag" 
              src="./img/icon-country-highres/${fromAlpha3ToAlpha2(alpha3)}.png" 
              alt=${fromAlpha3ToAlpha2(alpha3).toLocaleUpperCase()}/>
            <p class="font m-l-10 text-ellipsis">${typeof ctName !== 'undefined' ? ctName : ''}</p>
           </div>
           ${type === '1'
          ? `<div class="cell"> <p class="font">1</p> </div> 
              <div class="cell"> <p class="font">X</p> </div>
              <div class="cell"> <p class="font">2</p> </div></div>`
          : `<div class="cell" style="min-width: 24%; max-width: 24%;"> <p class="font">1</p> </div>
              <div class="cell" style="min-width: 24%; max-width: 24%;"> <p class="font">2</p> </div></div>`}
        `);
      /* if (type) {
        $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
          <div class="cell"> <p class="font">${typeof ctName !== 'undefined' ? ctName : ''} </p> </div> 
          <div class="cell"> <p class="font">1</p> </div> 
          <div class="cell"> <p class="font">X</p> </div>
          <div class="cell"> <p class="font">2</p> </div></div>
        `);
      }
      else {
        $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
          <div class="cell"> <p class="font">${typeof ctName !== 'undefined' ? ctName : ''} </p> </div> 
          <div class="cell" style="min-width: 24%; max-width: 24%;"> <p class="font">1</p> </div>
          <div class="cell" style="min-width: 24%; max-width: 24%;"><p class="font">2</p> </div></div>
        `);
      } */
    }

  });
});