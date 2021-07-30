import React, { Component } from 'react';

class Sort extends Component {
    constructor(props){
        super(props);
        this.state={
            byName: '',
            bySort: 0,
        }
    }

    onSort(name, value){
        this.setState({
            byName: name,
            bySort: value,
        });
        this.props.onSort(name, value);
    }

    render(){
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp &nbsp;<span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu nam" aria-labelledby="dropdownMenu1">
                        <li onClick={ () => this.onSort('name', 1) }>
                            <a role="button">
                                        <span className="fa fa-sort-alpha-asc pr-5">
                                            Tên A-Z
                                        </span>
                                        <i className={ (this.state.byName === 'name' && this.state.bySort === 1) ? "fas fa-chevron-down right" : ''}></i>
                                    </a>
                        </li>
                        <li onClick={ () => this.onSort('name', -1) }>
                            <a role="button" href="/#">
                                        <span className="fa fa-sort-alpha-desc pr-5">
                                            Tên Z-A
                                        </span>
                                        <i className={ (this.state.byName === 'name' && this.state.bySort === -1) ? "fas fa-chevron-down right" : ''}></i>
                                    </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={ () => this.onSort('status', 1) }>
                            <a role="button" href="/#">Trạng Thái Kích Hoạt
                                <i className={ (this.state.byName === 'status' && this.state.bySort === 1) ? "fas fa-chevron-down right" : ''}></i>
                            </a>
                        </li>
                        <li onClick={ () => this.onSort('status', -1) }>
                            <a role="button" href="/#">Trạng Thái Ẩn
                                <i className={ (this.state.byName === 'status' && this.state.bySort === -1) ? "fas fa-chevron-down right" : ''}></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>   
        );
    }
}

export default Sort;
