import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './DishResult.css'
import './DishResult.css'

class DishResult extends Component {
    state = {
        value: ''
    }

    componentDidMount() {

    }

    handleRating(event){
        console.log(event.target.value)
        this.setState({value: event.target.value})
        this.props.updateState(event.target.value)
    }

    render() {
        let category_dictionary = {'Korean' : '한식', 'Chinese': '중식', 'Japanese': '일식',
            'American': '양식', 'Western': '양식', 'ConvenienceStore': '편의점', 'Dessert': '디저트', 'etc': ''};
        const showigd = this.props.ingredients
        // const tag = this.props.tag && this.props.tag.map((tag) => <span key={tag} id='tag'>{tag} </span>)
        let categories;
        if(this.props.category){
            categories = this.props.category.map((td) => {
                return category_dictionary[td]+"  "
            })
        }
        return (
            <div className='dish_result'>
                <div id = 'detailbox1'>
                    <div id = 'detailbox1area1'>
                        <div className = "area1text">
                            <div id ='detailtitle'>{this.props.title}</div>
                            <br/>
                            <div id = 'detailinfo'>
                                <p id='detaillabel'>{'가격'}</p>
                                {this.props.price+'원'}
                                <br/>
                                <p id='detaillabel'>{'추천수'}</p>
                                {this.props.likes }
                                <br/>
                                <p id='detaillabel'>{'평점'}</p>
                                {this.props.recipe_rating}
                                <br/>
                                <p id='detaillabel'>{'예상 조리 시간'}</p>
                                {this.props.duration+'분'}
                                <br/>
                                <p id='detaillabel'>{'카테고리'}</p>
                                {categories && categories.slice(0,2)}
                                <div id='categsplit'>{categories && categories.slice(2,4)}</div>
                                <div id='categsplit'>{categories && categories.slice(4,6)}</div>
                                <div id='userbuttons'>
                                    {(this.props.loginid!=-1)?<div><button id='ub' style={(this.props.islike?{'background-color':'#c2563a'}:null)} onClick={this.props.onlikeClicked}>추천하기</button>
                                    <button id='ub' style={(this.props.isscrap?{'background-color':'#c2563a'}:null)} onClick={this.props.onscrapClicked}>식단바구니  추가</button>
                                    <br/>
                                    <input id='ratinginput' type='number' value={this.props.rating} onChange={(event)=>{this.handleRating(event)}}/>
                                    <button id='ratingbutton' onClick={this.props.confirmRating}>별점 주기</button>
                                    </div>:null}
                                </div>
                            </div>
                        </div>
                        <div id = 'detailthumbnail'>{this.props.img}</div>
                    </div>
                    <div id = 'detailtitle2'>{'레시피 간단 설명'}</div>
                    <div id = 'detailsummary'>
                        {this.props.abstraction}
                    </div>
                </div>
                <div id = 'detailbox2'>
                    <div id = 'detailtitle3'>{'레시피 재료'}</div>
                    {showigd}
                </div>
            </div>
        )
    }
}

DishResult.propTypes = {
    ingredients: PropTypes.array,
    tag: PropTypes.string,
    price: PropTypes.number,
    likes: PropTypes.number,
    title: PropTypes.string,
    rating: PropTypes.number,
    category: PropTypes.string,
    img: PropTypes.string,
    abstraction: PropTypes.string,
}
export default DishResult;
