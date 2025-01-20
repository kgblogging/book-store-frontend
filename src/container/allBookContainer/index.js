import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/pageHeader';
import { ADD_BOOK, VIEW_BOOK } from './const';
import { handleCreate, handleView } from "../../shared/general"
import SearchBar from '../../components/searchBar';
import BasicTable from '../../components/basicTable';
import { columns } from './columns';
import { PencilIcon } from '@heroicons/react/solid';
import Button from '../../components/ui/button';
import { TrashIcon } from '@heroicons/react/outline';
import Pagination from '../../components/pagination';
const AllBookContainer = ({ allBookData }) => {

    const formRef = useRef(null);
    const navigate = useNavigate();
    const [viewForm, setViewForm] = useState(false);
    let [rows, setRows] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const params = useParams();
    console.log(allBookData)
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

    const resetForm = () => {
        setState(initialState);
        if (formRef.current) {
            formRef.current.reset(); // Reset the form using ref
        }
    };

    const handleSearch = (query) => {
        console.log("Search query:", query);
    };

    const handleFilterChange = (value) => {
        console.log("Filter selected:", value);
    };

    const handleButtonClick = () => {
        setViewForm(!viewForm)
    };


    const handleEdit = () => {
        console.log("hi")
    }
    const handleSort = (sort) => {
        let _allFilter = { ...allBookData.filters.sort };
        _allFilter.sorts = sort;
        console.log(_allFilter)
        // props.updateFilters(_allFilter);
    };
    const handleCount = (count) => {
        let _allFilter = { ...allBookData.filters };
        _allFilter.itemsPerPage = count;
        console.log(_allFilter)
        // props.updateFilters(_allFilter);
    };
    const handlePage = (pageNumber) => {
        let _allFilter = { ...allBookData.filters };
        _allFilter.pageNo = pageNumber;
        console.log(_allFilter)
        // props.updateFilters(_allFilter);
    };
    useEffect(() => {
        if (allBookData?.allData) {
            const updatedRows = allBookData?.allData?.map((f, i) => {
                return {
                    title: f.title ? f.title : "-",
                    author: f.author ? f.author : "-",
                    published: f.year ? f.year : "-",
                    action: (
                        <>
                            <div className='flex'>
                                <Button icon={PencilIcon} color="primary" size="100px" onClick={() => handleEdit('Edit clicked')} outlined className='mr-1' />
                                <Button icon={TrashIcon} color="primary" size="100px" onClick={() => handleEdit('Edit clicked')} outlined />
                            </div>
                        </>
                    ),
                };
            });
            setRows(updatedRows);
        }
    }, [allBookData]);


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
                viewForm ?
                    <><div className="p-4 bg-white shadow-md rounded-md mt-2">
                        <form>
                            <div className="grid grid-cols-2 gap-4">
                                {/* First Name */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-gray-700 mb-1" htmlFor="first-name">
                                        First Name
                                    </label>
                                    <input
                                        id="first-name"
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-gray-700 mb-1" htmlFor="last-name">
                                        Last Name
                                    </label>
                                    <input
                                        id="last-name"
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-gray-700 mb-1" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-gray-700 mb-1" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button color="primary" size="medium" label={"Submit"} className='mr-2' />
                                <Button color="primary" size="medium" label={"Reset"} outlined />
                            </div>
                        </form>
                    </div>
                    </>
                    :
                    <>
                        <SearchBar
                            onSearch={("gasd")}
                            hasPermission={true}
                            onCreate={() =>
                                handleCreate(navigate, ADD_BOOK, resetForm)
                            }
                        ></SearchBar>
                        <div className="bg-white shadow-md rounded-md mt-2">
                            <BasicTable
                                columnVisibility={columnVisibility}
                                setColumnVisibility={setColumnVisibility}
                                rows={rows}
                                columns={columns}
                                handleSort={handleSort}
                                sort={allBookData.filters.sort}
                                count={allBookData.count}
                                itemsPerPage={allBookData.filters.itemsPerPage}
                                pageNo={allBookData.filters.pageNo}
                                handlePage={handlePage}
                                handleCount={handleCount}
                            />
                            <Pagination count={allBookData.count}
                                itemsPerPage={allBookData.filters.itemsPerPage}
                                pageNo={allBookData.filters.pageNo}
                                handlePage={handlePage}
                                handleCount={handleCount} />
                        </div>
                    </>
            }
        </div>
    )
}

export default AllBookContainer
