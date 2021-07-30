import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.item.id);
    }

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.item.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.item.id);
    }

    render(){
        var { index, item } = this.props; // index = this.props.index, item = this.props.item 
        return (
            <tr>
                <td>{ index + 1 }</td>
                <td> { item.name }</td>
                <td className="text-center">
                    <span className= { item.status === true ? 'label label-danger' : 'label label-success'} onClick={ this.onUpdateStatus }>
                                { item.status === true ? 'Kích Hoạt' : 'Ẩn'}
                            </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={ this.onUpdate }>
                        <span className="fa fa-pencil mr-5">&nbsp;</span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={ this.onDeleteTask }>
                        <span className="fa fa-trash mr-5">&nbsp;</span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
