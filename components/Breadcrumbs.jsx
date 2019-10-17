import React, { Fragment } from "react";

function Breadcrumbs({ className, crumbs }) {
  return (
    <div className={`gray ${className || ""}`}>
      {crumbs &&
        crumbs.map((crumb, key) => (
          <Fragment key={key}>
            <span className="dib f5">{crumb}</span>
            {key !== crumbs.length - 1 && <span className="b f6"> > </span>}
          </Fragment>
        ))}
    </div>
  );
}

export default Breadcrumbs;
