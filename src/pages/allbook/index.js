import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useUpdateEffect } from 'react-use';
import { onLoad, onAddBook, onEditBook, onDeleteBook, updateFilters, updateReducer } from './actions';
import AllBookContainer from '../../container/allBookContainer';

const AllBook = ({ onLoad, BookReducer, onAddBook, onEditBook, onDeleteBook, updateFilters }) => {
    useEffect(() => {
        onLoad();
    }, []);

    useUpdateEffect(() => {
        onLoad();
    }, [BookReducer?.filters?.filters, BookReducer?.filters?.sort, BookReducer?.filters?.pageNo, BookReducer?.filters?.itemsPerPage]);

    useUpdateEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (BookReducer.filters.search !== undefined) {
                onLoad();
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [BookReducer.filters.search]);

    const onSearch = (e) => {
        let _filter = { ...BookReducer.filters };
        _filter.search = e.target.value;
        updateFilters(_filter);
    };

    return (
        <div>
            <AllBookContainer
                onSearch={onSearch}
                allBookData={BookReducer}
                onAddBook={onAddBook}
                onEditBook={onEditBook}
                onDeleteBook={onDeleteBook}
                updateFilters={updateFilters}
                updateReducer={updateReducer}
            />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        BookReducer: state.BookReducer,
    };
};

const mapDispatchToProps = {
    onLoad,
    updateFilters,
    updateReducer,
    onAddBook,
    onEditBook,
    onDeleteBook
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBook);