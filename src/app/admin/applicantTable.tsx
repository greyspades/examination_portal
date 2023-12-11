import React, { useEffect } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, TextareaAutosize, TextField, Table, TableBody, TableHead, TableContainer, TableRow, TableCell, TablePagination } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { Student } from "./types";

interface TableProps {
  students: Student[]
  sort: string
}

export const ApplicantTable = ({students, sort}: TableProps) => {

    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    const handleFirstPageButtonClick = (event) => {
        // onPageChange(event, 0);
      };
    
      const handleBackButtonClick = (event) => {
        // onPageChange(event, page - 1);
      };
    
      const handleNextButtonClick = (event) => {
        // onPageChange(event, page + 1);
      };
    
      const handleLastPageButtonClick = (event) => {
        // onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };

      const sortStudents = () => {
        if(sort == "name") {
          return students.sort((a, b) => a.lastName.localeCompare(b.lastName))
        } else if(sort == "branch") {
          return students.sort((a, b) => a.branch.localeCompare(b.branch))
        } else {
          return students
        }
      }

      const renderStudents = () => {
        return sortStudents()?.map((item: Student, idx: number) => (
          <TableRow key={idx} className="w-[100%]">
                    <TableCell className="w-[100px] p-2">{item.sn}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.clientId}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.firstName}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.lastName}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.bUnion}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.branch}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.clientId}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.productType}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.zone}</TableCell>
                    <TableCell className="w-[100px] p-2">{item?.email}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.phone}</TableCell>
                    <TableCell className="w-[100px] p-2">{item.id}</TableCell>
            </TableRow>
        ))
      }

    return (
        <div className="text-[16px]">
            <TableContainer className="w-[100%]">
                <TableHead className="bg-gray-200">
                    <TableRow className="w-[100%]">
                    <TableCell className="w-[100px] p-2">sn</TableCell>
                    <TableCell className="w-[100px] p-2">ClientId</TableCell>
                    <TableCell className="w-[100px] p-2">First name</TableCell>
                    <TableCell className="w-[100px] p-2">Last name</TableCell>
                    <TableCell className="w-[100px] p-2">Union</TableCell>
                    <TableCell className="w-[100px] p-2">Branch</TableCell>
                    <TableCell className="w-[100px] p-2">Client Id</TableCell>
                    <TableCell className="w-[100px] p-2">Product type</TableCell>
                    <TableCell className="w-[100px] p-2">Zone</TableCell>
                    <TableCell className="w-[100px] p-2">email</TableCell>
                    <TableCell className="w-[100px] p-2">Phone number</TableCell>
                    <TableCell className="w-[100px] p-2">Id</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {renderStudents()}
                </TableBody>
            </TableContainer>
            <TablePagination
                className=""
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={10}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
            />
        </div>
    )
}