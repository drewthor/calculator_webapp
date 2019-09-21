import React, { Component } from 'react'; 

class NumberButton extends Component {
    constructor(props) {
        super(props);

        this.state = {value: props.value}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <form>
                <input type="button" className="button numberButton" value={this.state.value} onChange={this.handleChange} readonly="readonly"/>
            </form>
        );
    }
}

export default NumberButton;
