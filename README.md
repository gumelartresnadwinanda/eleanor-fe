# Eleanor | Media Library Server - Electronic Library for Entertainment, Audio, and ORganization

This project is a React application with TypeScript and Vite, providing media server functionality with theme switching.

## Features

- Theme switching (light/dark mode)
- Responsive design
- Environment variable configuration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/eleanor-fe.git
   cd eleanor-fe
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your API base URL and cookie name:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_COOKIE_NAME=eleanor_auth
   ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The production-ready files will be generated in the `dist` directory.

### Linting and Formatting

To run ESLint:

```bash
npm run lint
# or
yarn lint
```

To format the code with Prettier:

```bash
npm run format
# or
yarn format
```

## Project Structure

```
eleanor-fe/
├── public/                 # Public assets
├── src/                    # Source files
│   ├── components/         # Reusable components
│   ├── context/            # Context providers
│   ├── hooks/              # Custom hooks
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components
│   ├── routes/             # Route components
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License.
