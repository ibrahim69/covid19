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
import Pagination from '../components/Pagination'
import Header from '../components/Header'

class Home extends Component {
    state = {
        loading: true,
        value: 'selected',
        pageOfItems: [],
        currentPage: 1,
        dataPerPage: 10
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
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

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
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

    render() {
        let { loading, value, } = this.state;
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
                    {/* {setData} */}
                    <Table>
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
                                this.state.pageOfItems.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
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

                    <Pagination
                        currentPage={this.state.currentPage}
                        dataPerPage={this.state.dataPerPage}
                        data={this.props.data}
                        onChangePage={this.onChangePage}
                    />
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