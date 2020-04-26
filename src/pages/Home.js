import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEqual, isEmpty } from "lodash";
import {
    getCountries,
    getData,
    setCovidData,
} from "../stores/actions/covid";
import { Table } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Header from '../components/Header'

class Home extends Component {
    state = {
        loading: true,
        value: 'selected',
        currentPage: 1,
        dataPerPage: 10,
        maxPages: 10
    }
    totalPage = null
    

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.btnFirst = this.btnFirst.bind(this)
        this.btnLast = this.btnLast.bind(this)
    }

    async componentDidMount() {
        try {
            await this.getCountries();
        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false,
            currentData: this.props.data
        });
    }

    async componentDidUpdate(_prevProps, prevState) {
        if (!isEqual(prevState.value, this.state.value)) {
            try {
                await this.getData()
            } catch (err) {
                console.log(err)
            }
        }
    }

    onChangePage(event) {
        let listId = Number(event.target.id)
        this.setState({currentPage: listId});
    }

    btnPrevClick() {
        let {currentPage} = this.state
        let listId = currentPage - 1;
        this.setState({currentPage: listId})
    }

    btnNextClick() {
        let {currentPage} = this.state
        let listId = currentPage + 1;
        this.setState({currentPage: listId})
    }

    btnFirst() {
        let {currentPage} = this.state
        let listId = 1;
        this.setState({currentPage: listId}, () => console.log(currentPage))
    }

    btnLast() {
        let listId = this.totalPage;
        this.setState({currentPage: listId})
    }

    async getData() {
        let { value } = this.state
        let { covidDis } = this.props
        try {
            if (isEmpty(value)) return Promise.resolve()
            await covidDis.getData(value)
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err)
        }
    }

    async getCountries() {
        let { covidDis } = this.props;
        try {
            await covidDis.getCountries();
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    filterCountries() {
        let {countries} = this.props
        let mapCountries = countries.map((c, i) =>{
            return {
                index: i,
                country: c.Country,
                slug: c.Slug,
            }
        })

        // console.log('[mapCountries  =====>]', mapCountries)

        mapCountries.sort((a,b) => {
            const aCountry = a.country, bCountry = b.country;
            if (aCountry < bCountry) {
                return -1;
            }

            if (aCountry > bCountry) {
                return 1;
            }

            return 0
        })

        // console.log('[sortMapCountries  =====>]', mapCountries)

        let result = mapCountries.map((el) => {
            return countries[el.index]
        })

        // console.log('[result  =====>]', result)

        return result.map((c,i) => {
            return (
                <option key={i} value={c.Slug} label={c.Country}></option>
            )
        })
    }

    renderData() {
        let {currentPage, dataPerPage} = this.state
        let { data } = this.props
        const idxLastTodo = currentPage * dataPerPage
        const idxFirstTodo = idxLastTodo - dataPerPage

        const currentData = data.slice(idxFirstTodo, idxLastTodo)

        const renderData = <Table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Time</th>
                                        <th>Death</th>
                                        <th>Active</th>
                                        <th>Recover</th>
                                        <th>Confirm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentData.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td> {data.Date} </td>
                                                    <td> {data.Deaths} </td>
                                                    <td> {data.Active} </td>
                                                    <td> {data.Recovered} </td>
                                                    <td> {data.Confirmed} </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

        return renderData
    }

    pageNumber() {
        let { currentPage, dataPerPage } = this.state
        let {data} = this.props

        this.totalPage = Math.ceil(data.length / dataPerPage)
        console.log( '[totalPage]', this.totalPage)

        let pages = []
        for (let i = 1; i <= this.totalPage; i++) {
            pages.push(i)
        }

        console.log('pages', pages)

        return pages.map(i => {
            return (
                <PaginationItem key={i} className={currentPage === i ? 'active' : ''}>
                    <PaginationLink 
                        id={i} 
                        onClick={this.onChangePage}
                    > 
                        {i} 
                    </PaginationLink>
                </PaginationItem>
            );
        })
    }

    render() {
        let { loading, value, currentPage } = this.state;
        if (loading) {
            return <div />;
        }
        return (
            <div className="container">

                <Header />

                <div className="form-group">
                    <select
                        className="form-control"
                        value={value}
                        onChange={this.handleChange}
                    >
                        <option value="selected">
                            Select
                        </option>
                        {this.filterCountries()}
                    </select>
                </div>

                <h1 className="country-title"> {value} </h1>
                <div>

                    {this.renderData()}

                    <Pagination>
                        <PaginationItem 
                            className={currentPage === 1 ? 'disabled' : ''}
                        >
                            <PaginationLink 
                                onClick={this.btnFirst}
                                first
                            />
                        </PaginationItem>

                        <PaginationItem 
                            className={currentPage === 1 ? 'disabled' : ''}
                        >
                            <PaginationLink 
                                onClick={this.btnPrevClick}
                                previous
                            />
                        </PaginationItem>
                
                        {this.pageNumber()}

                        <PaginationItem 
                            className={currentPage === this.totalPage ? 'disabled' : ''}
                        >
                            <PaginationLink 
                                onClick={this.btnNextClick}
                                next
                            />
                        </PaginationItem>

                        <PaginationItem 
                            className={currentPage === this.totalPage ? 'disabled' : ''}
                        >
                            <PaginationLink 
                                onClick={this.btnLast}
                                last
                            />
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>
        );
    }
}

const mapStateToprops = function (state) {
    return {
        countries: state.covid.countries,
        data: state.covid.data,
    };
};

const mapDispatchToprops = function (dispatch) {
    return {
        covidDis: bindActionCreators(
            {
                getCountries: getCountries,
                getData: getData,
                setCovidData: setCovidData,
            },
            dispatch
        ),
    };
};

export default compose(connect(mapStateToprops, mapDispatchToprops))(Home);