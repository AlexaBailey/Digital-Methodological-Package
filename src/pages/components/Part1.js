

import React from "react";
import Link from "next/link";

function Part1({ formik }) {
  return (
    <>
      <span>ФИО</span>
        <input placeholder='Васнецов Иван Иванович' value={formik.values.fio}
        onChange={formik.handleChange}  onBlur={formik.handleBlur} name="fio"/>
       {/*<span>Должность</span>
        <input  value={formik.values.job}
  onChange={formik.handleChange}  onBlur={formik.handleBlur} name="job"/>*/}
       <div style={{display:'flex',alignItems:'center'}}>
       <span>Ключ доступа</span>
      <img src="../key.png"/>
       </div>
    
        <input  value={formik.values.ackey}
        onChange={formik.handleChange}  onBlur={formik.handleBlur} name="ackey"/>
           <Link style={{fontSize:'small'}} href="/login">Уже зарегистрированы? Войти</Link>

    </>
  );
}

export default Part1;