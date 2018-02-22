import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ListItem from './ListItem'
import _xor from "lodash/xor";
function noop() { }
class List extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        checkedKeys: [],
        allChecked:false
    }
    static propTypes = {
        prefixCls: PropTypes.string,

    };
    static defaultProps = {
        prefixCls: 'light-list',
        onCheck: noop,
    };

    onCheck = (itemNode) => {
        const { props, state } = this;
        const checked =  itemNode.state.checked 
        console.log(state.checkedKeys);      
        const eventObj = {
            event: 'check',
            node: itemNode,
            checked
        }
        this.setState({
            checkedKeys:  _xor(state.checkedKeys, [itemNode.props.eventKey]),
        },()=>{
            console.log(state.checkedKeys);
            if(state.checkedKeys.length===props.dataSource.length){
                this.setState({allChecked:true})
            } else{
                this.setState({allChecked:false})
            }
            props.onCheck(this.state.checkedKeys)
        })
        
    }
    setAllChildren = (config)=>{
        return React.Children.map(this.props.children,child=>{
            return React.cloneElement(child,config)
        })
    }
    renderListItem = (item, index, level = 0) => {
        const props = this.props;
        const key = item.key
        const childProps = {
            root: this,
            eventKey: key,
        }
        return React.cloneElement(item, childProps)
    }
    render() {
        const props = this.props;

        return <ul className="light-list">

            {React.Children.map(props.children, this.renderListItem)}
        </ul>
    }
}

export default List