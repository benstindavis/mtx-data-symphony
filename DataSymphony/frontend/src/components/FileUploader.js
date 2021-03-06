import "../css/FileUploader.css";
import React, {  useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
//import UploadService from "../services/FileUploader.service";
import axios from "axios";


const MAIN_URL = 'https://mtx-data-symphony.herokuapp.com'

function UploadFiles({handle}) {
  const [entries, setEntries] = useState([
    {
      id: null,
      video: null,
      date_uploaded: null,
    },
  ]);

  const [uploadBox, setUploadBox] = useState("Upload");
  const [reportButton, setReportButton] = useState(false);
  const [fileData, setFileData] = useState(null);

  const GenRep = () => {

    const handleReportBtnClick =()=>{
      axios
      .get(`/main/view/${fileData.id}`)
      .then((response) => {
        handle(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return (
      <div className="genReport" onClick={handleReportBtnClick}>
        <span>Generate Report</span>
      </div>
    );
  };





  useEffect(() => {
    
    axios
      .get("/main/list/")
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [entries[0].id]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setUploadBox("Uploading...");



    var formData = new FormData();
    formData.append("video", acceptedFiles[0]);

   
    axios
      .post("/main/create/", formData)
      .then((response) => {
        setFileData(response.data);
        setUploadBox("Uploaded!!");
        setReportButton(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div>
      {
        //  {entries.length
        //     ? entries.map((post) => <div key={post.id}>{post.video}</div>)
        //     : null}
      }

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>{uploadBox}</p>}
      </div>

      <div>{reportButton ? <GenRep /> : null}</div>
    </div>
  );
}

export default UploadFiles;
