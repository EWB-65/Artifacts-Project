import React from 'react';

class TestBackend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {testApiResponse:""}
    }

    testAPI = () => {
        fetch("http://localhost:5000/test")
            .then(res => res.text())
            .then(res => this.setState({testApiResponse:res}))
            .catch(err => err)
    }

    componentDidMount() {
        this.testAPI()
    }

    render() {
        return <>{this.state.testApiResponse}</>
    }
}

export default TestBackend