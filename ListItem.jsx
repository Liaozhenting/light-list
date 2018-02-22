import React, { Component } from 'react';
import classNames from 'classnames';
function noop() {}
class Item extends Component {
    constructor(props) {
        super(props)
    }
    state={
        checked:false
    }
    static defaultProps = {
        prefixCls: 'light-list',
        // checkable: true,
        defaultCheckedKeys: [],
        onCheck: noop,
    };
    onCheck=()=>{
        let that = this
        this.setState({checked:!this.state.checked},()=>{
            this.props.root.onCheck(that)
        })
        

    }
    renderCheckbox=(props) =>{
        let {state} = this
        const prefixCls = props.prefixCls;
        const checkboxCls = {
            [`${prefixCls}-checkbox`]: true,
        };
        if (state.checked) {
            checkboxCls[`${prefixCls}-checkbox-checked`] = true;
        }
        return (
            <span
                className={classNames(checkboxCls)}
                onClick={this.onCheck.bind(this)}
            ></span>);
    }
    render() {
        const props = this.props;
        return <li>
            {this.renderCheckbox(props)}
            {props.title}
        </li>
        
    }
}

export default Item