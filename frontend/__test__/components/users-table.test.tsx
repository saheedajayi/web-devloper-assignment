import type React from "react"
import {Matcher, render, screen, waitFor, within} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import "@testing-library/jest-dom"
import {UserFactory} from "../factories/user.factory"
import {UserService} from "@/services/user.service"
import UsersTable from "@/components/users-table"

// Mock the UserService
jest.mock("@/services/user.service")
const mockedUserService = jest.mocked(UserService)

// Create a test wrapper with QueryClient
const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {retry: false},
        mutations: {retry: false},
      },
    })

const TestWrapper = ({children}: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe("UsersTable", () => {
  const mockOnUserClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders loading state initially", () => {
    // Mock pending promise
    mockedUserService.getUsers.mockReturnValue(new Promise(() => {
    }))

    render(
        <TestWrapper>
          <UsersTable onUserClick={mockOnUserClick}/>
        </TestWrapper>,
    )

    // Check for table headers and loader
    expect(screen.getByText("Users")).toBeInTheDocument()
    expect(screen.getByText("Full Name")).toBeInTheDocument()
    expect(screen.getByText("Email Address")).toBeInTheDocument()
    expect(screen.getByText("Address")).toBeInTheDocument()
  })

  it("renders users table with data", async () => {
    // Create mock users using factory
    const mockUsers = UserFactory.buildList(3)
    const mockResponse = {
      users: mockUsers,
      totalCount: 3,
    }

    mockedUserService.getUsers.mockResolvedValue(mockResponse)

    render(
        <TestWrapper>
          <UsersTable onUserClick={mockOnUserClick}/>
        </TestWrapper>,
    )

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument()
    })

    // Check if users are rendered - fix for multiple elements with same email
    mockUsers.forEach(user => {
      const row = screen.getByText(user.name).closest("tr")!
      // Use getAllByText to handle multiple email elements, then check within the row
      const emailElements = screen.getAllByText(user.email)
      expect(emailElements.length).toBeGreaterThan(0)

      // Verify the email exists within this specific row
      expect(within(row).getAllByText(user.email)[0]).toBeInTheDocument()
    })
  })

  it("renders error state when API fails", async () => {
    mockedUserService.getUsers.mockRejectedValue(new Error("API Error"))

    render(
        <TestWrapper>
          <UsersTable onUserClick={mockOnUserClick} />
        </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText("Error loading users")).toBeInTheDocument()
      expect(screen.getByText("Please try again later")).toBeInTheDocument()
    })
  })

  it("shows pagination when there are multiple pages", async () => {
    const mockUsers = UserFactory.buildList(4)
    const mockResponse = {
      users: mockUsers,
      totalCount: 20, // More than one page
    }

    mockedUserService.getUsers.mockResolvedValue(mockResponse)

    render(
        <TestWrapper>
          <UsersTable onUserClick={mockOnUserClick} />
        </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText("Next →")).toBeInTheDocument()
    })
  })

  // it("calls onUserClick when user row is clicked", async () => {
  //   const mockUsers = UserFactory.buildList(1)
  //   const mockResponse = {
  //     users: mockUsers,
  //     totalCount: 1,
  //   }
  //
  //   mockedUserService.getUsers.mockResolvedValue(mockResponse)
  //
  //   render(
  //       <TestWrapper>
  //         <UsersTable onUserClick={mockOnUserClick} />
  //       </TestWrapper>,
  //   )
  //
  //   await waitFor(() => {
  //     expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument()
  //   })
  //
  //   // Click on the user row
  //   const userRow = screen.getByText(mockUsers[0].name).closest("tr")
  //   await userEvent.click(userRow!)
  //
  //   expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[0])
  // })

  it("calls onUserClick when user row is clicked", async () => {
    const mockUsers = UserFactory.buildList(1)
    const mockResponse = { users: mockUsers, totalCount: 1 }

    mockedUserService.getUsers.mockResolvedValue(mockResponse)

    render(
        <TestWrapper>
          <UsersTable onUserClick={mockOnUserClick} />
        </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument()
    })

    const userRow = screen.getByText(mockUsers[0].name).closest("tr")
    await userEvent.click(userRow!)

    // Map API user to expected User object
    const expectedUser = {
      id: mockUsers[0].id,
      name: mockUsers[0].name,
      email: mockUsers[0].email,
      address: `${mockUsers[0].street}, ${mockUsers[0].city}, ${mockUsers[0].state}, ${mockUsers[0].zipcode}`,
    }

    expect(mockOnUserClick).toHaveBeenCalledWith(expectedUser)
  })

})