import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {   
    constructor(props) {
        super(props);
        this.state={
            filterName: '',
            filterStatus: -1,
        }
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )
        this.setState({
            [name]: value,
        })
    }

    render(){
        var { tasks } = this.props; // tasks = this.props.tasks
        var elementsTasks = tasks.map((item, index) => {
            return <TaskItem key={ index } item={item} index={index} onUpdateStatus={ this.props.onUpdateStatus } onDeleteTask={ this.props.onDeleteTask } onUpdate={ this.props.onUpdate }/>
        });

        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" className="form-control" name="filterName" onChange={ this.onHandleChange }/>
                        </td>
                        <td>
                            <select className="form-control" name="filterStatus" onChange={ this.onHandleChange } >
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    { elementsTasks }
                </tbody>
            </table>
        );
    }
}

export default TaskList;