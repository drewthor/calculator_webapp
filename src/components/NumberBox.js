import React, { Component } from 'react'; 

class NumberBox extends Component {
    constructor(props) {
        super(props);

        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <form>
                <input type="text" value={this.state.value} onChange={this.handleChange} readonly="readonly"/>
            </form>
        );
    }
}

export default NumberBox;
