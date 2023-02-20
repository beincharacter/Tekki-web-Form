import React, { useContext, useState } from 'react';
import "./data.scss";
import { FormContext } from '../context/details';
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import ReactPaginate from 'react-paginate';

const FormData = () => {

  const { formData, handleDelete, handleEdit } = useContext(FormContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(5);
  const [filterText, setFilterText] = useState('');

  const filteredData = filterText
    ? formData.filter((data) => data.email.includes(filterText))
    : formData;

  const indexOfLastRecord = (currentPage + 1) * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const pageCount = Math.ceil(filteredData.length / recordsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  

  return (
    <div className='formdata_container'>
      <div className='filter'>
        <label htmlFor="filter-email">Filter by email:</label>
        <input
          type="text"
          id="filter-email"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <table className='formdata_container'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(data => {
            return (
              <tr key={data.id}>
                <td>{`${data.firstName} ${data.lastName}`}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.email}</td>
                <td className='btn'>
                  <button><AiFillEdit onClick={() => handleEdit(data)} size={20} /></button>
                  <button onClick={() => handleDelete(data.email)}><AiFillDelete size={20} /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {
        filteredData.length > recordsPerPage ?
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            previousClassName={currentPage === 0 ? 'disabled' : ''}
            nextClassName={currentPage === pageCount - 1 ? 'disabled' : ''}
            disabledClassName={'disabled'}
          /> : ""
      }
    </div>
  );
}

export default FormData;
