import React from 'react';
import "./main.scss";
import Form from '../componants/form'
import FormData from '../componants/formData'

const Main = () => {
  return (
    <div className='main_contaier'>
        <Form />
        <FormData />
        
    </div>
  )
}

export default Main;