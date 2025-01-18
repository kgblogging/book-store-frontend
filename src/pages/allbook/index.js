import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useUpdateEffect } from 'react-use';
import { onLoad } from './actions';
import AllBookContainer from '../../container/allBookContainer';

const AllBook = ({ onLoad, BookReducer }) => {

    useEffect(() => {
        onLoad();
    }, []);

    useUpdateEffect(() => {
        onLoad();
    }, []);

    console.log(BookReducer?.allData)
    return (
        <div>
            <AllBookContainer allBookData={BookReducer} />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        BookReducer: state.BookReducer,
    };
};

const mapDispatchToProps = {
    onLoad
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBook);