exports('slider', (params, done) => {
  insertHtmlModules({
    ".main .slider": [
      "slider/slider.html"
    ]
  }, () => {
    // basic slider setup
    const sliderWrapper = $('.slider-wrapper');
    (() => {
      $('button.slider-prev').remove();
      $('button.slider-next').remove();
      sliderWrapper.css({
        'padding-left': '0px',
        'animate': 'true',
        'overflow': 'scroll',
      });
    })(0);
    // Parse and set filters
    (() => {
      const inplay = `
      {
        "STATUS": "SUCCESS",
        "TOPIC": "INPLAY",
        "CMD": "F",
        "EPOCH": 1575638733,
        "DATA": [
          {
            "ID": "1",
            "NA": "Soccer",
            "OR": "0",
            "IT": "31ce276d18580988eb785a79a0f059ce",
            "CT": [
              {
                "IT": "213bc3c266188e838ce02ca560aae75b",
                "NA": "Spain Tercera",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84596474",
                    "IT": "217a21c866b2d0ef257a7a254922f66f",
                    "OR": "0",
                    "NA": "CD Mirandes II vs Atletico Tordesillas",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "30",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "2",
                    "TU": "20191206125005",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "9fe3f20f32eaadf95125b65c23f11fc0",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459458891",
                            "NA": "CD Mirandes II",
                            "N2": "Home",
                            "IT": "9b8e62102fd2dbec84f4ea790e2d1ea0",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "20/1",
                              "D": "21.00",
                              "A": "+2000"
                            }
                          },
                          {
                            "ID": "459458892",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "831d031b28c1aad99f874be7b96f809e",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/4",
                              "D": "4.75",
                              "A": "+375"
                            }
                          },
                          {
                            "ID": "459458893",
                            "NA": "Atletico Tordesillas",
                            "N2": "Away",
                            "IT": "4b9c31fe19693a647dc9edeeeeef55f0",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "2/11",
                              "D": "1.18",
                              "A": -556
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84599249",
                    "IT": "4043ef5793ec1128c62f3c4d9e057f4a",
                    "OR": "1",
                    "NA": "Panaderia Pulido vs CD Atletico Paso",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "41",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "5",
                    "TU": "20191206130221",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "5f626c26bdd572166c3e47fdf3b6074a",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459434234",
                            "NA": "Panaderia Pulido",
                            "N2": "Home",
                            "IT": "d291387b4443f2cbecbf81af49f2286c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/2",
                              "D": "8.50",
                              "A": "+750"
                            }
                          },
                          {
                            "ID": "459434236",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "48fb37e7dabb02f0306007503e3a807d",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "3/1",
                              "D": "4.00",
                              "A": "+300"
                            }
                          },
                          {
                            "ID": "459434237",
                            "NA": "CD Atletico Paso",
                            "N2": "Away",
                            "IT": "8b56bde6b6ee01c214245b23e8549d3e",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/11",
                              "D": "1.36",
                              "A": -278
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "037c9ef7c01409b200878146b3ad7ed7",
                "NA": "Spain Youth League",
                "OR": "1",
                "EV": [
                  {
                    "FI": "84600696",
                    "IT": "5da70eb7286988f3f3f79e622ad0d112",
                    "OR": "0",
                    "NA": "CD San Felix U19 vs AD Nervion U19",
                    "SS": "3-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "35",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "3",
                    "TU": "20191206125937",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1778",
                        "NA": "4th Goal",
                        "N2": "4th Goal",
                        "IT": "e1dc65b383ae5c50436e0208827f21c8",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "461128163",
                            "NA": "CD San Felix U19",
                            "N2": "Home",
                            "IT": "9cdbe7a52b51aa0bf04a310662f7bf54",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/5",
                              "D": "1.80",
                              "A": -125
                            }
                          },
                          {
                            "ID": "461128185",
                            "NA": "No 4th Goal",
                            "N2": "No 4th Goal",
                            "IT": "db630b424ef3bd37d487e05c321bfdbb",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "13/8",
                              "D": "2.62",
                              "A": "+162"
                            }
                          },
                          {
                            "ID": "461128198",
                            "NA": "AD Nervion U19",
                            "N2": "Away",
                            "IT": "9e83b5497ea6cdc6843c4c115746f33d",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/1",
                              "D": "6.00",
                              "A": "+500"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84596469",
                    "IT": "ae2cd2d340ad0c9181b926f77a38e671",
                    "OR": "1",
                    "NA": "Marina Sport U19 vs CF Bansander U19",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "3",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206123322",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "a4ce1d072a7debd608cbfc45caa60415",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459468184",
                            "NA": "Marina Sport U19",
                            "N2": "Home",
                            "IT": "2f7ca97d339a9414c410b52674bf0205",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/1",
                              "D": "13.00",
                              "A": "+1200"
                            }
                          },
                          {
                            "ID": "459468185",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "c922d1da720ea3ec4b62ef129c1d68d7",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/22",
                              "D": "1.04",
                              "A": -2500
                            }
                          },
                          {
                            "ID": "459468186",
                            "NA": "CF Bansander U19",
                            "N2": "Away",
                            "IT": "73a9d908633317d3e3465e8ae9db6d67",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "10/1",
                              "D": "11.00",
                              "A": "+1000"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84596480",
                    "IT": "5c2a1157a0149cd95d8c3b7cc3e74201",
                    "OR": "2",
                    "NA": "Real Sociedad U19 vs Numancia U19",
                    "SS": "4-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "35",
                    "PI": null,
                    "TT": "1",
                    "TM": "47",
                    "TS": "18",
                    "TU": "20191206130701",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1778",
                        "NA": "5th Goal",
                        "N2": "5th Goal",
                        "IT": "ea26fb41f2b41e0749af63bf17e0840d",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "461294761",
                            "NA": "Real Sociedad U19",
                            "N2": "Home",
                            "IT": "eea471553ac1397f9c694b223a05abca",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/5",
                              "D": "1.80",
                              "A": -125
                            }
                          },
                          {
                            "ID": "461294773",
                            "NA": "No 5th Goal",
                            "N2": "No 5th Goal",
                            "IT": "222f1ff0a70fa21da464cd36af082d27",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/5",
                              "D": "3.40",
                              "A": "+240"
                            }
                          },
                          {
                            "ID": "461294782",
                            "NA": "Numancia U19",
                            "N2": "Away",
                            "IT": "bf3b4fe1803c7c10f943c7e953feada5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "10/3",
                              "D": "4.33",
                              "A": "+333"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84600698",
                    "IT": "57404dfffe54eacfd7e6fd5a6b5776b0",
                    "OR": "3",
                    "NA": "Sevilla U19 vs Granada U19",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "35",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130049",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "fb82972101029fd39928e0201235f9c8",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459488527",
                            "NA": "Sevilla U19",
                            "N2": "Home",
                            "IT": "d400ce059bae82065b8878bd06b536e5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/6",
                              "D": "1.16",
                              "A": -626
                            }
                          },
                          {
                            "ID": "459488528",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "9e792d09efde315b6fd8a771758ecdae",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/2",
                              "D": "5.50",
                              "A": "+450"
                            }
                          },
                          {
                            "ID": "459488529",
                            "NA": "Granada U19",
                            "N2": "Away",
                            "IT": "180e60a5596ba24caa0a908ce784378c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "14/1",
                              "D": "15.00",
                              "A": "+1400"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84596471",
                    "IT": "5f2b924e90ec62a298b575a7f4aeed12",
                    "OR": "4",
                    "NA": "Valladolid U19 vs Getafe U19",
                    "SS": "3-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "2",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206123113",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1778",
                        "NA": "6th Goal",
                        "N2": "6th Goal",
                        "IT": "3a2f2d38d0c3afbd078458dbd25302bf",
                        "SU": "1",
                        "PA": [
                          {
                            "ID": "461257152",
                            "NA": "Valladolid U19",
                            "N2": "Home",
                            "IT": "b7e1909ed662d5fc9a5cd099c5682130",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "0/0",
                              "D": "0.00",
                              "A": "+100"
                            }
                          },
                          {
                            "ID": "461257161",
                            "NA": "No 6th Goal",
                            "N2": "No 6th Goal",
                            "IT": "aaae75301122d94f2dc15c1a9d07087b",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "1/100",
                              "D": "1.01",
                              "A": -10000
                            }
                          },
                          {
                            "ID": "461257172",
                            "NA": "Getafe U19",
                            "N2": "Away",
                            "IT": "e5370dd1c6065186d96ff379114e86c9",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "0/0",
                              "D": "0.00",
                              "A": "+100"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "076177ffcbe48b8fcfb84479aa9c34d0",
                "NA": "Spain Segunda Women",
                "OR": "2",
                "EV": [
                  {
                    "FI": "84599042",
                    "IT": "d072bb2a99d166e159aab8e85ad99748",
                    "OR": "0",
                    "NA": "SE AEM Women vs Atletico Madrid Women B",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "12",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206131902",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "51f395cbc1bd998ba3071cf84dda7843",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459529737",
                            "NA": "SE AEM Women",
                            "N2": "Home",
                            "IT": "de4b51fa7f2a94733ae0d218dd091daa",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "3/10",
                              "D": "1.30",
                              "A": -334
                            }
                          },
                          {
                            "ID": "459529739",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "68098f0565e9b06967899d4ec94fac1f",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/4",
                              "D": "4.75",
                              "A": "+375"
                            }
                          },
                          {
                            "ID": "459529741",
                            "NA": "Atletico Madrid Women B",
                            "N2": "Away",
                            "IT": "0ff8fa4b22cca494db2686312c368c61",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/2",
                              "D": "8.50",
                              "A": "+750"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "eeb64ca32d1c9f64f0e893f7c6d93416",
                "NA": "Argentina Reserve League",
                "OR": "3",
                "EV": [
                  {
                    "FI": "84626404",
                    "IT": "5d9ff4f7f0f7e6eeb1ae693f32f212b5",
                    "OR": "0",
                    "NA": "Argentinos Jrs Reserves vs Estudiantes LP Reserves",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "52",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "1",
                    "TU": "20191206131216",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "da5932f8fc89d555eb03511fe5c215c3",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458558610",
                            "NA": "Argentinos Jrs Reserves",
                            "N2": "Home",
                            "IT": "a18e85f35c8e5ca38306d13f1f81f8f4",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "8/1",
                              "D": "9.00",
                              "A": "+800"
                            }
                          },
                          {
                            "ID": "458558611",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "d58a1c161d5cc01a219791f96df89658",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "3/1",
                              "D": "4.00",
                              "A": "+300"
                            }
                          },
                          {
                            "ID": "458558612",
                            "NA": "Estudiantes LP Reserves",
                            "N2": "Away",
                            "IT": "2a4cc107b0d62f190ead4e674b0b6461",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/3",
                              "D": "1.33",
                              "A": -304
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84648448",
                    "IT": "e608143b3cfe3bebe1e751b5c9d54e07",
                    "OR": "1",
                    "NA": "Atletico Tucuman Reserves vs Newell's Reserves",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "41",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "8",
                    "TU": "20191206131412",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "6b8799a03f7085f29d82f98d8737d19c",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459709650",
                            "NA": "Atletico Tucuman Reserves",
                            "N2": "Home",
                            "IT": "5370cbcb8b52a4cc2e7809aad270abfe",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "2/5",
                              "D": "1.40",
                              "A": -251
                            }
                          },
                          {
                            "ID": "459709651",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "99908d6fff16a7311de8201c8d9b52d6",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/4",
                              "D": "3.75",
                              "A": "+275"
                            }
                          },
                          {
                            "ID": "459709652",
                            "NA": "Newell's Reserves",
                            "N2": "Away",
                            "IT": "b5de11e6f50cb2a2abfb9a5ee5260677",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "13/2",
                              "D": "7.50",
                              "A": "+650"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84626422",
                    "IT": "794d677811163ef88d406ece44006756",
                    "OR": "2",
                    "NA": "CA Independiente Reserves vs Banfield Reserves",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "51",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130506",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "b32a046bffa63fba3d0d6fea4e5628a0",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458567638",
                            "NA": "CA Independiente Reserves",
                            "N2": "Home",
                            "IT": "f2aec33b3e27e3cb1a28e2433f17677d",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/4",
                              "D": "2.75",
                              "A": "+175"
                            }
                          },
                          {
                            "ID": "458567645",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "c3e10e00eeaed3d2bb0cc0a45c895e75",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/10",
                              "D": "2.10",
                              "A": "+110"
                            }
                          },
                          {
                            "ID": "458567647",
                            "NA": "Banfield Reserves",
                            "N2": "Away",
                            "IT": "f0f414ec221036bf8348fc214975a2ec",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "3/1",
                              "D": "4.00",
                              "A": "+300"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84601236",
                    "IT": "f16d29e7f15c9f9ea51ade6f7a6107a1",
                    "OR": "3",
                    "NA": "CA Talleres de Córdoba Reserves vs Union Santa Fe Reserves",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "51",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130557",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "78581f669581933d5cec3dd0214d1fa6",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458555255",
                            "NA": "CA Talleres de Córdoba Reserves",
                            "N2": "Home",
                            "IT": "70e4a18c59adfe340afeb2fd633e7fc5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/1",
                              "D": "5.00",
                              "A": "+400"
                            }
                          },
                          {
                            "ID": "458555256",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "7369fad12d9f2a3c3982d5f0e9bc75b7",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "21/10",
                              "D": "3.10",
                              "A": "+210"
                            }
                          },
                          {
                            "ID": "458555257",
                            "NA": "Union Santa Fe Reserves",
                            "N2": "Away",
                            "IT": "e1845978b85eae08f4181febe62b9f22",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "8/11",
                              "D": "1.72",
                              "A": -139
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84626408",
                    "IT": "c0e0a37c5a26cb57858f4cf76afeba8f",
                    "OR": "4",
                    "NA": "Colon Reserves vs CA Aldosivi Reserves",
                    "SS": "2-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "52",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206131719",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "8cced2ccddae12d16d330d15b3e3c6e8",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458562297",
                            "NA": "Colon Reserves",
                            "N2": "Home",
                            "IT": "b27a4db4884c3cab0121344df234dd5b",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/28",
                              "D": "1.03",
                              "A": -3334
                            }
                          },
                          {
                            "ID": "458562298",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "dfe802d194c681ff38e8e96a9eb37812",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/1",
                              "D": "13.00",
                              "A": "+1200"
                            }
                          },
                          {
                            "ID": "458562299",
                            "NA": "CA Aldosivi Reserves",
                            "N2": "Away",
                            "IT": "7fee70016de9a2957728672452697ec3",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "25/1",
                              "D": "26.00",
                              "A": "+2500"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84626411",
                    "IT": "fe380c4aafc44bcfe3c0f63f9490d68c",
                    "OR": "5",
                    "NA": "Defensa y Justicia Reserves vs Godoy Cruz Reserves",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "51",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130700",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "758d3fc8790974dda93d00065cb1fc3f",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458564143",
                            "NA": "Defensa y Justicia Reserves",
                            "N2": "Home",
                            "IT": "668869df00ca16344d8b9ff7f590b1a0",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/4",
                              "D": "3.25",
                              "A": "+225"
                            }
                          },
                          {
                            "ID": "458564144",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "2ba374967d266b7302e7fa94952a690c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "21/20",
                              "D": "2.04",
                              "A": "+104"
                            }
                          },
                          {
                            "ID": "458564145",
                            "NA": "Godoy Cruz Reserves",
                            "N2": "Away",
                            "IT": "9b697b18fce2968c8b29b4f1e63a7233",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/5",
                              "D": "3.40",
                              "A": "+240"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84626415",
                    "IT": "d0b194b00d43e16f6c7e7373ebefbcea",
                    "OR": "6",
                    "NA": "Gimnasia LP Reserves vs Central Cordoba SdE Reserves",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "50",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130959",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "39e916c01f2128eae50b016d6d50c2ee",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458566145",
                            "NA": "Gimnasia LP Reserves",
                            "N2": "Home",
                            "IT": "3ac4abebc73d614b6bec6d780c7571e9",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/4",
                              "D": "1.25",
                              "A": -400
                            }
                          },
                          {
                            "ID": "458566146",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "65755d884e3a8c115687aebda76901b5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/1",
                              "D": "5.00",
                              "A": "+400"
                            }
                          },
                          {
                            "ID": "458566147",
                            "NA": "Central Cordoba SdE Reserves",
                            "N2": "Away",
                            "IT": "b5aab83ed90b1d95ff36368e1f287ef5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "10/1",
                              "D": "11.00",
                              "A": "+1000"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84626406",
                    "IT": "c38229167104ce3fc3a78d8745e01fc7",
                    "OR": "7",
                    "NA": "Huracan Reserves vs Arsenal de Sarandi Reserves",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "49",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130432",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "c62112c76b665a2bf02830e7e6979992",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458560364",
                            "NA": "Huracan Reserves",
                            "N2": "Home",
                            "IT": "ad000ab10791feadae0abd84dd69938f",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/8",
                              "D": "2.87",
                              "A": "+187"
                            }
                          },
                          {
                            "ID": "458560365",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "f70e81fb17b04e58f0ee6b126b6a767a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "10/11",
                              "D": "1.90",
                              "A": -112
                            }
                          },
                          {
                            "ID": "458560366",
                            "NA": "Arsenal de Sarandi Reserves",
                            "N2": "Away",
                            "IT": "f6247150e359260465cad989a73cf099",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/4",
                              "D": "4.75",
                              "A": "+375"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84626425",
                    "IT": "71ab7958f7168f787d15a67206bc941e",
                    "OR": "8",
                    "NA": "Lanus Reserves vs Racing Club Reserves",
                    "SS": "3-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "46",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130152",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "cbe767032a0df7c9c3e5c6c9fca85fe2",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458570104",
                            "NA": "Lanus Reserves",
                            "N2": "Home",
                            "IT": "314fde8bb4870273106992f0539ac1e2",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/250",
                              "D": "1.00",
                              "A": 0
                            }
                          },
                          {
                            "ID": "458570105",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "756033b72c87bbce91eca09aa4d6b543",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "40/1",
                              "D": "41.00",
                              "A": "+4000"
                            }
                          },
                          {
                            "ID": "458570106",
                            "NA": "Racing Club Reserves",
                            "N2": "Away",
                            "IT": "15a24219bc0d3005f446bf3befb41398",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "40/1",
                              "D": "41.00",
                              "A": "+4000"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84615391",
                    "IT": "5ca872fb929547af29c4879e00f3edad",
                    "OR": "9",
                    "NA": "Lujan Reserves vs San Martin Burzaco Reserves",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "54",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191206124031",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "19f9972469233c1d23df78aaa3358df1",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458557096",
                            "NA": "Lujan Reserves",
                            "N2": "Home",
                            "IT": "6d4d3c7b71bf75f059b0b70558bab3e0",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/4",
                              "D": "2.25",
                              "A": "+125"
                            }
                          },
                          {
                            "ID": "458557098",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "559b8186aa54c3cfd10bf4714e8a79e8",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/4",
                              "D": "2.75",
                              "A": "+175"
                            }
                          },
                          {
                            "ID": "458557100",
                            "NA": "San Martin Burzaco Reserves",
                            "N2": "Away",
                            "IT": "60c720b7945d54ae22984510a8414dab",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "13/5",
                              "D": "3.60",
                              "A": "+260"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84626428",
                    "IT": "78691faab2828aff1e36eaaf55357aca",
                    "OR": "10",
                    "NA": "Patronato Parana Reserves vs Velez Sarsfield Reserves",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "50",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130740",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "34c242979b691d1b383a23687619a2bf",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458572248",
                            "NA": "Patronato Parana Reserves",
                            "N2": "Home",
                            "IT": "7a7bed688f33de68a699f01807335b73",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "10/3",
                              "D": "4.33",
                              "A": "+333"
                            }
                          },
                          {
                            "ID": "458572250",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "4b63b55af526b3595a188e2258896d93",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "6/5",
                              "D": "2.20",
                              "A": "+120"
                            }
                          },
                          {
                            "ID": "458572252",
                            "NA": "Velez Sarsfield Reserves",
                            "N2": "Away",
                            "IT": "121ed15af8de6dbbd85c86d78bcfee84",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "6/4",
                              "D": "2.50",
                              "A": "+150"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84601234",
                    "IT": "dbec54098afb3e6d5fb3fd715cb1de7d",
                    "OR": "11",
                    "NA": "River Plate Reserves vs San Lorenzo Reserves",
                    "SS": "2-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "51",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130612",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "27156c3657b91e95e89741c4da011025",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458553864",
                            "NA": "River Plate Reserves",
                            "N2": "Home",
                            "IT": "a7b08c0a6ab8a4654c346cf425f177d8",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/20",
                              "D": "1.05",
                              "A": -2000
                            }
                          },
                          {
                            "ID": "458553866",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "0766b453cf9a46ece1745a2084b68b6a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "10/1",
                              "D": "11.00",
                              "A": "+1000"
                            }
                          },
                          {
                            "ID": "458553868",
                            "NA": "San Lorenzo Reserves",
                            "N2": "Away",
                            "IT": "4f2835c38b5a2d91582ff598d97cd42e",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "22/1",
                              "D": "23.00",
                              "A": "+2200"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84648450",
                    "IT": "a7e134d51254a1b1fab4594cbaff3081",
                    "OR": "12",
                    "NA": "Rosario Central Reserves vs Boca Juniors Reserves",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "22",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130337",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "67a93ce24af2a636e9f903e98fc644c8",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460698425",
                            "NA": "Rosario Central Reserves",
                            "N2": "Home",
                            "IT": "82881ae0be4084d9de7659c602117dcd",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/8",
                              "D": "2.87",
                              "A": "+187"
                            }
                          },
                          {
                            "ID": "460698427",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "69cd226d49dd5d49ac5401bdfdc5bf7f",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "21/20",
                              "D": "2.04",
                              "A": "+104"
                            }
                          },
                          {
                            "ID": "460698429",
                            "NA": "Boca Juniors Reserves",
                            "N2": "Away",
                            "IT": "b1680b660bed765ca7197d5677857ec3",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/4",
                              "D": "3.75",
                              "A": "+275"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "0ecdb5fd44f20ce4cb86d62ea9728023",
                "NA": "China FA Cup",
                "OR": "4",
                "EV": [
                  {
                    "FI": "84558580",
                    "IT": "b08ca0c4fefa892f14fa7b4621888f31",
                    "OR": "0",
                    "NA": "Shanghai Shenhua vs Shandong Luneng",
                    "SS": "3-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "21",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206123634",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1778",
                        "NA": "4th Goal",
                        "N2": "4th Goal",
                        "IT": "a6c7b7dd47bb21b4e711bc4419e8d89d",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "461294502",
                            "NA": "Shanghai Shenhua",
                            "N2": "Home",
                            "IT": "680aea8aab547992e7d3971496b6c6b5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "13/2",
                              "D": "7.50",
                              "A": "+650"
                            }
                          },
                          {
                            "ID": "461294512",
                            "NA": "No 4th Goal",
                            "N2": "No 4th Goal",
                            "IT": "f4d23e9fa641a172f27c3d0d35c3ee75",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "2/9",
                              "D": "1.22",
                              "A": -455
                            }
                          },
                          {
                            "ID": "461294519",
                            "NA": "Shandong Luneng",
                            "N2": "Away",
                            "IT": "5c4f31f8962b69bdcf4daae879023f43",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/2",
                              "D": "6.50",
                              "A": "+550"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "4d55cf869deb4c0208c57efc7fc6bf76",
                "NA": "Croatia U19 League",
                "OR": "5",
                "EV": [
                  {
                    "FI": "84599117",
                    "IT": "31ed84c66824bf484119e61811ffc0a2",
                    "OR": "0",
                    "NA": "HNK Orijent U19 vs Dinamo Zagreb U19",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "37",
                    "PI": null,
                    "TT": "1",
                    "TM": "47",
                    "TS": "23",
                    "TU": "20191206130044",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "3e784ff45ccb43a6c4a40b4b26ce9526",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458797922",
                            "NA": "HNK Orijent U19",
                            "N2": "Home",
                            "IT": "e6c4ace9e2fe2734a8d20bee7b484df6",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/1",
                              "D": "10.00",
                              "A": "+900"
                            }
                          },
                          {
                            "ID": "458797923",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "f05af2df096cdce69375db41afd848c4",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/4",
                              "D": "2.25",
                              "A": "+125"
                            }
                          },
                          {
                            "ID": "458797924",
                            "NA": "Dinamo Zagreb U19",
                            "N2": "Away",
                            "IT": "7f9d03a280561eededbabeee796c211a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/5",
                              "D": "1.80",
                              "A": -125
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "ece7f26dc2ca8dbc21d72fc5db283fd8",
                "NA": "Egypt Cup",
                "OR": "6",
                "EV": [
                  {
                    "FI": "84600208",
                    "IT": "b87927a9b1dc88c27432135f8f8b3790",
                    "OR": "0",
                    "NA": "Smouha vs Markaz Shabab Al Obour",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "85",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206125822",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "6c50e1a0721217da7c36f91ba7dc65fb",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459727269",
                            "NA": "Smouha",
                            "N2": "Home",
                            "IT": "82c31f3f9e6de7891b39eb493618ab94",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/6",
                              "D": "1.16",
                              "A": -626
                            }
                          },
                          {
                            "ID": "459727270",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "65b38ab23357841924a561e9cfde6ea5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/1",
                              "D": "6.00",
                              "A": "+500"
                            }
                          },
                          {
                            "ID": "459727271",
                            "NA": "Markaz Shabab Al Obour",
                            "N2": "Away",
                            "IT": "2240fb34566437f17793e91ed213ecc1",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "14/1",
                              "D": "15.00",
                              "A": "+1400"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "fe057cf0dbafeb81c507f158bb1de797",
                "NA": "Egypt Division 2",
                "OR": "7",
                "EV": [
                  {
                    "FI": "84615399",
                    "IT": "7034827e9ce06ba36dfb678eb4cc4464",
                    "OR": "0",
                    "NA": "Al Olympi vs Biyala SC",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "40",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191206123114",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "0959a9a0bf1b6201896378efc17829c8",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458805154",
                            "NA": "Al Olympi",
                            "N2": "Home",
                            "IT": "c70cfc8279f5aea359ab36bf92be72ad",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/6",
                              "D": "1.16",
                              "A": -626
                            }
                          },
                          {
                            "ID": "458805155",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "9e1a1953fa320b99c73e6fdeaa0e1cbd",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/1",
                              "D": "6.00",
                              "A": "+500"
                            }
                          },
                          {
                            "ID": "458805156",
                            "NA": "Biyala SC",
                            "N2": "Away",
                            "IT": "0c25a2b25c0c37ec5d1c4efdfe94094f",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/1",
                              "D": "12.00",
                              "A": "+1100"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "7ad2e2c5c3a251afa98063f7887aaf79",
                "NA": "Hong Kong Sapling Cup",
                "OR": "8",
                "EV": [
                  {
                    "FI": "84596477",
                    "IT": "93b3fd64a3ad265e5ef0aa27fdc9d28c",
                    "OR": "0",
                    "NA": "Southern District vs Yuen Long",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "22",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130249",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "3c64f252ec75734f01a37bb5e3279825",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459745087",
                            "NA": "Southern District",
                            "N2": "Home",
                            "IT": "0729eef70123a7e405021b60c7b202ce",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/4",
                              "D": "3.25",
                              "A": "+225"
                            }
                          },
                          {
                            "ID": "459745089",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "ff7c4638464c5099d27c1dd5da700e54",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/4",
                              "D": "2.25",
                              "A": "+125"
                            }
                          },
                          {
                            "ID": "459745090",
                            "NA": "Yuen Long",
                            "N2": "Away",
                            "IT": "e0e50a205ca51fa8916f53bbe2921835",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/8",
                              "D": "2.87",
                              "A": "+187"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "3cd6fef445135d732bc2788b813a5e0e",
                "NA": "India I-League",
                "OR": "9",
                "EV": [
                  {
                    "FI": "84597974",
                    "IT": "15f19b446200f1551c7e63e777577a0b",
                    "OR": "0",
                    "NA": "Indian Arrows vs Gokulam FC",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "3",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "1",
                    "TU": "20191206123246",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "8d76ded83e8ece8d39d54661bad6c750",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459035134",
                            "NA": "Indian Arrows",
                            "N2": "Home",
                            "IT": "4e511c817671e2726600eeade7372639",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "100/1",
                              "D": "101.00",
                              "A": "+10000"
                            }
                          },
                          {
                            "ID": "459035135",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "05d60ae50365ef247462ae93f3d046e5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/1",
                              "D": "13.00",
                              "A": "+1200"
                            }
                          },
                          {
                            "ID": "459035136",
                            "NA": "Gokulam FC",
                            "N2": "Away",
                            "IT": "1a0c97a36fffb84ecd1df442152df650",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/28",
                              "D": "1.03",
                              "A": -3334
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "4225f84696fa65c28bac99de4dc26d0d",
                "NA": "Indonesia Liga 1",
                "OR": "10",
                "EV": [
                  {
                    "FI": "84597979",
                    "IT": "57f447601f847b9fbbd2fab36afdd82a",
                    "OR": "0",
                    "NA": "Kalteng Putra FC vs Madura United",
                    "SS": "1-4",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "2",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206123218",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1778",
                        "NA": "6th Goal",
                        "N2": "6th Goal",
                        "IT": "58c7d0b7eef84e5b82cc7a25c8d8e731",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "461275087",
                            "NA": "Kalteng Putra FC",
                            "N2": "Home",
                            "IT": "7a3b53198f97eb521bcd65b5f9156f44",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/1",
                              "D": "13.00",
                              "A": "+1200"
                            }
                          },
                          {
                            "ID": "461275098",
                            "NA": "No 6th Goal",
                            "N2": "No 6th Goal",
                            "IT": "8b869b40efa5cb32a3fd68c5d8d8d8d7",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/25",
                              "D": "1.04",
                              "A": -2500
                            }
                          },
                          {
                            "ID": "461275105",
                            "NA": "Madura United",
                            "N2": "Away",
                            "IT": "8a094e275150a579b7c4abd4ae18eec0",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/1",
                              "D": "13.00",
                              "A": "+1200"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84597982",
                    "IT": "2f8269e189cbd5ee062d5f722621775b",
                    "OR": "1",
                    "NA": "PS Barito Putera vs Semen Padang",
                    "SS": "0-3",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "2",
                    "PI": null,
                    "TT": "0",
                    "TM": "90",
                    "TS": "0",
                    "TU": "20191206132016",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1778",
                        "NA": "4th Goal",
                        "N2": "4th Goal",
                        "IT": "4f83eb712bfab9ad5891acb19323adc8",
                        "SU": "1",
                        "PA": [
                          {
                            "ID": "461274876",
                            "NA": "PS Barito Putera",
                            "N2": "Home",
                            "IT": "b7461a690a9ef4032e2b6b2700276106",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "0/0",
                              "D": "0.00",
                              "A": "+100"
                            }
                          },
                          {
                            "ID": "461274899",
                            "NA": "No 4th Goal",
                            "N2": "No 4th Goal",
                            "IT": "6877569feed244decf608a3efe296a28",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "0/0",
                              "D": "0.00",
                              "A": "+100"
                            }
                          },
                          {
                            "ID": "461274900",
                            "NA": "Semen Padang",
                            "N2": "Away",
                            "IT": "90e22022084a8bfe6207adc63af1492c",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "0/0",
                              "D": "0.00",
                              "A": "+100"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "f51f5c3a5eda83b5cdea72d3f4a0c774",
                "NA": "Israel Leumit Liga",
                "OR": "11",
                "EV": [
                  {
                    "FI": "84431447",
                    "IT": "fb08d15756481c00efac91db13d35ed3",
                    "OR": "0",
                    "NA": "Hapoel Bnei Lod vs Beitar Tel Aviv Bat Yam",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "80",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206125929",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "adc2c7586dbbf0ab8b729e3ca52906c2",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459251112",
                            "NA": "Hapoel Bnei Lod",
                            "N2": "Home",
                            "IT": "058950148325a3b60341b5b4ad006c49",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/1",
                              "D": "13.00",
                              "A": "+1200"
                            }
                          },
                          {
                            "ID": "459251113",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "5abba4d052faf24b74fd10bc485db08e",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "6/1",
                              "D": "7.00",
                              "A": "+600"
                            }
                          },
                          {
                            "ID": "459251114",
                            "NA": "Beitar Tel Aviv Bat Yam",
                            "N2": "Away",
                            "IT": "d388699b30993efcca9165444b0ed672",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/7",
                              "D": "1.14",
                              "A": -715
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84431451",
                    "IT": "41d67dd6d2c6439dffbe6e3648a2ddca",
                    "OR": "1",
                    "NA": "Hapoel Katamon Jerusalem vs Hapoel Akko",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "103",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206130022",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "65894c46f7b4a6dbed8c5125dcb30856",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459255654",
                            "NA": "Hapoel Katamon Jerusalem",
                            "N2": "Home",
                            "IT": "05fb11aba98463511e51e6b1e8d1c325",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          },
                          {
                            "ID": "459255658",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "30c1d95dc9b80fd94853933147c1b89e",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/4",
                              "D": "3.25",
                              "A": "+225"
                            }
                          },
                          {
                            "ID": "459255659",
                            "NA": "Hapoel Akko",
                            "N2": "Away",
                            "IT": "07c47434fe0100d15eb0ef2f4ec7d7ec",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "10/3",
                              "D": "4.33",
                              "A": "+333"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84431449",
                    "IT": "9ca2bb21d62e5606c0e8be49988b7442",
                    "OR": "2",
                    "NA": "Hapoel Umm al-Fahm vs Hapoel Nof HaGalil",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "79",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206130235",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "693f53572768c092fdd535e3bc1e60ce",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459252870",
                            "NA": "Hapoel Umm al-Fahm",
                            "N2": "Home",
                            "IT": "273b339ac8e4ac8a0a5539a3085e9be8",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/5",
                              "D": "2.40",
                              "A": "+140"
                            }
                          },
                          {
                            "ID": "459252872",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "d64ff052be563a08f4a9c91744db2268",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/8",
                              "D": "2.87",
                              "A": "+187"
                            }
                          },
                          {
                            "ID": "459252873",
                            "NA": "Hapoel Nof HaGalil",
                            "N2": "Away",
                            "IT": "b51ef84fa76c3b95f6010ea42888234c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/4",
                              "D": "3.25",
                              "A": "+225"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84598742",
                    "IT": "5f13b523e80c0e50421c55c99782abd4",
                    "OR": "3",
                    "NA": "Maccabi Ahi Nazareth vs Hapoel Petach Tikva",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "105",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206125947",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "cb8b5ef48ac90785e67e0efb507960c8",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459258305",
                            "NA": "Maccabi Ahi Nazareth",
                            "N2": "Home",
                            "IT": "a2cfe8f627025f250fc0b8afe39695ad",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "3/1",
                              "D": "4.00",
                              "A": "+300"
                            }
                          },
                          {
                            "ID": "459258306",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "8665bbe6d3f7c32f06a6da78d35b5879",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "21/10",
                              "D": "3.10",
                              "A": "+210"
                            }
                          },
                          {
                            "ID": "459258307",
                            "NA": "Hapoel Petach Tikva",
                            "N2": "Away",
                            "IT": "ae305b6cd00d8ffc65a61ef11c27d806",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/1",
                              "D": "2.00",
                              "A": -100
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84598745",
                    "IT": "5f577fd52eea62c8ab4834ecd05b08b8",
                    "OR": "4",
                    "NA": "Maccabi Petach Tikva vs FC Kafr Qasim",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "112",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206130355",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "562de28ee6b0d0e18c9777b883621a09",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459260489",
                            "NA": "Maccabi Petach Tikva",
                            "N2": "Home",
                            "IT": "dba9fb9e76fe72074036d6af0e10cb5c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "8/11",
                              "D": "1.72",
                              "A": -139
                            }
                          },
                          {
                            "ID": "459260490",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "eeb6eac6d5d3b1ab97d1ca442e25e338",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/2",
                              "D": "3.50",
                              "A": "+250"
                            }
                          },
                          {
                            "ID": "459260491",
                            "NA": "FC Kafr Qasim",
                            "N2": "Away",
                            "IT": "3bd8870b2256fe9cfabb368a9936f112",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/4",
                              "D": "4.75",
                              "A": "+375"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "49e9a7078d7cd3d287cd40c96d9a671d",
                "NA": "Israel Liga Alef South",
                "OR": "12",
                "EV": [
                  {
                    "FI": "84600496",
                    "IT": "12802aa0276c02b2d4ec496dfc2cac3a",
                    "OR": "0",
                    "NA": "Hapoel Kfar Shalem vs Hapoel Azor",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "17",
                    "PI": null,
                    "TT": "1",
                    "TM": "55",
                    "TS": "27",
                    "TU": "20191206124806",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "362268f157f76199a1a35aa93471e1e4",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459289188",
                            "NA": "Hapoel Kfar Shalem",
                            "N2": "Home",
                            "IT": "f7aee82d9c2d1a83b3054a8a3b687b9c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/10",
                              "D": "1.10",
                              "A": -1000
                            }
                          },
                          {
                            "ID": "459289189",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "60a2a9d307b349c70f8ef5d61f251354",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "6/1",
                              "D": "7.00",
                              "A": "+600"
                            }
                          },
                          {
                            "ID": "459289190",
                            "NA": "Hapoel Azor",
                            "N2": "Away",
                            "IT": "db1f5a2b2d89162a4bcabc230eeade87",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "33/1",
                              "D": "34.00",
                              "A": "+3300"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "bbeedfa0cc884ff55dffc9d192c1f7f0",
                "NA": "Israel Liga Bet North",
                "OR": "13",
                "EV": [
                  {
                    "FI": "84615428",
                    "IT": "82409a71533137a932121750b1ab790e",
                    "OR": "0",
                    "NA": "Ahi Akko vs Hapoel Bu'eine",
                    "SS": "1-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "40",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206131808",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "1dcb458603d91173291c3db2fbb5d681",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459299085",
                            "NA": "Ahi Akko",
                            "N2": "Home",
                            "IT": "a58552b88f2c46819506404142ebf4cc",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "25/1",
                              "D": "26.00",
                              "A": "+2500"
                            }
                          },
                          {
                            "ID": "459299086",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "e8fa82c041476b3842b4c175a8ee9deb",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/1",
                              "D": "10.00",
                              "A": "+900"
                            }
                          },
                          {
                            "ID": "459299087",
                            "NA": "Hapoel Bu'eine",
                            "N2": "Away",
                            "IT": "acc56fb3772b98b62e0fd3cb734cc388",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/16",
                              "D": "1.06",
                              "A": -1667
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84648422",
                    "IT": "25fa2a574c1c9f2763fd7a9768af7707",
                    "OR": "1",
                    "NA": "Ihud Bnei Baqa vs Hapoel Ramot Menashe",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "62",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191206124934",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "cbe85f8251c19772e7a7d30a5074b639",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459728814",
                            "NA": "Ihud Bnei Baqa",
                            "N2": "Home",
                            "IT": "eb956f27061edeb76cc82e85ffc6c27b",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/10",
                              "D": "2.10",
                              "A": "+110"
                            }
                          },
                          {
                            "ID": "459728815",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "95532bc46284925afcc64301b1a345ac",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "2/1",
                              "D": "3.00",
                              "A": "+200"
                            }
                          },
                          {
                            "ID": "459728816",
                            "NA": "Hapoel Ramot Menashe",
                            "N2": "Away",
                            "IT": "d9f8f276ca7ef87e94e263a71748ebb3",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/2",
                              "D": "3.50",
                              "A": "+250"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84626450",
                    "IT": "8572e4b88bd1a5a61ea6c294d80dfd4b",
                    "OR": "2",
                    "NA": "Tzeirei Sakhnin vs FC Ahva Kfar Manda",
                    "SS": "1-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "40",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206131938",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "6cbaa8f67ccc02a1287c4b825b5264e8",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459302559",
                            "NA": "Tzeirei Sakhnin",
                            "N2": "Home",
                            "IT": "1b8b41e9b98ca0481685ea47a7a99fa3",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/4",
                              "D": "3.75",
                              "A": "+275"
                            }
                          },
                          {
                            "ID": "459302560",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "66cb625156f49b7c88b419b1f53b3b25",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "8/5",
                              "D": "2.60",
                              "A": "+160"
                            }
                          },
                          {
                            "ID": "459302561",
                            "NA": "FC Ahva Kfar Manda",
                            "N2": "Away",
                            "IT": "930bbdabba909aa0ca5cb21204a96f73",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/4",
                              "D": "2.25",
                              "A": "+125"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "fd7236dcb2172a0e5dfd4330b6990d7a",
                "NA": "Israel Youth Cup",
                "OR": "14",
                "EV": [
                  {
                    "FI": "84646051",
                    "IT": "e103df417cd3953eee7e0f8d7181cac7",
                    "OR": "0",
                    "NA": "SC Beer Sheva U19 vs Maccabi Ironi Kiryat Ata U19",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "16",
                    "PI": null,
                    "TT": "1",
                    "TM": "46",
                    "TS": "31",
                    "TU": "20191206130407",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "7f6dcf2ca1f05b2223c06ace2dcde194",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459735562",
                            "NA": "SC Beer Sheva U19",
                            "N2": "Home",
                            "IT": "6cae0efb9e34c2b294c9e8e542c87580",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "16/1",
                              "D": "17.00",
                              "A": "+1600"
                            }
                          },
                          {
                            "ID": "459735570",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "6310df473c8048c01d2b667d5547f7de",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/2",
                              "D": "6.50",
                              "A": "+550"
                            }
                          },
                          {
                            "ID": "459735572",
                            "NA": "Maccabi Ironi Kiryat Ata U19",
                            "N2": "Away",
                            "IT": "c1863474c50f84def7b43f515de38402",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/8",
                              "D": "1.12",
                              "A": -834
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "d979f7ede088b87916ab81feb489289b",
                "NA": "Kuwait Youth League",
                "OR": "15",
                "EV": [
                  {
                    "FI": "84598278",
                    "IT": "01831ef20c1334129e1416722d0537b3",
                    "OR": "0",
                    "NA": "Al Salmiyah SC U20 vs Burgan SC U20",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "55",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206130228",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "b715b98443d8c62d8a3c670b3b8742bb",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459361077",
                            "NA": "Al Salmiyah SC U20",
                            "N2": "Home",
                            "IT": "3cb257cd18b53083c36f27c7e7a6ebf6",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/7",
                              "D": "1.14",
                              "A": -715
                            }
                          },
                          {
                            "ID": "459361078",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "a0bde4786041506eeec3d7fc5bb11c17",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "13/2",
                              "D": "7.50",
                              "A": "+650"
                            }
                          },
                          {
                            "ID": "459361079",
                            "NA": "Burgan SC U20",
                            "N2": "Away",
                            "IT": "240e3b782fc6a95f7891697edb85e2be",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/1",
                              "D": "10.00",
                              "A": "+900"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "029ebe23b9c3a84046a78a57566acb3a",
                "NA": "Saudi Arabia Cup",
                "OR": "16",
                "EV": [
                  {
                    "FI": "84600680",
                    "IT": "7dbbd6aee74c90a33ad4774af8048474",
                    "OR": "0",
                    "NA": "Al Ain FC vs Al Taawon Buraidah",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "63",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206123505",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "9574f325cffc45ee1aa1dc8b05ddebd5",
                        "SU": "1",
                        "PA": [
                          {
                            "ID": "459754960",
                            "NA": "Al Ain FC",
                            "N2": "Home",
                            "IT": "d7639443556122b7b8cf1fcadc511e8e",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "16/1",
                              "D": "17.00",
                              "A": "+1600"
                            }
                          },
                          {
                            "ID": "459754961",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "6705656765f248a4c30665ca7569d92e",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "11/2",
                              "D": "6.50",
                              "A": "+550"
                            }
                          },
                          {
                            "ID": "459754962",
                            "NA": "Al Taawon Buraidah",
                            "N2": "Away",
                            "IT": "7332aa8bf97a2328433e4f537254c299",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "1/7",
                              "D": "1.14",
                              "A": -715
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84600682",
                    "IT": "b4c9786c7ea6c1ea092389fef06c6f91",
                    "OR": "1",
                    "NA": "Al Raed vs Al Mojzel",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "69",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206131822",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "8b05e01cd207a97662a3ba969f7df4d2",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459756640",
                            "NA": "Al Raed",
                            "N2": "Home",
                            "IT": "00e19a4dc3672cf1c99ae23f3f908a8e",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/11",
                              "D": "1.36",
                              "A": -278
                            }
                          },
                          {
                            "ID": "459756641",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "869240d1d20fb495afeaf6be56daefce",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/2",
                              "D": "3.50",
                              "A": "+250"
                            }
                          },
                          {
                            "ID": "459756642",
                            "NA": "Al Mojzel",
                            "N2": "Away",
                            "IT": "f35935a6d5f74bd5731314d4644615b2",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "14/1",
                              "D": "15.00",
                              "A": "+1400"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "81c570dab4723848112e41712c51abfd",
                "NA": "Saudi Arabia Division 2",
                "OR": "17",
                "EV": [
                  {
                    "FI": "84626438",
                    "IT": "12bc27835642dfa46e0510d9062404f3",
                    "OR": "0",
                    "NA": "Al Entesar Club vs Al Jndal",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "75",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191206124749",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "73c2ff0e6303a1e397da6d6326fed864",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459394984",
                            "NA": "Al Entesar Club",
                            "N2": "Home",
                            "IT": "27aa12a6c021aecb3d93b9dbcb41886c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/1",
                              "D": "8.00",
                              "A": "+700"
                            }
                          },
                          {
                            "ID": "459394986",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "d7a2e585dac5a2082d8135f17323e7d7",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/2",
                              "D": "4.50",
                              "A": "+350"
                            }
                          },
                          {
                            "ID": "459394989",
                            "NA": "Al Jndal",
                            "N2": "Away",
                            "IT": "dcc92794b637aabf1830f2a9173adc8a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/3",
                              "D": "1.33",
                              "A": -304
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84600674",
                    "IT": "1a8ba024810f6cf58a69ca6b12f353da",
                    "OR": "1",
                    "NA": "Al Jubail Club vs Al Suqoor",
                    "SS": "0-3",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "36",
                    "PI": null,
                    "TT": "1",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191206130453",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "35b5169922ed402676bfbb38feccf9eb",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459390008",
                            "NA": "Al Jubail Club",
                            "N2": "Home",
                            "IT": "638e57dc4888d8f3c4b8b31cc46d9af5",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "28/1",
                              "D": "29.00",
                              "A": "+2800"
                            }
                          },
                          {
                            "ID": "459390009",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "8d653e4389f3a363ddaf286c39e4ed4a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "20/1",
                              "D": "21.00",
                              "A": "+2000"
                            }
                          },
                          {
                            "ID": "459390010",
                            "NA": "Al Suqoor",
                            "N2": "Away",
                            "IT": "d5ca36e6199240d419ec8a6293d8fbbf",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/66",
                              "D": "1.01",
                              "A": -10000
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "4af482152fd3d92500efc273fae428a8",
                "NA": "UAE Division 1",
                "OR": "18",
                "EV": [
                  {
                    "FI": "84596485",
                    "IT": "6fccb1015c4a91099496121452f08999",
                    "OR": "0",
                    "NA": "Al Bataeh vs Masafi",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "67",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191206123936",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "2daabeec84bc1f7b55b82674b4ece8e5",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459533208",
                            "NA": "Al Bataeh",
                            "N2": "Home",
                            "IT": "0f8934e164811619d342932b699b67e0",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/11",
                              "D": "1.09",
                              "A": -1112
                            }
                          },
                          {
                            "ID": "459533210",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "596a2fe132abe239be9653a913027761",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/1",
                              "D": "8.00",
                              "A": "+700"
                            }
                          },
                          {
                            "ID": "459533212",
                            "NA": "Masafi",
                            "N2": "Away",
                            "IT": "8c968dec8e238a3531cfca34df282615",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "16/1",
                              "D": "17.00",
                              "A": "+1600"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84615440",
                    "IT": "2b2894ae72b378ebf9150c224bcee91f",
                    "OR": "1",
                    "NA": "Dubba Al Husun vs Al Arabi Umm Al Quwain",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "58",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191206124231",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "47fb02fde73d1740b9942ecc25f65971",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459517913",
                            "NA": "Dubba Al Husun",
                            "N2": "Home",
                            "IT": "140d04725028f56d7cc1182cfea0cdc1",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/7",
                              "D": "1.14",
                              "A": -715
                            }
                          },
                          {
                            "ID": "459517914",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "616bef87dcbe7e2354d9a271919460e8",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/2",
                              "D": "6.50",
                              "A": "+550"
                            }
                          },
                          {
                            "ID": "459517915",
                            "NA": "Al Arabi Umm Al Quwain",
                            "N2": "Away",
                            "IT": "6625a91e3b22c222d9fc644f7f8bc900",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/1",
                              "D": "13.00",
                              "A": "+1200"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "0b818c02cfd17097a780913cc198ee41",
                "NA": "Uruguay Reserve League",
                "OR": "19",
                "EV": [
                  {
                    "FI": "84640811",
                    "IT": "d8646cac735b73b041d42ccba5a37624",
                    "OR": "0",
                    "NA": "Boston River Reserves vs Montevideo Wanderers Reserves",
                    "SS": "2-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "57",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191206123433",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "d09b9ef09ce91e68fbdc073b8d15ba24",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459539309",
                            "NA": "Boston River Reserves",
                            "N2": "Home",
                            "IT": "4b3391f1a3602636c151c772c874387d",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "8/13",
                              "D": "1.61",
                              "A": -164
                            }
                          },
                          {
                            "ID": "459539312",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "7c32e8540d8e3b1da94889578ab11e5f",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/4",
                              "D": "3.75",
                              "A": "+275"
                            }
                          },
                          {
                            "ID": "459539313",
                            "NA": "Montevideo Wanderers Reserves",
                            "N2": "Away",
                            "IT": "c98c8fc59ea8c02fdd6a5907c3e2ad95",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/4",
                              "D": "4.75",
                              "A": "+375"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "69a613f8a4f91067c128b193f2ef1dc4",
                "NA": "England Premier League 2",
                "OR": "20",
                "EV": [
                  {
                    "FI": "84603095",
                    "IT": "7a248a7a16d5bf186908043c19853584",
                    "OR": "0",
                    "NA": "Tottenham U23 vs Liverpool U23",
                    "SS": "3-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "37",
                    "PI": null,
                    "TT": "1",
                    "TM": "46",
                    "TS": "5",
                    "TU": "20191206130614",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "08d515c83e7c3f1451502039195429f6",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458808606",
                            "NA": "Tottenham U23",
                            "N2": "Home",
                            "IT": "9b6c47a73d1d472330d8f3013a4b9624",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/250",
                              "D": "1.00",
                              "A": 0
                            }
                          },
                          {
                            "ID": "458808608",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "8da7b5450b306c99413ce6bc4da2bf04",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "40/1",
                              "D": "41.00",
                              "A": "+4000"
                            }
                          },
                          {
                            "ID": "458808610",
                            "NA": "Liverpool U23",
                            "N2": "Away",
                            "IT": "a91049fb1088a7f1386d917835c54ab2",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "40/1",
                              "D": "41.00",
                              "A": "+4000"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "dcfdf180bb9bc89806a43e186624f599",
                "NA": "Beach Soccer - 36 mins play",
                "OR": "21",
                "EV": [
                  {
                    "FI": "84671966",
                    "IT": "c219012f40d72e330854046ea47a8ae9",
                    "OR": "0",
                    "NA": "AIS PSJ Beach vs BSC Lions Riviera Beach",
                    "SS": "4-5",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "7",
                    "PI": null,
                    "TT": "1",
                    "TM": "29",
                    "TS": "5",
                    "TU": "20191206132033",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "75a5cedb62caaf2dfa47013b12c16ffb",
                        "SU": "1",
                        "PA": [
                          {
                            "ID": "461105147",
                            "NA": "AIS PSJ Beach",
                            "N2": "Home",
                            "IT": "02091c088d44644f11ac0b2771a6c2be",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "3/1",
                              "D": "4.00",
                              "A": "+300"
                            }
                          },
                          {
                            "ID": "461105148",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "b8ee607fff37d10b906f8be841e31899",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "10/3",
                              "D": "4.33",
                              "A": "+333"
                            }
                          },
                          {
                            "ID": "461105149",
                            "NA": "BSC Lions Riviera Beach",
                            "N2": "Away",
                            "IT": "fa1d1d1cff60b4ae367353113dff9aa5",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "8/13",
                              "D": "1.61",
                              "A": -164
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "ID": "13",
            "NA": "Tennis",
            "OR": "1",
            "IT": "2199f10f735d8d100cc05283d7c15424",
            "CT": [
              {
                "IT": "c28c89f9c475cfe854facfe34b3fea21",
                "NA": "ITF M15 Heraklion",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84646553",
                    "IT": "0f5a1df85843a0ad9d5e9fbcf7084b2c",
                    "OR": "0",
                    "NA": "Alexandar Lazarov vs Boris Pokotilov",
                    "SS": "6-7,7-5,2-5",
                    "XP": "15-40",
                    "DC": "0",
                    "CP": "",
                    "LM": "18",
                    "PI": "1,0",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "3b4f6d8b286e1d26010a8a5a7e153a8c",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460353886",
                            "NA": "Alexandar Lazarov",
                            "N2": "Home",
                            "IT": "a77e9b36979001def5382ddd60c97c19",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "14/1",
                              "D": "15.00",
                              "A": "+1400"
                            }
                          },
                          {
                            "ID": "460353883",
                            "NA": "Boris Pokotilov",
                            "N2": "Away",
                            "IT": "bb15317912242eba4f21a7a60612ca67",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/66",
                              "D": "1.01",
                              "A": -10000
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "5b0b8ae6115026255f9f5d21998f58ee",
                "NA": "ITF M15 Cairo",
                "OR": "1",
                "EV": [
                  {
                    "FI": "84647394",
                    "IT": "8180f43a1ef33866c8a9510156f9422f",
                    "OR": "0",
                    "NA": "Simone Roncalli vs Oleg Prihodko",
                    "SS": "4-6,4-5",
                    "XP": "A-40",
                    "DC": "0",
                    "CP": "",
                    "LM": "26",
                    "PI": "0,1",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "3f4355c55a9348d9d4bcff592b029fe1",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460348994",
                            "NA": "Simone Roncalli",
                            "N2": "Home",
                            "IT": "78586a6338c21154424a5a62a880e7e2",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/1",
                              "D": "6.00",
                              "A": "+500"
                            }
                          },
                          {
                            "ID": "460348993",
                            "NA": "Oleg Prihodko",
                            "N2": "Away",
                            "IT": "d4aa337b7c745e41200c05887079cfea",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/9",
                              "D": "1.11",
                              "A": -910
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "b633941792130d7fe6f7c8841546023d",
                "NA": "ITF W15 Cairo",
                "OR": "2",
                "EV": [
                  {
                    "FI": "84647569",
                    "IT": "6cc3f965fdfa16989f8999bbee769674",
                    "OR": "0",
                    "NA": "Lamis Alhussein Abdel Aziz vs Nastja Kolar",
                    "SS": "6-7,6-4,1-0",
                    "XP": "40-A",
                    "DC": "0",
                    "CP": "",
                    "LM": "7",
                    "PI": "0,1",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "ec535f72d6c331c5a0606417eb754c92",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460349770",
                            "NA": "Lamis Alhussein Abdel Aziz",
                            "N2": "Home",
                            "IT": "f960c231623728d4750f340184ae019c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/10",
                              "D": "2.10",
                              "A": "+110"
                            }
                          },
                          {
                            "ID": "460349768",
                            "NA": "Nastja Kolar",
                            "N2": "Away",
                            "IT": "3a27f9af795bbc6865caa5b8cc575765",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/6",
                              "D": "1.66",
                              "A": -152
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "9d2b6b09fb2faf576b8ba3db6c946d0a",
                "NA": "ITF W15 Heraklion WD",
                "OR": "3",
                "EV": [
                  {
                    "FI": "84645442",
                    "IT": "bc94cd62ff9531700e7d4f8df16ec97a",
                    "OR": "0",
                    "NA": "Gamiz/Silva vs D Szabo/Svatikova",
                    "SS": "6-2,2-0",
                    "XP": "15-30",
                    "DC": "0",
                    "CP": "",
                    "LM": "11",
                    "PI": "0,1",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "80642d42c8bcba58cd324891238ff1c2",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460355502",
                            "NA": "Gamiz/Silva",
                            "N2": "Home",
                            "IT": "a900fcf5ca7b03b5f8607cc6660748ce",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/14",
                              "D": "1.07",
                              "A": -1429
                            }
                          },
                          {
                            "ID": "460355501",
                            "NA": "D Szabo/Svatikova",
                            "N2": "Away",
                            "IT": "9e678e78aa3d0301eb419c4d88437f3f",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "13/2",
                              "D": "7.50",
                              "A": "+650"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "5217d4f8261ca5b72f4420f3892254a3",
                "NA": "ITF M15 Heraklion MD",
                "OR": "4",
                "EV": [
                  {
                    "FI": "84652394",
                    "IT": "161909a073ca60d072757467e3da4e81",
                    "OR": "0",
                    "NA": "Carr/Nijboer vs Pichler/Sachko",
                    "SS": "1-6,4-5",
                    "XP": "40-15",
                    "DC": "0",
                    "CP": "",
                    "LM": "23",
                    "PI": "1,0",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "c8ac2adc60ca81e39bcdf70452765267",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460354247",
                            "NA": "Carr/Nijboer",
                            "N2": "Home",
                            "IT": "3b139c6c20a7e3eec7ac87a2ab498527",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/1",
                              "D": "8.00",
                              "A": "+700"
                            }
                          },
                          {
                            "ID": "460354246",
                            "NA": "Pichler/Sachko",
                            "N2": "Away",
                            "IT": "495c3249af9ed5baf0ae611b006d84f8",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/16",
                              "D": "1.06",
                              "A": -1667
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "fca70ebf7c2e254bd7d29eb4eae0da8a",
                "NA": "ITF M15 Monastir MD",
                "OR": "5",
                "EV": [
                  {
                    "FI": "84653190",
                    "IT": "ec333356f0d91314c57f9fd5ba533310",
                    "OR": "0",
                    "NA": "Hemery/Lakat vs Michnev/Svrcina",
                    "SS": "1-1",
                    "XP": "15-15",
                    "DC": "0",
                    "CP": "",
                    "LM": "38",
                    "PI": "0,1",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "53cdbc39d97773d832e5c4502cbc3afb",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460363733",
                            "NA": "Hemery/Lakat",
                            "N2": "Home",
                            "IT": "15b95ddf27eeff32a106aa3450698127",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "2/5",
                              "D": "1.40",
                              "A": -251
                            }
                          },
                          {
                            "ID": "460363732",
                            "NA": "Michnev/Svrcina",
                            "N2": "Away",
                            "IT": "2eb28fd41bae2f8120e0fc232d62083b",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/4",
                              "D": "2.75",
                              "A": "+175"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "6c7874f53d8a976a519949f8142abefa",
                "NA": "ITF M15 Cairo MD",
                "OR": "6",
                "EV": [
                  {
                    "FI": "84649845",
                    "IT": "af8ee0065ca77dad5a5cad08d6fe0f24",
                    "OR": "0",
                    "NA": "Grigelis/Perez Sanz vs Uspensky/Vidal Azorin",
                    "SS": "2-1",
                    "XP": "0-0",
                    "DC": "0",
                    "CP": "",
                    "LM": "8",
                    "PI": "0,1",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "2562fe0f48bd72c098f2d7233060fdab",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460349169",
                            "NA": "Grigelis/Perez Sanz",
                            "N2": "Home",
                            "IT": "039a874e4b877892dbc50adae82058a4",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/4",
                              "D": "1.25",
                              "A": -400
                            }
                          },
                          {
                            "ID": "460349168",
                            "NA": "Uspensky/Vidal Azorin",
                            "N2": "Away",
                            "IT": "8bfed56aaab7e2cdc375ebbf86f8a923",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/4",
                              "D": "3.75",
                              "A": "+275"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "de435f1caf46f1e92635c33831a759e6",
                "NA": "ITF W15 Monastir WD",
                "OR": "7",
                "EV": [
                  {
                    "FI": "84654413",
                    "IT": "0872e4eaa8de34df91435918d9a8fc95",
                    "OR": "0",
                    "NA": "Arcangioli/Le Bihan vs Dema/Karpovich",
                    "SS": "0-0",
                    "XP": "0-0",
                    "DC": "0",
                    "CP": "",
                    "LM": "8",
                    "PI": "1,0",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "59f11c49cb737f54542edf9e08035792",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460365642",
                            "NA": "Arcangioli/Le Bihan",
                            "N2": "Home",
                            "IT": "1eac51fa7cceec7439c2c610f25606d1",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "3/4",
                              "D": "1.75",
                              "A": -134
                            }
                          },
                          {
                            "ID": "460365641",
                            "NA": "Dema/Karpovich",
                            "N2": "Away",
                            "IT": "52060e62c5035ddbadefaa998527ff48",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/1",
                              "D": "2.00",
                              "A": -100
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84654414",
                    "IT": "3aac5ff351abcdabd0fe34bca1b93539",
                    "OR": "1",
                    "NA": "Echeverria Alam/Raggi vs Monnet/Tkacheva",
                    "SS": "4-5",
                    "XP": "15-0",
                    "DC": "0",
                    "CP": "",
                    "LM": "28",
                    "PI": "1,0",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "ba4baeac419a9711cecec85b664c16ce",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460365762",
                            "NA": "Echeverria Alam/Raggi",
                            "N2": "Home",
                            "IT": "938e6878edab889d379dad6836939800",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/5",
                              "D": "3.40",
                              "A": "+240"
                            }
                          },
                          {
                            "ID": "460365761",
                            "NA": "Monnet/Tkacheva",
                            "N2": "Away",
                            "IT": "525eb6bf5e682076139d3f37dff764c2",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "3/10",
                              "D": "1.30",
                              "A": -334
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "13abe2bd98bc3f6b27e81038bd8a3eae",
                "NA": "ITF W15 Cairo WD",
                "OR": "8",
                "EV": [
                  {
                    "FI": "84649766",
                    "IT": "12b501ba78dbfd0f13c407e39e58977d",
                    "OR": "0",
                    "NA": "Lavino/Marfutina vs Steur/Steur",
                    "SS": "0-0",
                    "XP": "15-0",
                    "DC": "0",
                    "CP": "",
                    "LM": "41",
                    "PI": "1,0",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "85769a0c79a51d84cd4e1db339ed189e",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460350295",
                            "NA": "Lavino/Marfutina",
                            "N2": "Home",
                            "IT": "6e557f2f1829bbb7435bc0b3d8377d62",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "6/5",
                              "D": "2.20",
                              "A": "+120"
                            }
                          },
                          {
                            "ID": "460350294",
                            "NA": "Steur/Steur",
                            "N2": "Away",
                            "IT": "5c3e2afb7939f688836515703d7212a3",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "8/13",
                              "D": "1.61",
                              "A": -164
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "6445397d300b9058df4e43b9791db71f",
                "NA": "ITF W15 Jablonec nad Nisou WD",
                "OR": "9",
                "EV": [
                  {
                    "FI": "84652760",
                    "IT": "52e87757724cd8370abdd1b40f6236a3",
                    "OR": "0",
                    "NA": "Jablonovska/Tomanova vs Berankova/Miklova",
                    "SS": "1-2",
                    "XP": "0-0",
                    "DC": "0",
                    "CP": "",
                    "LM": "33",
                    "PI": "0,1",
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1763",
                        "NA": "Match Winner",
                        "N2": "Match Winner",
                        "IT": "8443f77984a446c0caa824cccb6f03b1",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460370907",
                            "NA": "Jablonovska/Tomanova",
                            "N2": "Home",
                            "IT": "41aca058d4a2b6c9ab82b6571588dcf7",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "21/20",
                              "D": "2.04",
                              "A": "+104"
                            }
                          },
                          {
                            "ID": "460370906",
                            "NA": "Berankova/Miklova",
                            "N2": "Away",
                            "IT": "3472588f54add9ff38c03ac5e5d80246",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/10",
                              "D": "1.70",
                              "A": -143
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "ID": "18",
            "NA": "Basketball",
            "OR": "2",
            "IT": "b74a0e8c267e4ce0ccd026a860a47a49",
            "CT": [
              {
                "IT": "4e50877658c722ddeab420596dd2a2ad",
                "NA": "China CBA",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84383539",
                    "IT": "382ce3a5bbf77d86243c50ba47d0927c",
                    "OR": "0",
                    "NA": "Beijing Royal Fighters vs Shandong Heroes",
                    "SS": "77-89",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q4",
                    "LM": "25",
                    "PI": null,
                    "TT": "0",
                    "TM": "4",
                    "TS": "42",
                    "TU": "20191206132022",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "72ee2c2569feb4598b0d5f300d3055ed",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459467070",
                            "NA": "Beijing Royal Fighters",
                            "N2": "Home",
                            "IT": "8bb44aebe6474b7a64720f3d1bc4e679",
                            "SU": "0",
                            "HA": "+10.5",
                            "OD": {
                              "F": "10/11",
                              "D": "1.90",
                              "A": -112
                            }
                          },
                          {
                            "ID": "459467075",
                            "NA": "Shandong Heroes",
                            "N2": "Away",
                            "IT": "b98caf9687539837429927d3f9e078c1",
                            "SU": "0",
                            "HA": "-10.5",
                            "OD": {
                              "F": "10/13",
                              "D": "1.76",
                              "A": -132
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84383542",
                    "IT": "21e7a05680187b183bf3c0080e0643de",
                    "OR": "1",
                    "NA": "Fujian Sturgeons vs Shanghai Sharks",
                    "SS": "111-73",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q4",
                    "LM": "56",
                    "PI": null,
                    "TT": "0",
                    "TM": "7",
                    "TS": "44",
                    "TU": "20191206132014",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "1580daec70eca3040f23d98bf183256f",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459470118",
                            "NA": "Fujian Sturgeons",
                            "N2": "Home",
                            "IT": "1161c4be46d4e9c5a8500fdceffec451",
                            "SU": "0",
                            "HA": "-35.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          },
                          {
                            "ID": "459470119",
                            "NA": "Shanghai Sharks",
                            "N2": "Away",
                            "IT": "dae787b26b9402b10bc964c62f8e556c",
                            "SU": "0",
                            "HA": "+35.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84383545",
                    "IT": "2b5b879ac556903e14f5046cb586a0f4",
                    "OR": "2",
                    "NA": "Nanjing Monkey King vs Zhejiang Golden Bulls",
                    "SS": "98-91",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q4",
                    "LM": "63",
                    "PI": null,
                    "TT": "0",
                    "TM": "7",
                    "TS": "6",
                    "TU": "20191206131935",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "f8b29eea63cf89f013413fbae9f05442",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459507008",
                            "NA": "Nanjing Monkey King",
                            "N2": "Home",
                            "IT": "a97e4a1230c18a441bb51731ec9957b3",
                            "SU": "0",
                            "HA": "-3.5",
                            "OD": {
                              "F": "4/5",
                              "D": "1.80",
                              "A": -125
                            }
                          },
                          {
                            "ID": "459507011",
                            "NA": "Zhejiang Golden Bulls",
                            "N2": "Away",
                            "IT": "1881cfebfd60ebf6e652b405a3561670",
                            "SU": "0",
                            "HA": "+3.5",
                            "OD": {
                              "F": "20/23",
                              "D": "1.86",
                              "A": -117
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84622268",
                    "IT": "ef0edf99dfd983a3626c9dbeff5b6271",
                    "OR": "3",
                    "NA": "Zhejiang Lions vs Tianjin Gold Lions",
                    "SS": "95-81",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q4",
                    "LM": "18",
                    "PI": null,
                    "TT": "1",
                    "TM": "5",
                    "TS": "47",
                    "TU": "20191206132031",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "150fead801ecbc2ee295d538bdc9acf6",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459510937",
                            "NA": "Zhejiang Lions",
                            "N2": "Home",
                            "IT": "98f6c95d2b00525445c5c8a28c7c4171",
                            "SU": "0",
                            "HA": "-16.5",
                            "OD": {
                              "F": "20/23",
                              "D": "1.86",
                              "A": -117
                            }
                          },
                          {
                            "ID": "459510938",
                            "NA": "Tianjin Gold Lions",
                            "N2": "Away",
                            "IT": "73b9e47ee864b229d2612ea3fd465cea",
                            "SU": "0",
                            "HA": "+16.5",
                            "OD": {
                              "F": "4/5",
                              "D": "1.80",
                              "A": -125
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "62e30ca689023a905e91e32fb06e86d0",
                "NA": "South East Asian Games",
                "OR": "1",
                "EV": [
                  {
                    "FI": "84612384",
                    "IT": "1ced1745673a8eecfc45f854fb80fc4a",
                    "OR": "0",
                    "NA": "Philippines vs Vietnam",
                    "SS": "62-42",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q3",
                    "LM": "42",
                    "PI": null,
                    "TT": "1",
                    "TM": "7",
                    "TS": "5",
                    "TU": "20191206132027",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "20465ef819d5a245b569035e5b815f89",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459515385",
                            "NA": "Philippines",
                            "N2": "Home",
                            "IT": "95b002bfa36d34d0446ec38162e84de1",
                            "SU": "0",
                            "HA": "-33.5",
                            "OD": {
                              "F": "20/23",
                              "D": "1.86",
                              "A": -117
                            }
                          },
                          {
                            "ID": "459515388",
                            "NA": "Vietnam",
                            "N2": "Away",
                            "IT": "effafde8950c3fcf0a1be2a507817de0",
                            "SU": "0",
                            "HA": "+33.5",
                            "OD": {
                              "F": "4/5",
                              "D": "1.80",
                              "A": -125
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "86242cf15cafbf26aab6f540f359847e",
                "NA": "Russia ASB Student League Women",
                "OR": "2",
                "EV": [
                  {
                    "FI": "84648477",
                    "IT": "435a90960d8002ce86e2e47481683a41",
                    "OR": "0",
                    "NA": "IzhGSKHA Izhevsk Women vs GGPI Izhevsk Women",
                    "SS": "41-8",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q3",
                    "LM": "3",
                    "PI": null,
                    "TT": "1",
                    "TM": "9",
                    "TS": "31",
                    "TU": "20191206132028",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "4aa5d212da66dbc6f42210da9b352f65",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459386635",
                            "NA": "IzhGSKHA Izhevsk Women",
                            "N2": "Home",
                            "IT": "71d81d1c758e04de975296df94d28ae7",
                            "SU": "0",
                            "HA": "-61.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          },
                          {
                            "ID": "459386639",
                            "NA": "GGPI Izhevsk Women",
                            "N2": "Away",
                            "IT": "51845305638cc56238ecf366709b32ce",
                            "SU": "0",
                            "HA": "+61.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "273430dbd2efb282c7b731d9b728030b",
                "NA": "Kazakhstan National League",
                "OR": "3",
                "EV": [
                  {
                    "FI": "84388048",
                    "IT": "e04c75c77932118cbd28330c611f301a",
                    "OR": "0",
                    "NA": "Sinegoryie vs Tobol Kostanay",
                    "SS": "20-23",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q2",
                    "LM": "5",
                    "PI": null,
                    "TT": "0",
                    "TM": "10",
                    "TS": "0",
                    "TU": "20191206131915",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "44715471debfe0390d816aa7a34de530",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "458362084",
                            "NA": "Sinegoryie",
                            "N2": "Home",
                            "IT": "b7cad5e4cace09aa7b26a9cc522b37d8",
                            "SU": "0",
                            "HA": "+6.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          },
                          {
                            "ID": "458362085",
                            "NA": "Tobol Kostanay",
                            "N2": "Away",
                            "IT": "88acea94d5a039570fcc39beab924184",
                            "SU": "0",
                            "HA": "-6.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "0e63cb6d3238a6e947e68b2f3f00d0ca",
                "NA": "Turkey TB2L",
                "OR": "4",
                "EV": [
                  {
                    "FI": "84614641",
                    "IT": "f4d740232a7cd21b25be736b5fcddbe2",
                    "OR": "0",
                    "NA": "Ege Universitesi vs Bornova Bossan",
                    "SS": "51-46",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q4",
                    "LM": "35",
                    "PI": null,
                    "TT": "1",
                    "TM": "7",
                    "TS": "59",
                    "TU": "20191206132030",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "d6cd0b527144c57d53bd4be1ac04338c",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459513053",
                            "NA": "Ege Universitesi",
                            "N2": "Home",
                            "IT": "9a1f7272580d803fc530258de62c207f",
                            "SU": "0",
                            "HA": "-4.5",
                            "OD": {
                              "F": "10/13",
                              "D": "1.76",
                              "A": -132
                            }
                          },
                          {
                            "ID": "459513054",
                            "NA": "Bornova Bossan",
                            "N2": "Away",
                            "IT": "9d03a111ba63dfbb826fc6f77a2ee1c8",
                            "SU": "0",
                            "HA": "+4.5",
                            "OD": {
                              "F": "10/11",
                              "D": "1.90",
                              "A": -112
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "a32cc1918ede17c8bc991486615df34b",
                "NA": "Finland Korisliigan",
                "OR": "5",
                "EV": [
                  {
                    "FI": "84392187",
                    "IT": "8a4f8723a45acbf690a9ca25f7ef2aa7",
                    "OR": "0",
                    "NA": "Lapuan Korikobrat vs Kouvot",
                    "SS": "18-17",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q2",
                    "LM": "111",
                    "PI": null,
                    "TT": "0",
                    "TM": "10",
                    "TS": "0",
                    "TU": "20191206131931",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "3a892131c50529e55aea13ef7729b74f",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459538716",
                            "NA": "Lapuan Korikobrat",
                            "N2": "Home",
                            "IT": "700e6f862afeb481e396dc0d78f9182d",
                            "SU": "0",
                            "HA": "+1.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          },
                          {
                            "ID": "459538718",
                            "NA": "Kouvot",
                            "N2": "Away",
                            "IT": "6334628bd3e68d833d82dee8b7121f9e",
                            "SU": "0",
                            "HA": "-1.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "ID": "78",
            "NA": "Handball",
            "OR": "7",
            "IT": "84a0671dbcefccfa0761f5bec0f0859a",
            "CT": [
              {
                "IT": "1f288c1bc3b3aefc028f164bb1d8f1b6",
                "NA": "Israel Winner Cup",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84612611",
                    "IT": "2f0f3d63ce1a7aa281823d7c395b2af2",
                    "OR": "0",
                    "NA": "HC Beersheba vs HC Holon",
                    "SS": "28-26",
                    "XP": null,
                    "DC": "1",
                    "CP": "2nd",
                    "LM": "12",
                    "PI": null,
                    "TT": "0",
                    "TM": "56",
                    "TS": "40",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "780110",
                        "NA": "Handicap 2-Way",
                        "N2": "Handicap 2-Way",
                        "IT": "6038abc03ddef7bea76513a52788a373",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459304685",
                            "NA": "HC Beersheba",
                            "N2": "Home",
                            "IT": "3e0b8fb5b9c6a76cb9aff4d71890fa89",
                            "SU": "0",
                            "HA": "-1.5",
                            "OD": {
                              "F": "18/25",
                              "D": "1.72",
                              "A": -139
                            }
                          },
                          {
                            "ID": "459304688",
                            "NA": "HC Holon",
                            "N2": "Away",
                            "IT": "b5c75f5e354139d2af992faf26c5eb70",
                            "SU": "0",
                            "HA": "+1.5",
                            "OD": {
                              "F": "1/1",
                              "D": "2.00",
                              "A": -100
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "ID": "17",
            "NA": "Ice Hockey",
            "OR": "9",
            "IT": "114288299ab1688ab06a6a2779b4771c",
            "CT": [
              {
                "IT": "876ecb872b4f0fa05cd2fb2480bc6c5e",
                "NA": "KHL",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84570338",
                    "IT": "cc6f6ed0aad1e88de1df36e278932c4e",
                    "OR": "0",
                    "NA": "Sibir Novosibirsk vs Jokerit",
                    "SS": "0-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "P2",
                    "LM": "55",
                    "PI": null,
                    "TT": "0",
                    "TM": "18",
                    "TS": "13",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "112b9c7360c7ade12c57aebada1fda27",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459365551",
                            "NA": "Sibir Novosibirsk",
                            "N2": "Home",
                            "IT": "e1c323bdeea10b00e9abd381c2b8580c",
                            "SU": "0",
                            "HA": "+1.5",
                            "OD": {
                              "F": "6/5",
                              "D": "2.20",
                              "A": "+120"
                            }
                          },
                          {
                            "ID": "459365552",
                            "NA": "Jokerit",
                            "N2": "Away",
                            "IT": "6c23289affb07a25dcb0693b58a5e52b",
                            "SU": "0",
                            "HA": "-1.5",
                            "OD": {
                              "F": "7/10",
                              "D": "1.70",
                              "A": -143
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "e67a5d2dd8c7c8cef806bd5df1a5b5f9",
                "NA": "Russia MHL",
                "OR": "1",
                "EV": [
                  {
                    "FI": "84413690",
                    "IT": "9a33f9a2ccb037e23bda9bb2ca7471f4",
                    "OR": "0",
                    "NA": "Belye Medvedi U20 vs Stalnye Lisy U20",
                    "SS": "2-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "P1",
                    "LM": "43",
                    "PI": null,
                    "TT": "0",
                    "TM": "6",
                    "TS": "40",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "54be90f87d00a78a5db998cc843ce3fa",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459316196",
                            "NA": "Belye Medvedi U20",
                            "N2": "Home",
                            "IT": "449efd2944caaa36c1e60c0b3492e443",
                            "SU": "0",
                            "HA": "-2.5",
                            "OD": {
                              "F": "3/4",
                              "D": "1.75",
                              "A": -134
                            }
                          },
                          {
                            "ID": "459316197",
                            "NA": "Stalnye Lisy U20",
                            "N2": "Away",
                            "IT": "287f224281f628416b1b30cc90518d6c",
                            "SU": "0",
                            "HA": "+2.5",
                            "OD": {
                              "F": "19/20",
                              "D": "1.95",
                              "A": -106
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84413687",
                    "IT": "c2f6b5f3b39a8217a1085109612d86d0",
                    "OR": "1",
                    "NA": "Tolpar U20 vs Snezhnye Barsy U20",
                    "SS": "4-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "P3",
                    "LM": "39",
                    "PI": null,
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "df18e583b73219c74f41ae93c0bfe8d1",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459314171",
                            "NA": "Tolpar U20",
                            "N2": "Home",
                            "IT": "3dfe70a7856e14c794b6af4e62be9de0",
                            "SU": "0",
                            "HA": "-3.5",
                            "OD": {
                              "F": "17/10",
                              "D": "2.70",
                              "A": "+170"
                            }
                          },
                          {
                            "ID": "459314172",
                            "NA": "Snezhnye Barsy U20",
                            "N2": "Away",
                            "IT": "e574e6854fa0c9384a1695edb759b74c",
                            "SU": "0",
                            "HA": "+3.5",
                            "OD": {
                              "F": "21/50",
                              "D": "1.42",
                              "A": -239
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "22b3c7795a2f556c6aa2b4dc8592afcc",
                "NA": "Kazakhstan Open Champs",
                "OR": "2",
                "EV": [
                  {
                    "FI": "84626574",
                    "IT": "faf42ec4393483f3991e97df54eadc58",
                    "OR": "0",
                    "NA": "Kulager vs HK Astana",
                    "SS": "1-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "P1",
                    "LM": "5",
                    "PI": null,
                    "TT": "1",
                    "TM": "6",
                    "TS": "22",
                    "TU": "20191206132031",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "92133d9323373621867a29acfcae4967",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "460117497",
                            "NA": "Kulager",
                            "N2": "Home",
                            "IT": "e0f5f27f30d0b9142ab65386ba761040",
                            "SU": "0",
                            "HA": "-3.5",
                            "OD": {
                              "F": "13/20",
                              "D": "1.65",
                              "A": -154
                            }
                          },
                          {
                            "ID": "460117498",
                            "NA": "HK Astana",
                            "N2": "Away",
                            "IT": "04c54fe4cd42c956ff86e31085d1b678",
                            "SU": "0",
                            "HA": "+3.5",
                            "OD": {
                              "F": "23/20",
                              "D": "2.15",
                              "A": "+114"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "a5820b0aedfe0a06e6e300791b891cf8",
                "NA": "Czech Extraliga U20 Cup",
                "OR": "3",
                "EV": [
                  {
                    "FI": "84649629",
                    "IT": "e540c5888d13ee7d419fda4aa4f376d0",
                    "OR": "0",
                    "NA": "HC Olomouc U20 vs Mlada Boleslav U20",
                    "SS": "0-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "P3",
                    "LM": "43",
                    "PI": null,
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "f23ffee689a937b8cae03b60632d9ca3",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459538218",
                            "NA": "HC Olomouc U20",
                            "N2": "Home",
                            "IT": "7eade91119c05ef45ac7406d58598eac",
                            "SU": "0",
                            "HA": "+1.5",
                            "OD": {
                              "F": "6/5",
                              "D": "2.20",
                              "A": "+120"
                            }
                          },
                          {
                            "ID": "459538219",
                            "NA": "Mlada Boleslav U20",
                            "N2": "Away",
                            "IT": "34ecbb6ce72ee095a19c93df72228c92",
                            "SU": "0",
                            "HA": "-1.5",
                            "OD": {
                              "F": "3/5",
                              "D": "1.60",
                              "A": -167
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84649632",
                    "IT": "d7d8c4a87c78117ba6ee43dbd95513f2",
                    "OR": "1",
                    "NA": "Rytiri Kladno U20 vs Trinec U20",
                    "SS": "1-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "P1",
                    "LM": "44",
                    "PI": null,
                    "TT": "0",
                    "TM": "7",
                    "TS": "34",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "e0d3931e9a2c259b60470f82ca22b082",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "459543745",
                            "NA": "Rytiri Kladno U20",
                            "N2": "Home",
                            "IT": "fbe1930603f0a96833f2ce980e9e7fa6",
                            "SU": "0",
                            "HA": "-1.5",
                            "OD": {
                              "F": "1/1",
                              "D": "2.00",
                              "A": -100
                            }
                          },
                          {
                            "ID": "459543746",
                            "NA": "Trinec U20",
                            "N2": "Away",
                            "IT": "8abcf1e95e6717447c663847213b0f79",
                            "SU": "0",
                            "HA": "+1.5",
                            "OD": {
                              "F": "18/25",
                              "D": "1.72",
                              "A": -139
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "f1ebb6bc46622ae9f934167c684de0a4",
                "NA": "Russia VHL",
                "OR": "4",
                "EV": [
                  {
                    "FI": "84414511",
                    "IT": "c291496eaa1e63c9aa50d6b9eb3e0bc6",
                    "OR": "0",
                    "NA": "Metallurg Novokuznetsk vs Torpedo Gorky",
                    "SS": "1-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "P2",
                    "LM": "39",
                    "PI": null,
                    "TT": "0",
                    "TM": "16",
                    "TS": "54",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "27291f4fa66b1c8e4ceee79c39a6efb5",
                        "SU": "1",
                        "PA": [
                          {
                            "ID": "459347490",
                            "NA": "Metallurg Novokuznetsk",
                            "N2": "Home",
                            "IT": "bc8b262a69e7554e310c4213fccc1bc3",
                            "SU": "1",
                            "HA": "-1.5",
                            "OD": {
                              "F": "3/1",
                              "D": "4.00",
                              "A": "+300"
                            }
                          },
                          {
                            "ID": "459347491",
                            "NA": "Torpedo Gorky",
                            "N2": "Away",
                            "IT": "48f339860ac0b0f220ecc7b2042b542a",
                            "SU": "1",
                            "HA": "+1.5",
                            "OD": {
                              "F": "1/4",
                              "D": "1.25",
                              "A": -400
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }`;

      const myData = JSON.parse(inplay);
      if (myData) {
        myData.DATA.forEach((el) => {
          sliderWrapper.append(`
          <a data-id="${parseInt(el.ID)}"
            data-name="${el.NA}"
            data-order="${parseInt(el.OR)}"
            data-topic-id="${el.IT}"
            class="[ slider-link ]"
            href="#/filter/${el.ID}">
            <span class="sports-${parseInt(el.ID) + 3} [ slider-icon ]"></p>
          </a>
          `);
        });
      }
      else {
        alert('DATA 404');
      }

      /*
      let myData;
 
      function gameParser(gameData) {
       if (gameData != undefined) {
         if (gameData.STATUS == 'SUCCESS') {
            let availableSportsCount = 0;
            let availableId = [];
            for (let i = 0; i < gameData.DATA.length; i++) {
              availableSportsCount++;
            }
            console.log(availableSportsCount);
            for (let i = 0; i < availableSportsCount; i++) {
              availableId.push(gameData.DATA[i].ID);
            }
            console.log(availableId);
 
 
     } else {
       console.log("DATA error");
     }
       } else {
         console.log("gameData is undefined");
       }
      }
 
      setInterval(() => {
           $.ajax({
             url: "http://bestline.bet/inplay/",
             success: function (data) {
               myData = data;
             }
           });
 
           gameParser(myData);
       }, 5000);
 */
    })(0);
    done();
  });
});