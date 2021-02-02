import React from 'react';
import c from './FormControls.module.css';


export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={c.formControl + " " + (hasError ? c.error : "")}>
      <input className={c.formInput} {...input}  {...props} />
      {hasError && <div className={c.errorText}>{meta.error}</div>}
    </div>
  )
}
export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={c.formControl + " " + (hasError ? c.error : "")}>
      <textarea className={c.formTextarea} {...input}  {...props} />
      {hasError && <div className={c.errorText}>{meta.error}</div>}
    </div>
  )
}
