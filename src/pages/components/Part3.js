

import React from "react";

function Part3({  formik }) {
  return (
    <>
        <span>Имя пользователя</span>
         <input type="text" placeholder='superivan28'  name="username"
        onChange={formik.handleChange} onBlur={formik.handleBlur}
        value={formik.values.username}/>
         {formik.errors.username ? <p className="error" >
                  {formik.errors.username}
                </p>:null}
        <span>E-mail</span>
         <input type="email" name="email" placeholder="ivanov@gmail.com"
        onChange={formik.handleChange} onBlur={formik.handleBlur}
        value={formik.values.email}/>
{formik.errors.email ? <p className="error" >
                  {formik.errors.email }
                </p>:null}
        <span>Пароль</span>
         <input  placeholder="Ivanov17383%425##"  name="password"
        onChange={formik.handleChange}  onBlur={formik.handleBlur}
        value={formik.values.password}/>
         {formik.errors.password ? <p className="error" >
                  {formik.errors.password}
                </p>:null}
       
    </>
  );
}

export default Part3;