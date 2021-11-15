import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateTask from './create-task';

describe('Create Task Component Tests', () => {
    describe('Task Component Form Loading Tests', () => {
        let props;

        beforeEach(() => {
            props = {
                onFormSubmit: jest.fn(() => Promise.resolve({ foo: 1 })),
            };
        });

        test('When the form is loaded, it shows the button and two text fields', () => {
            const wrapper = shallow(<CreateTask/>);

            expect(wrapper.find('Button').prop('type')).toBe('button');
            expect(wrapper.find('FormGroup').first().prop('controlId')).toBe('formTaskName');
            expect(wrapper.find('FormGroup').length).toBe(2);
        });
    });

    describe('Task Component Form Event Tests', () => {
        const state = { description: 'test', taskDate: '2012-12-12' };

        beforeEach(() => {
            const props = {
                description: state.description,
                taskDate: state.taskDate,
                onChange: (e) => {
                    state[e.target.name] = e.target.value
                },

            };
        });

        test('When the form is loaded and the blank is filled, onchange event is triggered', () => {
            const wrapper = shallow(<CreateTask/>,{ attachTo: window.domNode });
            wrapper.find('FormControl').at(0).simulate('change', { target: { name: 'description', value: 'test' } })
            wrapper.find('FormControl').at(1).simulate('change', { target: { name: 'taskDate', value: '2021-12-12' } })
            expect(wrapper.find('FormControl').at(0).prop('value')).toEqual('test')
            expect(wrapper.find('FormControl').at(1).prop('value')).toEqual('2021-12-12')
        });
        test('When the form is loaded and the action is triggered, onsubmit event is triggered', async () => {
            delete window.location;
            const { location } = window;
            delete window.location;
            window.location = { reload: jest.fn() };
            const testEvent = {
                onFormSubmit: jest.fn(),
            };
            const wrapper = shallow(<CreateTask/>);
            wrapper.find('Button').simulate('click');
            expect(window.location.reload).toHaveBeenCalled();
        });
    });
});
