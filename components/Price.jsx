import React, { Fragment, useMemo } from "react";

function Price({ amount, decimals, currency, hasDecimals }) {
  const formattedAmount = useMemo(() => amount.toLocaleString(), [amount]);
  return (
    <Fragment>
      $ {formattedAmount} {hasDecimals && <sup>00</sup>}
    </Fragment>
  );
}

export default Price;
