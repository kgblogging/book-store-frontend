import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/pageHeader';
import { ADD_BOOK, VIEW_BOOK } from './const';
import { handleView } from "../../shared/general"
const AllBookContainer = ({ allBookData }) => {

    const formRef = useRef(null);
    const navigate = useNavigate();
    const [viewForm, setViewForm] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [previewURL, setPreviewURL] = useState("");
    let [rows, setRows] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const params = useParams();

    useEffect(() => {
        if (params.action === "add") setViewForm(true);
        else if (params.action === "view") setViewForm(false);
    }, [params.action]);

    const initialState = {
        bookId: null,
        title: "",
        author: "",
        year: "",
    };
    const [state, setState] = useState(initialState);

    const handleSearch = (query) => {
        console.log("Search query:", query);
    };

    const handleFilterChange = (value) => {
        console.log("Filter selected:", value);
    };

    const handleButtonClick = () => {
        setViewForm(!viewForm)
    };

    return (
        <div>
            <PageHeader
                heading={"My Book"}
                breadcrumb={"My Book"}
                breadcrumbActive={" Notification manager"}
                pageText={"Notification"}
                pageTextLink={viewForm ? VIEW_BOOK : ADD_BOOK}
                showButton={viewForm}
                viewText={viewForm ? "View" : "Add"}
                onView={() => handleView(navigate, VIEW_BOOK, setViewForm)}
            />
            {
                viewForm ? "add/edit" : "view"
            }
        </div>
    )
}

export default AllBookContainer
