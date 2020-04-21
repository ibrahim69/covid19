import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import {
    getCountries,
    getData,
    setCovidData,
} from "../stores/actions/covid";
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from "reactstrap";
import axios from "../axios";

class Home extends Component {
    state = {
        loading: true,
        country: [],
        dataCovid: [],
        value: '',
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.dataMap = this.dataMap.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    async componentDidMount() {
        console.log(this.state.dataCovid)
        try {
            await this.getCountries();
        } catch (e) {
            console.log(e);
        }
        this.setState({
            loading: false,
            country: this.props.countries,
            // dataCovid: this.props.data
        });
    }

    componentDidUpdate(prevState) {
        if (!isEqual(this.state.dataCovid, prevState.dataCovid)) {
            console.log('[stateValue]', this.state.dataCovid)
            console.log('[prevState]', prevState.dataCovid)
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

    getData() {
        let {value} = this.state;
        axios.$get(`/live/country/${value}`)
            .then( response => {
                this.setState( { dataCovid: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
        // try {
        //     let data = axios.$get(`/live/country/${value}`);
        //     covidDis.setCovidData(data);
        //     return Promise.resolve();
        // } catch (e) {
        //     return Promise.reject(e);
        // }
    }

    handleChange(e) {
        this.setState({ 
            value: e.target.value
        });
    }

    dataMap() {
        let { data } = this.props;

        return data.map((data, i) => {
            return (
                <div key={i}>
                    <Card>
                        <CardBody>
                            <CardTitle> {data.Country} </CardTitle>
                            <CardSubtitle>Data Status</CardSubtitle>
                            <CardText>Confirmed: {data.Confirmed} </CardText>
                            <CardText>Death: {data.Deaths} </CardText>
                            <CardText>Active: {data.Active} </CardText>
                            <CardText>Recovered: {data.Recovered} </CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        });
    }

    setValue() {
        this.setState({
           dataCovid: this.props.data 
        })
    }

    render() {
        let {loading, dataCovid, value } = this.state;
        let {countries, data} = this.props
        if (loading) {
            return <div />;
        }

        console.log("[dataCovid]", dataCovid);
        console.log("[value]", value);
        console.log("[data]", data);
        console.log("[countries]", countries);
        return (
            <div className="container">
                <div className="form-group">
                    <select
                        className="form-control"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <option disabled value="">
                            Select
                        </option>
                        {
                            this.state.country.map((data, i) => {
                                return (
                                    <option key={i} value={data.Slug} label={data.Country}></option>
                                );
                            })
                        }
                    </select>
                </div>
                {this.dataMap()}
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
                // getData: getData
                setCovidData: setCovidData,
            },
            dispatch
        ),
    };
};

export default compose(connect(mapStateToprops, mapDispatchToprops))(Home);
