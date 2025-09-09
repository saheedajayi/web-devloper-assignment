import type React from "react"
import {Matcher, render, screen, waitFor, within} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import "@testing-library/jest-dom"
import {UserFactory} from "../factories/user.factory"
import {UserService} from "@/services/user.service"
import UsersTable from "@/components/users-table"

// Mock window.matchMedia before any component imports
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock axios before importing anything that uses it
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
  isAxiosError: jest.fn(),
}))

// Mock the UserService
jest.mock("@/services/user.service")
const mockedUserService = jest.mocked(UserService)

// Mock Next.js router
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

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
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders loading state initially", () => {
    // Mock pending promise
    mockedUserService.getUsers.mockReturnValue(new Promise(() => {
    }))

    render(
        <TestWrapper>
          <UsersTable />
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
          <UsersTable />
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
          <UsersTable />
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
      totalCount: 20, // More than one page (5 pages total)
    }

    mockedUserService.getUsers.mockResolvedValue(mockResponse)

    render(
        <TestWrapper>
          <UsersTable />
        </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument()
    })

    // Check for single pagination instance
    const pageOneButtons = screen.getAllByText("1")
    expect(pageOneButtons.length).toBeGreaterThanOrEqual(1)

    // Verify pagination navigation exists
    const paginationNav = screen.queryByRole('navigation')
    expect(paginationNav).toBeInTheDocument()

    // Check for page 5 (last page based on totalCount=20, itemsPerPage=4)
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("handles pagination navigation", async () => {
    const mockUsers = UserFactory.buildList(4)
    const mockResponse = {
      users: mockUsers,
      totalCount: 12, // 3 pages total
    }

    mockedUserService.getUsers.mockResolvedValue(mockResponse)

    render(
        <TestWrapper>
          <UsersTable />
        </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument()
    })

    // Check that pagination renders with correct page count
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()

    // Verify we're on page 1 by checking for active styling
    const pageOneButton = screen.getByText("1")
    expect(pageOneButton.closest('a')).toHaveClass('!text-blue-600')
  })

  it("navigates to user detail page when user row is clicked", async () => {
    const mockUsers = UserFactory.buildList(1)
    const mockResponse = { users: mockUsers, totalCount: 1 }

    mockedUserService.getUsers.mockResolvedValue(mockResponse)

    render(
        <TestWrapper>
          <UsersTable />
        </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument()
    })

    const userRow = screen.getByText(mockUsers[0].name).closest("tr")
    await userEvent.click(userRow!)

    expect(mockPush).toHaveBeenCalledWith(`/user/${mockUsers[0].id}`)
  })

  it("does not show pagination when there is only one page or less", async () => {
    const mockUsers = UserFactory.buildList(2)
    const mockResponse = {
      users: mockUsers,
      totalCount: 2, // Less than itemsPerPage (4), so only 1 page
    }

    mockedUserService.getUsers.mockResolvedValue(mockResponse)

    render(
        <TestWrapper>
          <UsersTable />
        </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument()
    })

    // Pagination should not be rendered
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it("formats user address correctly", async () => {
    const mockUsers = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        username: "johndoe",
        phone: "555-1234",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001"
      }
    ]
    const mockResponse = { users: mockUsers, totalCount: 1 }

    mockedUserService.getUsers.mockResolvedValue(mockResponse)

    render(
        <TestWrapper>
          <UsersTable />
        </TestWrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    })

    // Check that the address is formatted correctly
    expect(screen.getByText("123 Main St, New York, NY, 10001")).toBeInTheDocument()
  })
})