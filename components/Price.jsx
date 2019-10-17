import React, { Fragment, useMemo } from "react";

function Price({ amount, decimals, currency, showDecimals }) {
  const formattedAmount = useMemo(() => amount.toLocaleString(), [amount]);
  return (
    <Fragment>
      $ {formattedAmount} {showDecimals && <sup>{decimals}</sup>}
    </Fragment>
  );
}

export default Price;
