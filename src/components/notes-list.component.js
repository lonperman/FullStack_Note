import NoteService from "../services/note.service";
import { useEffect, useState, useRef, useMemo } from "react";
import Pagination from '@material-ui/lab/Pagination';
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";



export const NotesList = () => {
    const history = useNavigate()
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState([])
    const notesRef = useRef()

    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const pageSizes = [3, 6, 9]

    notesRef.current = notes

    const handleSearchTitle = (e) => {
        const searchTitle = e.target.value
        setSearch(searchTitle)
    }

    const getRequestParams = (search, page, pageSize) => {
        let params = {}
        if (search) {
            params["title"] = search
        }
        if (page) {
            params["page"] = page - 1
        }
        if (pageSize) {
            params["size"] = pageSize
        }
        return params
    }

    const retrieveNotes = () => {
        const params = getRequestParams(search, page, pageSize)
        NoteService.FindAll(params)
            .then(res => {
                const { notes, totalPages } = res.data
                setNotes(notes)
                setCount(totalPages)
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }


    useEffect(retrieveNotes, [page, pageSize])


    const refreshList = () => {
        retrieveNotes()
    }

    const removeAllNotes = () => {
        NoteService.DeleteAll()
            .then(res => {
                console.log(res.data)
                refreshList()
            })
            .catch(e => {
                console.log(e)
            })
    }


    const findByTitle = () => {
        setPage(1)
        retrieveNotes()
    }



    const handlePageChange = (value) => {
        setPage(value)
    }

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value)
        setPage(1)
    }

    const openNote = (rowIndex) => {
        const id = notesRef.current[rowIndex].id;
        history(`/notes/${id}`);
    };

    const deleteNote = (rowIndex) => {
        const id = notesRef.current[rowIndex].id;

        NoteService.DeleteId(id)
            .then((response) => {
                history("/notes");

                let newNotes = [...notesRef.current];
                newNotes.splice(rowIndex, 1);

                setNotes(newNotes);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Status",
                accessor: "published",
                Cell: (props) => {
                    return props.value ? "Published" : "Pending";
                },
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <span onClick={() => openNote(rowIdx)}>
                                <i className="far fa-edit action m-2 pt-0 pb-1"></i>
                            </span>

                            <span onClick={() => deleteNote(rowIdx)}>
                                <i className="fas fa-trash action m-2 pt-0 pb-1"></i>
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: notes,
    });

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={search}
                        onChange={handleSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <div className="mt-3">
                    {"Items per Page: "}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}

                    />
                </div>
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="col-md-8">
                <button className="btn btn-sm btn-danger" onClick={removeAllNotes}>
                    Remove All
                </button>
            </div>
        </div>
    )
}

export default NotesList