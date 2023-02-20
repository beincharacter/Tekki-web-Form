import React, { createContext, useEffect, useState } from "react";
export const FormContext = createContext();

const FormProvider = ({ children }) => {

    const [formData, setFormData] = useState([]);
    const [editableData, setEdit] = useState(null);
    console.log(editableData, " inside details context")

    useEffect(() => {

        const data = Array.from({ length: 10 }, (_, i) => ({
            firstName: `Shubham${i + 1}`,
            lastName: 'Pal',
            phoneNumber: 9785632112,
            email: `shubham${i + 1}@gmail.com`,
            username: 'haha',
        }));


        setFormData(data)
    }, []);


    const handleDelete = (id) => {
        console.log(id, " inside delete")
        const updatedFormData = formData.filter(data => data.email !== id);

        setFormData(updatedFormData);
    };

    const handledataEdit = (data) => {
        setEdit(data)
    }


    return (
        <FormContext.Provider value={{ formData, setFormData, handledataEdit, handleDelete, editableData }}>
            {children}
        </FormContext.Provider>
    )
}


export default FormProvider;