import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history' ;

import {getMockStore} from '../../../test-utils/mocks.js'
import * as actionCreators from '../../../store/actions/userCreators';
import Login from './Login';

const stubState = {
    ingredientList: [
        {'name': 'ingredient', 'quantity': 100, 'price': 1000, 'price_normalized': 10,
        'igd_type': 'g', 'brand': 'CU', 'picutre': 'image'}
    ]
}

const history = createBrowserHistory()
const mockStore = getMockStore(stubState)

describe('Login', () => {
    let login, spyOnLogin;
    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
                <Router history={history}>
                    <Login/>
                </Router>
            </Provider>
        );
        spyOnLogin = jest.spyOn(actionCreators, 'signIn')
        .mockImplementation(() => {return () => {}})
    });

    it('should render Login', () => {
        const commponent = mount(login);
        const wrapper = commponent.find('Login');
        expect(wrapper.length).toBe(1)
    })

    it('should test login', () => {
        const commponent = mount(login);
        const wrapper = commponent.find('button');
        wrapper.simulate('click')
        expect(spyOnLogin).toHaveBeenCalledTimes(1)
    })

    it('should test input', () => {
        const component = mount(login);
        let instance = component.find(Login.WrappedComponent).instance()

        let wrapper = component.find('input').at(0) // id
        wrapper.simulate('change', {target: {value: 'test_id'}})
        expect(instance.state.id).toBe('test_id')

        wrapper = component.find('input').at(1) // id
        wrapper.simulate('change', {target: {value: 'test_pw'}})
        expect(instance.state.password).toBe('test_pw')
    })
    
    

})