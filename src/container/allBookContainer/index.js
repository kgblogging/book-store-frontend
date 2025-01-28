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
import Input from '../../components/ui/input';
import ConfirmationDialog from '../../components/confirmationDialog';
import { GET_GENRE_DROPDOWN } from '../../apiCalls/urls/admin/book';
import { apiFunction } from '../../apiCalls/function';

// apis
export const getGenreList = async () => {
    return await apiFunction(GET_GENRE_DROPDOWN, 'get', {}, false, false)
}

const AllBookContainer = ({ onSearch, allBookData, onAddBook, onEditBook, onDeleteBook, updateFilters, updateReducer }) => {

    const formRef = useRef(null);
    const navigate = useNavigate();
    const [viewForm, setViewForm] = useState(false);
    let [rows, setRows] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    const [genre, setGenre] = useState([])
    const params = useParams();
    useEffect(() => {
        if (params.action === "add") setViewForm(true);
        else if (params.action === "view") setViewForm(false);
    }, [params.action]);



    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await getGenreList(); // Replace with your API endpoint
                if (response.status) {
                    setGenre(response.data); // Assuming the genres are in `data.data`
                }
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const initialState = {
        id: null,
        title: "",
        author: "",
        year: "",
        genre: "",
        bookIntroduction: "",
    };
    const [state, setState] = useState(initialState);

    //handle confirmation
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleDeleteIconClick = (itemId) => {
        setSelectedItemId(itemId);
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };
    const handleDeleteConfirmation = () => {
        onDeleteBook({ id: selectedItemId });
        setOpenDeleteDialog(false);
        setSelectedItemId(null);
    };

    const resetForm = () => {
        setState(initialState);
        if (formRef.current) {
            formRef.current.reset(); // Reset the form using ref
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFilterChange = (value) => {
        console.log("Filter selected:", value);
    };

    const handleButtonClick = () => {
        setViewForm(!viewForm)
    };

    const handleEdit = (rowData, navigate) => {
        window.scrollTo(0, 0);
        resetForm();
        navigate("/book/add");
        console.log(rowData)
        setState({
            id: rowData._id,
            title: rowData.title,
            author: rowData.author,
            year: rowData.year,
            bookIntroduction: rowData.bookIntroduction,
            genre: rowData?.genre,
        });
    };
    const handleSort = (sort) => {
        let _allFilter = { ...allBookData.filters.sort };
        _allFilter.sorts = sort;
        updateFilters(_allFilter);
    };
    const handleCount = (count) => {
        let _allFilter = { ...allBookData.filters };
        _allFilter.itemsPerPage = count;
        console.log(_allFilter)
        updateFilters(_allFilter);
    };
    const handlePage = (pageNumber) => {
        let _allFilter = { ...allBookData.filters };
        _allFilter.pageNo = pageNumber;
        console.log(_allFilter)
        updateFilters(_allFilter);
    };
    useEffect(() => {
        if (allBookData?.allData) {
            const updatedRows = allBookData?.allData?.map((f, i) => {
                return {
                    title: f.title ? f.title : "-",
                    author: f.author ? f.author : "-",
                    published: f.year ? f.year : "-",
                    genre: f?.genre?.title,
                    action: (
                        <>
                            <div className='flex'>
                                <Button icon={PencilIcon} color="primary" size="100px" onClick={() => handleEdit(f, navigate)} outlined className='mr-1' />
                                <Button icon={TrashIcon} color="primary" size="100px" onClick={() => handleDeleteIconClick(f._id)} outlined />
                            </div>
                        </>
                    ),
                };
            });
            setRows(updatedRows);
        }
    }, [allBookData.allData, allBookData?.filters]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.id) {
            onEditBook(state, navigate)
        } else {
            onAddBook(state, navigate)
            resetForm();
        }
    }

    return (
        <div>
            <ConfirmationDialog
                open={openDeleteDialog}
                handleClose={handleCloseDeleteDialog}
                handleConfirmation={handleDeleteConfirmation}
                title="Delete Confirmation"
                content="Are you sure you want to delete this item?"
            />
            <PageHeader
                heading={"My Book"}
                breadcrumb={"My Book"}
                breadcrumbActive={"Notification manager"}
                pageText={"Notification"}
                pageTextLink={viewForm ? VIEW_BOOK : ADD_BOOK}
                showButton={viewForm}
                viewText={viewForm ? "View" : "Add"}
                onView={() => handleView(navigate, VIEW_BOOK, setViewForm)}
            />
            {
                viewForm ?
                    <><div className="p-4 bg-white shadow-md rounded-md mt-2">
                        <form autoComplete="off" onSubmit={handleSubmit} ref={formRef}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <Input
                                        type="text"
                                        name="title"
                                        value={state.title}
                                        onChange={handleChange}
                                        placeholder="Enter Book Title"
                                        label="Book Title"
                                        className="border-blue-500"
                                    />
                                </div>
                                <div className='col-span-2 sm:col-span-1'>
                                    <label htmlFor="genre">Choose a Genre:</label>
                                    <select
                                        name="genre"
                                        id="genre"
                                        value={state.genre?._id}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            Select a Genre
                                        </option>
                                        {genre.length > 0 &&
                                            genre.map((a) => (
                                                <option value={a._id} key={a._id}>
                                                    {a.value}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Input
                                        type="text"
                                        name="author"
                                        value={state.author}
                                        onChange={handleChange}
                                        placeholder="Enter Book Author"
                                        label="Book Author"
                                        className="border-blue-500"
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Input
                                        type="date"
                                        name="year"
                                        value={state.year}
                                        onChange={handleChange}
                                        placeholder="Enter published Date"
                                        label="Book Published Date"
                                        className="border-blue-500"
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Input
                                        type="text"
                                        name="bookIntroduction"
                                        value={state.bookIntroduction}
                                        onChange={handleChange}
                                        placeholder="Enter Book Intro Details"
                                        label="Book Introduction"
                                        className="border-blue-500"
                                    />
                                </div>

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button color="primary" type='submit' size="medium" label={state.bookId ? "Update" : "Add"} className='mr-2' />
                                <Button color="primary" size="medium" label={"Reset"} outlined onClick={resetForm} />
                            </div>
                        </form>
                    </div>
                    </>
                    :
                    <>
                        <SearchBar
                            onSearch={onSearch}
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
                            <Pagination
                                count={allBookData.count}
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
