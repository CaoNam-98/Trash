import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            keyWord: '',
        };
        this.onSearch = this.onSearch.bind(this);
    }

    onHandleChange = (event) => {
        var value = event.target.value;
        this.setState({
            keyWord: value,
        })
    }

    onSearch(){
        this.props.onSearch(this.state.keyWord);
    }

    render(){
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nhập từ khóa..." onChange={ this.onHandleChange }/>
                    <span className="input-group-btn">
                                <button className="btn btn-primary" type="button" onClick={ this.onSearch }>
                                    <span className="fa fa-search mr-5">&nbsp;</span>Tìm
                    </button>
                    </span>
                </div>
            </div>
        );
    }
}

export default Search;
