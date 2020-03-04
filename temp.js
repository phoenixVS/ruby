const market = findMarket(event, itemId);

if (market.CO.length === 3
  && market.CO[0].NA === "1"
  && market.CO[1].NA === "X"
  && market.CO[2].NA === "2"
) {
  if (market.CO[2].PA !== undefined) {
    for (let outcome of market.CO[2].PA) {
      outcome.NA = swapScore(outcome.NA);
    }
  }
}

const status = market.SU === "1" ? "0" : "1";
const eventId = event.FI;
const marketId = market.ID;

let outcomes = getOutcomes(market).filter(it => it.DL !== "1" && it.OD);

const someHaveHandicap = outcomes.some(it => it.HA);
if (!someHaveHandicap) {
  output.market.push(formatMarket(eventId, marketId, status, outcomes));
  break;
}

let specName = "hdp";
if (outcomes.some(it => /Over/g.test(it.NA))) { // total
  specName = "total";
} else if (outcomes.some(it => /\d\d:\d\d/.test(it.HA))) { // time
  specName = "time";
}

const hasTriples = outcomes.some(it => /Tie|Exactly/g.test(it.NA));
if (hasTriples || market.CO.length === 1) {
  let matching: Obj[] = [];

  outcomes = outcomes.filter(it => it.HA);

  while (outcomes.length > 0) {
    let spec: string = outcomes[0].HA;
    let sign = "";
    if (spec[0] === "+") {
      spec = spec.slice(1);
      sign = "+";
    } else if (spec[0] === "-") {
      spec = spec.slice(1);
      sign = "-";
    }
    let specifiers = [{ [specName]: sign + spec }];

    [matching, outcomes] = filterDual(outcomes, outcome => {
      return outcome.HA === spec
        || outcome.HA === "+" + spec
        || outcome.HA === "-" + spec;
    });

    output.market.push(formatMarket(eventId, marketId, status, matching, specifiers));
  }
} else {
  const cols: Obj[] = market.CO;
  const firstIsHeader = cols[0].PA.every((outcome: Obj) => outcome.OD === "");
  const start = firstIsHeader ? 1 : 0;

  for (let i = 0; i < cols[start].PA.length; i++) {
    if (cols[start].PA[i].DL === "1") continue;

    const spec = cols[start].PA[i].HA;
    const specifiers = [{ [specName]: spec }];

    const row: Obj[] = [];
    for (let j = start; j < cols.length; j++) {
      const outcomes = cols[j].PA;
      if (outcomes !== undefined) {
        row.push(outcomes[i]);
      }
    }

    output.market.push(formatMarket(eventId, marketId, status, row, specifiers));
  }
}
function formatMarket(
  eventId: string,
  marketId: string,
  status: string,
  outcomes: Obj[],
  specifiers?: Obj[],
): Obj {
  const formattedOutcomes = outcomes.map(outcome => {
    let selectionId: string = (outcome.BS !== undefined && outcome.BS !== "")
      ? outcome.BS
      : outcome.NA;
    selectionId = selectionId.trim();

    if (outcome.N2 === "2") selectionId = swapScore(selectionId);

    if (outcome.OD === undefined) {
      globals.debugLog.err({ type: "outcome.OD", eventId, marketId, outcome });
    }

    return {
      selectionId,
      price: priceToDecimal(outcome.OD),
      active: status,
    };
  });

  const market: Obj = {
    status,
    eventId,
    marketId: marketId,
    outcomes: formattedOutcomes,
  };

  if (specifiers !== undefined) {
    market.specifiers = specifiers;
  }

  return market;
}
output.market.push -> marketsDiv.appendChild