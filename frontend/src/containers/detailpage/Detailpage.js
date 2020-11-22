import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actions/index';

import DishResult from '../../components/detail/DishResult';
import DishStep from '../../components/detail/DishStep';
import Comments from '../comments/Comments';
import './Detailpage.css'
//import './Detailpage.css';

class Detailpage extends Component {

    constructor(props) {
        super(props);
        this.props.getRecipe(this.props.match.params.id);
    }

    

    render() {
        const title = this.props.recipe && this.props.recipe.title;
        const abstraction = this.props.recipe && this.props.recipe.summary;
        const descriptions = this.props.recipe && this.props.recipe.description_list;
        const rating  = this.props.recipe && this.props.recipe.rating
        const likes = this.props.recipe && this.props.recipe.likes
        const price = this.props.recipe && this.props.recipe.price
        const category = this.props.recipe && this.props.recipe.category

        let igd;
        if(this.props.recipe && this.props.recipe.ingredient_list){
            igd = this.props.recipe.ingredient_list.map( (igd) => {
                let img = 'data:image/png;base64,'+igd.picture
                return (
                    <div key={igd.id} id='detailigd'>
                        <div id = 'detailigdinfo'>
                            <div id='igdlabel'>{"이름: "+igd.name}</div>
                            <div id='igdlabel'>{'브랜드: '+igd.brand}</div>
                            <div id='igdlabel'>{"수량: "+igd.quantity+igd.igd_type+' * '+igd.amount}</div>
                            <div id='igdlabel'>{"가격: "+igd.price+'원'}</div>
                        </div>
                        {<img id = 'detailimg' src={img} width='200'/>}
                    </div>
                )
            })
        }
        let d = null;
        if(this.props.recipe){
            d = 'data:image/png;base64,'+ this.props.recipe.thumbnail;
        }
        const methodData = descriptions && descriptions.map((item, index) => ({img:'data:image/png;base64,'+ this.props.recipe.photo_list[index], explanation:item}))
        const methods = methodData && methodData.map((item) => <DishStep key={item.id} img={item.img} explanation={item.explanation}/>)

        return (
            <div id = 'detailBackground'>
                <div className="Detailpage">
                    <div id = "detailBlock">
                        <button id = 'edit-button' onClick={() => this.props.history.push(`/edit/${this.props.match.params.id}/`)}>Edit</button>
                        <button id = "delete-button" onClick={() => this.props.deleteRecipe(this.props.match.params.id)}>Delete</button>
                        <DishResult img={<img src = {d} width='396' height='330'/>} price = {price} category = {category} likes = {likes} rating={rating} title={title} abstraction={abstraction} ingredients={igd}/>
                        <div className='dish_method'>
                            <div id = 'detailtitle3'>{'조리 순서'}</div>
                            <div id = 'detailmethod'>
                                {methods}
                            </div>
                        </div>
                    </div>
                </div>
                <div id='detailcomment'><Comments id='comment' recipeId={this.props.match.params.id}/></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipe: state.rcp.selectedRecipe
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipe: (id) => dispatch(actionCreators.getRecipe(id)),
        deleteRecipe: (id) => dispatch(actionCreators.deleteRecipe(id))
    };
}

Detailpage.propTypes = {
    getRecipe: PropTypes.func,
    deleteRecipe: PropTypes.func,
    recipe: PropTypes.object,
    match: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detailpage));