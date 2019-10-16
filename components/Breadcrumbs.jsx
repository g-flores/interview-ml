import React, { Fragment } from "react";

function Breadcrumbs({ className, crumbs }) {
  return (
    <div className={`gray ${className || ""}`}>
      {crumbs &&
        crumbs.map((crumb, key) => (
          <Fragment key={key}>
            <span className="dib">{crumb}</span>
            {key !== crumbs.length - 1 && <span> > </span>}
          </Fragment>
        ))}
    </div>
  );
}

export default Breadcrumbs;
