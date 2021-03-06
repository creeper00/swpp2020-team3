import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
//Local imports
import './Navbar.css'
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Navbar extends Component{
    state = {
        minPrice : '',
        maxPrice : '',
        keyword : '',
    }
    
    componentDidMount() {
        this.props.isLogin()
    }

    parse = (string) => {
        let value = 0;
        for(let i = 0; i < string.length; i++){
            if(string[i] < '0' || string[i] > '9'){
                return NaN;
            }
            value = 10 * value + parseInt(string[i]);
        }
        return value;
    }

    checkInputHandler = (state) =>{
        let st = state;
        let tempMaxPrice, tempMinPrice;
        let message = '';
        tempMaxPrice = this.parse(st.maxPrice);
        tempMinPrice = this.parse(st.minPrice);
        if(isNaN(tempMaxPrice)) message += "가격의 상한을 올바르게 입력하세요.\n";
        if(isNaN(tempMinPrice)) message += "가격의 하한을 올바르게 입력하세요.\n";

        if(message){
            window.alert(message);
            return null;
        }
        
        return st;
    }

    searchConfirmHandler = () => {
        let query = {
            American: true, Korean: true,
            Chinese: true, Japanese: true,
            ConvenienceStore: true, Dessert: true,
            minPrice: this.state.minPrice == '' ? 0 : this.state.minPrice,
            maxPrice: this.state.maxPrice == '' ? 100000 : this.state.maxPrice,
            minDuration: 0, maxDuration: 1000,
            searchWord: this.state.keyword,
            pageNumber: 1,
            searchMode: 'cost',
        }
        let searchSettings = this.checkInputHandler(query);
        if(searchSettings){
            this.props.history.push(this.getURL(searchSettings));
            window.location.reload();
        }
    }

    clickCategoryHandler = (id) => {
        let query = {
            American: id == 1, Korean: id == 2,
            Chinese: id == 3, Japanese: id == 4,
            ConvenienceStore: id == 5, Dessert: id == 6,
            minPrice: this.state.minPrice == '' ? 0 : this.state.minPrice,
            maxPrice: this.state.maxPrice == '' ? 100000 : this.state.maxPrice,
            minDuration: 0, maxDuration: 1000,
            searchWord: this.state.keyword,
            pageNumber: 1,
            searchMode: 'cost',
        }
        let searchSettings = this.checkInputHandler(query);
        if(searchSettings){
            this.props.history.push(this.getURL(searchSettings));
            window.location.reload();
        }
    }

    getURL(st){
        return `/search?American=${st.American}&Korean=${st.Korean}&Chinese=${st.Chinese}&Japanese=${st.Japanese}&ConvenienceStore=${st.ConvenienceStore}&Dessert=${st.Dessert}&minPrice=${st.minPrice}&maxPrice=${st.maxPrice}&minDuration=${st.minDuration}&maxDuration=${st.maxDuration}&searchWord=${st.searchWord}&pageNumber=${st.pageNumber}&searchMode=${st.searchMode}`;
    }

    render(){
        return(
            <div className = 'BackNavBar'>
                <div className='SearchBar'>
                    <div id='logo'> <NavLink to='/main-page' exact><p id = 'Logo'>RECIPICK</p></NavLink> </div>
                    <div className= 'searchbar'> <input type='text' placeholder = "하한" value = {this.state.minPrice}  onChange={(event) =>  this.setState({minPrice: event.target.value})}/></div>
                    <div className= 'searchbar' id='wave'>~</div>
                    <div className= 'searchbar'><input type='text'  placeholder = "상한" value = {this.state.maxPrice}  onChange={(event) =>  this.setState({maxPrice: event.target.value})}/></div> 
                    <div className= 'searchbar'><input type='text'  placeholder = "키워드" value = {this.state.keyword}  onChange={(event) =>  this.setState({keyword: event.target.value})}/></div> 
                    <div className= 'searchbar'><img width='27' className = 'Search_Confirm' onClick={() => this.searchConfirmHandler()} src={require('../../Image/Search_Confirm.png')}/></div>
                    <div id = 'subblock'>
                    {!this.props.login_id?<li id = 'lilogin'><NavLink to='/login' exact>로그인</NavLink></li>
                    :<li id='lilogout' onClick={() => this.props.onLogout().then(() => this.props.isLogin())}><NavLink to='/main-page' exact>로그아웃</NavLink></li>}
                    {!this.props.login_id?<li id = 'lisign'><NavLink to='/signup' exact>회원가입</NavLink></li>
                    :<li id = 'lisign'><NavLink to={'/user/'+this.props.login_id} exact>내 정보</NavLink></li>}
                    <li id = 'licreate'><NavLink to='/create' exact>레시피 추가</NavLink></li>
                    </div>
                </div>
                <div id='nav'>
                <ul id = 'Navlist'>
                    <li> <a id='navitem' onClick={() => {this.clickCategoryHandler(1)}}> 양식 </a>
                    </li>
                    <li> <a id='navitem' onClick={() => {this.clickCategoryHandler(2)}}> 한식 </a>
                    </li>
                    <li> <a id='navitem' onClick={() => {this.clickCategoryHandler(3)}}> 중식 </a>
                    </li>
                    <li> <a id='navitem' onClick={() => {this.clickCategoryHandler(4)}}> 일식 </a>
                    </li>
                    <li> <a id='navitem'onClick={() => {this.clickCategoryHandler(5)}}> 편의점 </a>
                    </li>
                    <li> <a id='navitem' onClick={() => {this.clickCategoryHandler(6)}}> 디저트 </a>
                    </li>
                    <li><NavLink id='navitem' to='/meal-planner' exact>식단표</NavLink></li>
                </ul>
                </div>
            </div>
        )        
    }
}
const mapStateToProps = (state) => {
    return {
        login_id: state.user.login_id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        isLogin: () => dispatch(actionCreators.isLogin()),
        onLogout: () => dispatch(actionCreators.signOut())
    }
}
Navbar.propTypes = {
    history: PropTypes.object,
    storedRecipes: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)