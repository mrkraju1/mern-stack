import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const AddForm = () => {
  const [data, setdata] = useState([]);
  const [records, setRecords] = useState([]);
  const [UserType, setUserType] = useState("");

  //   console.log(records);

  const sendData = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:7700/type/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        UserType,
      }),
    });

    const data = await res.json();
    toast.success("user added");
    setUserType("");
    console.log(data);
    setdata((oldRecords) => [...oldRecords, data.user]);
  };

  useEffect(() => {
    axios.get("http://localhost:7700/type/").then((res) => {
      setdata(res.data.users);
      setRecords(res.data.users.slice(0, 5));
    });
  },[]);

  const pageHandler = (pageNumber) => {
    setRecords(data.slice((pageNumber * 5) - 5, pageNumber * 5));
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <h2 className="text-center mt-5">User Type Form</h2>
        <form className="form-css">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label field">
              <h5>User Type</h5>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={UserType}
              onChange={(e) => setUserType(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={sendData}
            className="btn btn-primary submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="col-md-7 mt-5">
      <Container className="border">
          {(records || []).length > 0 ? (
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Users</th>
                </tr>
              </thead>

              <tbody>
                {records.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      {/* <td>{item._id}</td> */}
                      <td>{item.UserType}</td>
                    </tr>
                  );
                })}
                {/* <br/> */}
              </tbody>
            </Table>
            // <div>
            //   {records.map((post) => (
            //     <div className="border">{post.UserType}</div>
            //   ))}
            //   <br />
            //   <Pagination data={data} pageHandler={pageHandler} />
            // </div>
       
            
          ) : (
            <div>
              <h3>No Data Found</h3>
            </div>
          )}
         </Container>
         <Pagination data={data} pageHandler={pageHandler} /> 

      </div>
    </div>
  );
};

export default AddForm;
