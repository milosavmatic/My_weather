import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native'

class SearchInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            text: ''
        }
    }

handleChangeText = text => {
    this.setState({ text })
}

textEqualLocation = () => {
    const { onSubmit } = this.props
    const { text } = this.state

    if(!text) return

    onSubmit(text)
    this.setState({text})
}


    render() {
        const {text} = this.state 
        return ( 
            <TextInput
                autoCorrect = {false}
                style = {{ backgroundColor: 'gray', height: 40, width: 200, textAlign: 'center', borderRadius: 5}}
                value = {text}
                placeholder = 'Search any city'
                placeholderTextColor = 'white'
                onChangeText = {this.handleChangeText}
                onSelectionChange = {this.textEqualLocation}
                clearButtonMode = 'always'
                />
         );
    }
}
 
export default SearchInput;