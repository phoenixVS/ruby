exports('play_table', (params, done) => {
  insertHtmlModules({
    ".play-table": [
      "play-table/play-table.html"
    ]
  }, () => {

    const rows = $('.play-table .row');
    (() => {
      rows.on('click', () => {

      });
    })(0);

    let data =
      `{
        "STATUS": "SUCCESS",
        "TOPIC": "INPLAY",
        "CMD": "F",
        "EPOCH": 1575889417,
        "DATA": [
          {
            "ID": "1",
            "NA": "Soccer",
            "OR": "0",
            "IT": "31ce276d18580988eb785a79a0f059ce",
            "CT": [
              {
                "IT": "e61c2b02058b68116b1d58646548fb71",
                "NA": "Azerbaijan Division 1",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84678764",
                    "IT": "24c076ea5e57a5e8e660cc79b0f0ea94",
                    "OR": "0",
                    "NA": "FC Agsu vs Zaqatala",
                    "SS": "0-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "12",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191209105136",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "19dc1a98d92431ace97b0ae89a8d8c3f",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466146884",
                            "NA": "FC Agsu",
                            "N2": "Home",
                            "IT": "ffa021047e42c9f7e38ef152a8c36ba6",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "25/1",
                              "D": "26.00",
                              "A": "+2500"
                            }
                          },
                          {
                            "ID": "466146888",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "55bed1c4ceb6f3fe33da60f087ac3a99",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "14/1",
                              "D": "15.00",
                              "A": "+1400"
                            }
                          },
                          {
                            "ID": "466146891",
                            "NA": "Zaqatala",
                            "N2": "Away",
                            "IT": "c81e9d5d5de55eedc4e98a53101b9ae7",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/33",
                              "D": "1.03",
                              "A": -3334
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84678759",
                    "IT": "49a30d25e3dadf859650cd72b59db0df",
                    "OR": "1",
                    "NA": "FK Sumqayit II vs Sabail FC II",
                    "SS": "1-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "11",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191209105726",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "a2314bd834435eb954e2fba4f99d726b",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466145346",
                            "NA": "FK Sumqayit II",
                            "N2": "Home",
                            "IT": "598a745bb42b88cc97db8c70129100a7",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/4",
                              "D": "4.75",
                              "A": "+375"
                            }
                          },
                          {
                            "ID": "466145347",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "1bb028ce4463e1c47a37c6db6f46da04",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/4",
                              "D": "2.75",
                              "A": "+175"
                            }
                          },
                          {
                            "ID": "466145348",
                            "NA": "Sabail FC II",
                            "N2": "Away",
                            "IT": "2b925350e79d17a4b2b22c20883fbc61",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "20/21",
                              "D": "1.95",
                              "A": -106
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84678767",
                    "IT": "de0e1558619fa06e10594b4ed6e889dc",
                    "OR": "2",
                    "NA": "Keshla FK II vs Qaradag Lokbatan",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "12",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191209104824",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "6750668a4b6fb63f2bc33480d9911b83",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466147315",
                            "NA": "Keshla FK II",
                            "N2": "Home",
                            "IT": "128550a14e837159da9823924f85f249",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/16",
                              "D": "1.06",
                              "A": -1667
                            }
                          },
                          {
                            "ID": "466147316",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "8dcfbf39f79ba097424c3ff15b52f462",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/1",
                              "D": "10.00",
                              "A": "+900"
                            }
                          },
                          {
                            "ID": "466147317",
                            "NA": "Qaradag Lokbatan",
                            "N2": "Away",
                            "IT": "64363c9e4b376d74481d71b38689ec31",
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
                    "FI": "84678762",
                    "IT": "6e4b77ac6d7cb01f70f002bf5c41f678",
                    "OR": "3",
                    "NA": "Moik Baku vs Neftchi Baku II",
                    "SS": "0-1",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "12",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191209104920",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "713addc6d31ce01bce317ab19ff950c7",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466146368",
                            "NA": "Moik Baku",
                            "N2": "Home",
                            "IT": "89cb32382a9a3d90daf1f36d4d87df6a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "17/2",
                              "D": "9.50",
                              "A": "+850"
                            }
                          },
                          {
                            "ID": "466146369",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "cbe861a213dfb2da5cc606d6c1417c2b",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/4",
                              "D": "4.75",
                              "A": "+375"
                            }
                          },
                          {
                            "ID": "466146372",
                            "NA": "Neftchi Baku II",
                            "N2": "Away",
                            "IT": "6a9710208f1a982b9f5c91ca81bef579",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "2/7",
                              "D": "1.28",
                              "A": -358
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84678773",
                    "IT": "d90c5457074b9121dcfacc91df6b51aa",
                    "OR": "4",
                    "NA": "PFK Turan Tovuz vs Zira IK II",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "11",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191209104817",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "d7065c64bbabeb9ec127a63f0ac63c0d",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466148795",
                            "NA": "PFK Turan Tovuz",
                            "N2": "Home",
                            "IT": "3e568f9aaa191473a63d92c2d8c2df1b",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "8/5",
                              "D": "2.60",
                              "A": "+160"
                            }
                          },
                          {
                            "ID": "466148796",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "7d82abd05854968e58dcf15061c7545a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "13/8",
                              "D": "2.62",
                              "A": "+162"
                            }
                          },
                          {
                            "ID": "466148797",
                            "NA": "Zira IK II",
                            "N2": "Away",
                            "IT": "ff6a51e34c66721136eee333def93d65",
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
                  },
                  {
                    "FI": "84678770",
                    "IT": "37b2373f1e8721919e95dc0f610458b5",
                    "OR": "5",
                    "NA": "Sabah FK II vs FK Qarabag II",
                    "SS": "1-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "12",
                    "PI": null,
                    "TT": "0",
                    "TM": "45",
                    "TS": "0",
                    "TU": "20191209104941",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "42e1fa3cb3d7c64246b6e6a5929f95af",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466148223",
                            "NA": "Sabah FK II",
                            "N2": "Home",
                            "IT": "531a7384c06488202659f71ffc7db929",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "13/5",
                              "D": "3.60",
                              "A": "+260"
                            }
                          },
                          {
                            "ID": "466148224",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "bc954ccdc806c2da158a8105d21ca1e1",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/2",
                              "D": "3.50",
                              "A": "+250"
                            }
                          },
                          {
                            "ID": "466148225",
                            "NA": "FK Qarabag II",
                            "N2": "Away",
                            "IT": "1934dc0b75f36ea5bc012a7a8013fa1f",
                            "SU": "0",
                            "HA": "",
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
                "IT": "17cd1cc42b10d5eebf8f720f304ec48c",
                "NA": "Iran Pro League",
                "OR": "1",
                "EV": [
                  {
                    "FI": "84428922",
                    "IT": "5f908646b2ffe6b77454fa9e2726dfc8",
                    "OR": "0",
                    "NA": "Shahre Khodro vs Sepahan",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "82",
                    "PI": null,
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191209103459",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "6b81a502559cd87175a6816e5b801c4a",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466364659",
                            "NA": "Shahre Khodro",
                            "N2": "Home",
                            "IT": "1cd278804d947b04481571a02e13e2b8",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/4",
                              "D": "2.75",
                              "A": "+175"
                            }
                          },
                          {
                            "ID": "466364660",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "7ea5829ade134b04cf97f440d7414ee4",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "19/10",
                              "D": "2.90",
                              "A": "+190"
                            }
                          },
                          {
                            "ID": "466364661",
                            "NA": "Sepahan",
                            "N2": "Away",
                            "IT": "d347afe17631b8263c408acb263d34d7",
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
                  }
                ]
              },
              {
                "IT": "a7b39ba0710878809ac82d3cd4177c6a",
                "NA": "Iran Div 2",
                "OR": "2",
                "EV": [
                  {
                    "FI": "84681760",
                    "IT": "d69fe0800207e8b3512ac59de72e56c3",
                    "OR": "0",
                    "NA": "Chooka Talesh vs Pas Hamedan",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "74",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191209103004",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "eb9e3d74c5bcdbb29282611d65d92e30",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466356282",
                            "NA": "Chooka Talesh",
                            "N2": "Home",
                            "IT": "8fbd81111486ff0158c4a182826f5bc1",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/5",
                              "D": "1.20",
                              "A": -501
                            }
                          },
                          {
                            "ID": "466356283",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "49e87d6c1abcef326cd2513897ed77d6",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/2",
                              "D": "5.50",
                              "A": "+450"
                            }
                          },
                          {
                            "ID": "466356284",
                            "NA": "Pas Hamedan",
                            "N2": "Away",
                            "IT": "c7b2354b3f2065942fca16c1608662b8",
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
                    "FI": "84681769",
                    "IT": "48a666e2096380216be3dd143750dd55",
                    "OR": "1",
                    "NA": "Iranjavan Bushehr vs Melli Hafari",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "83",
                    "PI": null,
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191209103456",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "f582a2d1cd8f01c4697c018ca6e35307",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466359647",
                            "NA": "Iranjavan Bushehr",
                            "N2": "Home",
                            "IT": "da63a0263a185bce098743558999193c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/2",
                              "D": "1.50",
                              "A": -200
                            }
                          },
                          {
                            "ID": "466359648",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "3cb713cf1112c04109afdd4917bcc960",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "5/2",
                              "D": "3.50",
                              "A": "+250"
                            }
                          },
                          {
                            "ID": "466359649",
                            "NA": "Melli Hafari",
                            "N2": "Away",
                            "IT": "2c39bf05b0598e15c27cd3048519a50a",
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
                    "FI": "84681758",
                    "IT": "e0256dfaa986653af1c5c33f0ef36f91",
                    "OR": "2",
                    "NA": "Naft Gachsaran vs Shahrdari Bandar Abbas",
                    "SS": "1-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "59",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191209103047",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "2b0c09382a91aaafde1948d0cf71e0da",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466354684",
                            "NA": "Naft Gachsaran",
                            "N2": "Home",
                            "IT": "b91dfba7bdf7624054e52de07578c35a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/8",
                              "D": "1.12",
                              "A": -834
                            }
                          },
                          {
                            "ID": "466354685",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "98cb866e76ec336f041ddc2140826b65",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "6/1",
                              "D": "7.00",
                              "A": "+600"
                            }
                          },
                          {
                            "ID": "466354686",
                            "NA": "Shahrdari Bandar Abbas",
                            "N2": "Away",
                            "IT": "d359b34c0299a19dfccce918aab66161",
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
                    "FI": "84726920",
                    "IT": "8014b3d253f7bf2f7f3e86a2cbe36277",
                    "OR": "3",
                    "NA": "Naft Omidiyeh vs Shahrdari Bam",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "65",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191209104849",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "57e5a70c2884fa23c30a11d0fb36d2d0",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466622640",
                            "NA": "Naft Omidiyeh",
                            "N2": "Home",
                            "IT": "f6494127009b84435b94ae35c1467046",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "11/8",
                              "D": "2.37",
                              "A": "+137"
                            }
                          },
                          {
                            "ID": "466622643",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "8753a38320c1818dfd7777fbf98ee8f9",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "7/4",
                              "D": "2.75",
                              "A": "+175"
                            }
                          },
                          {
                            "ID": "466622644",
                            "NA": "Shahrdari Bam",
                            "N2": "Away",
                            "IT": "52d342815d407739f7f10cdf391783bf",
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
                    "FI": "84681766",
                    "IT": "bf917ed0f3ca65e060b93e9299621d0e",
                    "OR": "4",
                    "NA": "Sardar Bukan FC vs Mes Shahr-e Babak",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "62",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191209103340",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "91ebe2409f85f228038134a184b8e30a",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466357966",
                            "NA": "Sardar Bukan FC",
                            "N2": "Home",
                            "IT": "60ec8f6fe913e30a95e59f86d11552c2",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/6",
                              "D": "1.66",
                              "A": -152
                            }
                          },
                          {
                            "ID": "466357967",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "d0e5bac33c9d0ffeec22e60d25bb2e73",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "15/8",
                              "D": "2.87",
                              "A": "+187"
                            }
                          },
                          {
                            "ID": "466357968",
                            "NA": "Mes Shahr-e Babak",
                            "N2": "Away",
                            "IT": "c964972379cb63deee6726fff9242b53",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "6/1",
                              "D": "7.00",
                              "A": "+600"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "5215d09c1744cea14964eccdfc8f6467",
                "NA": "Vietnam U19 Championship Women",
                "OR": "3",
                "EV": [
                  {
                    "FI": "84725869",
                    "IT": "2464abe03ce74dc4fef9ef0e3fbf73ed",
                    "OR": "0",
                    "NA": "Hanoi U19 Women vs Phong Phu Ha Nam U19 Women",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "18",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191209102714",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "6441fc6b25b9b10ef496a502e35a50b4",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466457189",
                            "NA": "Hanoi U19 Women",
                            "N2": "Home",
                            "IT": "4dadaa43eb4bcd9d2a5a3e38a44ea2f3",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/7",
                              "D": "1.14",
                              "A": -715
                            }
                          },
                          {
                            "ID": "466457190",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "cb3ecc4effde35f69090da88ed0af00a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "6/1",
                              "D": "7.00",
                              "A": "+600"
                            }
                          },
                          {
                            "ID": "466457191",
                            "NA": "Phong Phu Ha Nam U19 Women",
                            "N2": "Away",
                            "IT": "2adc869ccebfd4d77053fc26e435cfa1",
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
                "IT": "379b57c9e1a2919a0323fe5b398bcf6f",
                "NA": "CECAFA Cup",
                "OR": "4",
                "EV": [
                  {
                    "FI": "84718671",
                    "IT": "6fd741e60d2efbc94d23a2bc71b96cf1",
                    "OR": "0",
                    "NA": "Burundi vs Eritrea",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "80",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191209103117",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "b95f6a77d21325910ce69e3a3887c32b",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466251432",
                            "NA": "Burundi",
                            "N2": "Home",
                            "IT": "0be916d5a3dc1c6042e7987d9e43d9cc",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "4/7",
                              "D": "1.57",
                              "A": -176
                            }
                          },
                          {
                            "ID": "466251434",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "e787a3a930603f370c29bdbcae9f9385",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "12/5",
                              "D": "3.40",
                              "A": "+240"
                            }
                          },
                          {
                            "ID": "466251436",
                            "NA": "Eritrea",
                            "N2": "Away",
                            "IT": "79d5368c5d10d0157521dbd054ac3825",
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
                "IT": "b5baac5227f12cab14341e432bb13be2",
                "NA": "Cosafa U20 Cup",
                "OR": "5",
                "EV": [
                  {
                    "FI": "84682374",
                    "IT": "96e98d836799321608229e8a854ca0e3",
                    "OR": "0",
                    "NA": "Angola U20 vs Eswatini U20",
                    "SS": "2-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "66",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "1",
                    "TU": "20191209104507",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "8ef13da07ed7cc2ad5c3bd4fb7409f4b",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466259016",
                            "NA": "Angola U20",
                            "N2": "Home",
                            "IT": "412cd1aceabd7f8e039c803a8397c738",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/66",
                              "D": "1.01",
                              "A": -10000
                            }
                          },
                          {
                            "ID": "466259017",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "02071321ca2ea31708d20ffa265d1706",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "20/1",
                              "D": "21.00",
                              "A": "+2000"
                            }
                          },
                          {
                            "ID": "466259018",
                            "NA": "Eswatini U20",
                            "N2": "Away",
                            "IT": "8a83a476c59ede219f92f90ae159e3f6",
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
                  },
                  {
                    "FI": "84682376",
                    "IT": "8458a083727cc323781bb554f3515310",
                    "OR": "1",
                    "NA": "Mozambique U20 vs Seychelles U20",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "",
                    "LM": "34",
                    "PI": null,
                    "TT": "1",
                    "TM": "0",
                    "TS": "0",
                    "TU": "20191209104517",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1777",
                        "NA": "Fulltime Result",
                        "N2": "Fulltime Result",
                        "IT": "58f78b7400a53ae8c003ac2c0d23c373",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466261419",
                            "NA": "Mozambique U20",
                            "N2": "Home",
                            "IT": "05f0132648908f4e114bb8ce8f80bb79",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/16",
                              "D": "1.06",
                              "A": -1667
                            }
                          },
                          {
                            "ID": "466261420",
                            "NA": "Draw",
                            "N2": "Draw",
                            "IT": "0c9de460ad98bd0303a13b5e16fd084e",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "9/1",
                              "D": "10.00",
                              "A": "+900"
                            }
                          },
                          {
                            "ID": "466261421",
                            "NA": "Seychelles U20",
                            "N2": "Away",
                            "IT": "b2be8360483e36469ec75c51442ed7f3",
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
                "IT": "4a6f9f187316268d21fbc165248b951e",
                "NA": "ITF W100 Dubai",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84722938",
                    "IT": "0a88a25321e4dd2a40ac9cdc12e62e24",
                    "OR": "0",
                    "NA": "Kristina Mladenovic vs Maiar S A Abdelaziz",
                    "SS": "3-0",
                    "XP": "15-0",
                    "DC": "0",
                    "CP": "",
                    "LM": "24",
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
                        "IT": "3187cd840c27513df1c7f744b5b29b5b",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466895909",
                            "NA": "Kristina Mladenovic",
                            "N2": "Home",
                            "IT": "71a5b04c2d455092e0ac13c213d7028c",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/150",
                              "D": "1.00",
                              "A": 0
                            }
                          },
                          {
                            "ID": "466895908",
                            "NA": "Maiar S A Abdelaziz",
                            "N2": "Away",
                            "IT": "b68743d6c2fa13cf0d1c1563a711545a",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "20/1",
                              "D": "21.00",
                              "A": "+2000"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "FI": "84722943",
                    "IT": "533aa52772ed0fd6af078164c74a4c4b",
                    "OR": "1",
                    "NA": "Vitalia Diatchenko vs Elena Gabriela Ruse",
                    "SS": "3-0",
                    "XP": "40-15",
                    "DC": "0",
                    "CP": "",
                    "LM": "24",
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
                        "IT": "c52bfbae2006e4938e46def1c3a02cf1",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466896011",
                            "NA": "Vitalia Diatchenko",
                            "N2": "Home",
                            "IT": "d7a821642ed209f4d756a5be1288569f",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/25",
                              "D": "1.04",
                              "A": -2500
                            }
                          },
                          {
                            "ID": "466896010",
                            "NA": "Elena Gabriela Ruse",
                            "N2": "Away",
                            "IT": "a2f9a137c43a479c38d0ab97064621d5",
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
                  },
                  {
                    "FI": "84728032",
                    "IT": "3d6d51331e4badce27708c1673262ce8",
                    "OR": "2",
                    "NA": "Valentina Ivakhnenko vs Nicoleta-Catalina Dascalu",
                    "SS": "2-2",
                    "XP": "40-A",
                    "DC": "0",
                    "CP": "",
                    "LM": "17",
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
                        "IT": "bfe837fd01b0891d0f4bc62b895ce9bc",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466895798",
                            "NA": "Valentina Ivakhnenko",
                            "N2": "Home",
                            "IT": "6d3de4ee9f85221e3d858fb9525993d0",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "21/20",
                              "D": "2.04",
                              "A": "+104"
                            }
                          },
                          {
                            "ID": "466895797",
                            "NA": "Nicoleta-Catalina Dascalu",
                            "N2": "Away",
                            "IT": "48cc6f67a6a6071f832562bcd3683282",
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
              },
              {
                "IT": "1e799bec655a70e7035a3b0ca23b9b99",
                "NA": "ITF M15 Doha",
                "OR": "1",
                "EV": [
                  {
                    "FI": "84728531",
                    "IT": "75d7c80319e445a5ec62ed5334180cfd",
                    "OR": "0",
                    "NA": "Aliaksandr Liaonenka vs Theertha Shashank Macherla",
                    "SS": "1-2",
                    "XP": "40-0",
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
                        "IT": "831db2e570425422b2a6e1f91afb5b47",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "467113716",
                            "NA": "Aliaksandr Liaonenka",
                            "N2": "Home",
                            "IT": "1e7e6a9213657eed57c04e05302dd845",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "1/25",
                              "D": "1.04",
                              "A": -2500
                            }
                          },
                          {
                            "ID": "467113714",
                            "NA": "Theertha Shashank Macherla",
                            "N2": "Away",
                            "IT": "4540e212090956419221e256ccb5ccf1",
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
                  },
                  {
                    "FI": "84728530",
                    "IT": "402795cac9609e50e995dfdc58dbf40d",
                    "OR": "1",
                    "NA": " Michael Paty vs Shahbaaz Khan",
                    "SS": "4-6,0-1",
                    "XP": "40-40",
                    "DC": "0",
                    "CP": "",
                    "LM": "15",
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
                        "IT": "e10398d68cfe08e2ecc404202433e10a",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "467114178",
                            "NA": " Michael Paty",
                            "N2": "Home",
                            "IT": "c76cdeb2fcf37906926f7ca6663c971d",
                            "SU": "0",
                            "HA": "",
                            "OD": {
                              "F": "16/1",
                              "D": "17.00",
                              "A": "+1600"
                            }
                          },
                          {
                            "ID": "467114177",
                            "NA": "Shahbaaz Khan",
                            "N2": "Away",
                            "IT": "c074d8cdc26921f50af25b1758ed80ea",
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
                  },
                  {
                    "FI": "84728529",
                    "IT": "99aa84a264cdc5e1ff51fcd0501a89ea",
                    "OR": "2",
                    "NA": "Niklas Johansson vs Nasser Alyafei",
                    "SS": "1-0",
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
                        "IT": "ac481fa550083eb76bc3442936f2c223",
                        "SU": "1",
                        "PA": [
                          {
                            "ID": "467114382",
                            "NA": "Niklas Johansson",
                            "N2": "Home",
                            "IT": "3eb75f6e0de36301058566d17a2ff190",
                            "SU": "1",
                            "HA": "",
                            "OD": {
                              "F": "1/1000",
                              "D": "1.00",
                              "A": 0
                            }
                          },
                          {
                            "ID": "467114381",
                            "NA": "Nasser Alyafei",
                            "N2": "Away",
                            "IT": "46fe720760b7e604e1580a8a3ce36e39",
                            "SU": "1",
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
                "IT": "741c0021cf5d73bca1337d0c12b330f8",
                "NA": "Japan B League 1",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84388546",
                    "IT": "0b077b7d119a047061a54feb5037ad12",
                    "OR": "0",
                    "NA": "Shimane Susanoo Magic vs Shibuya Sun Rockers",
                    "SS": "34-35",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q3",
                    "LM": "107",
                    "PI": null,
                    "TT": "0",
                    "TM": "10",
                    "TS": "0",
                    "TU": "20191209105520",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "31af30f411ac3685ceffad3e8c148c58",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466163751",
                            "NA": "Shimane Susanoo Magic",
                            "N2": "Home",
                            "IT": "9cb39ebf7f8423688718f5f5415bf26e",
                            "SU": "0",
                            "HA": "+5.5",
                            "OD": {
                              "F": "20/23",
                              "D": "1.86",
                              "A": -117
                            }
                          },
                          {
                            "ID": "466163752",
                            "NA": "Shibuya Sun Rockers",
                            "N2": "Away",
                            "IT": "96ec8d6853288b47b558212cc0af53ac",
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
                  }
                ]
              },
              {
                "IT": "5e330325f3963c0518228db7e712a2b0",
                "NA": "VTB United League U21",
                "OR": "1",
                "EV": [
                  {
                    "FI": "84563991",
                    "IT": "8564971b81633da89bbb36e3e12482b8",
                    "OR": "0",
                    "NA": "Lokomotiv Kuban 2 vs CSKA Moscow Junior",
                    "SS": "34-36",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q3",
                    "LM": "49",
                    "PI": null,
                    "TT": "0",
                    "TM": "9",
                    "TS": "21",
                    "TU": "20191209105839",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "17a7068650f8f066659d0e1155a059b1",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466159727",
                            "NA": "Lokomotiv Kuban 2",
                            "N2": "Home",
                            "IT": "8d5020bced127432a9bd5421696e4cc9",
                            "SU": "0",
                            "HA": "+10.5",
                            "OD": {
                              "F": "20/23",
                              "D": "1.86",
                              "A": -117
                            }
                          },
                          {
                            "ID": "466159728",
                            "NA": "CSKA Moscow Junior",
                            "N2": "Away",
                            "IT": "9f9585a601335e9c8dda070de11b4d6b",
                            "SU": "0",
                            "HA": "-10.5",
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
                    "FI": "84563994",
                    "IT": "65dbefd686afbf8a6286e217ac2426c5",
                    "OR": "1",
                    "NA": "Zenit St. Petersburg 2 vs Enisey Krasnoyarsk 2",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q1",
                    "LM": "62",
                    "PI": null,
                    "TT": "0",
                    "TM": "10",
                    "TS": "0",
                    "TU": "20191209105352",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "7329dd71a75bc443820bca01e769d480",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466160875",
                            "NA": "Zenit St. Petersburg 2",
                            "N2": "Home",
                            "IT": "d120f956a4608baefe37b0dfed1669c3",
                            "SU": "0",
                            "HA": "-21.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          },
                          {
                            "ID": "466160876",
                            "NA": "Enisey Krasnoyarsk 2",
                            "N2": "Away",
                            "IT": "21bb3fe15667d7415c514622002cc695",
                            "SU": "0",
                            "HA": "+21.5",
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
                "IT": "ccf6eacc56f18703475bae8355f1b202",
                "NA": "Russia ASB Student League",
                "OR": "2",
                "EV": [
                  {
                    "FI": "84694298",
                    "IT": "eb1ad89b879163a0b51fa7d73da703b5",
                    "OR": "0",
                    "NA": "NGPU Novosibirsk vs SibGUTI Novosibirsk",
                    "SS": "21-32",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q2",
                    "LM": "5",
                    "PI": null,
                    "TT": "1",
                    "TM": "6",
                    "TS": "27",
                    "TU": "20191209105835",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "adcfb4949d64c69fd07c3373548eff5c",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466242634",
                            "NA": "NGPU Novosibirsk",
                            "N2": "Home",
                            "IT": "8ff6757804ce0171f5760153e451bcb0",
                            "SU": "0",
                            "HA": "+14.5",
                            "OD": {
                              "F": "4/5",
                              "D": "1.80",
                              "A": -125
                            }
                          },
                          {
                            "ID": "466242635",
                            "NA": "SibGUTI Novosibirsk",
                            "N2": "Away",
                            "IT": "36eb4dbfc9461d3aa14154b212b35d23",
                            "SU": "0",
                            "HA": "-14.5",
                            "OD": {
                              "F": "20/23",
                              "D": "1.86",
                              "A": -117
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "253d13fa6450649034a931be7409d429",
                "NA": "South East Asian Games Women",
                "OR": "3",
                "EV": [
                  {
                    "FI": "84713445",
                    "IT": "6f97b3608382166982f8a939f9b7e9d6",
                    "OR": "0",
                    "NA": "Indonesia Women vs Malaysia Women",
                    "SS": "38-33",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q3",
                    "LM": "53",
                    "PI": null,
                    "TT": "0",
                    "TM": "10",
                    "TS": "0",
                    "TU": "20191209104938",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "e002b175daac01d750ddb72751f9675c",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466157942",
                            "NA": "Indonesia Women",
                            "N2": "Home",
                            "IT": "1735b3674a126041183847ce879f9b25",
                            "SU": "0",
                            "HA": "-3.5",
                            "OD": {
                              "F": "5/6",
                              "D": "1.83",
                              "A": -121
                            }
                          },
                          {
                            "ID": "466157943",
                            "NA": "Malaysia Women",
                            "N2": "Away",
                            "IT": "5b1314055045bf17740f055613d8fe9c",
                            "SU": "0",
                            "HA": "+3.5",
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
                "IT": "bbb216df4cc540444d612361093e3c1d",
                "NA": "Korea WKBL",
                "OR": "4",
                "EV": [
                  {
                    "FI": "84567527",
                    "IT": "5828d81604e7737f17f1897848d9c669",
                    "OR": "0",
                    "NA": "Samsung BlueMinx Women vs Shinhan S'Birds Women",
                    "SS": "27-27",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q3",
                    "LM": "53",
                    "PI": null,
                    "TT": "0",
                    "TM": "10",
                    "TS": "0",
                    "TU": "20191209104945",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "86d4d54a8c9278f847b16dda8e0d2831",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466165939",
                            "NA": "Samsung BlueMinx Women",
                            "N2": "Home",
                            "IT": "90d7247f55ec743ae80aab0ce3116bad",
                            "SU": "0",
                            "HA": "+2.5",
                            "OD": {
                              "F": "20/23",
                              "D": "1.86",
                              "A": -117
                            }
                          },
                          {
                            "ID": "466165940",
                            "NA": "Shinhan S'Birds Women",
                            "N2": "Away",
                            "IT": "22ac2b367d2834c4524c0478badfd3aa",
                            "SU": "0",
                            "HA": "-2.5",
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
                "IT": "8a3112039b0654d68ab3f23467878473",
                "NA": "Russia Superleague 2 Women",
                "OR": "5",
                "EV": [
                  {
                    "FI": "84570427",
                    "IT": "96a8ebdf13f2972bff45468bf18318d6",
                    "OR": "0",
                    "NA": "Spartak Noginsk 2 Women vs Shahty Women",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "Q1",
                    "LM": "5",
                    "PI": null,
                    "TT": "0",
                    "TM": "10",
                    "TS": "0",
                    "TU": "20191209105401",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "1446",
                        "NA": "Spread",
                        "N2": "Spread",
                        "IT": "5aaf78af5fb5be3eabf289537a7082ad",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466245033",
                            "NA": "Spartak Noginsk 2 Women",
                            "N2": "Home",
                            "IT": "dff7cafee2b31e9cc37d73167e1ae49f",
                            "SU": "0",
                            "HA": "+10.5",
                            "OD": {
                              "F": "4/5",
                              "D": "1.80",
                              "A": -125
                            }
                          },
                          {
                            "ID": "466245034",
                            "NA": "Shahty Women",
                            "N2": "Away",
                            "IT": "dcc698792b156dbb873d703fc7602b7c",
                            "SU": "0",
                            "HA": "-10.5",
                            "OD": {
                              "F": "20/23",
                              "D": "1.86",
                              "A": -117
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
            "OR": "6",
            "IT": "84a0671dbcefccfa0761f5bec0f0859a",
            "CT": [
              {
                "IT": "701fd925b1f3de400b7aa59c2f072d71",
                "NA": "Romania Cup",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84722217",
                    "IT": "668e9b7a6daaa45c724171949dee9808",
                    "OR": "0",
                    "NA": "CS Universitatea Cluj vs CSM Botosani",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "1st",
                    "LM": "52",
                    "PI": null,
                    "TT": "0",
                    "TM": "0",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "780110",
                        "NA": "Handicap 2-Way",
                        "N2": "Handicap 2-Way",
                        "IT": "e44faf4f512289226f60e056e626fbe6",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466582868",
                            "NA": "CS Universitatea Cluj",
                            "N2": "Home",
                            "IT": "373541a9e8c8d2394855be879a8e6a64",
                            "SU": "0",
                            "HA": "+0.5",
                            "OD": {
                              "F": "3/4",
                              "D": "1.75",
                              "A": -134
                            }
                          },
                          {
                            "ID": "466582871",
                            "NA": "CSM Botosani",
                            "N2": "Away",
                            "IT": "aea102c00bcc8aac3f836da71b8d8169",
                            "SU": "0",
                            "HA": "-0.5",
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
              }
            ]
          },
          {
            "ID": "17",
            "NA": "Ice Hockey",
            "OR": "8",
            "IT": "114288299ab1688ab06a6a2779b4771c",
            "CT": [
              {
                "IT": "876ecb872b4f0fa05cd2fb2480bc6c5e",
                "NA": "KHL",
                "OR": "0",
                "EV": [
                  {
                    "FI": "84695137",
                    "IT": "14998a1d1115d03390ef4ae344fb0d99",
                    "OR": "0",
                    "NA": "Amur Khabarovsk vs Kunlun Red Star",
                    "SS": "2-3",
                    "XP": null,
                    "DC": "1",
                    "CP": "P3",
                    "LM": "50",
                    "PI": null,
                    "TT": "0",
                    "TM": "9",
                    "TS": "30",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "63ba7f436239350e60c3603ed205077c",
                        "SU": "1",
                        "PA": [
                          {
                            "ID": "466231338",
                            "NA": "Amur Khabarovsk",
                            "N2": "Home",
                            "IT": "e06238f00c8ba052f0408d1795e5322c",
                            "SU": "1",
                            "HA": "+1.5",
                            "OD": {
                              "F": "21/50",
                              "D": "1.42",
                              "A": -239
                            }
                          },
                          {
                            "ID": "466231340",
                            "NA": "Kunlun Red Star",
                            "N2": "Away",
                            "IT": "ceb22d966a0a0cc0cd57eeffe024ec59",
                            "SU": "1",
                            "HA": "-1.5",
                            "OD": {
                              "F": "19/10",
                              "D": "2.90",
                              "A": "+190"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "IT": "bbb20bb0a0515a4652ff9e0d82f009e1",
                "NA": "Russia MHL-B",
                "OR": "1",
                "EV": [
                  {
                    "FI": "84572877",
                    "IT": "0565267c2d8bb2f1850262b463a80ae2",
                    "OR": "0",
                    "NA": "HC Dynamo-Junior U20 vs HC Tverichi U20",
                    "SS": "7-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "P3",
                    "LM": "4",
                    "PI": null,
                    "TT": "0",
                    "TM": "16",
                    "TS": "1",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "abd21c604204d02f0bec9a0aa686110f",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466315482",
                            "NA": "HC Dynamo-Junior U20",
                            "N2": "Home",
                            "IT": "67ec2301d02c858f46198ca3765fb8f8",
                            "SU": "0",
                            "HA": "-5.5",
                            "OD": {
                              "F": "3/1",
                              "D": "4.00",
                              "A": "+300"
                            }
                          },
                          {
                            "ID": "466315484",
                            "NA": "HC Tverichi U20",
                            "N2": "Away",
                            "IT": "2bce688ce6861966bdd1f8f3e96ac00d",
                            "SU": "0",
                            "HA": "+5.5",
                            "OD": {
                              "F": "1/5",
                              "D": "1.20",
                              "A": -501
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
                "OR": "2",
                "EV": [
                  {
                    "FI": "84571874",
                    "IT": "4c1e73d101429a93511b3bf9c4495771",
                    "OR": "0",
                    "NA": "Russkie Vityazi U20 vs Krylya Sovetov U20",
                    "SS": "0-4",
                    "XP": null,
                    "DC": "1",
                    "CP": "P2",
                    "LM": "42",
                    "PI": null,
                    "TT": "0",
                    "TM": "12",
                    "TS": "17",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "77da6739b8d452fe258d83df5e2e3e37",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466366622",
                            "NA": "Russkie Vityazi U20",
                            "N2": "Home",
                            "IT": "95d5cfa5c42bcdbfede6df7d1db933e1",
                            "SU": "0",
                            "HA": "+3.5",
                            "OD": {
                              "F": "18/25",
                              "D": "1.72",
                              "A": -139
                            }
                          },
                          {
                            "ID": "466366623",
                            "NA": "Krylya Sovetov U20",
                            "N2": "Away",
                            "IT": "a2f161481094d6e75c273e3a38564bcc",
                            "SU": "0",
                            "HA": "-3.5",
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
                "IT": "1dcaca6613e191f9ed45b8ee5ad57760",
                "NA": "IIHF U20 World Championships Div 1A",
                "OR": "3",
                "EV": [
                  {
                    "FI": "84725582",
                    "IT": "a5190813395ac7446ffbe6a75c286077",
                    "OR": "0",
                    "NA": "Norway U20 vs Slovenia U20",
                    "SS": "6-2",
                    "XP": null,
                    "DC": "1",
                    "CP": "P3",
                    "LM": "32",
                    "PI": null,
                    "TT": "0",
                    "TM": "20",
                    "TS": "0",
                    "TU": "",
                    "TA": null,
                    "MA": [
                      {
                        "ID": "170153",
                        "NA": "Puck Line",
                        "N2": "Puck Line",
                        "IT": "266cc7af4855de46757ecc5d607c8ca1",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466554392",
                            "NA": "Norway U20",
                            "N2": "Home",
                            "IT": "84b5b21e072a36fab34c9b168e49d108",
                            "SU": "0",
                            "HA": "-4.5",
                            "OD": {
                              "F": "3/5",
                              "D": "1.60",
                              "A": -167
                            }
                          },
                          {
                            "ID": "466554393",
                            "NA": "Slovenia U20",
                            "N2": "Away",
                            "IT": "9aedc1040ecd4f75c5e2f41e634c5fe8",
                            "SU": "0",
                            "HA": "+4.5",
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
                "IT": "a5820b0aedfe0a06e6e300791b891cf8",
                "NA": "Czech Extraliga U20 Cup",
                "OR": "4",
                "EV": [
                  {
                    "FI": "84723067",
                    "IT": "04501adac7db1dfeaa5a026b8286ee2d",
                    "OR": "0",
                    "NA": "Pirati Chomutov U20 vs Plzen U20",
                    "SS": "0-0",
                    "XP": null,
                    "DC": "1",
                    "CP": "P1",
                    "LM": "44",
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
                        "IT": "4ff8fb4cda42281d91f5eb24499fac32",
                        "SU": "0",
                        "PA": [
                          {
                            "ID": "466369413",
                            "NA": "Pirati Chomutov U20",
                            "N2": "Home",
                            "IT": "00423121f3b48cf0b7095136920462cf",
                            "SU": "0",
                            "HA": "+1.5",
                            "OD": {
                              "F": "12/25",
                              "D": "1.48",
                              "A": -209
                            }
                          },
                          {
                            "ID": "466369414",
                            "NA": "Plzen U20",
                            "N2": "Away",
                            "IT": "b31e453fbeeeca87ea9f43332bbb50df",
                            "SU": "0",
                            "HA": "-1.5",
                            "OD": {
                              "F": "31/20",
                              "D": "2.54",
                              "A": "+154"
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

    let curID = params.gameID;
    const json = JSON.parse(data);
    if (curID === undefined) {
      ID = parseInt(json.DATA[0].ID);
    }
    else {
      ID = curID;
    }

    function RenderTable(data, ID) {
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
                   <div class="[ play-link ]"> 
                   <div class="[ play-link-block ]"> 
                   <p class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[0]} vs</p>
                   <p class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[1]}</p>
                  </div> 
                   <div class="[ play-link-block ] text-right"> <div class="sport-icon play"></div> <p class="font m-white">'${sport.CT[i].EV[j].SS}'</p> 
                   <p class="font m-white">87:03</p> </div> </div> </div> 
                   <div class="cell"> 
                   <button class="button coefficient">1/1</button> </div> 
                   <div class="cell"> 
                   <button class="button coefficient">1/1</button> </div> 
                   <div class="cell"> <button class="button coefficient">1/1</button> </div> </div>`);
                  mutchCounter++;
                }
              } else {
                for (let j = 0; j < 4; j++) {
                  $(`[data-id="play-table"]`).append(`<div class="row"> <div class="cell"> <div class="[ play-link ]"> <div class="[ play-link-block ]"> <p class="font m-white ellipsis">'${sport.CT[i].EV[j].NA}'</p> <p class="font m-white ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugiat porro consectetur ratione repellendus quae assumenda ducimus totam ipsam earum quas quos ex consequatur provident repellat voluptatibus eum? Aspernatur esse.</p> </div>
                   <div class="[ play-link-block ] text-right"> <div class="sport-icon play"></div>
                   <p class="font m-white">'${sport.CT[i].EV[j].SS}'</p>
                   <p class="font m-white">87:03</p> </div> </div> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> 
                  <div class="cell"> <button class="button coefficient">1/1</button> </div> <div class="cell"> <button class="button coefficient">1/1</button> </div> </div>`);
                  mutchCounter++;
                }
              }
              $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
              <div class="cell"> <p class="font">'${sport.CT[i].NA} '</p> </div> 
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
    }
    // console.log(data);
    // console.log(JSON.parse(data));
    RenderTable(data, ID);

  });
});