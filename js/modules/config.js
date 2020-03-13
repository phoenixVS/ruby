exports('config', (params, done) => {

  window.conf = {
    "SITE_CONFIG": {
      "SERVER_TIME": 1584018708,
      "CONNECTION_DETAILS": [
        {
          "Host": "wss://premws.bestline.bet",
          "Port": 443
        },
        {
          "Host": "https://www.bestline.bet",
          "Port": 443
        }
      ],
      "SITE_EXCLUDED_SPORTS": [],
      "SITE_EXCLUDED_VIRTUALS": [],
      "TAX_CONFIGURATION": ""
    },
    "CUSTOMER_CONFIG": {
      "USER_NAME": "",
      "LOGGED_IN": false,
      "CURRENCY_CODE": "USD",
      "USER_OFFER_STATUS": 1,
      "ODDS_TYPE": "2",
      "TZ": "GMT+2",
      "TZA": "120",
      "CUSTOMER_TYPE": "2",
      "REGISTERED_COUNTRY": "UA",
      "LAST_LOGIN_TIME": "",
      "INACTIVITY_TIMEOUT": "3600",
      "TIME_LEFT": "255",
      "FAVOURITES": "",
      "GeoComplyId": "12FAEED7DB70F070",
      "CURRENCY_GROUP_SEPARATOR": ",",
      "CURRENCY_DECIMAL_SEPARATOR": ".",
      "CURRENCY_SYMBOL": "&#36;",
      "CURRENCY_MIN_SEP_VALUE": 1000,
      "CURRENCY_PREFIX_SYMBOL": true,
      "CURRENCY_SPACE_REQUIRED": false,
      "CURRENCY_PLURAL_SYMBOL": "",
      "CURRENCY_EXCHANGE_RATE": 1,
      "SESSION_ID": "626CC60D67B44687BB84E445E3B39CEA000003",
      "LANGUAGE_ID": "1"
    }
  }

  window.blackList = {
    inplay: {
      CL: [],
      CT: [],
      EV: [],
      MA: [],
    },
    sports: {
      Leagues: [],
      MG: [
        '45',
        '10217',
        'G44',
        'G10201',
        'G10219',
        'G10220',
        'G10221',
        'G10222',
      ],
    }
  };
  // Fetch API request
  function httpGet(url, name) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (name == 'config') {
          window.config = data;
        }
        else {
          throw new Error('Uncorrect handler name.');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  done();
});