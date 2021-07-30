import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    onCloseForm = () => {
        this.props.ReceiveForm();
    }

    onHandleChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value,
        })
    }

    onHandleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear(){
        this.setState({
            name: '',
            status: false,
        })
    }

    componentWillMount(){ // Chỉ chạy khi chưa hiển thị component
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
        }
    }

    componentWillReceiveProps(nextProps){ // chỉ chạy khi component đã hiện rồi
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        }else if(nextProps && nextProps.task === null){
            this.setState ({
                id: '',
                name: '',
                status: false,
            })
        }
    }

    render(){
        return (
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">{ this.state.id !== '' ? 'Chỉnh sửa công việc' : 'Thêm Công Việc' }
                        <span className="fa fa-times-circle right" onClick = { this.onCloseForm }></span>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={ this.onHandleSubmit }>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input type="text" className="form-control" name="name" value={ this.state.name } onChange={ this.onHandleChange }/>
                            </div>
                            <label>Trạng Thái :</label>
                            <select className="form-control" required="required" name="status" value={ this.state.status } onChange={ this.onHandleChange }>
                                <option value={ true }>Kích Hoạt</option>
                                <option value={ false }>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning"><i className="fas fa-plus">&nbsp;</i>Lưu Lại</button>&ensp;
                                <button type="button" className="btn btn-danger" onClick={ this.onClear }><i className="fas fa-times">&nbsp;</i>Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            
        );
    }
}

export default TaskForm;
