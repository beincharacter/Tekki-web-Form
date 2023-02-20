import React from 'react'
import "./base.scss"
import FormProvider from './context/details';
import Main from './screens/main';

const App = () => {
  return (
    <div>
        <FormProvider>
            <Main />
        </FormProvider>
    </div>
  )
}

export default App;