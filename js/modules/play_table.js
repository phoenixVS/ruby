exports('play_table', (params, done) => {
  insertHtmlModules({
    // ".play-table": [
    //   "play-table/play-table.html"
    // ]
  }, () => {

    const rows = $('.play-table .row');
    (() => {
      rows.on('click', () => {

      });
    })(0);

    let data = `
    {
      "STATUS": "SUCCESS",
      "TOPIC": "INPLAY",
      "CMD": "F",
      "EPOCH": 1576160390,
      "DATA": [
        {
          "ID": "1",
          "NA": "Soccer",
          "OR": "0",
          "IT": "31ce276d18580988eb785a79a0f059ce",
          "CT": [
            {
              "IT": "2a83798021081930f081a1bf62da8299",
              "NA": "Spain University League",
              "OR": "0",
              "EV": [
                {
                  "FI": "84823401",
                  "IT": "84fc4422fea394f665b04d89a28fe493",
                  "OR": "0",
                  "NA": "Universidad Pontificia De Comillas vs Universidad Autonoma De Madrid",
                  "SS": "1-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "12",
                  "PI": null,
                  "TT": "0",
                  "TM": "45",
                  "TS": "0",
                  "TU": "20191212140652",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "72b4419df3f642e5f4be92068641adfb",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "473162489",
                          "NA": "Universidad Pontificia De Comillas",
                          "N2": "Home",
                          "IT": "0c9f06dd2b3ed7fe4b68c399f399214b",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/33",
                            "D": "1.03",
                            "A": -3334
                          }
                        },
                        {
                          "ID": "473162490",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "1ff9eaeb9c618db21a1d642a76a5560e",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "14/1",
                            "D": "15.00",
                            "A": "+1400"
                          }
                        },
                        {
                          "ID": "473162491",
                          "NA": "Universidad Autonoma De Madrid",
                          "N2": "Away",
                          "IT": "10b4273e404091d42f6682664e79ba71",
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
                }
              ]
            },
            {
              "IT": "6c87cddcdfbf19e22b84e6dc2070c371",
              "NA": "Brazilian Matches",
              "OR": "1",
              "EV": [
                {
                  "FI": "84778518",
                  "IT": "35a166f4f5f0267e1e52db074a208e07",
                  "OR": "0",
                  "NA": "EC Agua Santa U19 vs EC Taubaté U19",
                  "SS": "1-1",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "13",
                  "PI": null,
                  "TT": "1",
                  "TM": "45",
                  "TS": "0",
                  "TU": "20191212140245",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "ae1c8b5d180bc15ae2c94c59893cb217",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471981680",
                          "NA": "EC Agua Santa U19",
                          "N2": "Home",
                          "IT": "5ce0b99ba4c5e83753e08d9f5761e80e",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "6/5",
                            "D": "2.20",
                            "A": "+120"
                          }
                        },
                        {
                          "ID": "471981681",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "4799a784f7b68ac0c39f872b7f8e42ea",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "13/10",
                            "D": "2.29",
                            "A": "+129"
                          }
                        },
                        {
                          "ID": "471981682",
                          "NA": "EC Taubaté U19",
                          "N2": "Away",
                          "IT": "249246d9e6370d79bccb77fc713837c1",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/1",
                            "D": "5.00",
                            "A": "+400"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "a562cc554dc40e6685b773ee83c23d51",
              "NA": "Cameroon Elite Two",
              "OR": "2",
              "EV": [
                {
                  "FI": "84805625",
                  "IT": "22a8bb6cd93dea452df191fd8e42a1a5",
                  "OR": "0",
                  "NA": "OFTA of Kribi vs Les Astres FC De Douala",
                  "SS": "0-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "63",
                  "PI": null,
                  "TT": "0",
                  "TM": "0",
                  "TS": "0",
                  "TU": "20191212135151",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "29aac6eddb6ea2b3573cc2eb2fee2bbe",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472066202",
                          "NA": "OFTA of Kribi",
                          "N2": "Home",
                          "IT": "4e9ba9ba6a6648414c8c1cab32032e94",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "23/10",
                            "D": "3.30",
                            "A": "+229"
                          }
                        },
                        {
                          "ID": "472066203",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "6ee7e9f0979df732cf74e75182ead05a",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "9/5",
                            "D": "2.80",
                            "A": "+179"
                          }
                        },
                        {
                          "ID": "472066204",
                          "NA": "Les Astres FC De Douala",
                          "N2": "Away",
                          "IT": "f66c02136a3116bd12cceaaeaf11fb08",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "6/5",
                            "D": "2.20",
                            "A": "+120"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "9fa6f2f34796d5b0a4fff7f0c891e679",
              "NA": "Egypt Division 1",
              "OR": "3",
              "EV": [
                {
                  "FI": "84614355",
                  "IT": "93cdcaecf25ac2ad328e6cf86f34a701",
                  "OR": "0",
                  "NA": "Al Ittihad Al Sakandary vs Tanta",
                  "SS": "0-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "38",
                  "PI": null,
                  "TT": "1",
                  "TM": "45",
                  "TS": "0",
                  "TU": "20191212133611",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "e00fad6a7e15c1ca0190b969846f7462",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471748573",
                          "NA": "Al Ittihad Al Sakandary",
                          "N2": "Home",
                          "IT": "0528f202f2f7edf79766b4cbcce3c733",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "12/5",
                            "D": "3.40",
                            "A": "+240"
                          }
                        },
                        {
                          "ID": "471748574",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "4a5091f81b97e98cd8058cd22758a73a",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "2/5",
                            "D": "1.40",
                            "A": -251
                          }
                        },
                        {
                          "ID": "471748575",
                          "NA": "Tanta",
                          "N2": "Away",
                          "IT": "e76cbc616e541d2e3c37571ab58282d6",
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
              "IT": "fe057cf0dbafeb81c507f158bb1de797",
              "NA": "Egypt Division 2",
              "OR": "4",
              "EV": [
                {
                  "FI": "84793094",
                  "IT": "7ee11d4d99de5c99c623fcaa9b4d0473",
                  "OR": "0",
                  "NA": "Marekh vs Al Nasr Cairo",
                  "SS": "2-2",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "31",
                  "PI": null,
                  "TT": "1",
                  "TM": "45",
                  "TS": "19",
                  "TU": "20191212134323",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "b89ccb582892b5361559be5f5b92fe72",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471755916",
                          "NA": "Marekh",
                          "N2": "Home",
                          "IT": "540a61202709593a758ffe0d5f3674e9",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "3/1",
                            "D": "4.00",
                            "A": "+300"
                          }
                        },
                        {
                          "ID": "471755917",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "1a3c5e37f529f31fb2ebf22559f44533",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/7",
                            "D": "1.57",
                            "A": -176
                          }
                        },
                        {
                          "ID": "471755918",
                          "NA": "Al Nasr Cairo",
                          "N2": "Away",
                          "IT": "c6b4aa853fbabc41eca5c6c7c0fd1678",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/1",
                            "D": "5.00",
                            "A": "+400"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "cdb486057e242ff2797228218837de48",
              "NA": "Indonesia Liga 3",
              "OR": "5",
              "EV": [
                {
                  "FI": "84817971",
                  "IT": "2338ace47b721ed0ec5364c45fd2f347",
                  "OR": "0",
                  "NA": "PSTK Tarakan vs Persiter Ternate",
                  "SS": "1-1",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "11",
                  "PI": null,
                  "TT": "1",
                  "TM": "45",
                  "TS": "0",
                  "TU": "20191212134106",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "a4c16b52f571fa0b3eaf0634db1a5226",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472772147",
                          "NA": "PSTK Tarakan",
                          "N2": "Home",
                          "IT": "be1c3b893231603be8da9c39ec6db095",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "3/1",
                            "D": "4.00",
                            "A": "+300"
                          }
                        },
                        {
                          "ID": "472772149",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "4dc13af1f730b17c1b30451f78ea64da",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/7",
                            "D": "1.57",
                            "A": -176
                          }
                        },
                        {
                          "ID": "472772151",
                          "NA": "Persiter Ternate",
                          "N2": "Away",
                          "IT": "2fa5c4aac4920f909efdfdffa30e3492",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/1",
                            "D": "5.00",
                            "A": "+400"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "ccbe86979ee890d923cfa52fd233d913",
              "NA": "UAE Reserve League",
              "OR": "6",
              "EV": [
                {
                  "FI": "84754197",
                  "IT": "0e022092c7c1566d6be6a44398b4136d",
                  "OR": "0",
                  "NA": "Al Fujairah Reserves vs Al Wasl Reserves",
                  "SS": "0-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "33",
                  "PI": null,
                  "TT": "1",
                  "TM": "0",
                  "TS": "0",
                  "TU": "20191212140158",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "80f4259b8d8863801aff990555f6f475",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471814565",
                          "NA": "Al Fujairah Reserves",
                          "N2": "Home",
                          "IT": "411e1be07769c51ec1e87df47ed51286",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "7/4",
                            "D": "2.75",
                            "A": "+175"
                          }
                        },
                        {
                          "ID": "471814567",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "531345e08747362208709d7822ddb3d5",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "11/4",
                            "D": "3.75",
                            "A": "+275"
                          }
                        },
                        {
                          "ID": "471814569",
                          "NA": "Al Wasl Reserves",
                          "N2": "Away",
                          "IT": "f1a44db98e08249076f2a8dea5e988e7",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "6/5",
                            "D": "2.20",
                            "A": "+120"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84754199",
                  "IT": "8e41fd522d06be5c4a50e7bb82659286",
                  "OR": "1",
                  "NA": "Al Jazira SC Reserves vs Hatta Dubai Reserves",
                  "SS": "0-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "32",
                  "PI": null,
                  "TT": "1",
                  "TM": "0",
                  "TS": "1",
                  "TU": "20191212140118",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "8d330fff65b23020b876a88fb41cc6ae",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471811664",
                          "NA": "Al Jazira SC Reserves",
                          "N2": "Home",
                          "IT": "70859f4890e09e568b6c28d6a0533e25",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "8/13",
                            "D": "1.61",
                            "A": -164
                          }
                        },
                        {
                          "ID": "471811665",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "41d945c0c5c634300ed1322ace815163",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "3/1",
                            "D": "4.00",
                            "A": "+300"
                          }
                        },
                        {
                          "ID": "471811666",
                          "NA": "Hatta Dubai Reserves",
                          "N2": "Away",
                          "IT": "ea9feff904ccadce719d8b18696885e0",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "7/2",
                            "D": "4.50",
                            "A": "+350"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84754201",
                  "IT": "c721b74eb8ad86fbe508273c0f841f64",
                  "OR": "2",
                  "NA": "Al Nasr SC Reserves vs Al Ain SCC Reserves",
                  "SS": "0-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "33",
                  "PI": null,
                  "TT": "1",
                  "TM": "0",
                  "TS": "1",
                  "TU": "20191212140121",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "5704baa3335279eb4b595c6cc21c158f",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471811908",
                          "NA": "Al Nasr SC Reserves",
                          "N2": "Home",
                          "IT": "7196b84d7cdb7eb1ac43e8eb9c7c5b7a",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "15/8",
                            "D": "2.87",
                            "A": "+187"
                          }
                        },
                        {
                          "ID": "471811909",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "52c273841fcafb3f582f3c694e238722",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "12/5",
                            "D": "3.40",
                            "A": "+240"
                          }
                        },
                        {
                          "ID": "471811910",
                          "NA": "Al Ain SCC Reserves",
                          "N2": "Away",
                          "IT": "0f77f9ce7328a483addcca858174264b",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "6/5",
                            "D": "2.20",
                            "A": "+120"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84754213",
                  "IT": "cf2d196caac0863448aea685ff17ff68",
                  "OR": "3",
                  "NA": "Al Wahda Abu Dhabi Reserves vs Shabab Al Ahli Dubai Reserves",
                  "SS": "0-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "18",
                  "PI": null,
                  "TT": "1",
                  "TM": "0",
                  "TS": "1",
                  "TU": "20191212140221",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "f80dccc5faefe30b51ae8333c97849a5",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471812182",
                          "NA": "Al Wahda Abu Dhabi Reserves",
                          "N2": "Home",
                          "IT": "e0b21902e4dc40ec521b649f565a8ff6",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "2/1",
                            "D": "3.00",
                            "A": "+200"
                          }
                        },
                        {
                          "ID": "471812183",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "957057a5eff0b658976c101e9285f47e",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "11/4",
                            "D": "3.75",
                            "A": "+275"
                          }
                        },
                        {
                          "ID": "471812184",
                          "NA": "Shabab Al Ahli Dubai Reserves",
                          "N2": "Away",
                          "IT": "8c14d403c75b44424a36e4d1e1bdc6da",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "21/20",
                            "D": "2.04",
                            "A": "+104"
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
              "OR": "7",
              "EV": [
                {
                  "FI": "84754222",
                  "IT": "9a097a05008b6a5c587d1cb03666e608",
                  "OR": "0",
                  "NA": "Penarol Reserves vs CA River Plate Reserves",
                  "SS": "3-1",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "23",
                  "PI": null,
                  "TT": "1",
                  "TM": "45",
                  "TS": "3",
                  "TU": "20191212141036",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "7cebde241e72b46e967a51aae69657e8",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471826388",
                          "NA": "Penarol Reserves",
                          "N2": "Home",
                          "IT": "56a3db5fae2e83d04b1b42a675046a2c",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/18",
                            "D": "1.05",
                            "A": -2000
                          }
                        },
                        {
                          "ID": "471826389",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "d6fcb679b93206a3014340c6012f96a2",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "10/1",
                            "D": "11.00",
                            "A": "+1000"
                          }
                        },
                        {
                          "ID": "471826390",
                          "NA": "CA River Plate Reserves",
                          "N2": "Away",
                          "IT": "55ae5e87ee647131b2e658e0a88a5ea7",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "18/1",
                            "D": "19.00",
                            "A": "+1800"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84754227",
                  "IT": "14f386914db8b82e17d92a4186659c4e",
                  "OR": "1",
                  "NA": "Plaza Colonia Reserves vs Cerro Largo Reserves",
                  "SS": "2-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "11",
                  "PI": null,
                  "TT": "1",
                  "TM": "45",
                  "TS": "2",
                  "TU": "20191212140522",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "05f730b662624000565480f4aa74e952",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471825715",
                          "NA": "Plaza Colonia Reserves",
                          "N2": "Home",
                          "IT": "2814aa4f23366dc7f25a56c25a5ef29c",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/33",
                            "D": "1.03",
                            "A": -3334
                          }
                        },
                        {
                          "ID": "471825716",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "e2eeb095997f235cb3b70a6ad2b540c0",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "14/1",
                            "D": "15.00",
                            "A": "+1400"
                          }
                        },
                        {
                          "ID": "471825717",
                          "NA": "Cerro Largo Reserves",
                          "N2": "Away",
                          "IT": "76c694a659817984bcdd15a288de153b",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "28/1",
                            "D": "29.00",
                            "A": "+2800"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "bc3aca5c54d0f37b49e181df7e241b09",
              "NA": "World Club Friendlies",
              "OR": "8",
              "EV": [
                {
                  "FI": "84793112",
                  "IT": "b1a9b9e3f9c8f59aa893c27aa2051a64",
                  "OR": "0",
                  "NA": "Ma'an vs Sahab SC",
                  "SS": "0-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "18",
                  "PI": null,
                  "TT": "1",
                  "TM": "0",
                  "TS": "1",
                  "TU": "20191212135959",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "af2632144584273aae4c125f299486e1",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471945397",
                          "NA": "Ma'an",
                          "N2": "Home",
                          "IT": "e78ebd4a2a5acbf29b5f45e1d534c93a",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "6/5",
                            "D": "2.20",
                            "A": "+120"
                          }
                        },
                        {
                          "ID": "471945398",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "f8a85f51da669d819fc0809d20a7afb3",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "12/5",
                            "D": "3.40",
                            "A": "+240"
                          }
                        },
                        {
                          "ID": "471945399",
                          "NA": "Sahab SC",
                          "N2": "Away",
                          "IT": "04741a015427d8df4a1478c90ea9b132",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "11/5",
                            "D": "3.20",
                            "A": "+220"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "b5baac5227f12cab14341e432bb13be2",
              "NA": "Cosafa U20 Cup",
              "OR": "9",
              "EV": [
                {
                  "FI": "84793092",
                  "IT": "3fbc64ece3f9891b4cecfe35e0666609",
                  "OR": "0",
                  "NA": "Zambia U20 vs Angola U20",
                  "SS": "1-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "",
                  "LM": "55",
                  "PI": null,
                  "TT": "1",
                  "TM": "0",
                  "TS": "0",
                  "TU": "20191212133039",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1777",
                      "NA": "Fulltime Result",
                      "N2": "Fulltime Result",
                      "IT": "3ce6d824b3f61a856b727510d95f158b",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471980187",
                          "NA": "Zambia U20",
                          "N2": "Home",
                          "IT": "d4ff9cc502223b99004081a149fa9e75",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/11",
                            "D": "1.36",
                            "A": -278
                          }
                        },
                        {
                          "ID": "471980188",
                          "NA": "Draw",
                          "N2": "Draw",
                          "IT": "71419087c27b9fcda71772f76c002b9b",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "3/1",
                            "D": "4.00",
                            "A": "+300"
                          }
                        },
                        {
                          "ID": "471980189",
                          "NA": "Angola U20",
                          "N2": "Away",
                          "IT": "42b1d7d67e92462515675ad9b4ef3c51",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "8/1",
                            "D": "9.00",
                            "A": "+800"
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
              "IT": "3f88ee8e8753c3e3c740f54cc39c34ef",
              "NA": "Diriyah Tennis Cup",
              "OR": "0",
              "EV": [
                {
                  "FI": "84806931",
                  "IT": "720ceaca913ab1d636fea1e114e8bba4",
                  "OR": "0",
                  "NA": "Fabio Fognini vs John Isner",
                  "SS": "7-6,2-1",
                  "XP": "0-0",
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
                      "IT": "d0a68da96e2e1dc434e875b1b9969e36",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472213658",
                          "NA": "Fabio Fognini",
                          "N2": "Home",
                          "IT": "0d681a4e663f9ef50310620bb16085c2",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/6",
                            "D": "1.16",
                            "A": -626
                          }
                        },
                        {
                          "ID": "472213657",
                          "NA": "John Isner",
                          "N2": "Away",
                          "IT": "66f28d2816421852bbac8698712d6b35",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "7/2",
                            "D": "4.50",
                            "A": "+350"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "1e799bec655a70e7035a3b0ca23b9b99",
              "NA": "ITF M15 Doha",
              "OR": "1",
              "EV": [
                {
                  "FI": "84804804",
                  "IT": "7f13e5033a25b0cc47a341e5c34b81d0",
                  "OR": "0",
                  "NA": "Aslan Karatsev vs Niklas Johansson",
                  "SS": "2-2",
                  "XP": "40-A",
                  "DC": "0",
                  "CP": "",
                  "LM": "2",
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
                      "IT": "debbb94aff9b800226015d3795f1b01c",
                      "SU": "1",
                      "PA": [
                        {
                          "ID": "472534529",
                          "NA": "Aslan Karatsev",
                          "N2": "Home",
                          "IT": "c1321f71efd0a593ce64a300460834cd",
                          "SU": "1",
                          "HA": "",
                          "OD": {
                            "F": "2/7",
                            "D": "1.28",
                            "A": -358
                          }
                        },
                        {
                          "ID": "472534528",
                          "NA": "Niklas Johansson",
                          "N2": "Away",
                          "IT": "19b074e091f4e005df485572ff9c8ca7",
                          "SU": "1",
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
                  "FI": "84804810",
                  "IT": "70851f80583315d9bb23309221229c18",
                  "OR": "1",
                  "NA": "Toby Martin vs Adam Moundir",
                  "SS": "0-0",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "52",
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
                      "IT": "6e2199256521dba652c6371eb89883fd",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472534591",
                          "NA": "Toby Martin",
                          "N2": "Home",
                          "IT": "cc378c3a64210e658c32fe2b6fef9ec1",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "3/1",
                            "D": "4.00",
                            "A": "+300"
                          }
                        },
                        {
                          "ID": "472534590",
                          "NA": "Adam Moundir",
                          "N2": "Away",
                          "IT": "0360d5511f7f361d92536fe4d8ab07ea",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "2/9",
                            "D": "1.22",
                            "A": -455
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84804809",
                  "IT": "14a17a2fe35d7c8a88032314a103aec5",
                  "OR": "2",
                  "NA": "Zizou Bergs vs Aleksei Khomich",
                  "SS": "5-5",
                  "XP": "A-40",
                  "DC": "0",
                  "CP": "",
                  "LM": "41",
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
                      "IT": "31353286ac20c07522de052e94e7f30d",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472534809",
                          "NA": "Zizou Bergs",
                          "N2": "Home",
                          "IT": "57cc8f95c2c7f47993ed58440bd0c8de",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/16",
                            "D": "1.06",
                            "A": -1667
                          }
                        },
                        {
                          "ID": "472534808",
                          "NA": "Aleksei Khomich",
                          "N2": "Away",
                          "IT": "63ac418612bf6287f674760578f1fb4d",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "7/1",
                            "D": "8.00",
                            "A": "+700"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "90f3254ecefb89a6a6a34a3e0ab571b0",
              "NA": "ITF M15 Antalya",
              "OR": "2",
              "EV": [
                {
                  "FI": "84750061",
                  "IT": "4d8142cd95c9cf53993c9e4d2133e1ac",
                  "OR": "0",
                  "NA": "Alvaro Lopez San Martin vs Yanki Erel",
                  "SS": "1-0",
                  "XP": "40-A",
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
                      "IT": "c54a19ead3d3020b8addb28cb2fc8fd2",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "470502441",
                          "NA": "Alvaro Lopez San Martin",
                          "N2": "Home",
                          "IT": "a8740c105b7583e444cca19cbeee2bad",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/7",
                            "D": "1.14",
                            "A": -715
                          }
                        },
                        {
                          "ID": "470502440",
                          "NA": "Yanki Erel",
                          "N2": "Away",
                          "IT": "371b41c20ca28631051408899c8b43ab",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/1",
                            "D": "5.00",
                            "A": "+400"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84779089",
                  "IT": "ec1519b60de4db2a3e39452740e11880",
                  "OR": "1",
                  "NA": "Mircea-Alexandru Jecan vs Igor Saveljic",
                  "SS": "6-4,7-5",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "1",
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
                      "IT": "1d36f6f17bd281415b0bc8152aaf6175",
                      "SU": "1",
                      "PA": [
                        {
                          "ID": "470502077",
                          "NA": "Mircea-Alexandru Jecan",
                          "N2": "Home",
                          "IT": "56983b9a19501f1cb9780fbf8ba7546a",
                          "SU": "1",
                          "HA": "",
                          "OD": {
                            "F": "0/0",
                            "D": "0.00",
                            "A": "+100"
                          }
                        },
                        {
                          "ID": "470502076",
                          "NA": "Igor Saveljic",
                          "N2": "Away",
                          "IT": "f83755369f76d4f4d6d2c1d704219f5f",
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
                },
                {
                  "FI": "84750059",
                  "IT": "a7c830b7eab62ab318bd2cf14c2e5253",
                  "OR": "2",
                  "NA": "Luigi Sorrentino vs David Jorda Sanchis",
                  "SS": "5-7,0-0",
                  "XP": "15-15",
                  "DC": "0",
                  "CP": "",
                  "LM": "27",
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
                      "IT": "c333a49d8700c20bbc2c0067eea17c8a",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "470501991",
                          "NA": "Luigi Sorrentino",
                          "N2": "Home",
                          "IT": "45c2b759a5a2c8eb4d1eee109853a66c",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/1",
                            "D": "5.00",
                            "A": "+400"
                          }
                        },
                        {
                          "ID": "470501990",
                          "NA": "David Jorda Sanchis",
                          "N2": "Away",
                          "IT": "b77fe054815823c974941d7cd83adbfb",
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
                }
              ]
            },
            {
              "IT": "43ccfb1c78fb67d00aa17370a7354993",
              "NA": "ITF M15 Cairo",
              "OR": "3",
              "EV": [
                {
                  "FI": "84801953",
                  "IT": "37175acb64f8aefc9ae4a33a89cdedcd",
                  "OR": "0",
                  "NA": "Manfred Fellin vs Alexander Weis",
                  "SS": "7-6,3-6,3-2",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "29",
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
                      "IT": "359677e29733aca810d9468b479fd1f4",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472542353",
                          "NA": "Manfred Fellin",
                          "N2": "Home",
                          "IT": "79b8d8072058eb4769dc702b4691882d",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "5/4",
                            "D": "2.25",
                            "A": "+125"
                          }
                        },
                        {
                          "ID": "472542352",
                          "NA": "Alexander Weis",
                          "N2": "Away",
                          "IT": "8527b031a710e560994b66334174694c",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/7",
                            "D": "1.57",
                            "A": -176
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84801957",
                  "IT": "252c0a8be0f108b099da2fce8382ef1d",
                  "OR": "1",
                  "NA": "Simone Roncalli vs Jordan Correia",
                  "SS": "4-6,2-5",
                  "XP": "40-40",
                  "DC": "0",
                  "CP": "",
                  "LM": "26",
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
                      "IT": "862b508688b808cf000f8d7f034e265e",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472542803",
                          "NA": "Simone Roncalli",
                          "N2": "Home",
                          "IT": "1cc72cc69d5dc7d4e1b0845644df5380",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "20/1",
                            "D": "21.00",
                            "A": "+2000"
                          }
                        },
                        {
                          "ID": "472542800",
                          "NA": "Jordan Correia",
                          "N2": "Away",
                          "IT": "994b7133d680c9d646b8b1b500f07a18",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/150",
                            "D": "1.00",
                            "A": 0
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "83c8bf14af8bb20fd284fa73162b0f50",
              "NA": "ITF M15 Monastir",
              "OR": "4",
              "EV": [
                {
                  "FI": "84804171",
                  "IT": "4b4882dbaa4bc94495a03565eb67a9d9",
                  "OR": "0",
                  "NA": "Fabien Reboul vs Kristjan Tamm",
                  "SS": "6-4,3-6,4-3",
                  "XP": "30-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "23",
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
                      "IT": "2bd352360c0c002d6fddb8a25718f669",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472588664",
                          "NA": "Fabien Reboul",
                          "N2": "Home",
                          "IT": "23d375c95ef67261cf37c03df025100b",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/5",
                            "D": "1.20",
                            "A": -501
                          }
                        },
                        {
                          "ID": "472588663",
                          "NA": "Kristjan Tamm",
                          "N2": "Away",
                          "IT": "bc6836a9d3e982aa3cf737f704e3f5ca",
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
                }
              ]
            },
            {
              "IT": "0d22b1024c90b30ab6842dd7e6d78067",
              "NA": "ITF M15 Santo Domingo",
              "OR": "5",
              "EV": [
                {
                  "FI": "84785075",
                  "IT": "22178dc8a031040d7d1406e82ddb98ee",
                  "OR": "0",
                  "NA": "Maksim Tikhomirov vs Peter Bertran",
                  "SS": "0-6,0-1",
                  "XP": "40-40",
                  "DC": "0",
                  "CP": "",
                  "LM": "9",
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
                      "IT": "a5d3c8356bcfd5421a058f81c1f15335",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472728391",
                          "NA": "Maksim Tikhomirov",
                          "N2": "Home",
                          "IT": "071ee00adc5b1517efd48733d7d04309",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "16/1",
                            "D": "17.00",
                            "A": "+1600"
                          }
                        },
                        {
                          "ID": "472728390",
                          "NA": "Peter Bertran",
                          "N2": "Away",
                          "IT": "ebb1dc38181f6b9d1cf2ea3acbf32013",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/100",
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
              "IT": "2fabd1908b4c70a6eb224c92f53f4c67",
              "NA": "ITF W15 Antalya",
              "OR": "6",
              "EV": [
                {
                  "FI": "84750294",
                  "IT": "d0e14783944fd4ad5d379ff075b17a19",
                  "OR": "0",
                  "NA": "Ekaterina Reyngold vs Mariam Dalakishvili",
                  "SS": "0-6,5-6",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "13",
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
                      "IT": "3138c76759114587b50097cbe40899af",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "470480225",
                          "NA": "Ekaterina Reyngold",
                          "N2": "Home",
                          "IT": "cb1b54bf9e572f91ecf1615f2676dd7d",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "6/1",
                            "D": "7.00",
                            "A": "+600"
                          }
                        },
                        {
                          "ID": "470480223",
                          "NA": "Mariam Dalakishvili",
                          "N2": "Away",
                          "IT": "d9379c0212b5de3f0afa042789a66722",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/12",
                            "D": "1.08",
                            "A": -1250
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84750300",
                  "IT": "e32bcb5b40dab4207d7e6f4fbd99797b",
                  "OR": "1",
                  "NA": "Polina Kudermetova vs Zeynep Sonmez",
                  "SS": "2-6,1-2",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "21",
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
                      "IT": "413cc7493b1f9f28c47adc9badebd7a2",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "470516650",
                          "NA": "Polina Kudermetova",
                          "N2": "Home",
                          "IT": "c4c88950a079944fbd4777fa9e45c308",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/1",
                            "D": "5.00",
                            "A": "+400"
                          }
                        },
                        {
                          "ID": "470516649",
                          "NA": "Zeynep Sonmez",
                          "N2": "Away",
                          "IT": "71ab31199aad00c59c9fff9ca1353a3f",
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
                  "FI": "84750298",
                  "IT": "3aeeb9086d36c9fac8014b8daca769c0",
                  "OR": "2",
                  "NA": "Arlinda Rushiti vs Ekaterina Kazionova",
                  "SS": "3-6,7-5,0-5",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "12",
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
                      "IT": "f4880dbb43b21c2fb54088d1d20d2cb4",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "470522415",
                          "NA": "Arlinda Rushiti",
                          "N2": "Home",
                          "IT": "a9592128a1f6777cdb0941ab2a81ff6c",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "25/1",
                            "D": "26.00",
                            "A": "+2500"
                          }
                        },
                        {
                          "ID": "470522414",
                          "NA": "Ekaterina Kazionova",
                          "N2": "Away",
                          "IT": "47a05ff5daf5ff463d9a5a8fda4164dc",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/200",
                            "D": "1.00",
                            "A": 0
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "bfa51f8f71f55b49c526100dda2f013a",
              "NA": "ITF W15 Monastir",
              "OR": "7",
              "EV": [
                {
                  "FI": "84803424",
                  "IT": "f7f3db7072afcd0261b88b1d1f40489f",
                  "OR": "0",
                  "NA": "Alice Rame vs Antonia Ruzic",
                  "SS": "1-1",
                  "XP": "A-40",
                  "DC": "0",
                  "CP": "",
                  "LM": "35",
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
                      "IT": "e97c620cdec018c3f8c01ec606fff039",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472591126",
                          "NA": "Alice Rame",
                          "N2": "Home",
                          "IT": "0c69931b7afb714dd776634f9ee128a7",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/5",
                            "D": "1.20",
                            "A": -501
                          }
                        },
                        {
                          "ID": "472591125",
                          "NA": "Antonia Ruzic",
                          "N2": "Away",
                          "IT": "fab17ff5a711f6e27a171790faf9c528",
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
                  "FI": "84803425",
                  "IT": "f56271a83da1829cdf86b9a5ffa283f8",
                  "OR": "1",
                  "NA": "Jessica B Maneiro vs Anastasia Kulikova",
                  "SS": "2-5",
                  "XP": "0-40",
                  "DC": "0",
                  "CP": "",
                  "LM": "28",
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
                      "IT": "deb2eb12c4e47b46e11cb13f4511c42d",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472591278",
                          "NA": "Jessica B Maneiro",
                          "N2": "Home",
                          "IT": "91c223944afd45771eccad20b3e932b0",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "12/1",
                            "D": "13.00",
                            "A": "+1200"
                          }
                        },
                        {
                          "ID": "472591277",
                          "NA": "Anastasia Kulikova",
                          "N2": "Away",
                          "IT": "7ce020b530370eb3ee23a16184e89a0f",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/50",
                            "D": "1.02",
                            "A": -5000
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "43a245ecde619ea508330e834c059181",
              "NA": "ITF M15 Heraklion MD",
              "OR": "8",
              "EV": [
                {
                  "FI": "84804030",
                  "IT": "5ded08fd2e3fdfd7452de902bc4201e1",
                  "OR": "0",
                  "NA": "Beloborodko/Zgirovsky vs Kobelt/Yeshaya",
                  "SS": "6-1,2-2",
                  "XP": "0-15",
                  "DC": "0",
                  "CP": "",
                  "LM": "29",
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
                      "IT": "81faaeffe005ec077f4489e610238c7f",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472572310",
                          "NA": "Beloborodko/Zgirovsky",
                          "N2": "Home",
                          "IT": "d97789e6269731beab551602c14d6f02",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/20",
                            "D": "1.05",
                            "A": -2000
                          }
                        },
                        {
                          "ID": "472572309",
                          "NA": "Kobelt/Yeshaya",
                          "N2": "Away",
                          "IT": "881353d3dacde8246369ea03b6bd5edf",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "8/1",
                            "D": "9.00",
                            "A": "+800"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84804028",
                  "IT": "886bb64da8bbc14053eeb632712d612b",
                  "OR": "1",
                  "NA": "Thanos/Theodorou vs Jeong/Park",
                  "SS": "0-0",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "17",
                  "PI": "0,0",
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
                      "IT": "fb0aa34be173ac1afdee0c423b25074e",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472572688",
                          "NA": "Thanos/Theodorou",
                          "N2": "Home",
                          "IT": "9b5f25b645b26489f88bb10a7c6e7881",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "9/2",
                            "D": "5.50",
                            "A": "+450"
                          }
                        },
                        {
                          "ID": "472572687",
                          "NA": "Jeong/Park",
                          "N2": "Away",
                          "IT": "c912d0634ecba1b3fb1d4e53adf758cf",
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
                },
                {
                  "FI": "84804029",
                  "IT": "c8da6a4322f334b79a79df3ff6ca75a3",
                  "OR": "2",
                  "NA": "Nincevic/Nincevic vs Pichler/Sachko",
                  "SS": "6-7,2-2",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "27",
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
                      "IT": "b5bbfa8b135889fa483af72128eba909",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472572511",
                          "NA": "Nincevic/Nincevic",
                          "N2": "Home",
                          "IT": "5576110fb08d6b0a031bd86d1d3d1125",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "11/1",
                            "D": "12.00",
                            "A": "+1100"
                          }
                        },
                        {
                          "ID": "472572510",
                          "NA": "Pichler/Sachko",
                          "N2": "Away",
                          "IT": "6a7364d01b194e42332facc8a5af3795",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/40",
                            "D": "1.02",
                            "A": -5000
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "c2183ad448ae900f5160cf123295c097",
              "NA": "ITF W100 Dubai WD",
              "OR": "9",
              "EV": [
                {
                  "FI": "84802677",
                  "IT": "21a4ac9595760cafd375a9544392ca82",
                  "OR": "0",
                  "NA": "Kawa/Pigossi vs Garcia-Perez/Sorribes Tormo",
                  "SS": "3-6,2-3",
                  "XP": "0-0",
                  "DC": "0",
                  "CP": "",
                  "LM": "25",
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
                      "IT": "1cf370651694bd087692298ef8108428",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472344433",
                          "NA": "Kawa/Pigossi",
                          "N2": "Home",
                          "IT": "a7be58e48082711f84e10a3ad6618f5b",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "5/1",
                            "D": "6.00",
                            "A": "+500"
                          }
                        },
                        {
                          "ID": "472344432",
                          "NA": "Garcia-Perez/Sorribes Tormo",
                          "N2": "Away",
                          "IT": "4705d99b21b93a12b63e4561472f07ca",
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
              "IT": "549ff531b30b6bd38d90877fbb27aa53",
              "NA": "ITF W15 Heraklion WD",
              "OR": "10",
              "EV": [
                {
                  "FI": "84800828",
                  "IT": "d4d5592910673a11862daccee595861f",
                  "OR": "0",
                  "NA": "Cvetkovic/Lovric vs Nepliy/Vangelova",
                  "SS": "6-6",
                  "XP": "5-6",
                  "DC": "0",
                  "CP": "",
                  "LM": "22",
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
                      "IT": "01c4a676f493b8cef9f6f3662e66f325",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472574487",
                          "NA": "Cvetkovic/Lovric",
                          "N2": "Home",
                          "IT": "c33606c8b59f2a31b8c531f846dee01d",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/5",
                            "D": "1.80",
                            "A": -125
                          }
                        },
                        {
                          "ID": "472574486",
                          "NA": "Nepliy/Vangelova",
                          "N2": "Away",
                          "IT": "f4ea7eea2c3c8523c137938b1140131d",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "19/20",
                            "D": "1.95",
                            "A": -106
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "8801f342fbecd04634b3d34910ce492f",
              "NA": "ITF M15 Cairo MD",
              "OR": "11",
              "EV": [
                {
                  "FI": "84776935",
                  "IT": "bd9a445465835db3a9e90c199ed8a4ca",
                  "OR": "0",
                  "NA": "Abou Taleb/Zakaryia vs Monzon/Tenti",
                  "SS": "1-1",
                  "XP": "30-30",
                  "DC": "0",
                  "CP": "",
                  "LM": "11",
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
                      "IT": "067b6f7a64ddd12c11b3a4f1dde2649a",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472543139",
                          "NA": "Abou Taleb/Zakaryia",
                          "N2": "Home",
                          "IT": "5874705c5f4adf06ad9bd15fe7ee8123",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "9/1",
                            "D": "10.00",
                            "A": "+900"
                          }
                        },
                        {
                          "ID": "472543138",
                          "NA": "Monzon/Tenti",
                          "N2": "Away",
                          "IT": "ae5008a31d9af354a5ed385817c543bf",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/25",
                            "D": "1.04",
                            "A": -2500
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84776933",
                  "IT": "60ff1584ab934d83a6fb5c63895ecb44",
                  "OR": "1",
                  "NA": "Uspensky/Vidal Azorin vs Sharma/Sunish",
                  "SS": "0-0",
                  "XP": "30-40",
                  "DC": "0",
                  "CP": "",
                  "LM": "40",
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
                      "IT": "2e8a5e47a43892a8e825191dca78364b",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472543580",
                          "NA": "Uspensky/Vidal Azorin",
                          "N2": "Home",
                          "IT": "1ee728e83ea4cd31e2dea3b0cf399b1b",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/11",
                            "D": "1.36",
                            "A": -278
                          }
                        },
                        {
                          "ID": "472543579",
                          "NA": "Sharma/Sunish",
                          "N2": "Away",
                          "IT": "54a035d7662cbf4734134483dadc3659",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "2/1",
                            "D": "3.00",
                            "A": "+200"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "182451babdad1c84cb4b38dd62185fd1",
              "NA": "ITF W15 Cairo WD",
              "OR": "12",
              "EV": [
                {
                  "FI": "84777712",
                  "IT": "323c97217803acca031cefbec669a422",
                  "OR": "0",
                  "NA": "Marfutina/Simion vs Melgers/Stevens",
                  "SS": "5-3",
                  "XP": "15-40",
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
                      "IT": "ff38d5e375bc94a3e9121c0107bcaf47",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472547407",
                          "NA": "Marfutina/Simion",
                          "N2": "Home",
                          "IT": "1231cff2b8dac091314bf0256153080b",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/7",
                            "D": "1.14",
                            "A": -715
                          }
                        },
                        {
                          "ID": "472547404",
                          "NA": "Melgers/Stevens",
                          "N2": "Away",
                          "IT": "bb4b44f7c3ea02da9aca4415b828d5c7",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "4/1",
                            "D": "5.00",
                            "A": "+400"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "faaf68dcb09b3d0a31f5925a61712bc7",
              "NA": "ITF W15 Monastir WD",
              "OR": "13",
              "EV": [
                {
                  "FI": "84807028",
                  "IT": "f89ab687d927f4deeaa6ac14f204c960",
                  "OR": "0",
                  "NA": "Piangerelli/Prati vs Cavalle-Reimers/Marinkovic",
                  "SS": "1-6,0-1",
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
                      "IT": "652a8e5d2a93be05b737e2441cf7c256",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472591672",
                          "NA": "Piangerelli/Prati",
                          "N2": "Home",
                          "IT": "e059730ea742e307b7fe45ce6aed7c17",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "15/2",
                            "D": "8.50",
                            "A": "+750"
                          }
                        },
                        {
                          "ID": "472591671",
                          "NA": "Cavalle-Reimers/Marinkovic",
                          "N2": "Away",
                          "IT": "063a03c68de6ee5a70c7ceb126bb3166",
                          "SU": "0",
                          "HA": "",
                          "OD": {
                            "F": "1/18",
                            "D": "1.05",
                            "A": -2000
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
          "OR": "4",
          "IT": "b74a0e8c267e4ce0ccd026a860a47a49",
          "CT": [
            {
              "IT": "583ff01dd801fc1d396fd88f6464ac06",
              "NA": "Russia Superleague 1 Women",
              "OR": "0",
              "EV": [
                {
                  "FI": "84567204",
                  "IT": "e59fea8d63e8bff1119bdfa51b440ef7",
                  "OR": "0",
                  "NA": "Chernie Medvedi Women vs Neftyanik Omsk Women",
                  "SS": "10-10",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q1",
                  "LM": "5",
                  "PI": null,
                  "TT": "1",
                  "TM": "2",
                  "TS": "26",
                  "TU": "20191212141454",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "40c9f39a8849728883752ad4485602b0",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471533309",
                          "NA": "Chernie Medvedi Women",
                          "N2": "Home",
                          "IT": "7acd0f4ed79bef8303452cca4e4537bf",
                          "SU": "0",
                          "HA": "+6.5",
                          "OD": {
                            "F": "5/6",
                            "D": "1.83",
                            "A": -121
                          }
                        },
                        {
                          "ID": "471533310",
                          "NA": "Neftyanik Omsk Women",
                          "N2": "Away",
                          "IT": "b04f0b525e28c21769117929f124ada3",
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
              "IT": "555b845a65a680b89c41d3747ba2c529",
              "NA": "Russia VTB Student League",
              "OR": "1",
              "EV": [
                {
                  "FI": "84569625",
                  "IT": "290e7029a0d5ba34a9e283d96ac54475",
                  "OR": "0",
                  "NA": "Stalnye Serdca Magnitogorsk University vs Akademia Sporta Kazan University",
                  "SS": "56-69",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q4",
                  "LM": "5",
                  "PI": null,
                  "TT": "0",
                  "TM": "7",
                  "TS": "54",
                  "TU": "20191212141450",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "c8c3af57857a5a65e05ec1daf8001422",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471533527",
                          "NA": "Stalnye Serdca Magnitogorsk University",
                          "N2": "Home",
                          "IT": "3770b9c123e29801ec067adaec9f83d7",
                          "SU": "0",
                          "HA": "+14.5",
                          "OD": {
                            "F": "20/23",
                            "D": "1.86",
                            "A": -117
                          }
                        },
                        {
                          "ID": "471533528",
                          "NA": "Akademia Sporta Kazan University",
                          "N2": "Away",
                          "IT": "ab8ccb8f215b45d54899505f1bf01ea2",
                          "SU": "0",
                          "HA": "-14.5",
                          "OD": {
                            "F": "4/5",
                            "D": "1.80",
                            "A": -125
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84569628",
                  "IT": "3bfb6aa8dd98a9ebc191627c5a18f725",
                  "OR": "1",
                  "NA": "Zenit-LGU Pushkin University vs KubGTU Krasnodar University",
                  "SS": "13-18",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q1",
                  "LM": "5",
                  "PI": null,
                  "TT": "0",
                  "TM": "1",
                  "TS": "27",
                  "TU": "20191212141445",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "1039de294036089de1b519deef8dffa5",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471533545",
                          "NA": "Zenit-LGU Pushkin University",
                          "N2": "Home",
                          "IT": "4d283fac69307dd7352c02bfd9ec52f5",
                          "SU": "0",
                          "HA": "+10.5",
                          "OD": {
                            "F": "5/6",
                            "D": "1.83",
                            "A": -121
                          }
                        },
                        {
                          "ID": "471533546",
                          "NA": "KubGTU Krasnodar University",
                          "N2": "Away",
                          "IT": "945b4e6103b5f366f1dff655ae80e70a",
                          "SU": "0",
                          "HA": "-10.5",
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
              "IT": "121c7c6aedf4236efbc07b3410648e9e",
              "NA": "Iran Super League",
              "OR": "2",
              "EV": [
                {
                  "FI": "84787208",
                  "IT": "77171df3b590e93bfb2a714f598edc50",
                  "OR": "0",
                  "NA": "Avije Mashhad vs Mahram Tehran",
                  "SS": "28-31",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q2",
                  "LM": "52",
                  "PI": null,
                  "TT": "1",
                  "TM": "1",
                  "TS": "53",
                  "TU": "20191212141455",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "bc5ffbeb4c00b96ca535f2590bb35ad9",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472011149",
                          "NA": "Avije Mashhad",
                          "N2": "Home",
                          "IT": "61b4b65d92999b0a6e03e6248aa1cc95",
                          "SU": "0",
                          "HA": "+6.5",
                          "OD": {
                            "F": "5/6",
                            "D": "1.83",
                            "A": -121
                          }
                        },
                        {
                          "ID": "472011151",
                          "NA": "Mahram Tehran",
                          "N2": "Away",
                          "IT": "77d609d60ef3e9bdba7bf7407ff6e4af",
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
                },
                {
                  "FI": "84787211",
                  "IT": "276b126e9efa589b69b6389a0eea4901",
                  "OR": "1",
                  "NA": "Niroo Zamini vs Mes Kerman",
                  "SS": "69-75",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q4",
                  "LM": "34",
                  "PI": null,
                  "TT": "0",
                  "TM": "6",
                  "TS": "19",
                  "TU": "20191212141452",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "ff7de00eba8a32e1d6b20aa36ad02dbc",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472012005",
                          "NA": "Niroo Zamini",
                          "N2": "Home",
                          "IT": "e30ed2cd741976e7a3d0e915d3215da5",
                          "SU": "0",
                          "HA": "+5.5",
                          "OD": {
                            "F": "10/13",
                            "D": "1.76",
                            "A": -132
                          }
                        },
                        {
                          "ID": "472012006",
                          "NA": "Mes Kerman",
                          "N2": "Away",
                          "IT": "48709bc9d97bbdfc9725b9e2e44f8fef",
                          "SU": "0",
                          "HA": "-5.5",
                          "OD": {
                            "F": "10/11",
                            "D": "1.90",
                            "A": -112
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84787214",
                  "IT": "4455266e60739468d2d6a51eed49ed6a",
                  "OR": "2",
                  "NA": "Palayesh Naft Abadan vs Chemidor Tehran",
                  "SS": "47-57",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q3",
                  "LM": "37",
                  "PI": null,
                  "TT": "1",
                  "TM": "1",
                  "TS": "35",
                  "TU": "20191212141448",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "750752cb14c6660a79a5a8f3afa6ac77",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472013455",
                          "NA": "Palayesh Naft Abadan",
                          "N2": "Home",
                          "IT": "ca5616a04a61e068e7328a2b7ca95d54",
                          "SU": "0",
                          "HA": "+8.5",
                          "OD": {
                            "F": "5/6",
                            "D": "1.83",
                            "A": -121
                          }
                        },
                        {
                          "ID": "472013456",
                          "NA": "Chemidor Tehran",
                          "N2": "Away",
                          "IT": "6ae046ed77e2ba10cb41d4d726b05dae",
                          "SU": "0",
                          "HA": "-8.5",
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
                  "FI": "84787217",
                  "IT": "99d430895fe535a351270c884179ee33",
                  "OR": "3",
                  "NA": "Raad Dezful vs Shora Shahrdari Qazvin",
                  "SS": "65-59",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q4",
                  "LM": "35",
                  "PI": null,
                  "TT": "0",
                  "TM": "6",
                  "TS": "54",
                  "TU": "20191212141446",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "117f9faaeabbd088f8baa898dfdb4092",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472014365",
                          "NA": "Raad Dezful",
                          "N2": "Home",
                          "IT": "568a7b8d308f2287c22b501992f9e5c8",
                          "SU": "0",
                          "HA": "-5.5",
                          "OD": {
                            "F": "4/5",
                            "D": "1.80",
                            "A": -125
                          }
                        },
                        {
                          "ID": "472014366",
                          "NA": "Shora Shahrdari Qazvin",
                          "N2": "Away",
                          "IT": "ece31d72c7ca4df7ea668f9ee53c7873",
                          "SU": "0",
                          "HA": "+5.5",
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
                  "FI": "84787220",
                  "IT": "f7e0f83a28fc89c09f23851f99ce2459",
                  "OR": "4",
                  "NA": "Shahrdari Bandar Abbas vs Tofarqan Azarshahr",
                  "SS": "73-79",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q4",
                  "LM": "6",
                  "PI": null,
                  "TT": "0",
                  "TM": "2",
                  "TS": "24",
                  "TU": "20191212141428",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "425b1b441959bc02e446900d9968d62c",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472015381",
                          "NA": "Shahrdari Bandar Abbas",
                          "N2": "Home",
                          "IT": "e660b40acd8d914deafb6fb6ccb77000",
                          "SU": "0",
                          "HA": "+5.5",
                          "OD": {
                            "F": "20/23",
                            "D": "1.86",
                            "A": -117
                          }
                        },
                        {
                          "ID": "472015382",
                          "NA": "Tofarqan Azarshahr",
                          "N2": "Away",
                          "IT": "0d24a1a3fdf6a945ab2f594d4f0bf90c",
                          "SU": "0",
                          "HA": "-5.5",
                          "OD": {
                            "F": "4/5",
                            "D": "1.80",
                            "A": -125
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84787205",
                  "IT": "02dd2f45b2805233a1b3f9d85165ed8b",
                  "OR": "5",
                  "NA": "Shahrdari Gorgan vs Petrochimi Bandar Imam",
                  "SS": "51-32",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q4",
                  "LM": "36",
                  "PI": null,
                  "TT": "0",
                  "TM": "10",
                  "TS": "0",
                  "TU": "20191212141242",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "8cfabc9db8c2351d21bf9384e66b5cfd",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472009882",
                          "NA": "Shahrdari Gorgan",
                          "N2": "Home",
                          "IT": "24eba2b4fa2b9cbc034fb8b07578fc7b",
                          "SU": "0",
                          "HA": "-17.5",
                          "OD": {
                            "F": "5/6",
                            "D": "1.83",
                            "A": -121
                          }
                        },
                        {
                          "ID": "472009883",
                          "NA": "Petrochimi Bandar Imam",
                          "N2": "Away",
                          "IT": "582a1bd6f7f9b068744c123bd7c8da80",
                          "SU": "0",
                          "HA": "+17.5",
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
                  "FI": "84787223",
                  "IT": "17e5d04ee99350f62c3a3957c8f22682",
                  "OR": "6",
                  "NA": "Zob Ahan vs Exon Tehran",
                  "SS": "64-83",
                  "XP": null,
                  "DC": "1",
                  "CP": "Q4",
                  "LM": "1",
                  "PI": null,
                  "TT": "1",
                  "TM": "1",
                  "TS": "6",
                  "TU": "20191212141454",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "1446",
                      "NA": "Spread",
                      "N2": "Spread",
                      "IT": "b60a8dfd85dbd01e882e765e5df84d36",
                      "SU": "1",
                      "PA": [
                        {
                          "ID": "472016368",
                          "NA": "Zob Ahan",
                          "N2": "Home",
                          "IT": "92776be0ea5b170eaaaa8b39c9b28d60",
                          "SU": "1",
                          "HA": "+18.5",
                          "OD": {
                            "F": "5/7",
                            "D": "1.71",
                            "A": -141
                          }
                        },
                        {
                          "ID": "472016369",
                          "NA": "Exon Tehran",
                          "N2": "Away",
                          "IT": "87d593b20cfc93307c5bf477c115603b",
                          "SU": "1",
                          "HA": "-18.5",
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
          "ID": "78",
          "NA": "Handball",
          "OR": "9",
          "IT": "84a0671dbcefccfa0761f5bec0f0859a",
          "CT": [
            {
              "IT": "2e5d92e538689afb7bb82885b5073001",
              "NA": "Romania Liga Nationala",
              "OR": "0",
              "EV": [
                {
                  "FI": "84574451",
                  "IT": "dafe4d4e0a610eecab3e4bcf8b926f4b",
                  "OR": "0",
                  "NA": "SCM Politechnica Timisoara vs Steaua Bucuresti",
                  "SS": "7-4",
                  "XP": null,
                  "DC": "1",
                  "CP": "1st",
                  "LM": "47",
                  "PI": null,
                  "TT": "0",
                  "TM": "10",
                  "TS": "33",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "780110",
                      "NA": "Handicap 2-Way",
                      "N2": "Handicap 2-Way",
                      "IT": "f2b3cd8db530f3712065a7a86e84d7b8",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471982560",
                          "NA": "SCM Politechnica Timisoara",
                          "N2": "Home",
                          "IT": "8683e8dc1e0157ea56419c0a1174e2b5",
                          "SU": "0",
                          "HA": "-3.5",
                          "OD": {
                            "F": "17/20",
                            "D": "1.85",
                            "A": -118
                          }
                        },
                        {
                          "ID": "471982561",
                          "NA": "Steaua Bucuresti",
                          "N2": "Away",
                          "IT": "8df0206a6536b94a6b6162d747998153",
                          "SU": "0",
                          "HA": "+3.5",
                          "OD": {
                            "F": "17/20",
                            "D": "1.85",
                            "A": -118
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "4fe6acd11f8b21eda3e80139c4f60828",
              "NA": "Qatar Fed Cup",
              "OR": "1",
              "EV": [
                {
                  "FI": "84780557",
                  "IT": "81f86bd29b5b5d1855864459b38f79cd",
                  "OR": "0",
                  "NA": "Al Garafah vs Al Khour",
                  "SS": "32-28",
                  "XP": null,
                  "DC": "1",
                  "CP": "2nd",
                  "LM": "8",
                  "PI": null,
                  "TT": "0",
                  "TM": "52",
                  "TS": "58",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "780110",
                      "NA": "Handicap 2-Way",
                      "N2": "Handicap 2-Way",
                      "IT": "bcbdad1754fa371d590d4635d11b61bb",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471966936",
                          "NA": "Al Garafah",
                          "N2": "Home",
                          "IT": "bbeeeea9e9763123fb2491e2bdbd371f",
                          "SU": "0",
                          "HA": "-3.5",
                          "OD": {
                            "F": "7/10",
                            "D": "1.70",
                            "A": -143
                          }
                        },
                        {
                          "ID": "471966937",
                          "NA": "Al Khour",
                          "N2": "Away",
                          "IT": "f6ebb1de3befbc535f3f974902291650",
                          "SU": "0",
                          "HA": "+3.5",
                          "OD": {
                            "F": "11/10",
                            "D": "2.10",
                            "A": "+110"
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
          "OR": "11",
          "IT": "114288299ab1688ab06a6a2779b4771c",
          "CT": [
            {
              "IT": "e67a5d2dd8c7c8cef806bd5df1a5b5f9",
              "NA": "Russia MHL",
              "OR": "0",
              "EV": [
                {
                  "FI": "84573145",
                  "IT": "02a8931b95302ebb0a4dc2a195f7b1b1",
                  "OR": "0",
                  "NA": "Snezhnye Barsy U20 vs Belye Medvedi U20",
                  "SS": "0-4",
                  "XP": null,
                  "DC": "1",
                  "CP": "P2",
                  "LM": "36",
                  "PI": null,
                  "TT": "0",
                  "TM": "14",
                  "TS": "20",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "d99c8c29584ffc3383375a8b767b5e70",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471859300",
                          "NA": "Snezhnye Barsy U20",
                          "N2": "Home",
                          "IT": "325b918e21fce856aa4fc79ae18f7963",
                          "SU": "0",
                          "HA": "+4.5",
                          "OD": {
                            "F": "9/10",
                            "D": "1.90",
                            "A": -112
                          }
                        },
                        {
                          "ID": "471859301",
                          "NA": "Belye Medvedi U20",
                          "N2": "Away",
                          "IT": "a15b71e8d972a831c29658d797869094",
                          "SU": "0",
                          "HA": "-4.5",
                          "OD": {
                            "F": "4/5",
                            "D": "1.80",
                            "A": -125
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84573148",
                  "IT": "b74afe15ea181b082adf01decee7ea74",
                  "OR": "1",
                  "NA": "HC Irbis U20 vs Sputnik U20",
                  "SS": "1-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "P1",
                  "LM": "43",
                  "PI": null,
                  "TT": "0",
                  "TM": "10",
                  "TS": "36",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "9076b7d31eebf651b8d46f8ca4d56bef",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471842921",
                          "NA": "HC Irbis U20",
                          "N2": "Home",
                          "IT": "3cb75f5a70e1927aceb5e54ad694342f",
                          "SU": "0",
                          "HA": "-1.5",
                          "OD": {
                            "F": "18/25",
                            "D": "1.72",
                            "A": -139
                          }
                        },
                        {
                          "ID": "471842922",
                          "NA": "Sputnik U20",
                          "N2": "Away",
                          "IT": "238414f8e3e87345dd97efe77f9a42e2",
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
            },
            {
              "IT": "f1ebb6bc46622ae9f934167c684de0a4",
              "NA": "Russia VHL",
              "OR": "1",
              "EV": [
                {
                  "FI": "84571185",
                  "IT": "08edd7a73c0100c81a712eec8b323f70",
                  "OR": "0",
                  "NA": "Dynamo Tver vs Sokol Krasnoyarsk",
                  "SS": "0-1",
                  "XP": null,
                  "DC": "1",
                  "CP": "P1",
                  "LM": "44",
                  "PI": null,
                  "TT": "0",
                  "TM": "13",
                  "TS": "14",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "2795c67cbbf89919da285d1944ed4b8a",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471841692",
                          "NA": "Dynamo Tver",
                          "N2": "Home",
                          "IT": "b72df5a0b3b59c5a09a0742c9aca885f",
                          "SU": "0",
                          "HA": "+1.5",
                          "OD": {
                            "F": "21/20",
                            "D": "2.04",
                            "A": "+104"
                          }
                        },
                        {
                          "ID": "471841693",
                          "NA": "Sokol Krasnoyarsk",
                          "N2": "Away",
                          "IT": "f27148e1f8a04579aed6e46549ba70bd",
                          "SU": "0",
                          "HA": "-1.5",
                          "OD": {
                            "F": "3/4",
                            "D": "1.75",
                            "A": -134
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
                  "FI": "84783798",
                  "IT": "9f12cf850a8d8edb85a930fc3ad73f79",
                  "OR": "0",
                  "NA": "Arlan Kokshetau vs HK Almaty",
                  "SS": "0-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "P2",
                  "LM": "43",
                  "PI": null,
                  "TT": "0",
                  "TM": "11",
                  "TS": "59",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "f81fd56e217c0d140921075942ee210c",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471855296",
                          "NA": "Arlan Kokshetau",
                          "N2": "Home",
                          "IT": "88b819c498f3464886873de7ee5382a8",
                          "SU": "0",
                          "HA": "-1.5",
                          "OD": {
                            "F": "11/4",
                            "D": "3.75",
                            "A": "+275"
                          }
                        },
                        {
                          "ID": "471855300",
                          "NA": "HK Almaty",
                          "N2": "Away",
                          "IT": "2f98b906540bfe58ae21fa193febc0ca",
                          "SU": "0",
                          "HA": "+1.5",
                          "OD": {
                            "F": "11/50",
                            "D": "1.22",
                            "A": -455
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84783795",
                  "IT": "05ce132571897e0177b350a84a3a3ef1",
                  "OR": "1",
                  "NA": "Ertis Pavlodar vs Beybarys Atyrau",
                  "SS": "4-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "P2",
                  "LM": "34",
                  "PI": null,
                  "TT": "0",
                  "TM": "15",
                  "TS": "8",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "86390730c4fb6212119ec393ec7c2205",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471856935",
                          "NA": "Ertis Pavlodar",
                          "N2": "Home",
                          "IT": "626bafd1184748c7446ab1db3586d7df",
                          "SU": "0",
                          "HA": "-4.5",
                          "OD": {
                            "F": "11/10",
                            "D": "2.10",
                            "A": "+110"
                          }
                        },
                        {
                          "ID": "471856936",
                          "NA": "Beybarys Atyrau",
                          "N2": "Away",
                          "IT": "d146470e3c55a5a78f01aacd9abb193c",
                          "SU": "0",
                          "HA": "+4.5",
                          "OD": {
                            "F": "7/10",
                            "D": "1.70",
                            "A": -143
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84783792",
                  "IT": "85d2836293b74978506d0f28d34cfd14",
                  "OR": "2",
                  "NA": "Gornyak Rudny vs Kulager",
                  "SS": "0-4",
                  "XP": null,
                  "DC": "1",
                  "CP": "P2",
                  "LM": "35",
                  "PI": null,
                  "TT": "0",
                  "TM": "16",
                  "TS": "27",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "fb2949c70d76f565fc329d44f7d3d51c",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471855817",
                          "NA": "Gornyak Rudny",
                          "N2": "Home",
                          "IT": "a187f4490192913ed3c6e8ddcddee7f2",
                          "SU": "0",
                          "HA": "+4.5",
                          "OD": {
                            "F": "29/50",
                            "D": "1.58",
                            "A": -173
                          }
                        },
                        {
                          "ID": "471855818",
                          "NA": "Kulager",
                          "N2": "Away",
                          "IT": "5574d54df977c4280141fd6b4a56e5f3",
                          "SU": "0",
                          "HA": "-4.5",
                          "OD": {
                            "F": "5/4",
                            "D": "2.25",
                            "A": "+125"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84783801",
                  "IT": "30a40566758d38eb822dd6b939b6d9e8",
                  "OR": "3",
                  "NA": "HK Astana vs Humo-2",
                  "SS": "0-1",
                  "XP": null,
                  "DC": "1",
                  "CP": "P2",
                  "LM": "5",
                  "PI": null,
                  "TT": "0",
                  "TM": "13",
                  "TS": "1",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "0eb67f619a25d75e39b85f0fa0629f75",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "472337250",
                          "NA": "HK Astana",
                          "N2": "Home",
                          "IT": "92fb6eb85f514acbaf917de76d1451be",
                          "SU": "0",
                          "HA": "+2.5",
                          "OD": {
                            "F": "17/20",
                            "D": "1.85",
                            "A": -118
                          }
                        },
                        {
                          "ID": "472337252",
                          "NA": "Humo-2",
                          "N2": "Away",
                          "IT": "14224e6bbf3c4ee420e328bd1222fc41",
                          "SU": "0",
                          "HA": "-2.5",
                          "OD": {
                            "F": "17/20",
                            "D": "1.85",
                            "A": -118
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "1dcaca6613e191f9ed45b8ee5ad57760",
              "NA": "IIHF U20 World Championships Div 1A",
              "OR": "3",
              "EV": [
                {
                  "FI": "84783510",
                  "IT": "8188476a23abe309d4e0b5aeed258f0d",
                  "OR": "0",
                  "NA": "Denmark U20 vs Austria U20",
                  "SS": "2-3",
                  "XP": null,
                  "DC": "1",
                  "CP": "P2",
                  "LM": "42",
                  "PI": null,
                  "TT": "0",
                  "TM": "16",
                  "TS": "35",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "380d399f3fc4b8ada7a46e1889929923",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471852904",
                          "NA": "Denmark U20",
                          "N2": "Home",
                          "IT": "f4cd2b9087fca38bc092d572675dbb77",
                          "SU": "0",
                          "HA": "+1.5",
                          "OD": {
                            "F": "1/2",
                            "D": "1.50",
                            "A": -200
                          }
                        },
                        {
                          "ID": "471852905",
                          "NA": "Austria U20",
                          "N2": "Away",
                          "IT": "4e9d95dd7f0a0e50ccf51c8d2ca45be4",
                          "SU": "0",
                          "HA": "-1.5",
                          "OD": {
                            "F": "6/4",
                            "D": "2.50",
                            "A": "+150"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "IT": "47e5edb4606ba36767d4da1661f07852",
              "NA": "Olympic Qualification",
              "OR": "4",
              "EV": [
                {
                  "FI": "84783216",
                  "IT": "bea0c59f56f3dd6f80171fd27990157f",
                  "OR": "0",
                  "NA": "Iceland vs Kyrgyzstan",
                  "SS": "4-2",
                  "XP": null,
                  "DC": "1",
                  "CP": "P2",
                  "LM": "29",
                  "PI": null,
                  "TT": "0",
                  "TM": "14",
                  "TS": "26",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "9ee82b79794584cd5cd7a58e1e304795",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "473013456",
                          "NA": "Iceland",
                          "N2": "Home",
                          "IT": "301404bc2b652fb937908946af78ef49",
                          "SU": "0",
                          "HA": "-3.5",
                          "OD": {
                            "F": "13/20",
                            "D": "1.65",
                            "A": -154
                          }
                        },
                        {
                          "ID": "473013458",
                          "NA": "Kyrgyzstan",
                          "N2": "Away",
                          "IT": "e884975e86c5d273e35358d53852ddfd",
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
              "IT": "ac286b66c8c73e4fb267dfbaaf0897c5",
              "NA": "Russia VHL-B",
              "OR": "5",
              "EV": [
                {
                  "FI": "84784003",
                  "IT": "586eca0b0ef70875efdbddcfb234e6fb",
                  "OR": "0",
                  "NA": "HC Junior Kurgan vs HK Chelny",
                  "SS": "1-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "P2",
                  "LM": "5",
                  "PI": null,
                  "TT": "0",
                  "TM": "0",
                  "TS": "46",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "10b2bb8b7c30e4fc403a958eff9e1ccd",
                      "SU": "1",
                      "PA": [
                        {
                          "ID": "471860936",
                          "NA": "HC Junior Kurgan",
                          "N2": "Home",
                          "IT": "c40abfc5f647a2492d25a0d616a8ffad",
                          "SU": "1",
                          "HA": "-1.5",
                          "OD": {
                            "F": "31/20",
                            "D": "2.54",
                            "A": "+154"
                          }
                        },
                        {
                          "ID": "471860937",
                          "NA": "HK Chelny",
                          "N2": "Away",
                          "IT": "3e3c005ff11a3e15028954a39bab58b8",
                          "SU": "1",
                          "HA": "+1.5",
                          "OD": {
                            "F": "12/25",
                            "D": "1.48",
                            "A": -209
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "FI": "84784000",
                  "IT": "6fc4be2de1fe63fba2d01309e5ca168e",
                  "OR": "1",
                  "NA": "HC Orenburg vs Dynamo-Altay",
                  "SS": "1-0",
                  "XP": null,
                  "DC": "1",
                  "CP": "P1",
                  "LM": "5",
                  "PI": null,
                  "TT": "0",
                  "TM": "12",
                  "TS": "38",
                  "TU": "",
                  "TA": null,
                  "MA": [
                    {
                      "ID": "170153",
                      "NA": "Puck Line",
                      "N2": "Puck Line",
                      "IT": "7fa1ad0518a7a8f9f95aeabdb4d24a31",
                      "SU": "0",
                      "PA": [
                        {
                          "ID": "471865139",
                          "NA": "HC Orenburg",
                          "N2": "Home",
                          "IT": "6631b8359e58e513702d535d81a97b2f",
                          "SU": "0",
                          "HA": "+1.5",
                          "OD": {
                            "F": "13/25",
                            "D": "1.52",
                            "A": -193
                          }
                        },
                        {
                          "ID": "471865141",
                          "NA": "Dynamo-Altay",
                          "N2": "Away",
                          "IT": "3bb9fb15e5966cab765d5ea1d9c88ac2",
                          "SU": "0",
                          "HA": "-1.5",
                          "OD": {
                            "F": "7/5",
                            "D": "2.40",
                            "A": "+140"
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

    let curID = params.sportID;
    const json = JSON.parse(data);
    if (curID === undefined) {
      ID = parseInt(json.DATA[0].ID);
    }
    else {
      ID = curID;
    }
    // Output table of games
    (function RenderTable(data, ID) {
      const json = JSON.parse(data);
      json.DATA.forEach(sport => {
        if (parseInt(sport.ID) == ID) {

          let mutchCounter = 0;

          for (let i = 0; i < sport.CT.length; i++) {

            if (mutchCounter < 20) {
              if (sport.CT[i].EV.length < 4) {
                for (let j = 0; j < sport.CT[i].EV.length; j++) {
                  $(`[data-id="play-table"]`).append(`
                  <div class="row">
                  <div class="cell">
                  <div data-class="play-link" data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link ]">
                    <div data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link-block ]"> 
                      <p data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[0]} vs</p>
                      <p data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[1]}</p>
                    </div> 
                  <div data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link-block ] text-right"> <div data-game-id="${sport.CT[i].EV[j].FI}" class="sport-icon play"></div> <p data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white">${sport.CT[i].EV[j].SS}</p> 
                    <p data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white">87:03</p> </div> </div> </div> 
                    <div class="cell"> 
                      <button class="button coefficient">1/1</button> </div> 
                    <div class="cell"> 
                      <button class="button coefficient">1/1</button>
                    </div> 
                    <div class="cell">
                      <button class="button coefficient">1/1</button> 
                    </div>
                  </div>`);
                  mutchCounter++;

                }
              } else {
                for (let j = 0; j < 4; j++) {
                  $(`[data-id="play-table"]`).append(`<div class="row"> <div class="cell"> <div class="[ play-link ]"> <div class="[ play-link-block ]"> <p class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[0] + ' vs'}</p> 
                  <p class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[1]}</p> </div>
                  <div class="[ play-link-block ] text-right"> <div class="sport-icon play"></div>
                  <p class="font m-white">${sport.CT[i].EV[j].SS}</p>
                  <p class="font m-white">87:03</p> </div> </div> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> 
                  <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> </div>`);
                  mutchCounter++;
                }
              }
              $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
              <div class="cell"> <p class="font">${sport.CT[i].NA} </p> </div> 
              <div class="cell"> <p class="font">1</p> </div> 
              <div class="cell"> <p class="font">X</p> </div> <div class="cell"> <p class="font">2</p> </div></div>`);
            } else {
              break;
            }
          }
        } else {
          return true;
        }
      });
    })(data, ID);

    // Handle opening of game section
    $(`[data-class=play-link]`).on('click', (event) => {
      let id = $(event.target).data('gameId');
      console.log(event.target);
      let curURL = window.location.href;
      //if filter is active - clean it
      if (window.location.hash.split('/')[1] == 'filer') {
        window.location.href = window.location.href.split('#')[0];
        window.location.href += `#/game/${id}`;
      }
      else {
        window.location.href += `#/game/${id}`;
      }
    });

  });
});