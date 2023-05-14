import { Pagination, PaginationItem } from '@mui/material';
import React from 'react';
// import Pagination from 'react-bootstrap/Pagination';


export default function PaginationComponent(props) {
    const { paginator, onPageChange } = props
    return (
        <Pagination
            onChange={(_, page) => {
                // Always need safety check for page !== null
                if (page !== null) {
                    onPageChange(page);
                }
            }}
            count={paginator.pageCount} >
        </Pagination>    
        );
}
