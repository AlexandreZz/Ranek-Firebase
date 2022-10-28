import React from "react";
import styles from "../modules/Input.module.css";

const Input = ({
  type,
  name,
  id,
  label,
  value,
  onChange,
  onBlur,
  required
}) => {
  return (
    <label htmlFor={id} className={styles.labelEstilo}>
      {label}
      <input
        className={styles.labelInput}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
    </label>
  );
};

export default Input;
