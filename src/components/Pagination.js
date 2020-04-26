import React from 'react';
import { isEqual, isEmpty } from "lodash";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Paginations extends React.Component {
    state = {
        pager: {},
        pages: [],
        currentPage: 1,
        totalPages: null,
    }

    componentDidMount() {
        // set page if data array isn't empty
        if (this.props.data && this.props.data.length) {
            this.setPage(this.props.currentPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if data array has changed
        let {data, dataPerPage} = this.props
        let {pages, currentPage, pager} = this.state
        if (this.props.data !== prevProps.data) {
            this.setPage(this.props.currentPage);
        }

        if(!isEqual(prevState.pager, this.state.pager)) {
            // this.setPage(this.props.currentPage);
            
            // let pager = this.getPager(data, currentPage, dataPerPage, this.state.pages)
            pager = {data, currentPage, dataPerPage, pages}
            console.log('[pager]', pager)
            this.setState({pager: pager})
        }
    }

    setPage(page) {
        let { data, dataPerPage } = this.props;
        let pager = this.state.pager;
        // console.log( '[pager] ====>' ,pager)

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // console.log('[data]  =====> ', data)
        // get new pager object for specified page
        pager = this.getPager(data.length, page, dataPerPage);
        // console.log( '[page] ====>' ,page)
        console.log( '[pager] ====>' ,pager)

        // get new page of items from items array
        let pageOfItems = data.slice(pager.startIndex, pager.endIndex + 1);
        console.log( '[pageOfItems] ======>' ,pageOfItems)

        // update state
        this.setState({ pager: pager, page: page });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, dataPerPage) {
        let { data } = this.props
        let totalPages = this.state
        // let { pages } = this.state
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        dataPerPage = dataPerPage || 10;
        totalItems = data.length;

        // calculate total pages
        totalPages = Math.ceil(totalItems / dataPerPage);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * dataPerPage;
        let endIndex = Math.min(startIndex + dataPerPage - 1, totalItems - 1);

        // console.log('[startIndex] ===> ', startIndex)
        // console.log('[totalPages]  ====>', totalPages)
        // console.log('[endIndex] ===> ', endIndex)
        // console.log('[startPage] ===> ', startPage)
        // console.log('[endPage] ===> ', endPage)

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        // console.log('[pages] ===> ', Array.isArray(pages))
        this.setState({pages: pages, currentPage: currentPage, totalPages: totalPages})
        // console.log('[pages] ===> ', pages)

        // return object with all pager properties required by the view
        return {
            currentPage: currentPage,
            dataPerPage: dataPerPage,
            endIndex: endIndex,
            endPage: endPage,
            pages: pages,
            startIndex: startIndex,
            startPage: startPage,
            totalItems: totalItems,
            totalPages: totalPages,
        };
    }

    render() {
        let {pager, totalPages} = this.state;
        // console.log('[pager]', pager)
        // console.log('[this.setPage]', this.setPage)
        {console.log('[totalPages ====>]', totalPages)}

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <Pagination>
                <PaginationItem className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <PaginationLink onClick={() => this.setPage(1)} first/>
                </PaginationItem>

                <PaginationItem className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <PaginationLink onClick={() => this.setPage(pager.currentPage - 1)} previous/>
                </PaginationItem>
        
                {
                    pager.pages.map((page) => {
                        // console.log('currentPage', pager.currentPage)
                        return (
                            <PaginationItem key={page} className={pager.currentPage === page ? 'active' : ''}>
                                <PaginationLink id={page} onClick={() => this.setPage(page)}> {page} </PaginationLink>
                            </PaginationItem>
                        )
                    })
                }

                <PaginationItem className={pager.currentPage === totalPages ? 'disabled' : ''}>
                    {console.log('[pager] =====>', pager)}
                    <PaginationLink onClick={() => this.setPage(pager.currentPage + 1)} next/>
                </PaginationItem>

                <PaginationItem className={pager.currentPage === totalPages ? 'disabled' : ''}>
                    <PaginationLink onClick={() => this.setPage(totalPages)} last/>
                </PaginationItem>
            </Pagination>
        );
    }
}
export default Paginations;
