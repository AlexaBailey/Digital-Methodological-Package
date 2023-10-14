

import React from "react";

function Part2({ formik,setFlow,flow,flows,setGroup,group,groups,courses,setCourse,course  }) {
  return (
    <>
       <span>Специальность</span>
        <div  className="register">


<label>
        <select name='flow'  value={flow} onChange={formik.handleChange}>
          
        <option id="0"  onClick={()=>setFlow('')} >Не выбрано</option>

        {flows ? flows.map(c=>{return(<option onClick={()=>setFlow(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div>
          <span>Курс</span>
      <div  className="register">


<label>
        <select name='course'  value={course} onChange={formik.handleChange}>
          
        <option id="0"  onClick={()=>setCourse('')} >Не выбрано</option>

        {courses ? courses.map(c=>{return(<option onClick={()=>setCourse(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div>
        <span>Группа</span>
        <div  className="register">


<label>
        <select name='group'  value={group} onChange={formik.handleChange}>
          
        <option id="0"  onClick={()=>setGroup('')} >Не выбрано</option>

        {groups ? groups.map(c=>{return(<option onClick={()=>setGroup(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div>     
    </>
  );
}

export default Part2;