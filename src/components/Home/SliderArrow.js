import React from 'react'
import MaterialIcon from "material-icons-react";

export default ({className, to, onClick}) => (
  <button type="button" onClick={onClick} className={`button button--text button--icon ${className}`} aria-label={to}>
    <MaterialIcon className="icon" icon={to} />
  </button>
)