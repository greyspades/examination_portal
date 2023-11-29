import React from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, TextareaAutosize, TextField, Table, TableBody, TableHead, TableContainer, TableRow, TableCell, TablePagination } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";

export const ApplicantTable = () => {

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

    return (
        <div>
            <TableContainer className="w-[100%]">
                <TableHead className="bg-gray-200">
                    <TableRow className="w-[100%]">
                    <TableCell className="w-[100px] text-[11px] p-2">other</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">ClientId</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Names</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">School</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Tier</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Branch</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Zone</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">MPK account</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Gender</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Phone number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <TableRow className="w-[100%]">
                    <TableCell className="w-[100px] text-[11px] p-2">other</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">ClientId</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Names</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">School</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Tier</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Branch</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Zone</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">MPK account</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Gender</TableCell>
                    <TableCell className="w-[100px] text-[11px] p-2">Phone number</TableCell>
                    </TableRow>
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