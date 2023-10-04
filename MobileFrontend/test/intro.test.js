import React from 'react';
import renderer from 'react-test-renderer';
// import Welcome from '../Pages/intro';
import WelcomePage from '../Pages/WelcomePage';



jest.mock("../context/LoginProvider", () => ({
    useLogin: () => ({
      setIsLoggedIn: jest.fn(),
      setUser: jest.fn(),
    }),
  }));

test('renders correctly', () => {
  const tree = renderer.create(<WelcomePage/>).toJSON();
  expect(tree).toMatchSnapshot();
});