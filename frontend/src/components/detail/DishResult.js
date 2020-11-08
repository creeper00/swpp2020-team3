import React, {Component} from 'react';
//import './DishResult.css'

class DishResult extends Component {
    render() {
        return (
            <div className='dish_result'>
                <div>
                    {this.props.title}
                </div>
                <img src={this.props.img}/>
                <div>
                    {this.props.abstraction}
                </div>
                <div>
                    {this.props.ingredients}
                </div>
            </div>
        )
    }
}

export default DishResult;