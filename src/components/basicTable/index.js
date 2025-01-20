import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const BasicTable = ({
    rows,
    columns,
    columnVisibility,
    setColumnVisibility,
    selectAll,
    setSelectedRows,
    selectedRows,
    setSelectAll,
    handleSort,
    sort,
    data,
    count,
    filters,
    updateFilters,
    pageChange,
    setPageChange,
}) => {
    const [allLabels, setAllLabels] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (rows && rows.length > 0) {
            const labels = Object.keys(rows[0]);
            setAllLabels(labels);

            const initialVisibility = {};
            columns.forEach((column) => {
                initialVisibility[column.name] = column.isVisible;
            });
            setColumnVisibility(initialVisibility);
        }
    }, [rows, columns, setColumnVisibility]);

    useEffect(() => {
        if (!pageChange) {
            if (selectAll === true) {
                let _allFilter = { ...filters };
                _allFilter.itemsPerPage = count;
                dispatch(updateFilters(_allFilter));
                setSelectedRows(selectAll ? data?.data?.map((e) => e.id) : []);
            } else if (selectAll === false) {
                let _allFilter = { ...filters };
                _allFilter.itemsPerPage = 10;
                dispatch(updateFilters(_allFilter));
                setSelectedRows([]);
            }
        }
    }, [selectAll, data, setSelectedRows, updateFilters, count, pageChange]);

    const handleSortClick = (name, order, sortable) => {
        if (sortable) {
            handleSort({
                column: name,
                order: order === "desc" ? "asc" : "desc",
            });
        }
    };

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setPageChange(false);
    };

    const handleRowSelectionChange = (rowId) => {
        setSelectAll(false);
        const selectedIndex = selectedRows.indexOf(rowId);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, rowId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            );
        }
        setSelectedRows(newSelected);
    };

    const renderSortIcon = (column) => {
        if (!column.sort) return null;
        if (sort?.attributes[0] === column.name) {
            if (sort.sorts[0] === "asc") {
                return (
                    <span>
                        <span className="text-blue-500">&uarr;</span>&darr;
                    </span>
                );
            } else {
                return (
                    <span>
                        &uarr;<span className="text-blue-500">&darr;</span>
                    </span>
                );
            }
        } else {
            return <span>&uarr;&darr;</span>;
        }
    };

    const getRowClassName = (isSubmitted) => {
        return isSubmitted === undefined || isSubmitted === "Yes"
            ? ""
            : "bg-gray-100 text-gray-500";
    };

    return (
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-sm rounded-lg">
            <thead className="bg-teal-800">
                <tr>
                    {selectAll !== undefined && (
                        <th className="border border-gray-300 p-3 text-left">
                            <input
                                type="checkbox"
                                onChange={handleSelectAllChange}
                                checked={selectAll}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                        </th>
                    )}

                    {columns.map((column) => (
                        <th
                            key={column.name}
                            className={`p-1 text-center font-medium text-white border border-gray-300 ${
                                column.sort ? "cursor-pointer hover:bg-gray-100" : ""
                            }`}
                            style={{
                                minWidth: "10px",
                                width: column.width,
                                display: columnVisibility[column.name]
                                    ? "table-cell"
                                    : "none",
                            }}
                            onClick={() =>
                                handleSortClick(
                                    column.name,
                                    sort?.sorts?.[0],
                                    column.sort
                                )
                            }
                        >
                            <div className="flex items-center justify-between">
                                <span>{column.label}</span>
                                {renderSortIcon(column)}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
                {rows &&
                    rows.length > 0 &&
                    rows.map((row) => (
                        <tr
                            key={row.id}
                            className={`${getRowClassName(row.isSubmitted)} hover:bg-gray-50`}
                        >
                            {selectAll !== undefined && (
                                <td className="p-3 text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedRows.indexOf(row.selectAllId) !== -1
                                        }
                                        onChange={() =>
                                            handleRowSelectionChange(row.selectAllId)
                                        }
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                </td>
                            )}

                            {allLabels.map((label) => (
                                <td
                                    key={label}
                                    className="p-3 text-gray-700"
                                    style={{
                                        display: columnVisibility[label]
                                            ? "table-cell"
                                            : "none",
                                    }}
                                >
                                    {row[label]}
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

BasicTable.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            width: PropTypes.string,
            isVisible: PropTypes.bool,
            sort: PropTypes.bool,
        })
    ).isRequired,
    columnVisibility: PropTypes.object.isRequired,
    setColumnVisibility: PropTypes.func.isRequired,
    selectAll: PropTypes.bool,
    setSelectedRows: PropTypes.func.isRequired,
    selectedRows: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    setSelectAll: PropTypes.func,
    handleSort: PropTypes.func.isRequired,
    sort: PropTypes.shape({
        attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
        sorts: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
};

export default BasicTable;
