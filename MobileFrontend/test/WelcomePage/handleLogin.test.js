import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import WelcomePage from "../../Pages/WelcomePage";


// jest.mock('react-native', () => {
//     const Platform = require('react-native').Platform;
//     Platform.OS = 'ios';
//     return Platform;
//   });
  
// Mock the LoginProvider module and provide a mock implementation for useLogin
jest.mock("../../context/LoginProvider", () => ({
    useLogin: () => ({
      setIsLoggedIn: jest.fn(),
      setUser: jest.fn(),
    }),
  }));


// Mock the Axios HTTP requests
const axiosMock = new MockAdapter(axios);

describe("WelcomePage component", () => {

  it("should handle successful login", async () => {

    // Render the component
    const { getByText, getByPlaceholderText } = render(<WelcomePage />);

    // Mock the Axios POST request to return a successful login response
    axiosMock.onPost("/user/loginAccount").reply(200, {
      status: 200,
      data: {
        success: true,
        user: {
          // Mock user data
          id: 1,
          username: "testuser",
          // Add other user data here
        },
      },
    });

    // Simulate user input in the username and password fields
    const usernameInput = getByPlaceholderText("Enter username");
    const passwordInput = getByPlaceholderText("Enter password");

    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(passwordInput, "password123");

    // Find and press the "Login" button
    const loginButton = getByText("Login");
    fireEvent.press(loginButton);

    // Wait for the login process to complete (you might need to adjust this timeout)
    await waitFor(() => {
      // Assert that the user is now logged in
      expect(getByText("Welcome to your calendar")).toBeTruthy();
    });
  });

  // Add more test cases for different scenarios, such as unsuccessful login, network errors, etc.
});
