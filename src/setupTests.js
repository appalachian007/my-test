// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Throw an error and break out of Jest tests if tests exist with unhandled promise rejections
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
    process.on('unhandledRejection', (reason) => {
        process.exitCode = 1;
        throw reason;
    });
    // Avoid memory leak by adding too many listeners
    process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}

export const asyncExpectationHelper = (expectation) => {
    // We are wrapping this in a setTimeout with '300' ms
    // in order to force the JavaScript event loop to fire our
    // expect after the callback function in component fires...not pretty.
    // also used for testing debounced function calls
    setTimeout(() => {
        expectation();
    }, 300);
};
